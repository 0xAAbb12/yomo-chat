"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

interface CookieConsentProps {
  isOpen: boolean
  onClose: () => void
}

export default function CookieConsent({ isOpen, onClose }: CookieConsentProps) {
  const [analyticsCookies, setAnalyticsCookies] = useState(false)

  if (!isOpen) return null

  return (
    <div 
      className="bg-white rounded-lg shadow-xl w-[95vw] lg:w-[360px] max-w-[95vw] p-6 pl-[16px] pr-[16px] relative border border-gray-200"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        title="Close"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <h2 className="text-[16px] font-arboria-medium text-[#14163F]  tracking-[0] leading-[normal] mb-4 mt-4">
        We use cookies to enhance your user experience.
      </h2>

      {/* Information Text */}
      <p className="text-[14px] font-arboria-book text-[#979797] mb-6 leading-[normal]">
        We use cookies to provide Yomo core functionality, save your preferences, and improve your browsing experience. You can customize your consent for different types of cookies. Functional cookies cannot be disabled as they are essential for Yomo&apos;s functionality. Other cookies will only be used with your consent. For a complete overview of all cookies used, please see our{' '}
        <a href="#" className="text-[#f67c00] hover:underline">
          Cookie Policy.
        </a>
      </p>

      {/* Cookie Categories */}
      <div className="space-y-4 mb-6">
        {/* Functional Cookies */}
        <div className="flex items-center justify-between bg-[#F6F6F8] rounded-lg p-3">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <span className="font-arboria-medium text-[#14163F] text-[14px] tracking-[0] leading-[normal]">Functional Cookies</span>
            </div>
            <p className="text-[13px] font-arboria-book text-[#979797]">For security and basic functionality</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={true}
              disabled
              className="sr-only"
            />
            <div className="w-12 h-6 bg-[#f67c00] rounded-full relative cursor-not-allowed">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="flex items-center justify-between bg-[#F6F6F8] rounded-lg p-3">
          <div>
            <span className="font-arboria-medium text-[#14163F] text-[14px] tracking-[0] leading-[normal]">Analytics Cookies</span>
            <p className="text-[13px] font-arboria-book text-[#979797]">For improving site performance</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={(e) => setAnalyticsCookies(e.target.checked)}
              className="sr-only"
            />
            <div 
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                analyticsCookies ? 'bg-[#f67c00]' : 'bg-gray-300'
              }`}
              onClick={() => setAnalyticsCookies(!analyticsCookies)}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  analyticsCookies ? 'right-1' : 'left-1'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button 
        className="w-full h-[46px] bg-[#f67c00] hover:bg-[#e56b00] text-white font-arboria-medium text-[16px] tracking-[0] leading-[normal] py-3 rounded-lg transition-colors"
        onClick={() => {
          // 这里可以保存用户的 cookie 偏好设置
          console.log('Cookie preferences saved:', { functionalCookies: true, analyticsCookies })
          onClose()
        }}
      >
        Save Preference
      </Button>
    </div>
  )
} 