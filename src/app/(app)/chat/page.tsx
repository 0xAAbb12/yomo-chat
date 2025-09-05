"use client";

// import { GithubOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import { Suspense } from "react";

// import { Button } from "~/components/ui/button";

// import { Logo } from "../../components/yomo/logo";
// import { ThemeToggle } from "../../components/yomo/theme-toggle";
// import { Tooltip } from "../../components/yomo/tooltip";
// import { SettingsDialog } from "../settings/dialogs/settings-dialog";

const Main = dynamic(() => import("./main"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      Loading Yomo...
    </div>
  ),
});

export default function HomePage() {
  // const t = useTranslations("chat.page");

  return (
    <div className="flex justify-center w-full h-full relative">
      {/* <header className="fixed top-0 left-0 flex h-12 w-full items-center justify-between px-4">
        <Logo />
        <div className="flex items-center">
          <Tooltip title={t("starOnGitHub")}>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/bytedance/deer-flow"
                target="_blank"
              >
                <GithubOutlined />
              </Link>
            </Button>
          </Tooltip>
          <ThemeToggle />
          <Suspense>
            <SettingsDialog />
          </Suspense>
        </div>
      </header> */}
      <Main />
    </div>
  );
}
