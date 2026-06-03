'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Radio, Clock, MessageCircleQuestion, Award, Download, PlayCircle, MonitorPlay, Video, Layers, Scissors, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-200 overflow-hidden">
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-8 h-8 rounded-full bg-orange-400 opacity-20 blur-sm"></div>
        <div className="absolute top-[30%] right-[10%] w-12 h-12 rounded-full bg-purple-400 opacity-20 blur-md"></div>
        <div className="absolute bottom-[20%] left-[15%] w-10 h-10 rounded-full bg-blue-400 opacity-20 blur-sm"></div>
        <div className="absolute top-[60%] right-[5%] w-16 h-16 rounded-full bg-orange-500 opacity-10 blur-xl"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-[#FFF3E8] text-[#FF6B00] font-extrabold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#FF6B00]/20">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                Welcome to Our Campus
              </div>
              <h1 className="text-[56px] lg:text-[72px] font-[800] text-[#0B1B4D] tracking-tight leading-[1.1] mb-6">
                Shaping The <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-yellow-400 to-[#FF6B00]">Leaders of Tomorrow</span>
              </h1>
              <p className="text-xl text-[#64748B] mb-10 leading-relaxed max-w-xl font-medium">
                Experience world-class education designed to accelerate your career. Master practical skills, learn from global experts, and join a thriving professional community.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <Button className="bg-[#FF7A00] hover:bg-orange-600 text-white h-14 px-10 text-lg shadow-lg hover:shadow-orange-500/30 transition-all font-semibold rounded-full">
                  Admissions Open
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 z-${4 - i} relative overflow-hidden`}>
                        <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">65% <span className="text-sm font-normal text-slate-500">Students</span></span>
                    <span className="text-xs text-green-500 font-medium">Students In Average</span>
                  </div>
                </div>
              </div>

              {/* Analytics Cards */}
              <div className="pt-10 space-y-4 max-w-sm">
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="bg-white rounded-full p-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">December</h4>
                      <p className="text-xs text-slate-500">Rise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <div className="w-16 h-8 text-blue-500">
                      <svg viewBox="0 0 100 30" className="w-full h-full stroke-current" fill="none" strokeWidth="2"><path d="M0,20 Q10,5 20,15 T40,10 T60,25 T80,5 T100,15"></path></svg>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-blue-600">21k</h4>
                      <p className="text-xs text-slate-500">View</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                  className="bg-white rounded-full p-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">November</h4>
                      <p className="text-xs text-slate-500">Rise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <div className="w-16 h-8 text-red-500">
                      <svg viewBox="0 0 100 30" className="w-full h-full stroke-current" fill="none" strokeWidth="2"><path d="M0,25 Q10,10 20,20 T40,5 T60,15 T80,25 T100,10"></path></svg>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-red-500">30k</h4>
                      <p className="text-xs text-slate-500">View</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Graphic Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative lg:h-[600px] w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">

                {/* Main White Floating Container */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="w-[420px] h-[420px] bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.08)] flex items-center justify-center relative z-10"
                >
                  {/* Outer Segmented Ring */}
                  <div
                    className="relative w-[280px] h-[280px] rounded-full flex items-center justify-center"
                    style={{ background: 'conic-gradient(#2DD4BF 0deg 90deg, #3B82F6 90deg 180deg, #A855F7 180deg 270deg, #F97316 270deg 360deg)' }}
                  >
                    <div className="absolute inset-[26px] bg-white rounded-full flex items-center justify-center">
                      {/* Inner Segmented Ring */}
                      <div
                        className="relative w-[180px] h-[180px] rounded-full flex items-center justify-center"
                        style={{ background: 'conic-gradient(#FACC15 0deg 120deg, #2DD4BF 120deg 240deg, #F472B6 240deg 360deg)' }}
                      >
                        <div className="absolute inset-[18px] bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements (Badges & Icons) */}

                  {/* 1. Top Red Alert Badge */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.2 }}
                    className="absolute -top-6 left-16 w-[70px] h-[70px] bg-[#FF5A5F] rounded-full shadow-[0_15px_30px_rgba(255,90,95,0.4)] flex items-center justify-center text-white text-3xl font-extrabold z-20"
                  >
                    !
                  </motion.div>

                  {/* 2. Top Right User Card */}
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-8 -right-10 bg-white rounded-[24px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col items-center gap-4 z-20 w-[200px]"
                  >
                    <span className="text-base font-extrabold text-[#0B1B4D]">Payroll Teacher</span>
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#BFDBFE] border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-[#FECDD3] border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-[#A7F3D0] border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-[#0F172A] border-2 border-white flex items-center justify-center text-white text-xs font-bold">+30</div>
                    </div>
                  </motion.div>

                  {/* 3. Bottom Left Analytics Card */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute bottom-20 -left-16 bg-white rounded-[20px] p-4 px-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-5 z-20"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF7A00]"></div>
                    <div className="space-y-3 w-20">
                      <div className="h-3 w-full bg-[#E2E8F0] rounded-full"></div>
                      <div className="h-3 w-4/5 bg-[#E2E8F0] rounded-full"></div>
                    </div>
                  </motion.div>

                  {/* 4. Bottom Right White Data Card */}
                  <motion.div
                    animate={{ y: [8, -8, 8] }}
                    transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1.5 }}
                    className="absolute -bottom-10 -right-4 w-[280px] bg-white rounded-[32px] shadow-[0_25px_50px_rgba(0,0,0,0.12)] p-7 z-20"
                  >
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      {[
                        ['Modern', 'Campus'],
                        ['Expert', 'Faculty'],
                        ['Smart', 'Classes'],
                        ['Sports', 'Complex']
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#FFF3E8] flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <div className="flex flex-col text-sm font-bold text-[#0B1B4D] leading-tight">
                            <span>{item[0]}</span>
                            <span>{item[1]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Extra Decorative Element (Small Orange Dot from Image) */}
                  <div className="absolute bottom-10 left-12 w-3 h-3 bg-[#FF7A00] rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-28 bg-[#071B4A] relative overflow-hidden rounded-tl-[80px] rounded-br-[80px] my-10 max-w-[1400px] mx-auto">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-[#FF7A00] font-bold uppercase tracking-widest text-sm mb-3">Programs</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              Our Academic Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><MonitorPlay className="w-7 h-7" /></div>, title: 'Science' },
              { icon: <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6"><Video className="w-7 h-7" /></div>, title: 'Arts' },
              { icon: <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-6"><Layers className="w-7 h-7" /></div>, title: 'Commerce' },
              { icon: <div className="w-14 h-14 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center mb-6"><Scissors className="w-7 h-7" /></div>, title: 'Sports' },
              { icon: <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm"><GraduationCap className="w-7 h-7" /></div>, title: 'Primary', active: true }
            ].map((course, idx) => (
              <div
                key={idx}
                className={`relative group rounded-[32px] p-8 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-2xl ${course.active ? 'bg-[#FF7A00] text-white' : 'bg-white text-slate-800 hover:shadow-blue-900/20'}`}
              >
                {course.icon}
                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                <p className={`text-sm mb-8 leading-relaxed ${course.active ? 'text-white/80' : 'text-slate-500'}`}>
                  Nurturing excellence in every discipline.
                </p>
                <div className={`font-bold inline-flex items-center group-hover:gap-3 transition-all gap-2 ${course.active ? 'text-white' : 'text-blue-600'}`}>
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h4 className="text-[#FF7A00] font-bold uppercase tracking-widest text-sm mb-3">WHY CHOOSE US</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Excellence in Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Holistic Development', desc: 'Focusing on academic, physical, and emotional growth of every student.', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
              { title: 'Advanced Labs', desc: 'State-of-the-art science and computer laboratories for practical learning.', icon: MonitorPlay, color: 'text-purple-500', bg: 'bg-purple-50' },
              { title: 'Sports & Arts', desc: 'Comprehensive facilities for various sports and creative arts programs.', icon: Award, color: 'text-green-500', bg: 'bg-green-50' },
              { title: 'Safe Transport', desc: 'GPS-enabled school buses covering all major routes across the city.', icon: Radio, color: 'text-red-500', bg: 'bg-red-50' },
              { title: 'Digital Library', desc: 'Extensive collection of books and digital resources for research.', icon: Layers, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { title: 'Parent Portal', desc: 'Real-time updates on student progress, attendance, and school events.', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex gap-6">
                  <div className={`w-16 h-16 ${feat.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${feat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feat.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-6">{feat.desc}</p>
                    <Link href="#" className={`font-bold inline-flex items-center text-sm ${feat.color} hover:opacity-80`}>
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28">
            {[
              { num: '2500+', label: 'Happy Students', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
              { num: '150+', label: 'Expert Faculty', icon: Award, color: 'text-red-400', bg: 'bg-red-50' },
              { num: '100%', label: 'Safety Record', icon: PlayCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
              { num: '25+', label: 'Years of Excellence', icon: GraduationCap, color: 'text-green-500', bg: 'bg-green-50' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-4xl font-extrabold text-[#0F172A] mb-2">{stat.num}</h4>
                  <p className="text-[#64748B] font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-[#FF7A00] font-bold uppercase tracking-widest text-sm mb-3">TESTIMONIALS</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              What Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rohan Mehta', role: 'Parent', text: "The school has provided an excellent environment for my child's overall development. The teachers are highly supportive." },
              { name: 'Priya Sharma', role: 'Parent', text: "I've seen remarkable improvement in my daughter's confidence and academic performance since joining this school." },
              { name: 'Ankit Verma', role: 'Parent', text: "Best school in the city. The focus on both academics and extracurricular activities is truly commendable." }
            ].map((test, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                <div className="text-6xl text-orange-200 font-serif absolute top-6 left-8">"</div>
                <p className="text-[#64748B] font-medium leading-relaxed mb-10 mt-8 relative z-10">
                  {test.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?img=${idx + 20}`} alt={test.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{test.name}</h4>
                    <p className="text-sm text-[#64748B]">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            <div className="w-3 h-3 rounded-full bg-[#FF7A00]"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-[40px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_50px_rgb(0,0,0,0.06)] relative overflow-hidden">
            {/* Decorative CTA elements */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-orange-300 text-6xl transform rotate-12 hidden md:block">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-1.3 1.3-3.2 1.3-4.5 0-1.3-1.3-1.3-3.2 0-4.5L10.5 7.5"></path><path d="m18 10 3-3-3-3"></path><path d="m21 7-9 9"></path></svg>
            </div>

            <div className="max-w-xl z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
                Ready to secure your <br /><span className="text-[#FF7A00]">Child's Future?</span>
              </h2>
              <p className="text-lg text-slate-500">
                Welcome to our prestigious institution, where academic excellence meets holistic development. We nurture minds to become global citizens.
              </p>
            </div>
            <Button className="bg-[#FF7A00] hover:bg-orange-600 text-white h-16 px-10 text-lg font-bold rounded-full shadow-xl transition-all z-10 flex items-center gap-2">
              Apply for Admission <ArrowRight className="w-5 h-5 bg-white/20 rounded-full p-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
