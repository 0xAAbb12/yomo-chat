"use client";
import React, { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import {
  LibrarySquare,
  Gauge,
  Link2,
  Search,
  Radar,
  ChartLine,
  ChevronRight,
  WrenchIcon,
  BrainIcon,
} from "lucide-react";
import type { Message } from "~/core/messages";
import { ProjectReport } from "../yomo/project-report";
import MarkdownStyled from "./MarkdownStyled";
import { ScrollArea } from "~/components/ui/scroll-area";
// import { Markdown } from "../yomo/markdown";
import { Markdown } from "../yomo/markdown";
import WebsiteListView from "./website";
import PageListView from "./page";
import { ScrollContainer } from "~/components/yomo/scroll-container";
const ACCENT = "#F67C00";

const AGNET_CONFIG: {
  [key in string]: { id: string; label: string; icon: any };
} = {
  planner: { id: "planner", label: "Planner", icon: Gauge },
  social_agent: { id: "social_agent", label: "social_agent", icon: Gauge },
  on_chain_agent: {
    id: "on_chain_agent",
    label: "on_chain_agent",
    icon: Gauge,
  },
  ta_agent: { id: "ta_agent", label: "ta_agent", icon: Gauge },
  research_agent: {
    id: "research_agent",
    label: "research_agent",
    icon: Gauge,
  },
};

function LeftTrigger({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: any;
}) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-left text-sm text-black transition-colors data-[state=active]:bg-black/5",
        "data-[state=active]:border-black data-[state=active]:text-black",
      )}
    >
      <span
        className="h-full w-1 rounded-l-lg opacity-0 transition-opacity group-data-[state=active]:opacity-100"
        style={{ backgroundColor: ACCENT }}
      />
      {/* <span className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10">
        <Icon className="h-4 w-4" />
      </span> */}
      <span className="flex-1 leading-tight">{label}</span>
      <ChevronRight className="h-4 w-4 text-black/40" />
    </TabsTrigger>
  );
}

interface ThinkingProcessProps {
  messasges: (Message | undefined)[];
}
export default function ThinkingProcess({ messasges }: ThinkingProcessProps) {
  const [agent, setAgent] = React.useState<string>("planner");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const items = React.useMemo(() => {
    let agents = new Map<string, Message>();
    messasges.forEach((msg) => {
      if (msg?.agent && msg.agent !== "reporter") {
        agents.set(msg?.agent, msg);
      }
    });
    return Array.from(agents.keys()).map((key) => AGNET_CONFIG[key]);
  }, [messasges]);

  React.useEffect(() => {
    // 用 scrollTo 兼容性更好
    contentRef.current?.scrollTo({ top: 0, left: 0 });
  }, [agent]);

  return (
    <div className="text-black">
      <Tabs
        defaultValue={items[0]?.id}
        orientation="vertical"
        className="w-full"
        value={agent}
        onValueChange={(val) => setAgent(val)}
      >
        {/* 用一个外层容器强制左右并排布局，避免 Tabs 自身样式影响排版 */}
        <div className="w-full">
          <div className="flex items-start gap-4">
            {/* 左侧：固定 230px，防止换行 */}
            <TabsList className="flex h-auto w-[230px] shrink-0 flex-col gap-3 rounded-xl border border-black/10 bg-white p-3">
              {items.map((it) => (
                <LeftTrigger
                  key={it?.id}
                  value={it?.id || ""}
                  label={it?.label || ""}
                  icon={it?.icon}
                />
              ))}
            </TabsList>

            {/* 右侧：flex-1 内容区域，占位布局 */}
            <div
              ref={contentRef}
              className="h-[620px] min-w-0 flex-1 overflow-y-auto"
            >
              {messasges
                .filter((f) => f?.agent === agent)
                .map((m) => {
                  if (m?.toolCalls && m?.toolCalls.length > 0) {
                    return (
                      <TabsContent
                        key={m?.id}
                        value={m?.agent || ""}
                        className="m-0"
                      >
                        <div className="my-3 flex gap-2">
                          <WrenchIcon className="text-brand-primary" />
                          <h2 className="font-medium">Search By Yomo</h2>
                        </div>
                        {m.toolCalls.map((tool, index) => {
                          if (tool.name === "get_web3_project") {
                            return (
                              <ProjectReport
                                key={index}
                                projectData={JSON.parse(tool?.result || "{}")}
                              />
                            );
                          }
                          if (tool.name === "search_web3_project") {
                            return (
                              <WebsiteListView  key={index} source={tool?.result || ""} />
                            );
                          }
                          if (tool.name === "web_search") {
                            return <PageListView  key={index} source={tool?.result || ""} />;
                          }
                          if (tool.name === "analyze_crypto_technical") {
                            return (
                              <div className="flex w-full flex-col break-words">
                                <MarkdownStyled key={index} markdown={tool?.result || ""} />
                              </div>
                              // <div className="flex w-full flex-col break-words">
                              //   <Markdown className={cn("prose-invert text-[#2C2C2C]")}>
                              //     {tool?.result}
                              //   </Markdown>
                              // </div>
                            );
                          }
                          // return (
                          //   <div className="space-y-4">
                          //     <div className="rounded-lg border border-dashed border-black/20 p-4">
                          //       <div className="prose max-w-none break-words">
                          //         {tool?.result}
                          //       </div>
                          //     </div>
                          //   </div>
                          // );
                        })}
                      </TabsContent>
                    );
                  }
                  return (
                    <TabsContent
                      key={m?.id}
                      value={m?.agent || ""}
                      className="m-0"
                    >
                      <div className="my-3 flex gap-2">
                        <BrainIcon className="text-brand-primary" />
                        <h2 className="font-medium">Reasoning</h2>
                      </div>
                      <div className="flex w-full flex-col break-words">
                        <MarkdownStyled markdown={m?.content || ""} />
                      </div>
                    </TabsContent>
                  );
                })}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
