"use client";

import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { Separator } from "~/components/ui/separator";

type ChatSkeletonProps = {
  messages?: number; // 骨架消息数量
  height?: string; // 外层高度（Tailwind 类）
  withHeader?: boolean;
  withInput?: boolean;
};

export default function ChatSkeleton({
  messages = 4,
  height = "h-[560px]",
  withHeader = true,
  withInput = true,
}: ChatSkeletonProps) {
  const widths = ["w-2/3", "w-1/2", "w-4/5"]; // 让每条长度有点变化

  return (
    <div className={`flex flex-col overflow-hidden border-none ${height}`}>
      <Separator />
      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {Array.from({ length: messages }).map((_, i) => {
            const isMe = i % 2 === 1; // 交替左右
            const w = widths[i % widths.length];

            return (
              <div
                key={i}
                className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
              >
                {/* 左侧他人头像 */}
                {!isMe && (
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                )}

                {/* 气泡 */}
                <div
                  className={`${w} max-w-[80%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-2`}
                >
                  {/* 多行消息骨架：1~3 块 */}
                  <Skeleton
                    className={`h-5 ${isMe ? "self-end rounded-2xl rounded-br-none" : "self-start rounded-2xl rounded-bl-none"}`}
                  />
                  <Skeleton
                    className={`h-5 ${isMe ? "w-4/5 self-end" : "w-4/5 self-start"} ${isMe ? "rounded-2xl rounded-br-none" : "rounded-2xl rounded-bl-none"}`}
                  />
                  {i % 3 === 0 && (
                    <Skeleton
                      className={`h-5 ${isMe ? "w-1/2 self-end" : "w-1/2 self-start"} ${isMe ? "rounded-2xl rounded-br-none" : "rounded-2xl rounded-bl-none"}`}
                    />
                  )}

                  {/* 时间条 */}
                  <Skeleton className="h-3 w-14 opacity-60" />
                </div>

                {/* 右侧自己头像 */}
                {isMe && <Skeleton className="h-8 w-8 shrink-0 rounded-full" />}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      {withInput && (
        <>
          {/* <Separator /> */}
          <div className="flex items-center gap-2 px-4 py-3">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-16 rounded-md" />
          </div>
        </>
      )}
    </div>
  );
}
