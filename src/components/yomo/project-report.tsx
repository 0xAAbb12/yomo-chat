import { type ProjectData } from "~/modal/project";
import { useEffect, useMemo } from "react";
import { cn, numFormat } from "~/lib/utils";
import ChartContainer from "~/components/charts/ChartContainer";
import TvlTrendChart from "~/components/charts/TvlTrendChart";
import TvlDistributionChart from "~/components/charts/TvlDistributionChart";
import PriceChart from "~/components/charts/PriceChart";
import ChainLogo from "~/components/svg/Icons/ChainLogo";
// import { Card, CardContent } from "~/components/ui/card";

import DiscordIcon from "~/assets/images/search/Discord_icon.png";
import TelegramIcon from "~/assets/images/search/Telegram_icon.png";
import MediumIcon from "~/assets/images/search/Medium_icon.png";
import GithubIcon from "~/assets/images/search/Github_icon.png";
import WebsiteIcon from "~/assets/images/search/Website_icon.png";
import DocsIcon from "~/assets/images/search/Docs_icon.png";
import DAppIcon from "~/assets/images/search/DApp_icon.png";
import XIcon from "~/assets/images/search/X_icon.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { amountFormat } from "~/lib/format";

export const ProjectReport = ({ source }: { source: string | undefined }) => {
  const projectData = useMemo(() => {
    if (!source) return undefined;
    try {
      return JSON.parse(source) as ProjectData;
    } catch {
      return undefined;
    }
  }, [source]);
  const formatPercentage = (num: number) => {
    return num > 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`;
  };

  const bgColorMap: { [key: string]: string } = {
    "1": "border border-[#FDCCCC] hover:bg-[#FDCCCC]/40",
    "2": "border border-[#FCBCA3] hover:bg-[#FCBCA3]/40",
    "3": "border border-[#FDE5CC] hover:bg-[#FDE5CC]/40",
    "4": "border border-[#D0DDA7] hover:bg-[#D0DDA7]/40",
    "5": "border border-[#D1F1D0] hover:bg-[#D1F1D0]/40",
  };

  const textColorMap: { [key: string]: string } = {
    "1": "text-[#F60000]",
    "2": "text-[#EA461D]",
    "3": "text-[#F67C00]",
    "4": "text-[#6FDC2E]",
    "5": "text-[#1ABB15]",
  };

  const textMap: { [key: string]: string } = {
    "1": "Unknown",
    "2": "Noted",
    "3": "Credible",
    "4": "Supreme",
    "5": "Supreme",
  };

  const getCurBg = (level: string) => {
    return bgColorMap[level] || bgColorMap[1];
  };

  const getCurTextColor = (level: string) => {
    return textColorMap[level] || textColorMap[1];
  };

  const getCurText = (level: string) => {
    return textMap[level] || textMap[1];
  };

  return (
    <>
      {/* 项目详情 - 选择项目或直接搜索时显示 */}
      {projectData && (
        <>
          {/* 项目介绍部分 */}
          <div className="mb-6 px-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded bg-orange-500"></div>
              <div className="font-brand-medium text-xl">
                Project Introduction
              </div>
            </div>
            <div className="text-base leading-relaxed text-gray-700">
              {projectData?.project_info?.short_intro}
            </div>
            <div className="text-base leading-relaxed text-gray-700">
              {projectData?.project_info?.description}
            </div>
            {projectData?.project_info?.team_info &&
              Array.isArray(projectData.project_info.team_info) &&
              projectData.project_info.team_info.length > 0 && (
                <div className="text-base leading-relaxed text-gray-700">
                  <div className="mb-2 font-medium">Team Members:</div>
                  <div className="space-y-1">
                    {projectData.project_info.team_info.map(
                      (member: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-gray-500">-</span>
                          <span>{member.position}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            {projectData?.project_info?.sector_analysis && (
              <div className="text-base text-gray-700">
                {typeof projectData.project_info.sector_analysis === "string"
                  ? projectData.project_info.sector_analysis
                  : "Sector analysis available"}
              </div>
            )}
          </div>

          {/* 融资信息部分 */}
          {projectData?.fundraising_info && (
            <div className="mt-4 mb-6 px-4">
              {/* <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-orange-500 rounded"></div>
                <div className="text-xl font-brand-medium">
                  Financing Information
                </div>
              </div>
              <div className="mb-4 text-base leading-relaxed text-gray-700">
                {"--"}
              </div> */}
              {projectData?.fundraising_info?.investors &&
                Array.isArray(projectData.fundraising_info.investors) &&
                projectData.fundraising_info.investors.length > 0 && (
                  <>
                    <div className="font-brand-medium mb-4 text-lg">
                      Investment Institutions:
                    </div>
                    <div className="">
                      <div className="flex flex-wrap gap-2">
                        {projectData.fundraising_info.investors.map(
                          (investor: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 rounded-[8px] border border-gray-200 bg-gray-100 px-2 py-1"
                              title={investor.name}
                            >
                              {investor.logo && (
                                <img
                                  src={investor.logo}
                                  alt={investor.name}
                                  className="h-5 w-5 rounded-full object-cover"
                                  onError={(e) => {
                                    // 如果图片加载失败，隐藏图片元素
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              )}
                              <span className="text-base font-medium text-gray-700">
                                {investor.name}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}
            </div>
          )}

          {/* 项目数据部分 */}
          {(projectData?.social_media_stats || projectData?.on_chain_data) && (
            <div className="mb-6 px-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded bg-orange-500"></div>
                <div className="font-brand-medium text-xl">Project Data</div>
              </div>
              {/* <div className="mb-3 text-base text-gray-700">社区热度与媒体报道</div>
                <Card className="mb-4 bg-gray-100 border border-gray-200 h-36">
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <div className="text-base text-gray-500">投资机构列表</div>
                  </CardContent>
                </Card> */}
              <div className="mb-4 space-y-2 text-base">
                {projectData?.social_media_stats?.twitter && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">X (Twitter)</span>
                    <span className="text-black">
                      {numFormat(
                        projectData.social_media_stats.twitter.followers || 0,
                      )}{" "}
                      {projectData.social_media_stats.twitter
                        ?.followers_7d_increment && (
                        <span className="text-green-500">
                          (
                          {formatPercentage(
                            projectData.social_media_stats.twitter
                              .followers_7d_increment || 0,
                          )}
                          /7d)
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {projectData?.social_media_stats?.telegram && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Telegram</span>
                    <span className="text-black">
                      {numFormat(
                        projectData.social_media_stats.telegram.members || 0,
                      )}{" "}
                      <span className="text-green-500">
                        (
                        {formatPercentage(
                          projectData.social_media_stats.telegram
                            .members_7d_increment || 0,
                        )}
                        /7d)
                      </span>
                    </span>
                  </div>
                )}
                {projectData?.social_media_stats?.discord && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Discord</span>
                    <span className="text-black">
                      {numFormat(
                        projectData.social_media_stats.discord.members || 0,
                      )}{" "}
                      <span className="text-green-500">
                        (
                        {formatPercentage(
                          projectData.social_media_stats.discord
                            .members_7d_increase || 0,
                        )}
                        /7d)
                      </span>
                    </span>
                  </div>
                )}
                {projectData?.social_media_stats?.twitter?.mentions && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Twitter mentions</span>
                    <span className="text-black">
                      {numFormat(
                        projectData.social_media_stats.twitter.mentions || 0,
                      )}{" "}
                      {projectData.social_media_stats.twitter
                        .mentions_7d_increment && (
                        <span className="text-green-500">
                          (
                          {formatPercentage(
                            projectData.social_media_stats.twitter
                              .mentions_7d_increment || 0,
                          )}
                          /7d)
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {/* {projectData?.social_media_stats?.twitter?.sentiment && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">社区情感</span>
                      <span className="text-black">
                        😀 {projectData.social_media_stats.twitter.sentiment[0]}% 😡{" "}
                        {projectData.social_media_stats.twitter.sentiment[2]}% 😐{" "}
                        {projectData.social_media_stats.twitter.sentiment[1]}%
                      </span>
                    </div>
                  )} */}
                {projectData?.social_media_stats?.media_mentions &&
                  Array.isArray(
                    projectData.social_media_stats.media_mentions,
                  ) &&
                  projectData.social_media_stats.media_mentions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-base font-medium text-gray-700">
                        Media Coverage
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {projectData.social_media_stats.media_mentions.map(
                          (item: any, index: number) => {
                            // 安全检查：确保item是字符串或对象
                            if (typeof item === "string") {
                              // 处理字符串URL
                              const domain = item
                                .replace(/^https?:\/\//, "")
                                .replace(/^www\./, "")
                                .split("/")[0];
                              const displayName = domain?.split(".")[0]; // 取主域名部分

                              return (
                                <a
                                  key={index}
                                  href={item}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block cursor-pointer rounded-full bg-blue-100 px-3 py-1 text-base text-blue-700 transition-colors hover:bg-blue-200"
                                  title={item}
                                >
                                  {displayName}
                                </a>
                              );
                            } else if (
                              typeof item === "object" &&
                              item !== null
                            ) {
                              // 处理对象，提取name或title属性
                              const displayName =
                                item.name ||
                                item.title ||
                                item.displayName ||
                                "Unknown";
                              const url = item.url || item.link || "#";

                              return (
                                <a
                                  key={index}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block cursor-pointer rounded-full bg-blue-100 px-3 py-1 text-base text-blue-700 transition-colors hover:bg-blue-200"
                                  title={displayName}
                                >
                                  {displayName}
                                </a>
                              );
                            }

                            // 如果既不是字符串也不是对象，跳过渲染
                            return null;
                          },
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* 链上数据部分 */}
              {projectData?.on_chain_data && (
                <div className="mb-4 space-y-2 text-base">
                  {projectData.on_chain_data.tvl && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Total Value Locked (TVL)
                      </span>
                      <span className="font-medium text-black">
                        ${numFormat(projectData.on_chain_data.tvl)}
                        {projectData.on_chain_data.tvl_7d_increment && (
                          <span
                            className={`ml-1 ${
                              projectData.on_chain_data.tvl_7d_increment >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            (
                            {projectData.on_chain_data.tvl_7d_increment >= 0
                              ? "+"
                              : ""}
                            {projectData.on_chain_data.tvl_7d_increment}%/7d)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.tvl_peak && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">TVL Peak</span>
                      <span className="text-black">
                        ${numFormat(projectData.on_chain_data.tvl_peak)}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.tvl_trend &&
                    projectData.on_chain_data.tvl_trend.length > 0 && (
                      <div className="mb-4">
                        <div className="mb-2 text-base font-medium text-gray-700">
                          TVL Trend (7D)
                        </div>
                        <ChartContainer>
                          <TvlTrendChart
                            data={projectData.on_chain_data.tvl_trend}
                            height={144}
                          />
                        </ChartContainer>
                      </div>
                    )}
                  {projectData.on_chain_data.tvl_distribution &&
                    projectData.on_chain_data.tvl_distribution.length > 0 && (
                      <div className="mb-4">
                        <div className="mb-2 text-base font-medium text-gray-700">
                          TVL Distribution
                        </div>
                        <ChartContainer>
                          <TvlDistributionChart
                            data={projectData.on_chain_data.tvl_distribution}
                            height={200}
                          />
                        </ChartContainer>
                      </div>
                    )}
                  {projectData.on_chain_data.active_addresses_7d && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Active Addresses (7D)
                      </span>
                      <span className="text-black">
                        {numFormat(
                          projectData.on_chain_data.active_addresses_7d,
                        )}
                        {projectData.on_chain_data
                          .active_addresses_7d_change && (
                          <span
                            className={`ml-1 ${
                              projectData.on_chain_data
                                .active_addresses_7d_change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            (
                            {projectData.on_chain_data
                              .active_addresses_7d_change > 0
                              ? "+"
                              : ""}
                            {
                              projectData.on_chain_data
                                .active_addresses_7d_change
                            }
                            %)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.contract_interactions_7d && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Contract Interactions (7D)
                      </span>
                      <span className="text-black">
                        {numFormat(
                          projectData.on_chain_data.contract_interactions_7d,
                        )}
                        {projectData.on_chain_data
                          .contract_interactions_7d_change && (
                          <span
                            className={`ml-1 ${
                              projectData.on_chain_data
                                .contract_interactions_7d_change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            (
                            {projectData.on_chain_data
                              .contract_interactions_7d_change > 0
                              ? "+"
                              : ""}
                            {
                              projectData.on_chain_data
                                .contract_interactions_7d_change
                            }
                            %)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.contract_interactions_30d && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Contract Interactions (30D)
                      </span>
                      <span className="text-black">
                        {numFormat(
                          projectData.on_chain_data.contract_interactions_30d,
                        )}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.txns_30d && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Transactions (30D)</span>
                      <span className="text-black">
                        {numFormat(projectData.on_chain_data.txns_30d)}
                      </span>
                    </div>
                  )}
                  {projectData.on_chain_data.protocol_revenue_30d && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Protocol Revenue (30D)
                      </span>
                      <span className="text-black">
                        $
                        {numFormat(
                          projectData.on_chain_data.protocol_revenue_30d,
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* <div className="grid grid-cols-1 gap-4 mb-2">
                  <Card className="bg-gray-100 border border-gray-200 h-36">
                    <CardContent className="flex items-center justify-center h-full p-0">
                      <div className="text-base text-gray-500">
                        TVL 和 协议交互地址数据折现图
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-100 border border-gray-200 h-36">
                    <CardContent className="flex items-center justify-center h-full p-0">
                      <div className="text-base text-gray-500">TVL 分布饼图</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-base text-right text-gray-500">
                  update date: {new Date().toLocaleString()}
                </div> */}
            </div>
          )}
          {/* twitter heatmap */}
          {projectData?.social_media_stats?.twitter?.heatmap &&
            projectData?.social_media_stats?.twitter?.heatmap?.length > 0 && (
              <div className="mx-auto mb-6 max-w-[960px] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-5 w-1 rounded bg-orange-500"></div>
                  <div className="font-brand-medium text-xl">Twitter Score</div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
                  {projectData?.social_media_stats?.twitter?.heatmap.map(
                    (item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex h-[80px] cursor-pointer flex-col rounded-[8px] p-[6px]",
                            getCurBg(item?.level || "1"),
                          )}
                        >
                          <div className="flex items-center">
                            <span className="text-brand-gray1 min-w-0 truncate text-sm">
                              {item?.username}
                            </span>
                            {/* <span className="ml-2">
                              {numFormat(item?.followers || 0, 2)}
                            </span> */}
                          </div>
                          <div className="mt-1 flex items-center justify-end">
                            <span className="font-brand-medium">
                              {amountFormat(item?.score || 0, 0)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <span className="text-brand-gray1 text-sm">
                                Level:
                              </span>{" "}
                              <span
                                className={cn(
                                  "ml-1 text-sm font-brand-medium",
                                  getCurTextColor(item?.level || "1"),
                                )}
                              >
                                {item?.level}.{getCurText(item?.level || "1")}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          {/* 市场数据部分 */}
          {projectData?.market_data && (
            <div className="mb-6 px-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded bg-orange-500"></div>
                <div className="font-brand-medium text-xl">Markets</div>
              </div>
              {projectData?.market_data?.kline_30d &&
                projectData.market_data.kline_30d.length > 0 && (
                  <div className="mb-6 pt-2 pb-2">
                    <ChartContainer title="30 days price trend">
                      <PriceChart
                        height={144}
                        symbol={projectData?.tokenomics?.token_symbol || ""}
                        useApi={false}
                        klineData={projectData.market_data.kline_30d}
                      />
                    </ChartContainer>
                  </div>
                )}
              <div className="mb-4 space-y-2 text-base">
                {projectData.market_data?.token_price && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Token Price</span>
                    <span className="text-black">
                      ${projectData.market_data?.token_price}{" "}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Trading Volume (24H)</span>
                  <span className="text-black">
                    $
                    {numFormat(
                      projectData.market_data?.trading_volume_24h || 0,
                    )}{" "}
                    <span
                      className={`${
                        (projectData.market_data?.trading_volume_change_24h ||
                          0) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {(projectData.market_data?.trading_volume_change_24h ||
                        0) >= 0
                        ? "+"
                        : ""}
                      {(
                        projectData.market_data?.trading_volume_change_24h || 0
                      ).toFixed(2)}
                      %
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Circulating Market Cap</span>
                  <span className="text-black">
                    $
                    {numFormat(
                      projectData.market_data.circulating_market_cap || 0,
                    )}{" "}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Fully Diluted Valuation</span>
                  <span className="text-black">
                    $
                    {numFormat(
                      projectData.market_data.fully_diluted_valuation || 0,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Support Exchanges</span>
                  <div className="ml-2 flex-1 overflow-hidden">
                    <div className="scrollbar-hide flex gap-1 overflow-x-auto">
                      <div className="ml-auto flex flex-wrap justify-end gap-1">
                        {(projectData.market_data?.support_exchanges &&
                          projectData.market_data?.support_exchanges
                            ?.slice(0, 10)
                            ?.map((exchange: any, index: number) => {
                              // 安全检查：确保exchange是对象且包含必要属性
                              if (
                                typeof exchange === "object" &&
                                exchange !== null &&
                                exchange.name
                              ) {
                                return (
                                  <div
                                    key={index}
                                    className="flex h-9 items-center justify-center"
                                    title={exchange.name}
                                  >
                                    {/* <Avatar className="h-full rounded-full object-cover">
                                    <AvatarImage src={exchange.logo} />
                                    <AvatarFallback className="bg-[#e8eef7] font-medium text-[#0f172a]">
                                      
                                    </AvatarFallback>
                                  </Avatar> */}
                                    <div className="flex items-center gap-1 rounded-[8px] border border-gray-200 bg-gray-100 px-2 py-1">
                                      {exchange.name}
                                    </div>
                                    {/* <img
                                    src={exchange.logo || ""}
                                    alt={exchange.name}
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                      // 如果图片加载失败，隐藏图片元素
                                      e.currentTarget.style.display = "none";
                                    }}
                                  /> */}
                                  </div>
                                );
                              }
                              return null;
                            })) || (
                          <div className="h-3 w-3 flex-shrink-0 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 代币经济学部分 */}
          {projectData?.tokenomics && (
            <div className="mb-6 px-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded bg-orange-500"></div>
                <div className="font-brand-medium text-xl">Tokenomics</div>
              </div>

              <div className="mb-4 space-y-2 text-base">
                <div className="flex justify-between">
                  <span className="text-gray-700">Token Symbol</span>
                  <span className="font-medium text-black">
                    {projectData?.tokenomics?.token_symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Circulating Supply</span>
                  <span className="text-black">
                    {numFormat(
                      projectData?.tokenomics?.circulating_supply || 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Supply</span>
                  <span className="text-black">
                    {numFormat(projectData?.tokenomics?.total_supply || 0)}
                  </span>
                </div>
                {projectData?.tokenomics?.support_chains &&
                  projectData.tokenomics.support_chains.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Support Chains</span>
                      <div className="ml-2 flex-1 overflow-hidden">
                        <div className="scrollbar-hide flex justify-end gap-1 overflow-x-auto">
                          {projectData.tokenomics.support_chains.map(
                            (chain: any, index: number) => {
                              // 安全检查：确保chain是有效的字符串或对象
                              if (
                                chain &&
                                (typeof chain === "string" ||
                                  typeof chain === "object")
                              ) {
                                return (
                                  <div key={index} className="flex-shrink-0">
                                    <ChainLogo
                                      chain={chain.contract_platform}
                                      size={18}
                                    />
                                  </div>
                                );
                              }
                              return null;
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                <div className="flex justify-between">
                  <span className="text-gray-700">Referral Docs</span>
                  <a
                    href={projectData?.tokenomics?.referral_docs?.[0] ?? "/"}
                    target="_blank"
                  >
                    <span className="cursor-pointer text-blue-600 underline">
                      {projectData?.tokenomics?.token_symbol} Tokenomics
                    </span>
                  </a>
                </div>
              </div>

              {/* 检查是否有distribution数据 */}
              {(() => {
                return (
                  <>
                    <div className="font-brand-medium mb-2 text-lg">
                      Distribution Overview
                    </div>
                    <div className="mb-2 rounded-lg border border-gray-200 bg-white p-3">
                      <div className="mb-4 space-y-2 text-base">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <span className="text-gray-600">Token Symbol:</span>
                          <span className="font-semibold text-gray-800">
                            {projectData?.tokenomics?.token_symbol || "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <span className="text-gray-600">
                            Token Total Supply:
                          </span>
                          <span className="font-semibold text-gray-800">
                            {projectData?.tokenomics?.total_supply
                              ? numFormat(
                                  projectData?.tokenomics?.total_supply || 0,
                                )
                              : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            Initial Circulating Supply:
                          </span>
                          <span className="text-right font-semibold text-gray-800">
                            {projectData?.tokenomics?.circulating_supply
                              ? `${numFormat(
                                  projectData?.tokenomics?.circulating_supply ||
                                    0,
                                )} `
                              : "-"}
                            {/* (${(
                                  ((projectData?.tokenomics
                                    ?.circulating_supply || 0) /
                                    (projectData?.tokenomics?.total_supply ||
                                      1)) *
                                  100
                                ).toFixed(2)}%) */}
                          </span>
                        </div>
                      </div>

                      {/* <div className="space-y-2">
                        <div className="pb-2 text-base border-b border-gray-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">
                              Community & Launch
                            </div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.community_launch?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.community_launch.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details
                              ?.community_launch?.vesting || "-"}
                          </div>
                        </div>

                        <div className="pb-2 text-base border-b border-gray-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">
                              Ecosystem Growth
                            </div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.ecosystem_growth?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.ecosystem_growth.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details
                              ?.ecosystem_growth?.vesting || "-"}
                          </div>
                        </div>

                        <div className="pb-2 text-base border-b border-gray-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">DAO Treasury</div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.dao_treasury?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.dao_treasury.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details
                              ?.dao_treasury?.vesting || "-"}
                          </div>
                        </div>

                        <div className="pb-2 text-base border-b border-gray-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">Investors</div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.investors?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.investors.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details
                              ?.investors?.vesting || "-"}
                          </div>
                        </div>

                        <div className="pb-2 text-base border-b border-gray-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">Public Sale</div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.public_sale?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.public_sale.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details
                              ?.public_sale?.vesting || "-"}
                          </div>
                        </div>

                        <div className="pb-2 text-base">
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-gray-600">Team</div>
                            <div className="font-semibold text-gray-800">
                              {projectData?.tokenomics?.distribution_details
                                ?.team?.percentage
                                ? `${projectData?.tokenomics?.distribution_details.team.percentage}%`
                                : "-"}
                            </div>
                          </div>
                          <div className="text-base text-gray-500">
                            {projectData?.tokenomics?.distribution_details?.team
                              ?.vesting || "-"}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          {/* 项目链接部分 */}
          {(() => {
            const allPlatforms = [
              {
                name: "Discord",
                url: projectData?.social_media_links?.discord,
                icon: DiscordIcon,
              },
              {
                name: "Telegram",
                url: projectData?.social_media_links?.telegram,
                icon: TelegramIcon,
              },
              {
                name: "Medium",
                url: projectData?.social_media_links?.medium,
                icon: MediumIcon,
              },
              {
                name: "Github",
                url: projectData?.social_media_links?.github,
                icon: GithubIcon,
              },
              {
                name: "Website",
                url: projectData?.social_media_links?.website,
                icon: WebsiteIcon,
              },
              {
                name: "Docs",
                url: projectData?.social_media_links?.defliama,
                icon: DocsIcon,
              },
              {
                name: "dApp",
                url: projectData?.social_media_links?.website,
                icon: DAppIcon,
              },
              {
                name: "X(Twitter)",
                url: projectData?.social_media_links?.twitter,
                icon: XIcon,
              },
            ];

            const availablePlatforms = allPlatforms.filter(
              (platform) => platform.url,
            );

            if (availablePlatforms.length === 0) return null;

            return (
              <div className="mb-6 px-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-5 w-1 rounded bg-orange-500"></div>
                  <div className="font-brand-medium text-xl">Project Links</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((platform: any, index: number) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-1 rounded-[8px] border border-gray-200 px-2 py-1 hover:bg-gray-100"
                      title={platform.name}
                      onClick={() =>
                        platform.url && window.open(platform.url, "_blank")
                      }
                    >
                      {platform.icon && (
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="h-5 w-5 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <span className="text-base font-medium">
                        {platform.name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-4 gap-3">
                  {availablePlatforms.map((platform) => (
                    <Card
                      key={platform.name}
                      className="transition-colors bg-white border border-gray-200 cursor-pointer aspect-square hover:bg-gray-200"
                      onClick={() =>
                        platform.url && window.open(platform.url, "_blank")
                      }
                    >
                      <CardContent className="flex flex-col items-center justify-center h-full gap-1 p-0">
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="object-contain w-6 h-6"
                        />
                        <div className="text-base font-medium text-center text-gray-700">
                          {platform.name}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div> */}
              </div>
            );
          })()}
          {/* 融资信息部分 */}
          {projectData?.fundraising_info?.round_info &&
            projectData.fundraising_info.round_info.length > 0 && (
              <div className="mb-4 px-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-5 w-1 rounded bg-orange-500"></div>
                  <div className="font-brand-medium text-xl">
                    Funding Rounds
                  </div>
                </div>
                <div className="space-y-2">
                  {projectData.fundraising_info.round_info.map(
                    (round: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-base font-medium text-gray-900">
                            {round.round}
                          </div>
                          <div className="text-base text-gray-500">
                            {new Date(round.date * 1000).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </div>
                        <div className="text-base font-semibold text-green-600">
                          ${numFormat(round.amount, 2)}
                        </div>
                      </div>
                    ),
                  )}
                  {projectData?.fundraising_info?.total_raised && (
                    <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-2">
                      <div className="text-base font-medium text-gray-900">
                        Total Raised
                      </div>
                      <div className="text-base font-bold text-green-700">
                        $
                        {numFormat(
                          projectData.fundraising_info?.total_raised || 0,
                          2,
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* 项目总结标题部分 */}
          {/* <div className="px-4 mt-4 mb-3">
            <div className="flex items-center gap-2 ">
              <div className="w-1 h-5 bg-orange-500 rounded"></div>
              <div className="text-xl font-brand-medium">Project Summary</div>
            </div>
          </div> */}

          {/* 总结内容部分 */}
          {/* <div className="px-4 mb-6">
            <div className="text-base leading-relaxed text-gray-700">--</div>
          </div> */}
        </>
      )}
    </>
  );
};
