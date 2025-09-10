"use client"

import Header from './Header'
import Footer from './Footer'
import BackgroundCircles from '~/components/home/BackgroundCircles'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <BackgroundCircles />
      <Header />
      <main className="flex-1 flex min-h-0 overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  )
} 