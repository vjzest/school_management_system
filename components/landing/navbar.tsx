'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react'

export default function Navbar() {
  return (
    <>
      {/* Top Mini Bar */}
      <div className="bg-[#0B1B4D] text-slate-300 py-2 hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-xs font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-[#FF6B00] transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#FF6B00] transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>admissions@globalexcellence.edu</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#FF6B00] transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>123 Education Hub, Tech City</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Follow Us:</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#E8EDF7] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group z-10">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00] to-orange-400 rounded-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500 shadow-lg shadow-orange-500/30"></div>
              <div className="absolute inset-0 bg-[#0B1B4D] rounded-xl m-[2px] flex items-center justify-center">
                <span className="text-white font-extrabold text-xl">GE</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#0B1B4D] tracking-tight leading-none">Global Excellence</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00] mt-1">Academy</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-slate-600 z-10">
            <Link href="/" className="hover:text-[#FF6B00] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-[#FF6B00] transition-colors relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/academics" className="hover:text-[#FF6B00] transition-colors relative group">
              Academics
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/admissions" className="hover:text-[#FF6B00] transition-colors relative group">
              Admissions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/facilities" className="hover:text-[#FF6B00] transition-colors relative group">
              Facilities
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex gap-4 z-10 items-center">
            <Link href="/student" className="hidden sm:block">
              <button className="text-[#0B1B4D] font-bold hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                Student Portal
              </button>
            </Link>
            <Link href="/admissions">
              <Button className="bg-[#FF6B00] hover:bg-orange-600 text-white font-bold rounded-full px-6 h-12 shadow-lg shadow-orange-500/20 transition-all duration-300 flex items-center gap-2 border-2 border-transparent hover:border-orange-200">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
