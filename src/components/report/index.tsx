"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { ClipboardList, Workflow } from "lucide-react";
import ResearchFindings from "./ResearchFindings";
import ThinkingProcess from "./ThinkingProcess";
import mockReportData from "~/mock/mockReportData";

export default function Report() {
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
            <ResearchFindings markdown={mockReportData} />
          </TabsContent>
          <TabsContent value="thinking" className="focus-visible:outline-none">
            <ThinkingProcess />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
