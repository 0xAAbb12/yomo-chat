

"use client";

// import { usePathname } from "next/navigation";

import { ThemeProvider } from "~/components/theme-provider";
import LoginAction from "../dialogs/login-action";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const isChatPage = pathname?.startsWith("/chat");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      // enableSystem={isChatPage}
      // forcedTheme={isChatPage ? undefined : "light"}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
