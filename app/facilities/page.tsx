'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, MonitorPlay, FlaskConical, Dumbbell, Building2, Bus, HeartPulse, Microscope, Lightbulb, Users, GraduationCap, Wifi } from 'lucide-react'
import Link from 'next/link'

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#27598C]/8 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#589C47]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:pl-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#589C47]/10 text-[#589C47] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#589C47]/20">
                <span className="w-2 h-2 rounded-full bg-[#589C47] animate-pulse"></span>
                Campus Facilities
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#0D2640] tracking-tight leading-[1.1] mb-5">
                Everything You Need To <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27598C] to-[#589C47]">Learn, Grow & Succeed</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                Experience world-class infrastructure: modern classrooms, advanced labs, a vast sports complex, and a student-centered environment built for excellence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <Button className="w-full sm:w-auto bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold h-12 sm:h-14 px-8 rounded-full shadow-lg shadow-[#27598C]/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                  Explore Facilities <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white text-[#27598C] border-2 border-[#27598C]/30 hover:border-[#27598C] font-bold h-12 sm:h-14 px-8 rounded-full transition-all text-sm sm:text-base">
                  Schedule a Visit
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-slate-100">
                {[{ n: '35K+', l: 'Sq. Ft. Campus' }, { n: '12', l: 'Labs' }, { n: '5', l: 'Sports Grounds' }, { n: '95%', l: 'Satisfaction' }].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-extrabold text-[#27598C]">{stat.n}</h4>
                    <p className="font-semibold text-slate-500 text-sm mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right collage */}
            <div className="relative h-[580px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-[420px] h-[520px] rounded-[40px] overflow-hidden relative shadow-[0_30px_60px_rgba(39,89,140,0.12)] border border-slate-100 z-10">
                  <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop" alt="Campus" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-2xl font-extrabold mb-1">World-Class Campus</h3>
                    <p className="text-white/80 text-sm">Built for the future.</p>
                  </div>
                </motion.div>
                {[
                  { Icon: BookOpen, t: 'Smart Library', d: '8000+ Books & e-Resources', pos: 'top-8 left-0', bg: 'bg-[#27598C]/10 text-[#27598C]', delay: 0 },
                  { Icon: Dumbbell, t: 'Sports Complex', d: 'Multi-sport facility', pos: 'bottom-28 -left-8', bg: 'bg-[#589C47]/10 text-[#589C47]', delay: 1 },
                  { Icon: MonitorPlay, t: 'Smart Classes', d: 'Interactive boards', pos: 'top-36 -right-8', bg: 'bg-[#E5D81A]/20 text-yellow-700', delay: 0.5 },
                ].map((item, i) => (
                  <motion.div key={i} animate={{ y: [i % 2 === 0 ? -12 : 12, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? -12 : 12] }} transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut', delay: item.delay }} className={`absolute ${item.pos} bg-white p-5 rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-4 w-58`}>
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}><item.Icon className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-extrabold text-[#0D2640] text-sm">{item.t}</h4>
                      <p className="text-xs text-slate-500">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FACILITIES BENTO */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">CAMPUS OVERVIEW</h4>
            <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">World-Class Infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-5 h-auto md:h-[720px]">
            {/* Big Feature */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-[32px] overflow-hidden group cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop" alt="Library" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/90 via-[#0D2640]/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <BookOpen className="w-10 h-10 text-[#E5D81A] mb-3" />
                <h3 className="text-2xl font-extrabold mb-2">Digital Library</h3>
                <p className="text-white/80 text-sm max-w-xs">8000+ books, digital resources, and quiet reading zones.</p>
              </div>
            </div>
            {/* Medium cards */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden group cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1528&auto=format&fit=crop" alt="Sports" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <Dumbbell className="w-8 h-8 text-[#589C47] mb-2" />
                <h3 className="text-xl font-extrabold">Sports Complex</h3>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden group cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470&auto=format&fit=crop" alt="Lab" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <FlaskConical className="w-8 h-8 text-[#E5D81A] mb-2" />
                <h3 className="text-xl font-extrabold">Science Laboratories</h3>
              </div>
            </div>
            {/* Bottom small cards */}
            {[
              { Icon: MonitorPlay, t: 'Smart Classrooms', d: 'Interactive digital boards in every class.', color: 'text-[#27598C]', bg: 'bg-[#27598C]/10' },
              { Icon: HeartPulse, t: 'Health Centre', d: 'Qualified nurse & first aid on campus.', color: 'text-rose-500', bg: 'bg-rose-50' },
              { Icon: Bus, t: 'GPS Transport', d: 'Safe school buses covering all routes.', color: 'text-[#589C47]', bg: 'bg-[#589C47]/10' },
              { Icon: Wifi, t: 'Hi-Speed Wi-Fi', d: 'Campus-wide secure internet access.', color: 'text-[#E5D81A]', bg: 'bg-[#E5D81A]/10' },
            ].map((item, idx) => (
              <div key={idx} className="md:col-span-1 relative rounded-[28px] bg-white border border-slate-100 p-7 shadow-sm hover:border-[#27598C]/30 hover:shadow-lg transition-all group">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <item.Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-base font-extrabold text-[#0D2640] mb-1">{item.t}</h3>
                <p className="text-slate-500 text-xs">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LABS SECTION */}
      <section className="py-24 bg-[#0D2640] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#27598C]/40 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#589C47]/20 rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="text-center mb-14">
            <h4 className="text-[#E5D81A] font-bold uppercase tracking-widest text-sm mb-3">ADVANCED LEARNING</h4>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">State-of-the-Art Laboratories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Microscope, t: 'Biology Lab', d: 'Modern equipment for advanced research and practical studies.' },
              { Icon: FlaskConical, t: 'Chemistry Lab', d: 'Fully equipped with safety protocols and modern apparatus.' },
              { Icon: Lightbulb, t: 'Physics Lab', d: 'Experiments and demonstrations for all board levels.' },
              { Icon: MonitorPlay, t: 'Computer Lab', d: 'High-performance systems with latest software and fast internet.' },
              { Icon: GraduationCap, t: 'Math Activity Room', d: 'Hands-on manipulatives and problem-solving resources.' },
              { Icon: Users, t: 'Art & Craft Studio', d: 'Creative spaces encouraging artistic expression and skill.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[24px] p-8 hover:bg-white/10 hover:border-[#E5D81A]/30 transition-all group">
                <div className="w-14 h-14 bg-[#E5D81A]/20 rounded-2xl flex items-center justify-center text-[#E5D81A] mb-5 group-hover:bg-[#E5D81A]/30 transition-colors">
                  <item.Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{item.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[36px] p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <Building2 className="w-12 h-12 text-[#E5D81A] mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Come See Our Campus</h2>
            <p className="text-slate-300 mb-10 text-base">Schedule a campus visit and experience our world-class facilities firsthand. Open for visits Monday–Saturday.</p>
            <Link href="/admissions">
              <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-14 px-12 text-base font-extrabold rounded-full shadow-xl transition-all">Book a Campus Tour</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
