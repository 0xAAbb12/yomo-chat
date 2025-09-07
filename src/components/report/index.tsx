"use client";
import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ClipboardList, Workflow } from "lucide-react";
import ResearchFindings from "./ResearchFindings";
import ThinkingProcess from "./ThinkingProcess";
import mockReportData from "~/mock/mockReportData";
import { getMessages } from "~/core/store";

import { MESSAGES, MESSAGE_IDS } from "./confit";

interface ReportProps {
  messageIds?: string[];
}
// const
export default function DeepResarchReport({
  messageIds = MESSAGE_IDS,
}: ReportProps) {
  // const messages = MESSAGES;
  const messages = getMessages();
  const repostMesssage = useMemo(() => {
    if (messages.get(messageIds.at(-1) || "")?.agent === "reporter") {
      return messages.get(messageIds.at(-1) || "");
    }
    return undefined;
  }, [messages, messageIds]);

  const deepResearchMessages = useMemo(() => {
    return messageIds.map(id => messages.get(id)).filter(msg => msg?.agent !== 'reporter' || msg !== undefined);
  }, [messages, messageIds])
  
  return (
    <div className={"flex flex-col mt-4 px-4"}>
      <Tabs defaultValue="thinking" className="w-full">
        <TabsList className="relative flex w-fit gap-3" aria-label="tab">
          <TabsTrigger
            value="thinking"
            className="group relative inline-flex items-center"
          >
            <Workflow className="mr-2 h-4 w-4" />
            Thinking process
          </TabsTrigger>
          <TabsTrigger
            value="result"
            className="group relative inline-flex items-center"
            disabled={repostMesssage ? false : true}
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Research findings
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="result" className="focus-visible:outline-none">
            <ResearchFindings
              message={repostMesssage}
              markdown={mockReportData}
            />
          </TabsContent>
          <TabsContent value="thinking" className="focus-visible:outline-none">
            <ThinkingProcess messasges={deepResearchMessages} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
