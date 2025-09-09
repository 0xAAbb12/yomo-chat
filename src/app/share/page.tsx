"use client";
import dynamic from "next/dynamic";
import ClientLayout from "~/components/layout/ClientLayout";

const Main = dynamic(() => import("./main"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      Loading Yomo...
    </div>
  ),
});

export default function SharePage() {
  return (
    <ClientLayout>
      <Main />
    </ClientLayout>
  );
}
