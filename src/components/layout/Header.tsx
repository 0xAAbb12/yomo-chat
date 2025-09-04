// import { GlobeIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "~/components/ui/button";
import Image from "next/image";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { LanguageSwitcher } from "../yomo/language-switcher";
import { useRouter } from "next/navigation";
import { useRootStore } from "~/store";
// import { useLanguage } from "~/hooks/useLanguage"
// import { languages, translations, getLanguageConfig } from "~/lib/i18n"

import logoText from "~/assets/images/logo-text.png";

export default function Header() {
  const router = useRouter();
  const { token, setLoginModalOpen } = useRootStore();
  // const { currentLanguage, changeLanguage } = useLanguage();
  // const currentLangConfig = getLanguageConfig(currentLanguage);

  return (
    <header className="flex h-[72px] w-full items-center justify-between bg-[rgba(255,255,255,0.40)] px-4 backdrop-blur-[4px] lg:px-8">
      <Image
        className="h-7 w-auto object-cover lg:h-9"
        alt="Element"
        src={logoText}
      />

      <div className="flex items-center gap-3 lg:gap-6">
        <LanguageSwitcher />
        {token ? (
          <Button
            className="bg-gradient-yomo h-[30px] w-[80px] rounded-[30px] transition-colors hover:opacity-70 lg:w-[98px]"
            onClick={() => router.push("/chat")}
          >
            <span className="font-arboria-medium text-xs leading-[normal] tracking-[0] text-[#14163F] lg:text-sm">
              {/* {translations[currentLanguage].getStarted} */}
              Get Started
            </span>
          </Button>
        ) : (
          <Button
            className="bg-gradient-yomo h-[30px] w-[80px] rounded-[30px] transition-colors hover:opacity-70 lg:w-[98px]"
            onClick={() => setLoginModalOpen(true)}
          >
            <span className="font-arboria-medium text-xs leading-[normal] tracking-[0] text-[#14163F] lg:text-sm">
              Login
            </span>
          </Button>
        )}
      </div>
    </header>
  );
}
