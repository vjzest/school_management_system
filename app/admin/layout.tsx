'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Bell, Shield } from 'lucide-react'
import Sidebar from '@/components/admin/sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { token, admin } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  if (!isClient) return null;
  if (!token) return null;

  return (
    <div className="flex h-screen bg-[#F4F7FB] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-100 shadow-sm flex items-center px-4 sm:px-6 gap-4 z-20 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:bg-[#27598C]/10 hover:text-[#27598C] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-extrabold text-[#27598C] text-sm hidden sm:block">Royal Public School</span>
          </Link>

          <div className="hidden lg:block">
            <h1 className="text-base font-bold text-[#0D2640]">Admin Portal</h1>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 rounded-xl text-slate-500 hover:bg-[#27598C]/10 hover:text-[#27598C] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E5D81A] rounded-full border border-white"></span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#0D2640] leading-none">{admin?.name || 'Admin User'}</p>
                <p className="text-xs text-[#589C47] font-semibold mt-0.5">{admin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Staff Admin'}</p>
              </div>
              <div className="w-9 h-9 bg-[#0D2640] rounded-full flex items-center justify-center text-[#E5D81A] font-extrabold text-sm shadow-md">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="sm:hidden w-8 h-8 bg-[#0D2640] rounded-full flex items-center justify-center text-[#E5D81A]">
              <Shield className="w-4 h-4" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
