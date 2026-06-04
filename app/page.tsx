'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Award, ArrowRight, BookOpen, Star, Trophy, Shield, GraduationCap, Clock } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-900 selection:bg-[#27598C]/20 overflow-x-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-28 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-[#27598C]/8 via-[#589C47]/5 to-transparent rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E5D81A]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-[#E5D81A]/20 text-[#27598C] font-extrabold uppercase tracking-widest text-[10px] sm:text-xs px-4 py-2 rounded-full border border-[#E5D81A]/40">
                <span className="w-2 h-2 rounded-full bg-[#E5D81A] animate-pulse"></span>
                Welcome to Royal Public School
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-[800] text-[#0D2640] tracking-tight leading-[1.1]">
                Shaping The <br className="hidden sm:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27598C] via-[#589C47] to-[#27598C]">Leaders of Tomorrow</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A prestigious institution dedicated to nurturing young minds through academic excellence, strong values, and holistic development.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link href="/admissions" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold h-12 sm:h-14 px-8 rounded-full shadow-lg shadow-[#27598C]/30 transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    Admissions Open <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#27598C] border-2 border-[#27598C]/30 hover:border-[#27598C] font-bold h-12 sm:h-14 px-8 rounded-full transition-all text-sm sm:text-base">
                    Explore School
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-4 border-t border-slate-100">
                {[
                  { n: '2500+', l: 'Students' },
                  { n: '150+', l: 'Faculty' },
                  { n: '25+', l: 'Years' },
                  { n: '95%', l: 'Results' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg sm:text-2xl font-extrabold text-[#27598C]">{s.n}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Graphic — all screen sizes, shorter on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative h-[260px] sm:h-[380px] lg:h-[520px] w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-[440px] h-[440px] flex items-center justify-center">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="w-[380px] h-[380px] bg-white rounded-[32px] shadow-[0_25px_60px_rgba(39,89,140,0.12)] flex items-center justify-center relative border border-slate-100"
                >
                  <div className="relative w-[240px] h-[240px] rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#27598C 0deg 90deg, #589C47 90deg 200deg, #E5D81A 200deg 270deg, #1a3d66 270deg 360deg)' }}>
                    <div className="absolute inset-[22px] bg-white rounded-full flex items-center justify-center">
                      <div className="relative w-[155px] h-[155px] rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#589C47 0deg 130deg, #27598C 130deg 240deg, #E5D81A 240deg 360deg)' }}>
                        <div className="absolute inset-[14px] bg-white rounded-full flex items-center justify-center">
                          <GraduationCap className="w-9 h-9 text-[#27598C]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="absolute -top-6 left-14 w-16 h-16 bg-[#E5D81A] rounded-full shadow-[0_12px_24px_rgba(229,216,26,0.4)] flex items-center justify-center z-20">
                    <Trophy className="w-7 h-7 text-[#0D2640]" />
                  </motion.div>
                  <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }} className="absolute top-6 -right-10 bg-white rounded-[18px] p-4 shadow-[0_15px_35px_rgba(39,89,140,0.12)] flex flex-col items-center gap-3 z-20 w-[170px] border border-slate-100">
                    <span className="text-xs font-extrabold text-[#0D2640]">Our Students</span>
                    <div className="flex -space-x-3">
                      {['bg-[#27598C]/20', 'bg-[#589C47]/20', 'bg-[#E5D81A]/30'].map((c, i) => <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`}></div>)}
                      <div className="w-8 h-8 rounded-full bg-[#0D2640] border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">+2K</div>
                    </div>
                  </motion.div>
                  <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-14 -left-12 bg-white rounded-[18px] p-4 px-5 shadow-[0_15px_35px_rgba(39,89,140,0.12)] flex items-center gap-4 z-20 border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#589C47]"></div>
                    <div className="space-y-2 w-16">
                      <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-slate-100 rounded-full"></div>
                    </div>
                  </motion.div>
                  <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1.5 }} className="absolute -bottom-8 -right-4 w-[240px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(39,89,140,0.15)] p-5 z-20 border border-slate-100">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                      {[['Modern', 'Campus'], ['Expert', 'Faculty'], ['Smart', 'Classes'], ['Sports', 'Complex']].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#589C47]/15 flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#589C47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <div className="flex flex-col text-[11px] font-bold text-[#0D2640] leading-tight"><span>{item[0]}</span><span>{item[1]}</span></div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <div className="absolute bottom-8 left-10 w-3 h-3 bg-[#E5D81A] rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS SECTION ===== */}
      <section className="py-16 sm:py-24 bg-[#0D2640] relative overflow-hidden mx-3 sm:mx-6 lg:mx-10 rounded-[28px] sm:rounded-[40px] my-8 sm:my-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#27598C]/40 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h4 className="text-[#E5D81A] font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Academic Programs</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">Our Streams & Classes</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: BookOpen, title: 'Primary', desc: 'Grades I–V', active: false },
              { icon: GraduationCap, title: 'Middle School', desc: 'Grades VI–VIII', active: false },
              { icon: Star, title: 'Science', desc: 'Grades IX–XII', active: false },
              { icon: Trophy, title: 'Commerce', desc: 'Grades IX–XII', active: false },
              { icon: Shield, title: 'Arts', desc: 'Grades IX–XII', active: true },
            ].map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div key={idx} className={`group rounded-[20px] sm:rounded-[28px] p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-xl ${prog.active ? 'bg-[#E5D81A]' : 'bg-[#27598C]/50'}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 ${prog.active ? 'bg-white/30 text-[#0D2640]' : 'bg-blue-100 text-[#27598C]'}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className={`text-sm sm:text-base font-bold mb-1 ${prog.active ? 'text-[#0D2640]' : 'text-white'}`}>{prog.title}</h3>
                  <p className={`text-xs ${prog.active ? 'text-[#0D2640]/70' : 'text-slate-400'} mb-3`}>{prog.desc}</p>
                  <div className={`font-bold flex items-center gap-1 text-xs sm:text-sm ${prog.active ? 'text-[#0D2640]' : 'text-[#E5D81A]'}`}>
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">WHY CHOOSE US</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D2640] tracking-tight">Excellence in Every Dimension</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { title: 'Holistic Development', desc: 'Academic, physical, and emotional growth of every student is our core focus.', icon: Users, color: 'text-[#27598C]', bg: 'bg-[#27598C]/10' },
              { title: 'Advanced Laboratories', desc: 'State-of-the-art science and computer labs for hands-on practical learning.', icon: BookOpen, color: 'text-[#589C47]', bg: 'bg-[#589C47]/10' },
              { title: 'Sports & Arts', desc: 'Comprehensive sports complex and dedicated arts programs for well-rounded growth.', icon: Trophy, color: 'text-yellow-600', bg: 'bg-[#E5D81A]/15' },
              { title: 'Safe & Secure Campus', desc: 'CCTV surveillance, GPS-enabled buses, and child-safe infrastructure throughout.', icon: Shield, color: 'text-[#27598C]', bg: 'bg-[#27598C]/10' },
              { title: 'Digital Library', desc: 'Extensive physical & digital book collection for deep research and learning.', icon: GraduationCap, color: 'text-[#589C47]', bg: 'bg-[#589C47]/10' },
              { title: 'Parent-School Connect', desc: 'Regular PTMs, digital progress reports, and transparent communication always.', icon: Clock, color: 'text-[#27598C]', bg: 'bg-[#27598C]/10' },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-4">
                  <div className={`w-12 h-12 ${feat.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0D2640] mb-1">{feat.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-20 bg-[#0D2640] rounded-[24px] sm:rounded-[32px] p-7 sm:p-10">
            {[
              { num: '2500+', label: 'Happy Students', icon: Users },
              { num: '150+', label: 'Expert Faculty', icon: Award },
              { num: '100%', label: 'Safe Campus', icon: Shield },
              { num: '25+', label: 'Years Excellence', icon: GraduationCap },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#E5D81A]/20 text-[#E5D81A] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.num}</h4>
                  <p className="text-slate-400 font-medium text-xs sm:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 sm:py-24 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">TESTIMONIALS</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D2640] tracking-tight">What Parents Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              { name: 'Rohan Mehta', role: 'Parent of Grade VII Student', text: 'Royal Public School has been a game-changer for my child. Teachers are incredibly supportive and dedicated to every student.' },
              { name: 'Priya Sharma', role: 'Parent of Grade X Student', text: "The school's focus on both academics and character building is remarkable. I've seen tremendous growth in my daughter." },
              { name: 'Ankit Verma', role: 'Parent of Grade V Student', text: 'Best school decision we ever made. The infrastructure, faculty, and extracurricular programs are world-class.' },
            ].map((test, idx) => (
              <div key={idx} className="bg-white p-7 sm:p-8 rounded-[24px] shadow-sm relative border border-slate-100">
                <div className="text-5xl text-[#E5D81A]/40 font-serif absolute top-4 left-5 leading-none">"</div>
                <div className="flex gap-1 mb-4 mt-5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#E5D81A] text-[#E5D81A]" />)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">{test.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#27598C]/10 rounded-full overflow-hidden relative shrink-0">
                    <Image src={`https://i.pravatar.cc/100?img=${idx + 20}`} alt={test.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D2640] text-sm">{test.name}</h4>
                    <p className="text-xs text-[#589C47] font-semibold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
            <div className="max-w-lg z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                Secure Your Child's <span className="text-[#E5D81A]">Bright Future</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">Admissions open for 2025–26. Limited seats available. Apply early to secure your spot.</p>
            </div>
            <Link href="/admissions" className="z-10 w-full md:w-auto shrink-0">
              <Button className="w-full md:w-auto bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-12 sm:h-14 px-8 text-sm sm:text-base font-extrabold rounded-full shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
