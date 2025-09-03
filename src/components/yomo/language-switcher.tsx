

"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal
} from "~/components/ui/dropdown-menu";
import { GlobeIcon, ChevronDownIcon } from "lucide-react"

type LanguageOption = {
  code: string;
  name: string;
  flag: string;
};

const languages: Array<LanguageOption> = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) ??
    (languages[0] as LanguageOption);

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      console.log(`updateing locale to ${newLocale}`)
      // Set locale in cookie
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`;
      // Reload the page to apply the new locale
      window.location.reload();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button disabled={isPending} className="hidden sm:flex text-[#000] items-center gap-2 hover:bg-white/20 rounded-lg px-2 py-1 transition-colors">
          {/* <span className="mr-2">{currentLanguage.flag}</span> */}
          <GlobeIcon className="w-[17px] h-[17px]" />
          {/* {currentLanguage.name} */}
          <span className="font-arboria-book text-black text-sm tracking-[0] leading-[normal]">
            {currentLanguage.name}
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end" className="min-w-[120px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                locale === language.code 
                  ? 'bg-orange-50 text-orange-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="mr-2">{language.flag}</span>
              <span className="font-arboria-book">{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
