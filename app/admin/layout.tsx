'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/admin/sidebar'
import Header from '@/components/admin/header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-100 shadow-sm z-10">
          <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  )
}
