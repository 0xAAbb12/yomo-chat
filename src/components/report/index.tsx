"use client";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ClipboardList, Workflow } from "lucide-react";
import ResearchFindings from "./ResearchFindings";
import ThinkingProcess from "./ThinkingProcess";
import { getMessage, getMessages } from "~/core/store";
import { MESSAGES, MESSAGE_IDS } from "./confit";

interface ReportProps {
  messageIds?: string[];
}
// const
export default function DeepResarchReport({
  messageIds = MESSAGE_IDS,
}: ReportProps) {
  const [tabValue, setTabValue] = useState("thinking");
  // const messages = MESSAGES;
  const messages = getMessages();
  const repostMesssage = useMemo(() => {
    if (messages.get(messageIds.at(-1) || "")?.agent === "reporter") {
      return messages.get(messageIds.at(-1) || "");
    }
    return undefined;
  }, [messages, messageIds]);

  const deepResearchMessages = useMemo(() => {
    return messageIds
      .map((id) => messages.get(id))
      .filter((msg) => msg && msg?.agent !== "reporter");
  }, [messages, messageIds]);

  const projectData = useMemo(() => {
    let res = null;
    try {
      if (deepResearchMessages && deepResearchMessages.length > 0) {
        deepResearchMessages
          ?.filter((f) => f?.agent === "planner")
          .forEach((m) => {
            if (m?.toolCalls && m?.toolCalls.length > 0) {
              m?.toolCalls.forEach((tool) => {
                if (tool?.name === "get_web3_project" && tool?.result) {
                  res = JSON.parse(tool?.result || "{}");
                }
              });
            }
          });
      }
    } catch (error) {
      console.log(error)
    }
    return res;
  }, [deepResearchMessages, messageIds]);

  useEffect(() => {
    setTabValue(deepResearchMessages.length ? "thinking" : "result")
  }, [deepResearchMessages])

  return (
    <div className={"mt-4 flex flex-col px-4"}>
      <Tabs defaultValue="thinking" value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="relative flex w-fit gap-3" aria-label="tab">
          {!!deepResearchMessages.length &&
            <TabsTrigger
              value="thinking"
              className="group relative inline-flex items-center"
            >
              <Workflow className="mr-2 h-4 w-4" />
              Thinking process
            </TabsTrigger>
          }
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
              projectData={projectData}
            />
          </TabsContent>
          {!!deepResearchMessages.length &&
            <TabsContent value="thinking" className="focus-visible:outline-none">
              <ThinkingProcess messasges={deepResearchMessages} />
            </TabsContent>
          }
        </div>
      </Tabs>
    </div>
  );
}
