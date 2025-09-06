"use client";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ClipboardList, Workflow } from "lucide-react";
import ResearchFindings from "./ResearchFindings";
import ThinkingProcess from "./ThinkingProcess";
import mockReportData from "~/mock/mockReportData";
import { getMessage, getMessages } from "~/core/store";

import { MESSAGES, MESSAGE_IDS } from "./confit"

interface ReportProps {
  messageIds?: string[];
}
// const 
export default function DeepResarchReport({
    messageIds = MESSAGE_IDS,
}: ReportProps) {
  // const messages = MESSAGES;
  const messages = getMessages();
  console.log("messageIds", messageIds);
  console.log("messages", messages);
  const repostMesssage = useMemo(() => {
    if (messages.get(messageIds.at(-1) || '')?.agent === 'reporter') {
      return messages.get(messageIds.at(-1) || '');
    }
    return undefined;
  }, [messages, messageIds]);

  const deepResearchMessages = useMemo(() => {
    return messageIds.map(id => messages.get(id)).filter(msg => msg?.agent !== 'reporter' || msg !== undefined);
  }, [messages, messageIds])

  console.log("repostMesssage", repostMesssage)
  console.log("deepResearchMessages", deepResearchMessages)
  
  return (
    <div className={"flex flex-col"}>
      <Tabs defaultValue="result" className="w-full">
        <TabsList className="relative flex w-fit gap-3" aria-label="研究选项卡">
          <TabsTrigger
            value="result"
            className="group relative inline-flex items-center"
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Research findings
          </TabsTrigger>

          <TabsTrigger
            value="thinking"
            className="group relative inline-flex items-center"
          >
            <Workflow className="mr-2 h-4 w-4" />
            Thinking process
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="result" className="focus-visible:outline-none">
            <ResearchFindings message={repostMesssage} markdown={mockReportData} />
          </TabsContent>
          <TabsContent value="thinking" className="focus-visible:outline-none">
            <ThinkingProcess messasges={deepResearchMessages} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
