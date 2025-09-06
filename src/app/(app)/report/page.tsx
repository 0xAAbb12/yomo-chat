"use client";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./main"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      Loading Yomo...
    </div>
  ),
});

export default function ReportPage() {
  return (
    <div className="flex justify-center w-full h-full">
      <Main />
    </div>
  );
}
