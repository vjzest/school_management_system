'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0D2640] text-slate-300 border-t-4 border-[#E5D81A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#27598C]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#589C47]/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Column 1: Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group">
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
                <span className="text-lg font-extrabold text-white tracking-tight leading-none">Royal Public School</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5D81A] mt-1">Teaching Kids Excellence</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dedicated to nurturing future leaders through excellence in academics, character building, and holistic development since 1995.
            </p>
            <div className="flex gap-3 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#27598C] hover:text-white transition-all border border-white/10">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm pb-2 border-b border-[#E5D81A]/30">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {[
                { label: 'Home', href: '/' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'About Us', href: '/about' },
                { label: 'Facilities', href: '/facilities' },
                { label: 'Academics', href: '/academics' },
                { label: 'Privacy Policy', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#E5D81A] inline-flex items-center gap-1 transition-all text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-5">
            <h4 className="text-white font-[800] tracking-wide uppercase text-sm pb-2 border-b border-[#E5D81A]/30">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, title: 'Address', val: '123 Education Hub, Royal Nagar – 400001' },
                { Icon: Phone, title: 'Phone', val: '+91 98765 43210', href: 'tel:+919876543210' },
                { Icon: Mail, title: 'Email', val: 'admissions@royalpublicschool.edu', href: 'mailto:admissions@royalpublicschool.edu' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#E5D81A] shrink-0 mt-0.5">
                    <item.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white font-bold text-xs mb-0.5">{item.title}</span>
                    {item.href ? (
                      <a href={item.href} className="text-slate-400 text-xs hover:text-[#E5D81A] transition-colors leading-relaxed">{item.val}</a>
                    ) : (
                      <span className="text-slate-400 text-xs leading-relaxed">{item.val}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Royal Public School. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs font-medium">
            <Link href="#" className="text-slate-500 hover:text-[#E5D81A] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-[#E5D81A] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
