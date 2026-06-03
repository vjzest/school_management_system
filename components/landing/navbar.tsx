'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Facilities', href: '/facilities' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Top Mini Bar — hidden on mobile */}
      <div className="bg-[#0D2640] text-slate-300 py-2 hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-center text-xs font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-[#E5D81A] transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-[#E5D81A]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#E5D81A] transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-[#E5D81A]" />
              <span>admissions@royalpublicschool.edu</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#E5D81A] transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-[#E5D81A]" />
              <span>123 Education Hub, Royal Nagar</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Follow Us:</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#E5D81A] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E5D81A] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E5D81A] transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#27598C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 shrink-0" onClick={() => setMobileOpen(false)}>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Royal Public School Logo"
                width={56}
                height={56}
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-extrabold text-[#27598C] tracking-tight leading-none">Royal Public School</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#589C47] mt-0.5">Teaching Kids Excellence</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-[#27598C] transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#27598C] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-4 z-10 items-center">
            <Link href="/student">
              <button className="text-[#27598C] font-bold hover:text-[#1a3d66] transition-colors">
                Student Portal
              </button>
            </Link>
            <Link href="/admissions">
              <Button className="bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-[#27598C]/30 transition-all flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden z-10 p-2 rounded-xl text-[#27598C] hover:bg-[#27598C]/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-slate-100 shadow-xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3.5 px-4 rounded-xl text-slate-700 font-semibold hover:bg-[#27598C]/8 hover:text-[#27598C] transition-all"
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/student" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full h-12 font-bold border-[#27598C] text-[#27598C] rounded-full">
                      Student Portal
                    </Button>
                  </Link>
                  <Link href="/admissions" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full h-12 bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Mobile contact strip */}
                <div className="pt-5 border-t border-slate-100 mt-4 space-y-2">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-slate-500 hover:text-[#27598C] transition-colors">
                    <Phone className="w-4 h-4 text-[#E5D81A]" /> +91 98765 43210
                  </a>
                  <a href="mailto:admissions@royalpublicschool.edu" className="flex items-center gap-3 text-sm text-slate-500 hover:text-[#27598C] transition-colors">
                    <Mail className="w-4 h-4 text-[#E5D81A]" /> admissions@royalpublicschool.edu
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
