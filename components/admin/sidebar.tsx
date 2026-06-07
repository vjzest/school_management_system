'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { logout } from '@/lib/features/authSlice'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Clock,
  CreditCard,
  Award,
  BookMarked,
  Truck,
  Home as HomeIcon,
  Wallet,
  Bell,
  Settings,
  LogOut,
  X,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin', permission: 'dashboard' },
  { label: 'Students', icon: Users, href: '/admin/students', permission: 'students' },
  { label: 'Teachers', icon: BookOpen, href: '/admin/teachers', permission: 'teachers' },
  { label: 'Attendance', icon: Clock, href: '/admin/attendance', permission: 'attendance' },
  { label: 'Fees', icon: CreditCard, href: '/admin/fees', permission: 'fees' },
  { label: 'Admissions', icon: BookOpen, href: '/admin/admissions', permission: 'admissions' },
  { label: 'Exams', icon: Award, href: '/admin/exams', permission: 'exams' },
  { label: 'Results', icon: BookMarked, href: '/admin/results', permission: 'results' },
  { label: 'Timetable', icon: Clock, href: '/admin/timetable', permission: 'timetable' },
]

const bottomItems = [
  { label: 'Admin Staff', icon: Shield, href: '/admin/users', permission: 'admins_manage' },
  { label: 'Notifications', icon: Bell, href: '/admin/notifications', permission: 'dashboard' },
  { label: 'Settings', icon: Settings, href: '/admin/settings', permission: 'settings' },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { admin } = useAppSelector((state: any) => state.auth)

  const hasAccess = (permission: string) => {
    if (!admin) return false;
    if (admin.role === 'SUPER_ADMIN') return true;
    if (permission === 'dashboard') return true; // Everyone can see dashboard/notifications
    return admin.permissions && Array.isArray(admin.permissions) && admin.permissions.includes(permission);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose()
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

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
                <p className="text-[10px] text-[#E5D81A] font-bold tracking-wider mt-0.5">Admin Portal</p>
              </div>
            )}
          </div>
          {isOpen && onClose && (
            <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.filter(item => hasAccess(item.permission)).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
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

        {/* Bottom Items */}
        <div className="border-t border-white/10 p-3 space-y-1">
          {bottomItems.filter(item => hasAccess(item.permission)).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
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
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all font-semibold text-sm"
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
