import { useCallback, useState } from "react";
import { useRootStore } from "~/store";
import { useStore } from "~/core/store";
import { type Message } from "~/core/messages";
import { createShareId, getShareMessages } from "~/core/api/share";

export const useShareMessage = () => {
  const threadId = useStore.getState().threadId;
  const [shareId, setShareId] = useState<string>("");
  const [messageIds, setMessageIds] = useState<string[]>([]);

  const [messages, setMessages] = useState<Map<string, Message>>(
    new Map<string, Message>(),
  );
  const { token } = useRootStore();

  const fetchShareId = useCallback(async () => {
    try {
      if (threadId && token) {
        const res: any = await createShareId(threadId);
        if (res && res?.share_id && res?.shared_content?.messages) {
          setShareId(res?.share_id);
          handleMsg(res?.shared_content?.messages as Message[]);
          // fetchShareMessages(res?.share_id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [threadId, token]);

  const fetchShareMessages = async (share_id: string) => {
    try {
      const data: any = await getShareMessages(share_id);
      if (data && Array.isArray(data?.messages)) {
        handleMsg(data?.messages);
      }
    } catch (error) {
      console.error("Error fetching history metadata:", error);
    }
  };

  const handleMsg = (messages: Message[]) => {
    const messagesArr: Message[] = [];
    const mIds: string[] = [];
    if (messages && Array.isArray(messages)) {
      const msgArr = messages;
      msgArr.forEach((message: any) => {
        const ms = {
          ...message, 
          threadId: message.thread_id,
          toolCalls: message.tool_calls,
          finishReason: message.finish_reason,
          reasoningContent: message.reasoning_content,
        }
        messagesArr.push(ms);
        mIds.push(ms?.id);
      });
    }
    setMessageIds(mIds);
    if (messagesArr.length) {
      const ms = new Map(messagesArr.map((m) => [m.id, m]));
      setMessages(ms);
    }
  };

  // useEffect(() => {
  //   if (threadId && token) {
  //     fetchShareId();
  //   }
  // }, [threadId, token]);

  return {
    messageIds,
    messages,
    shareId,
    fetchShareId,
    fetchShareMessages,
  };
};
