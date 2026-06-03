'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, BookOpen, MonitorPlay, Database, Cpu, 
  Lightbulb, Briefcase, Globe, Microscope, PlayCircle, Star
} from 'lucide-react'

export default function AcademicsPage() {
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
                World-Class Curriculum
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#0B1B4D] tracking-tight leading-[1.1] mb-6">
                Discover Your <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Academic Potential</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                Our innovative academic programs blend rigorous coursework with hands-on experience, preparing you to thrive in a rapidly evolving global landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Button className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-600 text-white font-bold h-16 px-10 rounded-full shadow-xl shadow-orange-500/20 transition-all text-lg flex items-center justify-center gap-2">
                  Explore Programs <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0B1B4D] border-2 border-[#E8EDF7] hover:border-[#FF6B00] font-bold h-16 px-10 rounded-full transition-all text-lg">
                  Download Prospectus
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#E8EDF7]">
                {[
                  { n: '150+', l: 'Programs' },
                  { n: '98%', l: 'Graduation Rate' },
                  { n: '40+', l: 'Global Partners' },
                  { n: '12:1', l: 'Student-Faculty Ratio' }
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
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop" alt="Academics" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-3xl font-extrabold mb-1">Empowering Minds</h3>
                    <p className="text-white/80">Interactive & collaborative learning.</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-15, 15, -15] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-10 left-0 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <MonitorPlay className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Technology</h4>
                    <p className="text-xs font-semibold text-slate-500">CS & Engineering</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-32 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6B00]">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Business</h4>
                    <p className="text-xs font-semibold text-slate-500">Management & Finance</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-32 -right-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Sciences</h4>
                    <p className="text-xs font-semibold text-slate-500">Research & Discovery</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACADEMIC PHILOSOPHY BENTO GRID */}
      <section className="py-24 bg-white border-y border-[#E8EDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">OUR APPROACH</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
              Academic Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Phil - Large Rectangle */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden bg-[#0B1B4D] p-10 flex flex-col justify-center group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl font-extrabold text-white mb-4 relative z-10">Experiential Learning</h3>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                We bridge the gap between theory and practice. Our students engage in hands-on projects, internships, and research from day one, ensuring they graduate with real-world experience, not just textbook knowledge.
              </p>
            </div>

            {/* Small card */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden bg-[#F8FAFF] border border-[#E8EDF7] p-8 group hover:border-[#FF6B00] transition-colors">
              <Globe className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-extrabold text-[#0B1B4D] mb-2">Global Perspective</h3>
              <p className="text-slate-500 text-sm">Curriculums designed to solve international challenges.</p>
            </div>

            {/* Small card */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden bg-[#F8FAFF] border border-[#E8EDF7] p-8 group hover:border-[#FF6B00] transition-colors">
              <Cpu className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-extrabold text-[#0B1B4D] mb-2">Tech-Integrated</h3>
              <p className="text-slate-500 text-sm">AI, coding, and digital literacy embedded in all programs.</p>
            </div>

            {/* Medium Rectangle */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden bg-white border border-[#E8EDF7] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] group hover:border-[#FF6B00] transition-colors flex items-center gap-8">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B00] shrink-0">
                <Lightbulb className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#0B1B4D] mb-2">Critical Thinking Focus</h3>
                <p className="text-slate-500">
                  We don't teach students what to think, but how to think. Debates, case studies, and open-ended problem-solving are central to our methodology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX ACADEMIC */}
      <section className="relative h-[500px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0B1B4D]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <BookOpen className="w-16 h-16 text-[#FF6B00] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Learning Beyond Classrooms
          </h2>
          <Button className="bg-white hover:bg-slate-100 text-[#0B1B4D] h-14 px-8 text-lg font-extrabold rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all">
            View Academic Calendar
          </Button>
        </div>
      </section>

      {/* 4. FACULTY EXCELLENCE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">EXPERT GUIDANCE</h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
            Learn From The Best
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { n: 'Prof. David Miller', r: 'Dean of Sciences', s: 'Physics & Quantum Mech' },
            { n: 'Dr. Anita Desai', r: 'Head of Technology', s: 'AI & Machine Learning' },
            { n: 'James Sterling', r: 'Director of Business', s: 'Macroeconomics' },
            { n: 'Dr. Maria Garcia', r: 'Lead Arts Faculty', s: 'Modern Literature' },
          ].map((fac, idx) => (
            <div key={idx} className="bg-white rounded-[24px] border border-[#E8EDF7] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 relative w-full bg-slate-200 overflow-hidden">
                <Image src={`https://i.pravatar.cc/300?img=${idx + 30}`} alt={fac.n} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-[#0B1B4D] mb-1">{fac.n}</h3>
                <p className="text-[#FF6B00] font-bold text-xs uppercase tracking-wide mb-3">{fac.r}</p>
                <div className="inline-block bg-[#F8FAFF] px-3 py-1 rounded-md border border-[#E8EDF7] text-xs font-semibold text-slate-500">
                  {fac.s}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,107,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Ready To Elevate Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Browse our complete catalog of undergraduate and postgraduate programs.
            </p>
            <Button className="bg-[#0B1B4D] hover:bg-[#061033] text-white h-16 px-12 text-xl font-bold rounded-full shadow-xl shadow-[#0B1B4D]/20 transition-all">
              View All Programs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
