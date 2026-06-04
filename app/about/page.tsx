'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Trophy, Users, Shield, Target, Heart, BookOpen, Star, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#27598C]/8 via-[#589C47]/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E5D81A]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:pl-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E5D81A]/20 text-[#27598C] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#E5D81A]/40">
                <span className="w-2 h-2 rounded-full bg-[#E5D81A] animate-pulse"></span>
                Our Heritage
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#0D2640] tracking-tight leading-[1.1] mb-5">
                A Legacy of <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27598C] to-[#589C47]">Excellence & Vision</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                For over two decades, Royal Public School has been shaping future leaders through holistic education, strong values, and global academic standards.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <Button className="w-full sm:w-auto bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold h-12 sm:h-14 px-8 rounded-full shadow-lg shadow-[#27598C]/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                  Read Our Story <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white text-[#27598C] border-2 border-[#27598C]/30 hover:border-[#27598C] font-bold h-12 sm:h-14 px-8 rounded-full transition-all text-sm sm:text-base">
                  Watch Video
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                {[{ n: '1995', l: 'Established' }, { n: '12K+', l: 'Alumni' }, { n: 'Top 5', l: 'State Ranking' }, { n: '80+', l: 'Awards Won' }].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-extrabold text-[#27598C]">{stat.n}</h4>
                    <p className="font-semibold text-slate-500 text-sm mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative h-[350px] sm:h-[450px] lg:h-[560px] w-full mt-10 lg:mt-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full h-full max-w-[420px] max-h-[520px] rounded-3xl sm:rounded-[40px] overflow-hidden relative shadow-[0_30px_60px_rgba(39,89,140,0.12)] border border-slate-100 z-10">
                  <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop" alt="Campus" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white">
                    <h3 className="text-xl sm:text-2xl font-extrabold mb-1">Since 1995</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Building futures with passion.</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="absolute top-4 sm:top-10 left-0 sm:-left-4 lg:left-0 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-44 sm:w-60">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#27598C]/10 rounded-xl flex items-center justify-center text-[#27598C] shrink-0"><Globe className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Global Presence</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Alumni in 30+ Countries</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }} className="absolute bottom-10 sm:bottom-32 left-0 sm:-left-8 lg:-left-4 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-48 sm:w-60">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E5D81A]/20 rounded-xl flex items-center justify-center text-yellow-600 shrink-0"><Trophy className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Excellence Award</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500">Best School 2024</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }} className="absolute top-24 sm:top-32 right-0 sm:-right-8 lg:-right-4 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-44 sm:w-60">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#589C47]/10 rounded-xl flex items-center justify-center text-[#589C47] shrink-0"><Shield className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Fully Accredited</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">CBSE Affiliated</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY BENTO */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">OUR JOURNEY</h4>
            <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">Driven By Purpose</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[560px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-[32px] overflow-hidden bg-[#0D2640] p-10 flex flex-col justify-end group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Target className="w-12 h-12 text-[#E5D81A] mb-6 relative z-10" />
              <h3 className="text-3xl font-extrabold text-white mb-4 relative z-10">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed relative z-10">To be a globally recognized institution that nurtures intellect, character, and innovation — preparing students to lead confidently in a dynamic world.</p>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] bg-white border border-slate-100 p-8 shadow-sm group hover:border-[#27598C] transition-colors">
              <Heart className="w-10 h-10 text-[#27598C] mb-4" />
              <h3 className="text-2xl font-extrabold text-[#0D2640] mb-2">Our Mission</h3>
              <p className="text-slate-500 text-sm leading-relaxed">To provide a stimulating learning environment that empowers students to achieve academic excellence, critical thinking, and social responsibility.</p>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#F4F7FB] border border-slate-100 p-8 group hover:border-[#589C47] transition-colors">
              <Star className="w-8 h-8 text-[#E5D81A] mb-4" />
              <h3 className="text-xl font-extrabold text-[#0D2640] mb-2">Integrity</h3>
              <p className="text-slate-500 text-sm">Honesty and strong moral principles in everything we do.</p>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#F4F7FB] border border-slate-100 p-8 group hover:border-[#27598C] transition-colors">
              <Users className="w-8 h-8 text-[#589C47] mb-4" />
              <h3 className="text-xl font-extrabold text-[#0D2640] mb-2">Diversity</h3>
              <p className="text-slate-500 text-sm">Celebrating differences and fostering an inclusive community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section className="relative h-[480px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0D2640]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            "Education is not preparation for life; education is life itself."
          </h2>
          <p className="text-xl text-[#E5D81A] font-bold tracking-widest uppercase">— John Dewey</p>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">LEADERSHIP</h4>
          <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">Meet Our Founders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: 'Dr. Robert Harrison', r: 'Chairman & Founder', d: 'Former principal at a national board institution with 30+ years in education leadership.' },
            { n: 'Sarah Jenkins, PhD', r: 'Principal Director', d: 'Expert in curriculum development and student-first pedagogy with international experience.' },
            { n: 'Marcus Chen', r: 'Head of Operations', d: 'Ensuring world-class infrastructure and seamless school operations for every student.' }
          ].map((leader, idx) => (
            <div key={idx} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 group">
              <div className="h-72 relative w-full overflow-hidden">
                <Image src={`https://i.pravatar.cc/400?img=${idx + 10}`} alt={leader.n} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-xl font-extrabold text-[#0D2640] mb-1">{leader.n}</h3>
                <p className="text-[#27598C] font-bold text-xs uppercase tracking-wide mb-4">{leader.r}</p>
                <p className="text-slate-500 leading-relaxed text-sm">{leader.d}</p>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Be A Part Of Our Legacy</h2>
            <p className="text-slate-300 mb-10 text-base">Join a community of forward-thinkers, innovators, and leaders. Your journey to excellence starts here.</p>
            <Link href="/admissions">
              <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-14 px-12 text-base font-extrabold rounded-full shadow-xl transition-all hover:-translate-y-0.5">
                Apply For Admission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
