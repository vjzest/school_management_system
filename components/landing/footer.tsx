'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0D2640] text-slate-300 border-t-4 border-[#E5D81A] relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#27598C]/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#589C47]/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10 mb-14">

          {/* Column 1: Brand */}
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Royal Public School Logo"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight leading-none">Royal Public School</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5D81A] mt-1">Teaching Kids Excellence</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dedicated to nurturing future leaders through excellence in academics, character building, and holistic development since 1995.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#27598C] hover:text-white transition-all border border-white/10 hover:border-[#27598C]">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm pb-2 border-b border-[#E5D81A]/30">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
              {[
                { label: 'Home', href: '/' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'About Us', href: '/about' },
                { label: 'Facilities', href: '/facilities' },
                { label: 'Academics', href: '/academics' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#E5D81A] hover:translate-x-1 inline-flex items-center gap-1 transition-all text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm pb-2 border-b border-[#E5D81A]/30">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E5D81A] group-hover:bg-[#27598C] transition-colors shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Campus Address</span>
                  <span className="text-slate-400 text-sm mt-1 leading-relaxed">123 Education Hub, Royal Nagar - 40001</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E5D81A] group-hover:bg-[#27598C] transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Phone Number</span>
                  <a href="tel:+919876543210" className="text-slate-400 text-sm mt-1 hover:text-[#E5D81A] transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E5D81A] group-hover:bg-[#27598C] transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-white font-bold text-sm">Email Address</span>
                  <a href="mailto:admissions@royalpublicschool.edu" className="text-slate-400 text-sm mt-1 hover:text-[#E5D81A] transition-colors">admissions@royalpublicschool.edu</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Royal Public School. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-slate-500 hover:text-[#E5D81A] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-[#E5D81A] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
