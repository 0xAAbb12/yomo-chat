"use client";

import { useState } from "react";
import CookieConsent from "~/components/home/CookieConsent";
// import Image from "next/image";
import { X, Telegram, Prompt } from "~/components/svg";

const footerLinks = [
  { text: "Terms of Service", href: "#" },
  { text: "Privacy Policy", href: "#" },
];

export default function Footer() {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full backdrop-blur-[4px] bg-[rgba(246,124,0,0.04)] flex flex-col lg:flex-row lg:h-[72px] items-center justify-between px-4 lg:px-[30px] py-3 lg:py-0">
        <div className="flex gap-4 lg:gap-[30px] items-center">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="font-arboria-medium text-[#979797] text-xs lg:text-sm tracking-[0] leading-[normal] underline hover:text-[#F67C00] transition-colors flex items-center"
            >
              {link.text}
            </a>
          ))}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsCookieModalOpen(true)}
            onMouseLeave={(e) => {
              // 检查鼠标是否移到了 CookieConsent 区域或按钮区域
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (
                relatedTarget &&
                !relatedTarget.closest(".cookie-consent-container") &&
                !relatedTarget.closest(".manage-cookies-button")
              ) {
                setIsCookieModalOpen(false);
              }
            }}
          >
            <button className="manage-cookies-button font-arboria-medium text-[#979797] text-xs lg:text-sm tracking-[0] leading-[normal] underline hover:text-[#F67C00] transition-colors flex items-center cursor-pointer">
              Manage Cookies
            </button>

            {/* Desktop Cookie Consent Modal - positioned above the button */}
            {isCookieModalOpen && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0 z-50 cookie-consent-container lg:block hidden"
                onMouseLeave={() => setIsCookieModalOpen(false)}
              >
                <CookieConsent
                  isOpen={isCookieModalOpen}
                  onClose={() => setIsCookieModalOpen(false)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-[22px] mt-3 lg:mt-0">
          <Prompt width="16px" height="16px" />
          <Telegram width="16px" height="16px" />
          <X width="16px" height="16px" />
        </div>
      </footer>

      {/* Mobile Cookie Consent Modal - centered on screen */}
      {isCookieModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4 lg:hidden"
          onClick={() => setIsCookieModalOpen(false)}
        >
          <div
            className="cookie-consent-container"
            onClick={(e) => e.stopPropagation()}
          >
            <CookieConsent
              isOpen={isCookieModalOpen}
              onClose={() => setIsCookieModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
