"use client";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
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
    <Card className="h-auto w-full overflow-hidden rounded-2xl border bg-white p-4 text-black md:h-[260px]">
      <div className="grid h-full grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[30px]">
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
        </div>

        {/* ===== Right ===== */}
        <div className="flex h-full min-h-0 flex-col justify-between">
          {/* 社交按钮：小尺寸，防止撑高 */}
          <nav className="flex flex-wrap justify-start gap-2 px-3 md:justify-end">
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
        </div>
      </div>
      {/* 两列：左右 50% + 间距 30px */}
      <div className="grid h-full grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[30px]">
        {/* ===== Left ===== */}
        <div className="flex h-full min-h-0 flex-col">
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
