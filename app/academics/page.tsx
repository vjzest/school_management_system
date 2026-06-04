'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, GraduationCap, Globe, Cpu, Lightbulb, Briefcase, Microscope } from 'lucide-react'
import Link from 'next/link'

export default function AcademicsPage() {
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
                World-Class Curriculum
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#0D2640] tracking-tight leading-[1.1] mb-5">
                Discover Your <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27598C] to-[#589C47]">Academic Potential</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                Our CBSE-affiliated programs blend rigorous coursework with hands-on learning, preparing students to excel in board exams and beyond.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <Button className="w-full sm:w-auto bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold h-12 sm:h-14 px-8 rounded-full shadow-lg shadow-[#27598C]/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                  Explore Programs <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white text-[#27598C] border-2 border-[#27598C]/30 hover:border-[#27598C] font-bold h-12 sm:h-14 px-8 rounded-full transition-all text-sm sm:text-base">
                  Download Prospectus
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                {[{ n: '8', l: 'Streams' }, { n: '98%', l: 'Board Results' }, { n: '40+', l: 'Clubs & Activities' }, { n: '14:1', l: 'Student-Teacher' }].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-extrabold text-[#27598C]">{stat.n}</h4>
                    <p className="font-semibold text-slate-500 text-sm mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative h-[260px] sm:h-[400px] lg:h-[560px] w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-[420px] h-[520px] rounded-[40px] overflow-hidden relative shadow-[0_30px_60px_rgba(39,89,140,0.12)] border border-slate-100 z-10">
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop" alt="Academics" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-2xl font-extrabold mb-1">Empowering Minds</h3>
                    <p className="text-white/80 text-sm">Interactive & collaborative learning.</p>
                  </div>
                </motion.div>
                {[
                  { Icon: GraduationCap, t: 'Science', d: 'Physics, Chem, Bio, Maths', pos: 'top-10 left-0', color: 'bg-[#27598C]/10 text-[#27598C]', delay: 0 },
                  { Icon: Briefcase, t: 'Commerce', d: 'Accounts, Economics', pos: 'bottom-32 -left-8', color: 'bg-[#E5D81A]/20 text-yellow-700', delay: 1 },
                  { Icon: Microscope, t: 'Arts', d: 'History, Pol. Science', pos: 'top-32 -right-8', color: 'bg-[#589C47]/10 text-[#589C47]', delay: 0.5 },
                ].map((item, i) => (
                  <motion.div key={i} animate={{ y: [i % 2 === 0 ? -12 : 12, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? -12 : 12] }} transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut', delay: item.delay }} className={`absolute ${item.pos} bg-white p-5 rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-4 w-58`}>
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}><item.Icon className="w-6 h-6" /></div>
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

      {/* PHILOSOPHY BENTO */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">OUR APPROACH</h4>
            <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">Academic Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[540px]">
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] bg-[#0D2640] p-10 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-extrabold text-white mb-3 relative z-10">Experiential Learning</h3>
              <p className="text-slate-300 leading-relaxed relative z-10 text-sm">We bridge theory and practice. Students engage in projects, science fairs, debates, and internships from an early stage, ensuring they graduate with practical confidence.</p>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#F4F7FB] border border-slate-100 p-8 hover:border-[#27598C] transition-colors">
              <Globe className="w-10 h-10 text-[#27598C] mb-4" />
              <h3 className="text-xl font-extrabold text-[#0D2640] mb-2">Global Perspective</h3>
              <p className="text-slate-500 text-sm">Curriculum designed to solve real-world challenges with international outlook.</p>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#F4F7FB] border border-slate-100 p-8 hover:border-[#589C47] transition-colors">
              <Cpu className="w-10 h-10 text-[#589C47] mb-4" />
              <h3 className="text-xl font-extrabold text-[#0D2640] mb-2">Tech-Integrated</h3>
              <p className="text-slate-500 text-sm">Digital literacy, coding, and smart classrooms embedded in all programs.</p>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] bg-white border border-slate-100 p-8 shadow-sm hover:border-[#27598C] transition-colors flex items-center gap-8">
              <div className="w-16 h-16 bg-[#E5D81A]/20 rounded-2xl flex items-center justify-center text-yellow-600 shrink-0">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0D2640] mb-2">Critical Thinking Focus</h3>
                <p className="text-slate-500 text-sm">Debates, case studies, and open-ended problem-solving are central to our teaching methodology.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX */}
      <section className="relative h-[440px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0D2640]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <BookOpen className="w-14 h-14 text-[#E5D81A] mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Learning Beyond Classrooms</h2>
          <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-13 px-8 text-base font-extrabold rounded-full shadow-xl transition-all">View Academic Calendar</Button>
        </div>
      </section>

      {/* FACULTY */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">EXPERT GUIDANCE</h4>
          <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">Learn From The Best</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { n: 'Prof. David Miller', r: 'Head of Sciences', s: 'Physics & Mathematics' },
            { n: 'Dr. Anita Desai', r: 'Head of Technology', s: 'Computer Science' },
            { n: 'James Sterling', r: 'Director of Commerce', s: 'Economics & Accounts' },
            { n: 'Dr. Maria Garcia', r: 'Lead Arts Faculty', s: 'History & Literature' },
          ].map((fac, idx) => (
            <div key={idx} className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
              <div className="h-56 relative w-full bg-slate-100 overflow-hidden">
                <Image src={`https://i.pravatar.cc/300?img=${idx + 30}`} alt={fac.n} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-base font-extrabold text-[#0D2640] mb-1">{fac.n}</h3>
                <p className="text-[#27598C] font-bold text-xs uppercase tracking-wide mb-2">{fac.r}</p>
                <div className="inline-block bg-[#589C47]/10 px-3 py-1 rounded-full text-xs font-semibold text-[#589C47]">{fac.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[36px] p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready To Elevate Your Future?</h2>
            <p className="text-slate-300 mb-10 text-base">Browse our complete academic programs and find the stream that's perfect for your child.</p>
            <Link href="/admissions">
              <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-14 px-12 text-base font-extrabold rounded-full shadow-xl transition-all">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
