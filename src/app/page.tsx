// "use client"

// import { useRouter } from 'next/router';
import AnimatedIllustration from "~/components/home/AnimatedIllustration";
import MainContent from "~/components/home/mian-content";
import ClientLayout from "~/components/layout/ClientLayout";
// import { SiteHeader } from "./chat/components/site-header";
// import { Jumbotron } from "./landing/components/jumbotron";
// import { Ray } from "./landing/components/ray";
// import { CaseStudySection } from "./landing/sections/case-study-section";
// import { CoreFeatureSection } from "./landing/sections/core-features-section";
// import { JoinCommunitySection } from "./landing/sections/join-community-section";
// import { MultiAgentSection } from "./landing/sections/multi-agent-section";

function HomePage() {
  // 扩展ID - 你需要替换成你的实际扩展ID
  // const EXTENSION_ID = 'ielagcbddhonmnhkhcledoemindgcmmm';

  // // 显示状态信息
  // const showStatus = (message: string, type: 'success' | 'error' | 'info') => {
  //   // 这里可以根据你的UI需求来实现状态显示
  //   if (type === 'error') {
  //     alert(message); // 临时使用alert，你可以替换成更好的UI组件
  //   } else {
  //     console.log(`${type}: ${message}`);
  //   }
  // };

  // // 处理打开插件侧边栏的函数
  // const handleOpenSidePanel = async () => {
  //   try {
  //     window.postMessage({ type: "OPEN_SIDEPANEL" }, "*");
  //     // console.log('开始处理打开侧边栏请求...');

  //   } catch (error) {
  //     console.error('打开扩展失败:', error);
  //     showStatus('打开扩展失败: ' + (error as Error).message, 'error');
  //   }
  // };

  return (
    <div className="flex flex-1 bg-white">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-between px-4 py-8 sm:px-8 lg:flex-row lg:px-[150px] lg:py-16">
        <MainContent />
        <div className="h-[300px] w-full lg:h-[400px]">
          <AnimatedIllustration />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ClientLayout>
      <HomePage />
    </ClientLayout>
  );
}
