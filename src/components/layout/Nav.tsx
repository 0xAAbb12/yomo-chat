"use client";
import { useState } from "react";
import { PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={cn(
        "relative flex h-full flex-col items-center p-2",
        isOpen ? "w-[240px]" : "w-[60px]",
      )}
    >
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        <PanelLeft className="h-5 w-5" />
      </Button>
    </div>
  );
}
