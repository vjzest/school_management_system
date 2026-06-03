'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User,
  Clock, 
  CreditCard, 
  BookOpen,
  Award,
  BookMarked,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/student' },
  { label: 'My Profile', icon: User, href: '/student/profile' },
  { label: 'Attendance', icon: Clock, href: '/student/attendance' },
  { label: 'Fees', icon: CreditCard, href: '/student/fees' },
  { label: 'Homework', icon: BookOpen, href: '/student/homework' },
  { label: 'Results', icon: Award, href: '/student/results' },
  { label: 'Timetable', icon: BookMarked, href: '/student/timetable' },
]

export default function StudentSidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "bg-[#071B4A] border-r border-[#071B4A] transition-all duration-300 flex flex-col shadow-xl z-20 relative",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-white rounded-lg m-[1px] flex items-center justify-center">
               <div className="w-3 h-3 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>
          {isOpen && <span className="font-extrabold text-white tracking-tight text-xl">Education</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                isActive
                  ? "bg-[#FF7A00] text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
              title={!isOpen ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-slate-400 hover:text-red-400 hover:bg-white/5"
          title={!isOpen ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  )
}
