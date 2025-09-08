"use client";

import { Globe2, Gamepad2, X as XIcon, TrendingUp, Circle } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import ChartContainer from "~/components/charts/ChartContainer";
import PriceChart from "~/components/charts/PriceChart";
import { amountFormat } from "~/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMemo } from "react";
import { numFormat } from "~/lib/utils";

export default function PellNetworkCard({ projectData }: { projectData: any }) {
  const socialLinks = useMemo(() => {
    return [
      { label: "Website", url: projectData?.social_media_links?.website || "" },
      { label: "Twitter", url: projectData?.social_media_links?.twitter || "" },
      {
        label: "Defillama",
        url: projectData?.social_media_links?.defliama || "",
      },
      {
        label: "Telegram",
        url: projectData?.social_media_links?.telegram || "",
      },
      { label: "Discord", url: projectData?.social_media_links?.discord || "" },
    ];
  }, [projectData]);
  return (
    <Card className="h-[260px] w-full overflow-hidden rounded-2xl border bg-white p-4 text-black">
      {/* 两列：左右 50% + 间距 30px */}
      <div className="grid h-full grid-cols-2 gap-[30px]">
        {/* ===== Left ===== */}
        <div className="flex h-full min-h-0 flex-col">
          {/* 顶部：Logo/标题/社交 —— 收缩区 */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-[20px] bg-black/5">
              <Avatar className="bg-brand-primary h-14 w-14">
                <AvatarImage src={projectData?.project_info?.logo} />
                <AvatarFallback className="bg-brand-primary text-white">
                  {projectData?.project_info?.name?.charAt(0) || "Y"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-[28px] leading-[32px] font-bold">
                {projectData?.project_info?.name}
              </div>
            </div>
          </div>

          {/* 简介 —— 可占剩余空间，最多 2 行，避免撑高 */}
          <p className="mt-3 line-clamp-3 min-h-0 text-[15px] leading-6 text-balance text-black/70">
            {projectData?.project_info?.description}
          </p>

          {/* 底部指标 —— 收缩区 */}
          <div className="mt-auto grid shrink-0 grid-cols-3 gap-4 pt-2 text-black/70">
            <div className="space-y-0.5">
              <div className="text-xs text-black/60">Funding</div>
              <div className="text-xl leading-6 font-semibold tracking-tight">
                $
                {numFormat(projectData?.fundraising_info?.total_raised || 0, 2)}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs text-black/60">X(Twitter)</div>
              <div className="text-xl leading-6 font-semibold tracking-tight">
                {numFormat(
                  projectData?.social_media_stats?.twitter?.followers || 0,
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Right ===== */}
        <div className="flex h-full min-h-0 flex-col justify-between">
          {/* 社交按钮：小尺寸，防止撑高 */}
          <nav className="flex justify-end gap-2 px-3">
            {socialLinks.map((link, index) => (
              <div key={index}>
                {link.url && (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-brand-black h-6 w-[70px] cursor-pointer justify-center rounded-[22px] bg-[#E9E9E9] text-xs font-normal hover:opacity-80"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </Badge>
                )}
              </div>
            ))}
          </nav>
          {/* <div className="flex shrink-0 items-center justify-end gap-2">
            <GhostPill icon={<Globe2 className="h-4 w-4" />} label="Web" />
            <GhostPill
              icon={<Gamepad2 className="h-4 w-4" />}
              label="Discord"
            />
            <GhostPill
              icon={<XIcon className="h-4 w-4" />}
              label="@pell_network"
            />
          </div> */}
          <div>
            {/* 右上信息 —— 收缩区 */}
            <div className="mb-1 flex shrink-0 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-black/5">
                  <Avatar className="bg-brand-primary h-7 w-7">
                    <AvatarImage src={projectData?.project_info?.logo} />
                    <AvatarFallback className="bg-brand-primary text-white">
                      {projectData?.project_info?.name?.charAt(0) || "Y"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-[17px] font-semibold">
                  {projectData?.tokenomics?.token_symbol || ""}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[22px] leading-none font-bold">
                  {amountFormat(
                    projectData?.market_data?.token_price || "0",
                    8,
                  )}
                </div>
                <Badge className="gap-1 border-0 bg-emerald-500/15">
                  <span
                    className={`ml-1 ${
                      projectData?.market_data?.token_price_change_24h &&
                      projectData?.market_data?.token_price_change_24h >= 0
                        ? "text-brand-green"
                        : "text-brand-red"
                    }`}
                  >
                    (
                    {projectData?.market_data?.token_price_change_24h &&
                    projectData?.market_data?.token_price_change_24h >= 0
                      ? "+"
                      : ""}
                    {projectData?.market_data?.token_price_change_24h?.toFixed(
                      2,
                    ) || "--"}
                    %)
                  </span>
                </Badge>
              </div>
            </div>

            {/* 图表容器 —— 吃满剩余高度，不溢出 */}
            <div className="h-[130px] min-h-0 rounded-xl p-2">
              {/* <ChartContainer title="30 days price trend"> */}
                {projectData?.market_data?.kline_30d && (
                  <PriceChart
                    height={130}
                    symbol={projectData?.tokenomics?.token_symbol || ""}
                    useApi={false}
                    klineData={projectData?.market_data?.kline_30d}
                  />
                )}
              {/* </ChartContainer> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ===== 小组件 ===== */

function GhostPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className="h-9 shrink-0 gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 text-sm text-black/80 hover:bg-black/10"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <div className="text-xs text-black/60">{label}</div>
      <div className="text-xl leading-6 font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}

function PriceSparkline() {
  return (
    <svg viewBox="0 0 600 150" className="h-full w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 填充区域 */}
      <path
        d="M0,110 L20,120 45,90 70,98 95,80 120,85 150,70 180,105 210,95 240,110 270,90 300,120 330,115 360,95 390,100 420,80 450,85 480,70 510,75 540,105 570,98 600,110 L600,150 L0,150 Z"
        fill="url(#g)"
      />
      {/* 折线 */}
      <path
        d="M0,110 L20,120 45,90 70,98 95,80 120,85 150,70 180,105 210,95 240,110 270,90 300,120 330,115 360,95 390,100 420,80 450,85 480,70 510,75 540,105 570,98 600,110"
        className="stroke-[3]"
        stroke="#22c55e"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
