'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, Globe, Trophy, Users, Shield, 
  Target, Heart, BookOpen, Star, PlayCircle
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-slate-900 selection:bg-[#FF6B00]/20 overflow-hidden">
      <Navbar />

      {/* 1. HERO BANNER */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-white border-b border-[#E8EDF7]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#FF6B00]/5 via-yellow-400/5 to-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0B1B4D]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:pr-10"
            >
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#FF6B00]/20">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                Our Heritage
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#0B1B4D] tracking-tight leading-[1.1] mb-6">
                A Legacy Of <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Excellence & Vision</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                For over three decades, we have been shaping the future leaders of tomorrow through holistic education, unwavering core values, and global standards.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Button className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-600 text-white font-bold h-16 px-10 rounded-full shadow-xl shadow-orange-500/20 transition-all text-lg flex items-center justify-center gap-2">
                  Read Our Story <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0B1B4D] border-2 border-[#E8EDF7] hover:border-[#FF6B00] font-bold h-16 px-10 rounded-full transition-all text-lg flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-[#FF6B00]" /> Watch Video
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#E8EDF7]">
                {[
                  { n: '1990', l: 'Established' },
                  { n: '50K+', l: 'Alumni Worldwide' },
                  { n: 'Top 10', l: 'Global Ranking' },
                  { n: '150+', l: 'Awards Won' }
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-3xl font-extrabold text-[#0B1B4D]">{stat.n}</h4>
                    <p className="font-semibold text-slate-500 text-sm mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative h-[600px] lg:h-[750px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-[450px] h-[550px] rounded-[40px] overflow-hidden relative shadow-[0_30px_60px_rgba(11,27,77,0.1)] border border-[#E8EDF7] z-10"
                >
                  <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop" alt="Campus Main" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-3xl font-extrabold mb-1">Since 1990</h3>
                    <p className="text-white/80">Building futures with passion.</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-15, 15, -15] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-10 left-0 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Global Presence</h4>
                    <p className="text-xs font-semibold text-slate-500">Alumni in 45+ Countries</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-32 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6B00]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Excellence Award</h4>
                    <p className="text-xs font-semibold text-slate-500">Best Institution 2025</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-32 -right-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Fully Accredited</h4>
                    <p className="text-xs font-semibold text-slate-500">International Standards</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY BENTO GRID */}
      <section className="py-24 bg-white border-y border-[#E8EDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">OUR JOURNEY</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
              Driven By Purpose
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Vision - Large Square */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-[32px] overflow-hidden bg-[#0B1B4D] p-10 flex flex-col justify-end group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Target className="w-12 h-12 text-[#FF6B00] mb-6 relative z-10" />
              <h3 className="text-4xl font-extrabold text-white mb-4 relative z-10">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                To be a globally recognized institution that nurtures intellect, character, and innovation, preparing students to confidently navigate and lead in a dynamic world. We believe in education that goes beyond textbooks.
              </p>
            </div>

            {/* Mission - Horizontal */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden bg-white border border-[#E8EDF7] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] group hover:border-[#FF6B00] transition-colors">
              <Heart className="w-10 h-10 text-[#FF6B00] mb-4" />
              <h3 className="text-2xl font-extrabold text-[#0B1B4D] mb-2">Our Mission</h3>
              <p className="text-slate-500">
                To provide a stimulating learning environment that empowers students to achieve academic excellence, develop critical thinking skills, and foster a strong sense of social responsibility.
              </p>
            </div>

            {/* Values - Square */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden bg-[#F8FAFF] border border-[#E8EDF7] p-8 group hover:border-[#FF6B00] transition-colors">
              <Star className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-extrabold text-[#0B1B4D] mb-2">Integrity</h3>
              <p className="text-slate-500 text-sm">Honesty and strong moral principles in everything we do.</p>
            </div>

            {/* Values - Square */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden bg-[#F8FAFF] border border-[#E8EDF7] p-8 group hover:border-[#FF6B00] transition-colors">
              <Users className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-extrabold text-[#0B1B4D] mb-2">Diversity</h3>
              <p className="text-slate-500 text-sm">Celebrating differences and fostering an inclusive community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIRTUAL PARALLAX */}
      <section className="relative h-[600px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0B1B4D]/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            "Education is not preparation for life; education is life itself."
          </h2>
          <p className="text-xl text-[#FF6B00] font-bold tracking-widest uppercase mb-10">— John Dewey</p>
        </div>
      </section>

      {/* 4. LEADERSHIP (PREMIUM CARDS) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">LEADERSHIP</h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
            Meet Our Founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: 'Dr. Robert Harrison', r: 'Chairman & Founder', d: 'Former Dean of Education at Oxford University, Dr. Harrison founded GEA with a vision to redefine global learning standards.' },
            { n: 'Sarah Jenkins, PhD', r: 'Principal Director', d: 'With 25+ years in international education, Sarah leads the academic strategy and curriculum innovation across all campuses.' },
            { n: 'Marcus Chen', r: 'Head of Operations', d: 'Ensuring world-class infrastructure and seamless day-to-day campus experiences for thousands of students.' }
          ].map((leader, idx) => (
            <div key={idx} className="bg-white rounded-[32px] border border-[#E8EDF7] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 group">
              <div className="h-80 relative w-full overflow-hidden">
                <Image src={`https://i.pravatar.cc/400?img=${idx + 10}`} alt={leader.n} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8 relative bg-white">
                <h3 className="text-2xl font-extrabold text-[#0B1B4D] mb-1">{leader.n}</h3>
                <p className="text-[#FF6B00] font-bold text-sm uppercase tracking-wide mb-4">{leader.r}</p>
                <p className="text-slate-500 leading-relaxed">{leader.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GLOBAL ACCREDITATIONS */}
      <section className="py-24 bg-[#0B1B4D] text-center overflow-hidden">
        <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-12">RECOGNIZED GLOBALLY BY</h4>
        <div className="flex flex-wrap justify-center gap-12 sm:gap-20 max-w-5xl mx-auto px-4 opacity-70 hover:opacity-100 transition-opacity">
          {/* Faux logos using text/icons */}
          <div className="flex items-center gap-3 text-white font-bold text-2xl grayscale hover:grayscale-0 transition-all"><Globe className="w-8 h-8" /> EdGlobal</div>
          <div className="flex items-center gap-3 text-white font-bold text-2xl grayscale hover:grayscale-0 transition-all"><Shield className="w-8 h-8" /> Council of Edu</div>
          <div className="flex items-center gap-3 text-white font-bold text-2xl grayscale hover:grayscale-0 transition-all"><Trophy className="w-8 h-8" /> AcademiX</div>
          <div className="flex items-center gap-3 text-white font-bold text-2xl grayscale hover:grayscale-0 transition-all"><BookOpen className="w-8 h-8" /> STEM.org</div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,107,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Be A Part Of Our Legacy
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join a community of forward-thinkers, innovators, and leaders. Your journey to excellence starts here.
            </p>
            <Button className="bg-[#0B1B4D] hover:bg-[#061033] text-white h-16 px-12 text-xl font-bold rounded-full shadow-xl shadow-[#0B1B4D]/20 transition-all">
              Apply For Admission
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
