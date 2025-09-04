"use client";
import React, { useEffect } from "react";
import Nav from "./Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] bg-[#f6f6f8] w-full overflow-hidden p-2 pl-0">
      <Nav />
      <main className="relative w-0 flex-1 bg-white size-full rounded-xl">{children}</main>
    </div>
  );
}
