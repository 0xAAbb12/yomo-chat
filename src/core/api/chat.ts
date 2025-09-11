

import { env } from "~/env";

import type { MCPServerMetadata } from "../mcp";
import type { Resource } from "../messages";
import { extractReplayIdFromSearchParams } from "../replay/get-replay-id";
import { fetchStream } from "../sse";
import { sleep } from "../utils";
import ThreadMapStorage from "../utils/thread-map";

import { resolveServiceURL } from "./resolve-service-url";
import type { ChatEvent } from "./types";
import { toast } from "sonner";


export async function* chatStream(
  userMessage: string,
  params: {
    thread_id: string;
    resources?: Array<Resource>;
    auto_accepted_plan: boolean;
    max_plan_iterations: number;
    max_step_num: number;
    max_search_results?: number;
    interrupt_feedback?: string;
    enable_deep_thinking?: boolean;
    enable_background_investigation: boolean;
    report_style?: "academic" | "popular_science" | "news" | "social_media";
    mcp_settings?: {
      servers: Record<
        string,
        MCPServerMetadata & {
          enabled_tools: string[];
          add_to_agents: string[];
        }
      >;
    };
  },
  options: { abortSignal?: AbortSignal } = {},
) {
  if (
    env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY ||
    location.search.includes("mock") ||
    location.search.includes("replay=")
  ) 
    return yield* chatReplayStream(userMessage, params, options);
  
  try{
    const { state } = JSON.parse(localStorage.getItem('yomo') ?? '{}');
    if (!state.token) return;
    
    let hasCompletedRunStatus = false;
    let hasFailedStatus = false;
    let lastEventTime = Date.now();
    let lastEventId = "";
    let shouldReconnect = false;
    
    const stream = fetchStream(resolveServiceURL("v1/chat/stream"), {
    // const stream = fetchStream(resolveServiceURL("v1/chat/stream_legacy"), {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": state.token,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
        ...params,
      }),
      signal: options.abortSignal,
    });
    
    // 设置超时检测定时器
    const timeoutCheckInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastEvent = now - lastEventTime;
      
      // 如果2分钟没有收到事件，且没有收到过completed状态和失败状态，则重连
      if (timeSinceLastEvent >= 30000 && !hasCompletedRunStatus && !hasFailedStatus && lastEventId) {
        console.log("检测到超时，准备重连...");
        shouldReconnect = true;
        lastEventTime = now; // 重置时间避免重复触发
      }
    }, 10000); // 每30秒检查一次
    
    try {
      for await (const event of stream) {
        // 检查是否需要重连
        if (shouldReconnect) {
          console.log("检测到重连标志，跳出当前循环");
          break;
        }
        
        // console.log("收到的event", event)
        lastEventTime = Date.now();
        lastEventId = event.id;
        
        let parsed: any = {};
        try {
          parsed = JSON.parse(event.data || "{}");
        } catch (e) {
          console.error("ThreadMapStorage Invalid JSON:", event.data, e);
        }
        
        // 检查是否收到completed状态
        if (event.event === "run_status" && parsed?.status === "completed") {
          hasCompletedRunStatus = true;
          clearInterval(timeoutCheckInterval);
        }
        
        // 检查是否收到failed状态或error事件
        if ((event.event === "run_status" && parsed?.status === "failed") || event.event === 'error') {
          hasFailedStatus = true;
          clearInterval(timeoutCheckInterval);
        }
        
        const threadId = parsed?.thread_id;
        if (threadId) {
          ThreadMapStorage.set(threadId, event.id);
        }
        if (event.event === 'error') {
          toast.error("An error occurred while generating the response. Please try again.");
        }
        if (event.event === "ping" || event.event === "stream_open") {
          continue;
        }
        yield {
          id: event.id,
          type: event.event,
          data: JSON.parse(event.data || "{}"),
        } as ChatEvent;
      }
    } finally {
      clearInterval(timeoutCheckInterval);
    }
    
    // 如果需要重连（超时检测触发）且没有收到completed状态和失败状态，尝试重连
    if (shouldReconnect && !hasCompletedRunStatus && !hasFailedStatus && lastEventId) {
      console.log("流结束但未收到completed状态，尝试重连...");
      
      // 重连时使用相同的接口，但只传thread_id
      const reconnectStream = fetchStream(resolveServiceURL("v1/chat/stream"), {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": state.token,
          "Last-Event-ID": lastEventId
        },
        body: JSON.stringify({
          thread_id: params.thread_id
        }),
        signal: options.abortSignal,
      });
      
      // 继续循环处理重连的流输出
      for await (const event of reconnectStream) {
        // console.log("重连收到的event", event)
        lastEventTime = Date.now();
        lastEventId = event.id;
        
        let parsed: any = {};
        try {
          parsed = JSON.parse(event.data || "{}");
        } catch (e) {
          console.error("ThreadMapStorage Invalid JSON:", event.data, e);
        }
        
        // 检查是否收到completed状态
        if (event.event === "run_status" && parsed?.status === "completed") {
          hasCompletedRunStatus = true;
          break; // 收到completed状态后退出重连循环
        }
        
        // 检查是否收到failed状态或error事件
        if ((event.event === "run_status" && parsed?.status === "failed") || event.event === 'error') {
          hasFailedStatus = true;
          break; // 收到失败状态后退出重连循环
        }
        
        const threadId = parsed?.thread_id;
        if (threadId) {
          ThreadMapStorage.set(threadId, event.id);
        }
        if (event.event === 'error') {
          toast.error("An error occurred while generating the response. Please try again.");
        }
        if (event.event === "ping" || event.event === "stream_open") {
          continue;
        }
        yield {
          id: event.id,
          type: event.event,
          data: JSON.parse(event.data || "{}"),
        } as ChatEvent;
      }
    }
    
  }catch(e){
    console.error(e);
  }
}

async function* chatReplayStream(
  userMessage: string,
  params: {
    thread_id: string;
    auto_accepted_plan: boolean;
    max_plan_iterations: number;
    max_step_num: number;
    max_search_results?: number;
    interrupt_feedback?: string;
  } = {
    thread_id: "__mock__",
    auto_accepted_plan: false,
    max_plan_iterations: 3,
    max_step_num: 1,
    max_search_results: 3,
    interrupt_feedback: undefined,
  },
  options: { abortSignal?: AbortSignal } = {},
): AsyncIterable<ChatEvent> {
  const urlParams = new URLSearchParams(window.location.search);
  let replayFilePath = "";
  if (urlParams.has("mock")) {
    if (urlParams.get("mock")) {
      replayFilePath = `/mock/${urlParams.get("mock")!}.txt`;
    } else {
      if (params.interrupt_feedback === "accepted") {
        replayFilePath = "/mock/final-answer.txt";
      } else if (params.interrupt_feedback === "edit_plan") {
        replayFilePath = "/mock/re-plan.txt";
      } else {
        replayFilePath = "/mock/first-plan.txt";
      }
    }
    fastForwardReplaying = true;
  } else {
    const replayId = extractReplayIdFromSearchParams(window.location.search);
    if (replayId) {
      replayFilePath = `/replay/${replayId}.txt`;
    } else {
      // Fallback to a default replay
      replayFilePath = `/replay/eiffel-tower-vs-tallest-building.txt`;
    }
  }
  const text = await fetchReplay(replayFilePath, {
    abortSignal: options.abortSignal,
  });
  const normalizedText = text.replace(/\r\n/g, "\n");
  const chunks = normalizedText.split("\n\n");
  for (const chunk of chunks) {
    const [eventRaw, dataRaw] = chunk.split("\n") as [string, string];
    const [, event] = eventRaw.split("event: ", 2) as [string, string];
    const [, data] = dataRaw.split("data: ", 2) as [string, string];

    try {
      const chatEvent = {
        type: event,
        data: JSON.parse(data),
      } as ChatEvent;
      if (chatEvent.type === "message_chunk") {
        if (!chatEvent.data.finish_reason) {
          await sleepInReplay(50);
        }
      } else if (chatEvent.type === "tool_call_result") {
        await sleepInReplay(500);
      }
      yield chatEvent;
      if (chatEvent.type === "tool_call_result") {
        await sleepInReplay(800);
      } else if (chatEvent.type === "message_chunk") {
        if (chatEvent.data.role === "user") {
          await sleepInReplay(500);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

const replayCache = new Map<string, string>();
export async function fetchReplay(
  url: string,
  options: { abortSignal?: AbortSignal } = {},
) {
  if (replayCache.has(url)) {
    return replayCache.get(url)!;
  }
  const res = await fetch(url, {
    signal: options.abortSignal,
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch replay: ${res.statusText}`);
  }
  const text = await res.text();
  replayCache.set(url, text);
  return text;
}

export async function fetchReplayTitle() {
  const res = chatReplayStream(
    "",
    {
      thread_id: "__mock__",
      auto_accepted_plan: false,
      max_plan_iterations: 3,
      max_step_num: 1,
      max_search_results: 3,
    },
    {},
  );
  for await (const event of res) {
    if (event.type === "message_chunk") {
      return event.data.content;
    }
  }
}

export async function sleepInReplay(ms: number) {
  if (fastForwardReplaying) {
    await sleep(0);
  } else {
    await sleep(ms);
  }
}

let fastForwardReplaying = false;
export function fastForwardReplay(value: boolean) {
  fastForwardReplaying = value;
}

export async function* featchStream(thread_id: string, id: string) {
  try{
    const { state } = JSON.parse(localStorage.getItem('yomo') ?? '{}');
    if (!state.token) return;
    const stream = fetchStream(resolveServiceURL("v1/chat/stream"), {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": state.token,
        "Last-Event-ID": id
      },
      body: JSON.stringify({
        thread_id
      }),
    });
    for await (const event of stream) {
      let parsed: any = {};
      try {
        parsed = JSON.parse(event.data || "{}");
      } catch (e) {
        console.error("ThreadMapStorage Invalid JSON:", event.data, e);
      }
      const threadId = parsed?.thread_id;
      if (threadId) {
        ThreadMapStorage.set(threadId, event.id);
      }
        yield {
          id: event.id,
          type: event.event,
          data: JSON.parse(event.data || "{}"),
        } as ChatEvent;
      }
    }catch(e){
      console.error("errrr",e);
    }
}
