import { useEffect, useMemo, useState } from "react";
import type { Thread } from "~/core/history";
import { getStateValue } from "~/lib/utils";
import { queryHistoryMetadata, getThreadDetail } from "~/core/api/history";
import { useRootStore } from "~/store";
import { useStore } from "~/core/store";
import { type Message } from "~/core/messages";

export const useShareMessage = () => {
  const [threads, setThreads] = useState<Record<string, Thread[]>>({});
  const [messageIds, setMessageIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<Map<string, Message>>(
    new Map<string, Message>(),
  );
  const curThreads = useMemo(() => {
    const key =
      Object.keys(threads).sort((a, b) => Number(b) - Number(a))[0] || "";
    if (key && threads[key] && threads[key][0]) {
      return threads[key][0];
    }
    return null;
  }, [threads]);
  const { token } = useRootStore();
  function groupByDayTimestamp(data: Thread[]): Record<string, Thread[]> {
    return data.reduce(
      (acc, item) => {
        const dayStart = Math.floor(item.created_at / 86400) * 86400;
        if (!acc[dayStart.toString()]) {
          acc[dayStart] = [];
        }
        acc[dayStart]?.push(item);

        return acc;
      },
      {} as Record<string, Thread[]>,
    );
  }
  const fetchHistoryMetadata = async () => {
    try {
      const user_id = getStateValue("state.userDetail.uid");
      if (!user_id) return;
      const data = await queryHistoryMetadata(user_id, "", "all");
      if (data && Array.isArray(data)) {
        const dataObj = groupByDayTimestamp(data);
        setThreads(dataObj);
      }
    } catch (error) {
      console.error("Error fetching history metadata:", error);
    }
  };

  const handlethread = async (thread: Thread) => {
    try {
      useStore.getState().clearMessages();
      const data = await getThreadDetail(thread.thread_id);
      const messagesArr: Message[] = [];
      const mIds: string[] = [];
      if (data && data.messages && Array.isArray(data.messages)) {
        data.messages.forEach((message) => {
          messagesArr.push(message);
          mIds.push(message?.id);
        });
      }
      setMessageIds(mIds);
      if (messagesArr.length) {
        const ms = new Map(messagesArr.map((m) => [m.id, m]));
        setMessages(ms);
      }
    } catch (error) {
      console.error("Error fetching history metadata:", error);
    }
  };

  useEffect(() => {
    if (curThreads) {
      handlethread(curThreads);
    }
  }, [curThreads]);

  useEffect(() => {
    if (token) {
      fetchHistoryMetadata();
    }
  }, [token]);

  return {
    messageIds,
    messages,
  };
};
