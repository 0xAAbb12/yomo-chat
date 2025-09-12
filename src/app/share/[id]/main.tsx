"use client";
import { cn } from "~/lib/utils";
import { MessageListView } from "~/app/(app)/chat/components/message-list-view";
import { useShareMessage } from "~/hooks/useShareMessage";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ChatSkeleton from "~/components/share/ChatSkeleton";

export default function Main() {
  const { messageIds, messages, fetchShareMessages } = useShareMessage();
  const params = useParams();
  useEffect(() => {
    if (params?.id) {
      fetchShareMessages(params?.id as string);
    }
  }, [params]);

  return (
    <div className={cn("flex size-full justify-center py-8")}>
      <div className="z-10 min-h-[560px] w-full max-w-[1024px] min-w-0 bg-white px-4 max-[1300px]:px-4">
        {messages && messageIds?.length > 0 ? (
          <MessageListView
            className="flex flex-grow justify-center-safe"
            autoScrollToBottom={false}
            externalmMessageInfo={{
              messageIds,
              messages,
            }}
          />
        ) : (
          <ChatSkeleton />
        )}
      </div>
    </div>
  );
}
