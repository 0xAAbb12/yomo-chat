"use client";
import React from "react";
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
} from "lucide-react";

// Accent color
const ACCENT = "#F67C00";

const items = [
  { id: "knowledge", label: "从知识库", icon: LibrarySquare },
  { id: "analyze", label: "Analyze P", icon: Gauge },
  { id: "tracker", label: "链上追踪器", icon: Link2 },
  { id: "research", label: "Research ", icon: Search },
  { id: "sentiment", label: "Analyze ", icon: Radar },
  { id: "ta", label: "Perform", icon: ChartLine },
];

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
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 leading-tight">{label}</span>
      <ChevronRight className="h-4 w-4 text-black/40" />
    </TabsTrigger>
  );
}

export default function SurfTwoPaneLayout() {
  return (
    <div className="text-black">
      <Tabs
        defaultValue={items[0]?.id}
        orientation="vertical"
        className="w-full"
      >
        {/* 用一个外层容器强制左右并排布局，避免 Tabs 自身样式影响排版 */}
        <div className="w-full p-4">
          <div className="flex gap-4">
            {/* 左侧：固定 230px，防止换行 */}
            <TabsList className="flex h-auto w-[230px] shrink-0 flex-col gap-3 rounded-xl border border-black/10 bg-white p-3">
              {items.map((it) => (
                <LeftTrigger
                  key={it.id}
                  value={it.id}
                  label={it.label}
                  icon={it.icon}
                />
              ))}
            </TabsList>

            {/* 右侧：flex-1 内容区域，占位布局 */}
            <div className="flex-1">
              {items.map((it) => (
                <TabsContent key={it.id} value={it.id} className="m-0">
                  <div className="space-y-4">
                    <div className="h-24 rounded-lg border border-dashed border-black/20">
                      {it.label}
                    </div>
                    <div className="h-40 rounded-lg border border-dashed border-black/20" />
                    <div className="h-32 rounded-lg border border-dashed border-black/20" />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
