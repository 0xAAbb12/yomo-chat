"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Drawer({ open, onOpenChange, title, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={() => onOpenChange()}>
      <Dialog.Portal>
        {/* 遮罩层 */}
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 
                     data-[state=open]:animate-fadeIn 
                     data-[state=closed]:animate-fadeOut"
        />

        {/* 抽屉内容 */}
        <Dialog.Content
          className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-4 rounded-l-xl
                     data-[state=open]:animate-slideIn 
                     data-[state=closed]:animate-slideOut"
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button onClick={() => onOpenChange()}>
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}