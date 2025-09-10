"use client";

import { Button } from '~/components/ui/button';
import { useRootStore } from '~/store';
import { useRouter } from "next/navigation";
const MainContent = () => {
    const { token, setLoginModalOpen } = useRootStore();
    const router = useRouter();

    return (
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
                    onClick={() => {
                        if (token) {
                            router.push("/chat")
                        } else {
                            setLoginModalOpen(true);
                        }
                    }
                    }
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
    );
};

export default MainContent;