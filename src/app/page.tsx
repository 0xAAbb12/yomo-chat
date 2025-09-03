import AnimatedIllustration from '~/components/home/AnimatedIllustration';
import ClientLayout from '~/components/layout/ClientLayout';
// import { SiteHeader } from "./chat/components/site-header";
// import { Jumbotron } from "./landing/components/jumbotron";
// import { Ray } from "./landing/components/ray";
// import { CaseStudySection } from "./landing/sections/case-study-section";
// import { CoreFeatureSection } from "./landing/sections/core-features-section";
// import { JoinCommunitySection } from "./landing/sections/join-community-section";
// import { MultiAgentSection } from "./landing/sections/multi-agent-section";
import { Button } from '~/components/ui/button';

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
    <div className="flex-1 bg-white flex">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-[150px] py-8 lg:py-16">
        <section className="flex flex-col max-w-full lg:max-w-[626px] text-center lg:text-left">
          <h1 className="translate-y-[-1rem] animate-fade-in [--animation-delay:0ms] font-arboria-medium text-[#14163F] text-xl sm:text-2xl lg:text-[30px] tracking-[0] leading-[normal] mb-6 lg:mb-8">
            Hi, I&apos;m Yomo
          </h1>

          <h2 className="translate-y-[-1rem] animate-fade-in [--animation-delay:200ms] font-arboria-bold font-weight-[400] text-[#14163F] text-2xl sm:text-3xl lg:text-[55px] tracking-[0] leading-[normal] mb-4 lg:mb-4">
            Your Web3 Navigator
          </h2>

          <p className="translate-y-[-1rem] animate-fade-in [--animation-delay:400ms] font-arboria-bold font-weight-[400] text-[#14163F] text-lg sm:text-xl lg:text-[22px] tracking-[0] leading-[normal] mb-12 lg:mb-[35px]">
            Smart, simple, and always curious.
          </p>

          <p className="translate-y-[-1rem] animate-fade-in [--animation-delay:600ms] w-full lg:w-[476px] font-arboria-book font-weight-[400] text-[#666272] text-sm sm:text-[16px] tracking-[0] leading-[normal] mb-12 lg:mb-[62px]">
            Yomo is an AI agent that helps you explore Web3 with clarity—turning
            chaos and scattered info into a single, clear view. From on-chain
            data to hidden gems, Yomo connects the dots so you can discover,
            decide, and act in minutes.
          </p>

          <div className="translate-y-[-1rem] animate-fade-in [--animation-delay:800ms] flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Button 
              // onClick={handleOpenSidePanel}
              className="w-full sm:w-[150px] h-[46px] bg-gradient-yomo hover:opacity-70 rounded-[222px] transition-all duration-300 cursor-pointer"
            >
              <span className="font-arboria-medium text-[#14163F] text-base tracking-[0] leading-[normal]">
                Try Yomo
              </span>
            </Button>

            <Button className="w-full sm:w-60 h-[46px] bg-[#e9e9e9] hover:bg-[#d9d9d9] rounded-[222px] transition-colors cursor-pointer">
              <span className="font-arboria-medium text-[#14163F] text-base tracking-[0] leading-[normal]">
                Install Chrome Plugin
              </span>
            </Button>
          </div>
        </section>

        <div className="w-full h-[300px] lg:h-[400px]">
          <AnimatedIllustration />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return <ClientLayout><HomePage /></ClientLayout>
}
