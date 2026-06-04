'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StudentSidebar from '@/components/student/sidebar'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F4F7FB] overflow-hidden">
      {/* Sidebar — hidden on mobile unless open */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-100 shadow-sm flex items-center px-4 sm:px-6 gap-4 z-20 shrink-0">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:bg-[#27598C]/10 hover:text-[#27598C] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo on mobile */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-extrabold text-[#27598C] text-sm hidden sm:block">Royal Public School</span>
          </Link>

          {/* Title */}
          <div className="hidden lg:block">
            <h1 className="text-base font-bold text-[#0D2640]">Student Portal</h1>
          </div>

          <div className="flex-1" />

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bell */}
            <button className="relative p-2 rounded-xl text-slate-500 hover:bg-[#27598C]/10 hover:text-[#27598C] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E5D81A] rounded-full border border-white"></span>
            </button>

            {/* User Info */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#0D2640] leading-none">Rahul Sharma</p>
                <p className="text-xs text-slate-500 mt-0.5">Class X – A</p>
              </div>
              <div className="w-9 h-9 bg-[#27598C] rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                R
              </div>
            </div>
            <div className="sm:hidden w-8 h-8 bg-[#27598C] rounded-full flex items-center justify-center text-white font-extrabold text-sm">
              R
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
