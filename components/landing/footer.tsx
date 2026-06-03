'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#071131] text-slate-300 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00] to-orange-400 rounded-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500 shadow-lg shadow-orange-500/20"></div>
                <div className="absolute inset-0 bg-[#0B1B4D] rounded-xl m-[2px] flex items-center justify-center border border-white/10">
                  <span className="text-white font-extrabold text-xl">GE</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight leading-none">Global Excellence</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00] mt-1">Academy</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering students with world-class education, state-of-the-art facilities, and a holistic approach to create the global leaders of tomorrow.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6B00] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6B00] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6B00] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6B00] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Now displayed as a wider 2-column grid to fill space) */}
          <div className="space-y-6">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
              <li><Link href="/" className="text-slate-400 hover:text-[#FF6B00] hover:translate-x-1 inline-block transition-all text-sm font-medium">Home</Link></li>
              <li><Link href="/admissions" className="text-slate-400 hover:text-[#FF6B00] hover:translate-x-1 inline-block transition-all text-sm font-medium">Admissions</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-[#FF6B00] hover:translate-x-1 inline-block transition-all text-sm font-medium">About Us</Link></li>
              <li><Link href="/facilities" className="text-slate-400 hover:text-[#FF6B00] hover:translate-x-1 inline-block transition-all text-sm font-medium">Facilities</Link></li>
              <li><Link href="/academics" className="text-slate-400 hover:text-[#FF6B00] hover:translate-x-1 inline-block transition-all text-sm font-medium">Academics</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Campus Address</span>
                  <span className="text-slate-400 text-sm mt-1 leading-relaxed">123 Education Hub, Tech City, Global Sector - 40001</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Phone Number</span>
                  <a href="tel:+919876543210" className="text-slate-400 text-sm mt-1 hover:text-[#FF6B00] transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Email Address</span>
                  <a href="mailto:admissions@globalexcellence.edu" className="text-slate-400 text-sm mt-1 hover:text-[#FF6B00] transition-colors">admissions@globalexcellence.edu</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Global Excellence Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
