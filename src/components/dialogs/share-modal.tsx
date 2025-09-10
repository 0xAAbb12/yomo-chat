"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { MessageListView } from "~/app/(app)/chat/components/message-list-view";
import { Button } from "../ui/button";
import { useShareMessage } from "~/hooks/useShareMessage";

const ShareModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { messageIds, messages } = useShareMessage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[600px] w-[768px] !max-w-none">
        {/* <DialogHeader>
          <DialogTitle>{`Share`}</DialogTitle>
        </DialogHeader> */}
        <div className={"flex h-full flex-col"}>
          <div className="flex h-full flex-1 justify-center-safe overflow-scroll py-2 pt-3">
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
          <div className="flex justify-center pb-2">
            <Button
              onClick={() => {}}
              type="submit"
              className="rounded-2 h-12 w-[300px] text-base text-white hover:bg-orange-500/90"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
