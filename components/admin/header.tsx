'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 flex items-center px-6 bg-transparent">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="mr-4 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      >
        <Menu className="w-5 h-5" />
      </Button>
      
      <div className="flex-1">
        <h1 className="text-lg font-bold text-[#0F172A]">Staff Portal</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-500 font-bold">Admin User</div>
        <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold shadow-md">
          A
        </div>
      </div>
    </header>
  )
}
