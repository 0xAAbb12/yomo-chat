// "use client"

import AnimatedIllustration from "~/components/home/AnimatedIllustration";
import MainContent from "~/components/home/mian-content";
import ClientLayout from "~/components/layout/ClientLayout";

function HomePage() {

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
