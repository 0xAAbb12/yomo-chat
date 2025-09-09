"use client";

import { useMemo } from "react";
import { useStore } from "~/core/store";
import { cn } from "~/lib/utils";

import { MessagesBlock } from "./components/messages-block";
// import { ResearchBlock } from "./components/research-block";

export default function Main() {
  const openResearchId = useStore((state) => state.openResearchId);
  const doubleColumnMode = useMemo(
    () => openResearchId !== null,
    [openResearchId],
  );
  return (
    <div
      className={cn(
        "flex size-full justify-center",
        doubleColumnMode && "gap-8",
      )}
    >
      <div className="w-full max-w-[1024px] min-w-0 px-4 max-[1300px]:px-4">
        <MessagesBlock
          className={cn(
            "shrink-0 transition-all duration-300 ease-out",
            `w-full min-w-0`,
            // doubleColumnMode && `w-[538px]`,
          )}
        />
      </div>

      {/* <ResearchBlock
        className={cn(
          "w-[min(max(calc((100vw-538px)*0.75),575px),960px)] pb-4 transition-all duration-300 ease-out",
          !doubleColumnMode && "scale-0",
          doubleColumnMode && "",
        )}
        researchId={openResearchId}
      /> */}
    </div>
  );
}
