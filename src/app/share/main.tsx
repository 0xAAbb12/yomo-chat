"use client";
import { cn } from "~/lib/utils";
import { MessageListView } from "~/app/(app)/chat/components/message-list-view";
import { useShareMessage } from "~/hooks/useShareMessage";

export default function Main() {
  const { messageIds, messages } = useShareMessage();
  return (
    <div className={cn("flex size-full justify-center py-8")}>
      <div className="z-10 w-full max-w-[1024px] min-w-0 bg-white px-4 max-[1300px]:px-4">
        {messages && messageIds && (
          <MessageListView
            className="flex flex-grow justify-center-safe"
            externalmMessageInfo={{
              messageIds,
              messages,
            }}
            // onFeedback={handleFeedback}
            // onSendMessage={handleSend}
          />
        )}
      </div>
    </div>
  );
}
