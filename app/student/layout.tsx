'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StudentSidebar from '@/components/student/sidebar'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <StudentSidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 text-[#0F172A] shadow-sm z-10">
          <header className="h-16 flex items-center px-6 bg-transparent">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex-1">
              <h1 className="text-lg font-bold text-[#0F172A]">Student Portal</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-[#0F172A]">Rahul Sharma</p>
                <p className="text-xs text-slate-500 font-medium">Class 10-A</p>
              </div>
              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                R
              </div>
            </div>
          </header>
        </div>
        
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  )
}
