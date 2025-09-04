
// import { GlobeIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import Image from "next/image"
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { LanguageSwitcher } from "../yomo/language-switcher"
import { useRouter } from "next/navigation";
import { useRootStore } from "~/store"
// import { useLanguage } from "~/hooks/useLanguage"
// import { languages, translations, getLanguageConfig } from "~/lib/i18n"

export default function Header() {
  const router = useRouter();
  const { token, setLoginModalOpen } = useRootStore();
  // const { currentLanguage, changeLanguage } = useLanguage();
  // const currentLangConfig = getLanguageConfig(currentLanguage);
  
  return (
    <header className="w-full h-[72px] bg-[rgba(255,255,255,0.40)] backdrop-blur-[4px] flex items-center justify-between px-4 lg:px-8">
      <Image
        className="w-[100px] h-7 lg:w-[131px] lg:h-9 object-cover"
        alt="Element"
        src="https://c.animaapp.com/metnv0a3g2xoEl/img/---7-4x.png"
        width={131}
        height={36}
      />

      <div className="flex items-center gap-3 lg:gap-6">
        <LanguageSwitcher />
        {token ? 
          <Button
            className="w-[80px] lg:w-[98px] h-[30px] bg-gradient-yomo hover:opacity-70 rounded-[30px] transition-colors"
            onClick={() => router.push("/chat")}
          >
            <span className="font-arboria-medium text-[#14163F] text-xs lg:text-sm tracking-[0] leading-[normal]">
              {/* {translations[currentLanguage].getStarted} */}
              Get Started
            </span>
          </Button>
         : <Button
            className="w-[80px] lg:w-[98px] h-[30px] bg-gradient-yomo hover:opacity-70 rounded-[30px] transition-colors"
            onClick={() => setLoginModalOpen(true)}
          >
            <span className="font-arboria-medium text-[#14163F] text-xs lg:text-sm tracking-[0] leading-[normal]">
              Login
            </span>
          </Button>
        }
      </div>
    </header>
  )
} 