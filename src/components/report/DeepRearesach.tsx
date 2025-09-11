"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { BrainIcon, ChevronDown, WrenchIcon } from "lucide-react";
import React from "react";
import type { Message } from "~/core/messages";
import { cn } from "~/lib/utils";
import { Gauge } from "lucide-react";
import MarkdownStyled from "./MarkdownStyled";
import { ProjectReport } from "~/components/yomo/project-report";
import WebsiteListView from "./website";
import PageListView from "./page";

const AGNET_CONFIG: {
  [key in string]: { id: string; label: string; icon: any };
} = {
  planner: { id: "planner", label: "Planner", icon: Gauge },
  social_agent: { id: "social_agent", label: "Social", icon: Gauge },
  on_chain_agent: {
    id: "on_chain_agent",
    label: "Chain",
    icon: Gauge,
  },
  ta_agent: { id: "ta_agent", label: "Technical", icon: Gauge },
  research_agent: {
    id: "research_agent",
    label: "Research",
    icon: Gauge,
  },
};

interface DeepRearesachProps {
  messasges: (Message | undefined)[];
}
export default function DeepRearesach({ messasges }: DeepRearesachProps) {
  const items = React.useMemo(() => {
    let agents = new Map<string, Message>();
    messasges.forEach((msg) => {
      if (msg?.agent && msg.agent !== "reporter") {
        agents.set(msg?.agent, msg);
      }
    });
    return Array.from(agents.keys()).map((key) => AGNET_CONFIG[key]);
  }, [messasges]);
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-full rounded-lg border bg-white"
    >
      {items.map((item, index) => (
        <Accordion.Item value={`item-${index}`} className="border-b">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between p-3 font-medium text-gray-800 transition hover:bg-gray-50">
              {item?.label}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={cn(
              "overflow-hidden px-3 text-gray-600",
              "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp",
            )}
          >
            <div className="py-3">
              {messasges
                .filter((f) => f?.agent === item?.id)
                .map((m) => {
                  if (m?.toolCalls && m?.toolCalls.length > 0) {
                    return (
                      <>
                        <div className="my-3 flex gap-2">
                          <WrenchIcon className="text-brand-primary" />
                          <h2 className="font-medium">Search By Yomo</h2>
                        </div>
                        {m.toolCalls.map((tool, index) => {
                          if (tool.name === "get_web3_project") {
                            return (
                              <ProjectReport
                                key={index}
                                source={tool?.result}
                              />
                            );
                          }
                          if (tool.name === "search_web3_project") {
                            return (
                              <WebsiteListView source={tool?.result || ""} />
                            );
                          }
                          if (tool.name === "web_search") {
                            return <PageListView source={tool?.result || ""} />;
                          }
                          if (tool.name === "analyze_crypto_technical") {
                            return (
                              <div className="flex w-full flex-col break-words">
                                <MarkdownStyled markdown={tool?.result || ""} />
                              </div>
                            );
                          }
                        })}
                      </>
                    );
                  }
                  return (
                    <>
                      <div className="my-3 flex gap-2">
                        <BrainIcon className="text-brand-primary" />
                        <h2 className="font-medium">Reasoning</h2>
                      </div>
                      <div className="flex w-full flex-col break-words">
                        <MarkdownStyled markdown={m?.content || ""} />
                      </div>
                    </>
                  );
                })}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
