'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  Clock,
  CreditCard,
  BookOpen,
  Award,
  BookMarked,
  LogOut,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
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

export default function StudentSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "bg-[#0D2640] border-r border-white/10 transition-all duration-300 flex flex-col shadow-xl z-40",
        // Mobile: fixed drawer, Desktop: static sidebar
        "fixed lg:relative inset-y-0 left-0",
        isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
            </div>
            {isOpen && (
              <div className="min-w-0">
                <p className="font-extrabold text-white text-sm leading-none truncate">Royal Public</p>
                <p className="text-[10px] text-[#E5D81A] font-bold tracking-wider mt-0.5">Student Portal</p>
              </div>
            )}
          </div>
          {/* Close button on mobile */}
          {isOpen && onClose && (
            <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href + '/'))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm",
                  isActive
                    ? "bg-[#27598C] text-white shadow-lg shadow-[#27598C]/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
                title={!isOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
                {isOpen && isActive && (
                  <span className="ml-auto w-1.5 h-5 bg-[#E5D81A] rounded-full"></span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm text-slate-400 hover:text-red-400 hover:bg-white/5"
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}
