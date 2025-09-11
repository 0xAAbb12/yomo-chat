"use client";
import { useEffect, useState } from "react";
import { LogOut, PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useUserDetail } from "~/hooks/useUserDetail";
import logoText from "~/assets/images/logo-text.png";
import Image from "next/image";
import { MessageSquareText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { useLogout } from "~/hooks/useLogout";
import { debounce } from "lodash";

export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { userDetail } = useUserDetail();
  const { logout } = useLogout();
  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < 1300) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col items-center p-2 transition-[width] duration-300 ease-out",
        isOpen ? "w-[240px]" : "w-[60px]",
      )}
    >
      <div className="mb-4 w-full">
        <div className="flex-center box-border flex h-[32px] w-full items-center justify-between">
          {isOpen && (
            <div className="text-color-text-primary-1 mr-auto shrink-0">
              <Image
                className="h-[26px] w-auto cursor-pointer object-cover"
                alt="Element"
                src={logoText}
                onClick={() => router.push("/")}
              />
            </div>
          )}
          <Button
            className="ml-2 h-7 w-7 shrink-0"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar h-0 w-full flex-1 overflow-x-hidden overflow-y-auto">
        <div className="relative box-border w-full">
          <div
            onClick={() => router.push("/chat")}
            className="f-i-center text-brand-black box-border flex h-[36px] w-full cursor-pointer items-center rounded-[10px] bg-white px-3 py-2 transition-colors"
          >
            <MessageSquareText className="h-[18px] w-[18px] shrink-0" />
            {isOpen && (
              <span className="font-brand-medium ml-2 text-sm leading-[18px]">
                Chat
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-[4px]">
        <div className="shrink-0">
          <div className="f-i-center mr-auto gap-[8px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="" aria-label="Open account menu">
                <Avatar className="ml-1 h-7 w-7 cursor-pointer rounded-full">
                  <AvatarImage src={userDetail?.avatarUrl} />
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                side="top"
                // sideOffset={12}
                // alignOffset={10}
                className="w-[215px] shrink-0 rounded-2xl border border-black/5 p-0 shadow-xl"
              >
                {/* Header */}
                <div className="p-2 pt-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userDetail?.avatarUrl} />
                      <AvatarFallback className="bg-[#e8eef7] font-medium text-[#0f172a]">
                        Y
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-base leading-none font-semibold">
                          {userDetail?.nickName || "User"}
                        </p>
                      </div>
                      <p className="mt-2 truncate text-[13px] text-slate-500">
                        {userDetail?.email || userDetail?.gmail}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-1" />

                <div className="px-2 py-1 pb-3">
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl py-1 text-[15px] text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
