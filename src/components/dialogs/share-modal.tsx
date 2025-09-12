"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { MessageListView } from "~/app/(app)/chat/components/message-list-view";
import { Button } from "../ui/button";
import { useShareMessage } from "~/hooks/useShareMessage";
import { useRootStore } from "~/store";
import { useMessageIds, useStore } from "~/core/store";
import useCopyClipboard from "~/hooks/useCopyClipboard";
import { cn } from "~/lib/utils";
import { LoadingAnimation } from "../yomo/loading-animation";

const ShareModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { messageIds, messages, shareId, fetchShareId } = useShareMessage();
  const threadId = useStore.getState().threadId;
  const { token } = useRootStore();
  const storeMessageIds = useMessageIds();
  const [isCopied, setCopied] = useCopyClipboard();

  const shareLink = useMemo(() => {
    const origin = window.location.origin;
    return shareId ? `${origin}/share/${shareId}` : "";
  }, [shareId]);

  useEffect(() => {
    if (threadId && token && storeMessageIds.length > 0 && open) {
      fetchShareId();
    }
  }, [threadId, token, storeMessageIds, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[600px] w-[768px] !max-w-none overflow-hidden">
        {/* <DialogHeader>
          <DialogTitle>{`Share`}</DialogTitle>
        </DialogHeader> */}
        <div className={"relative flex h-[570px] flex-col"}>
          <div className="flex h-full flex-1 justify-center-safe overflow-scroll py-2 pt-3">
            {messages && messageIds?.length > 0 ? (
              <MessageListView
                className="flex flex-grow justify-center-safe"
                autoScrollToBottom={false}
                externalmMessageInfo={{
                  messageIds,
                  messages,
                }}
                // onFeedback={handleFeedback}
                // onSendMessage={handleSend}
              />
            ) : (
              <LoadingAnimation className="mt-4" />
            )}
          </div>
          <div className="flex justify-center pb-2">
            <Button
              onClick={() => {
                setCopied(shareLink || "");
              }}
              disabled={!shareId}
              className={cn("rounded-2 h-12 w-[300px] text-base text-white")}
            >
              {isCopied ? "Copied" : "Copy Link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
