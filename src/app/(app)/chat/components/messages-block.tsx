// import { motion } from "framer-motion";
// import { FastForward, Play } from "lucide-react";
// import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";

import type { Option, Resource } from "~/core/messages";
import { sendMessage, useMessageIds, useStore } from "~/core/store";
// import { env } from "~/env";
import { cn } from "~/lib/utils";
import { useRootStore } from "~/store";

import { ConversationStarter } from "./conversation-starter";
import { InputBox } from "./input-box";
import { MessageListView } from "./message-list-view";
// import { Welcome } from "./welcome";

export function MessagesBlock({ className }: { className?: string }) {
  // const t = useTranslations("chat.messages");
  const messageIds = useMessageIds();
  const messageCount = messageIds.length;
  const responding = useStore((state) => state.responding);
  // const { isReplay } = useReplay();
  // const { title: replayTitle, hasError: replayHasError } = useReplayMetadata();
  // const [replayStarted, setReplayStarted] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [feedback, setFeedback] = useState<{ option: Option } | null>(null);
  const { token, setLoginModalOpen } = useRootStore();
  const handleSend = useCallback(
    async (
      message: string,
      options?: {
        interruptFeedback?: string;
        resources?: Array<Resource>;
      },
    ) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      try {
        if (!token) {
          setLoginModalOpen(true);
          return;
        }
        await sendMessage(
          message,
          {
            interruptFeedback:
              options?.interruptFeedback ?? feedback?.option.value,
            resources: options?.resources,
          },
          {
            abortSignal: abortController.signal,
          },
        );
      } catch {}
    },
    [feedback, token, setLoginModalOpen],
  );
  const handleCancel = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);
  const handleFeedback = useCallback(
    (feedback: { option: Option }) => {
      setFeedback(feedback);
    },
    [setFeedback],
  );
  const handleRemoveFeedback = useCallback(() => {
    setFeedback(null);
  }, [setFeedback]);
  // const handleStartReplay = useCallback(() => {
  //   setReplayStarted(true);
  //   void sendMessage();
  // }, [setReplayStarted]);
  // const [fastForwarding, setFastForwarding] = useState(false);
  // const handleFastForwardReplay = useCallback(() => {
  //   setFastForwarding(!fastForwarding);
  //   fastForwardReplay(!fastForwarding);
  // }, [fastForwarding]);
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="h-full flex-1">
        {!responding && messageCount === 0 ? (
          <ConversationStarter className="" onSend={handleSend} />
        ) : (
          <MessageListView
            className="flex flex-grow"
            onFeedback={handleFeedback}
            onSendMessage={handleSend}
          />
        )}
      </div>
      <div className="pb-5">
        <InputBox
          className="h-full w-full"
          responding={responding}
          feedback={feedback}
          onSend={handleSend}
          onCancel={handleCancel}
          onRemoveFeedback={handleRemoveFeedback}
        />
      </div>
    </div>
  );
}
