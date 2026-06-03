'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, BookOpen, MonitorPlay, FlaskConical, Wifi, 
  Dumbbell, Building2, Coffee, Bus, HeartPulse, Microscope, 
  Lightbulb, Users, PlayCircle, Layers, Layout, Cpu, Award
} from 'lucide-react'

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-slate-900 selection:bg-[#FF6B00]/20 overflow-hidden">
      <Navbar />

      {/* 1. HERO BANNER */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-white border-b border-[#E8EDF7]">
        {/* Decorative Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#FF6B00]/5 via-yellow-400/5 to-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0B1B4D]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:pr-10"
            >
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#FF6B00]/20">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
                Campus Facilities
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#0B1B4D] tracking-tight leading-[1.1] mb-6">
                Everything You Need To <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Learn, Grow & Succeed</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                Experience world-class infrastructure, modern learning spaces, advanced laboratories, sports facilities, and student-centered environments.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Button className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-600 text-white font-bold h-16 px-10 rounded-full shadow-xl shadow-orange-500/20 transition-all text-lg flex items-center justify-center gap-2">
                  Explore Facilities <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0B1B4D] border-2 border-[#E8EDF7] hover:border-[#FF6B00] font-bold h-16 px-10 rounded-full transition-all text-lg">
                  Schedule Campus Visit
                </Button>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#E8EDF7]">
                {[
                  { n: '35K+', l: 'Students' },
                  { n: '250+', l: 'Faculty' },
                  { n: '50+', l: 'Labs' },
                  { n: '95%', l: 'Satisfaction Rate' }
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-3xl font-extrabold text-[#0B1B4D]">{stat.n}</h4>
                    <p className="font-semibold text-slate-500 text-sm mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Collage */}
            <div className="relative h-[600px] lg:h-[750px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Center Main Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-[450px] h-[550px] rounded-[40px] overflow-hidden relative shadow-[0_30px_60px_rgba(11,27,77,0.1)] border border-[#E8EDF7] z-10"
                >
                  <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop" alt="Campus Main" fill className="object-cover" />
                </motion.div>

                {/* Floating Glass Cards */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-10 left-0 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Central Library</h4>
                    <p className="text-xs font-semibold text-slate-500">100k+ Resources</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-32 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6B00]">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Sports Complex</h4>
                    <p className="text-xs font-semibold text-slate-500">Olympic Standard</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-32 -right-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Innovation Lab</h4>
                    <p className="text-xs font-semibold text-slate-500">24/7 Access</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }} 
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute bottom-10 right-0 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Modern Hostels</h4>
                    <p className="text-xs font-semibold text-slate-500">AC & Wi-Fi Ready</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY OUR CAMPUS STANDS OUT */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
            <Image src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1486&auto=format&fit=crop" alt="Campus Life" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D] via-[#0B1B4D]/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-extrabold mb-2">A City Within A City</h3>
              <p className="text-slate-300">150 Acres of Green Campus</p>
            </div>
          </div>
          <div>
            <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">CAMPUS OVERVIEW</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight mb-8">
              Why Our Campus Stands Out
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-slate-500 leading-relaxed">
                Designed to stimulate creativity and collaboration, our campus blends modern architecture with sustainable green spaces. We provide an ecosystem where students have immediate access to world-class academic, athletic, and recreational amenities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  { t: 'High-Speed Wi-Fi', d: 'Seamless connectivity across all 150 acres.', i: Wifi },
                  { t: 'Smart Security', d: '24/7 AI-monitored campus safety.', i: Layers },
                  { t: 'Eco-Friendly', d: '100% solar-powered academic blocks.', i: Lightbulb },
                  { t: 'Global Community', d: 'Students from over 45+ countries.', i: Users },
                ].map((feat, idx) => {
                  const Icon = feat.i;
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#E8EDF7] flex items-center justify-center flex-shrink-0 text-[#FF6B00]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0B1B4D]">{feat.t}</h4>
                        <p className="text-sm text-slate-500 mt-1">{feat.d}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED FACILITIES (BENTO GRID) */}
      <section className="py-24 bg-white border-y border-[#E8EDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">INFRASTRUCTURE</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
              Featured Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[900px]">
            {/* Library - Large Square */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop" alt="Library" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D] to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <BookOpen className="w-10 h-10 mb-4 text-[#FF6B00]" />
                <h3 className="text-3xl font-extrabold mb-2">Central Library</h3>
                <p className="text-slate-300">24/7 Access • 100k+ Books • Digital Archives</p>
              </div>
            </div>

            {/* Innovation Labs - Horizontal Rectangle */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop" alt="Innovation Lab" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <Lightbulb className="w-8 h-8 mb-3 text-yellow-400" />
                <h3 className="text-2xl font-extrabold mb-1">Innovation Labs</h3>
                <p className="text-slate-300 text-sm">Robotics • 3D Printing • AI Sandbox</p>
              </div>
            </div>

            {/* Smart Classrooms - Square */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1470&auto=format&fit=crop" alt="Classroom" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <MonitorPlay className="w-8 h-8 mb-3 text-blue-400" />
                <h3 className="text-xl font-extrabold mb-1">Smart Classes</h3>
                <p className="text-slate-300 text-xs">Interactive Boards</p>
              </div>
            </div>

            {/* Auditorium - Square */}
            <div className="md:col-span-1 md:row-span-1 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1469&auto=format&fit=crop" alt="Auditorium" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <PlayCircle className="w-8 h-8 mb-3 text-purple-400" />
                <h3 className="text-xl font-extrabold mb-1">Auditorium</h3>
                <p className="text-slate-300 text-xs">2000+ Capacity</p>
              </div>
            </div>

            {/* Sports Complex - Horizontal */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Sports" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <Dumbbell className="w-8 h-8 mb-3 text-[#FF6B00]" />
                <h3 className="text-2xl font-extrabold mb-1">Sports Complex</h3>
                <p className="text-slate-300 text-sm">Indoor Arena • Swimming Pool • Gym</p>
              </div>
            </div>

            {/* Hostels - Horizontal */}
            <div className="md:col-span-2 md:row-span-1 relative rounded-[32px] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1469&auto=format&fit=crop" alt="Hostels" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <Building2 className="w-8 h-8 mb-3 text-green-400" />
                <h3 className="text-2xl font-extrabold mb-1">Premium Hostels</h3>
                <p className="text-slate-300 text-sm">AC Rooms • 24/7 Dining • Security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL CAMPUS EXPERIENCE */}
      <section className="relative h-[600px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0B1B4D]/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Virtual Campus Experience</h2>
          <p className="text-xl text-slate-300 mb-10">Take a 360° tour of our sprawling campus from the comfort of your home.</p>
          <Button className="bg-white hover:bg-slate-100 text-[#0B1B4D] h-16 px-10 text-lg font-extrabold rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all flex items-center gap-3 mx-auto hover:scale-105">
            <PlayCircle className="w-6 h-6 text-[#FF6B00]" /> Take A Virtual Tour
          </Button>
        </div>
      </section>

      {/* 5. ACADEMIC INFRASTRUCTURE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
            Academic Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: MonitorPlay, t: 'Smart Classrooms', d: 'Equipped with digital boards and hybrid learning tech.' },
            { icon: BookOpen, t: 'Digital Library', d: 'Access to global journals, e-books, and research papers.' },
            { icon: Microscope, t: 'Research Labs', d: 'State-of-the-art equipment for scientific research.' },
            { icon: Lightbulb, t: 'Innovation Center', d: 'Incubator spaces for student startups and projects.' },
            { icon: Layout, t: 'Project Spaces', d: 'Collaborative rooms designed for group assignments.' },
            { icon: Cpu, t: 'Computer Centers', d: 'High-performance workstations with latest software.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-[24px] p-8 border border-[#E8EDF7] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                <div className="w-16 h-16 bg-[#F8FAFF] rounded-2xl flex items-center justify-center text-[#0B1B4D] mb-6 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1B4D] mb-3">{item.t}</h3>
                <p className="text-slate-500 leading-relaxed">{item.d}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. STUDENT LIFE FACILITIES */}
      <section className="py-24 bg-white border-y border-[#E8EDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
              Student Life Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Coffee, t: 'Cafeteria', d: 'Multi-cuisine dining with strict hygiene standards.' },
              { icon: Dumbbell, t: 'Gymnasium', d: 'Fully equipped fitness center with certified trainers.' },
              { icon: Award, t: 'Sports Arena', d: 'Courts for basketball, tennis, and a football turf.' },
              { icon: Building2, t: 'Hostels', d: 'Secure, comfortable living spaces for boys and girls.' },
              { icon: HeartPulse, t: 'Medical Center', d: '24/7 on-campus clinic with visiting doctors.' },
              { icon: Bus, t: 'Transport', d: 'Fleet of GPS-enabled AC buses covering the city.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#F8FAFF] rounded-[24px] p-6 border border-[#E8EDF7] flex items-start gap-5 hover:border-[#FF6B00] transition-colors group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#FF6B00] shadow-sm border border-[#E8EDF7] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1B4D] mb-2">{item.t}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. GALLERY SHOWCASE (MASONRY) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
            Gallery Showcase
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[
            { img: '1541829070-5b58402eeae6?q=80&w=1470', h: 'h-64' },
            { img: '1593696140826-c38b17268c15?q=80&w=1470', h: 'h-96' },
            { img: '1523240795612-9a054b0db644?q=80&w=1470', h: 'h-80' },
            { img: '1519389953810-195581577282?q=80&w=1470', h: 'h-96' },
            { img: '1577896851231-70ef18881754?q=80&w=1470', h: 'h-64' },
            { img: '1523050854058-8df90110c9f1?q=80&w=1470', h: 'h-80' },
          ].map((item, idx) => (
            <div key={idx} className={`w-full ${item.h} relative rounded-[24px] overflow-hidden group break-inside-avoid`}>
              <Image src={`https://images.unsplash.com/photo-${item.img}&auto=format&fit=crop`} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CAMPUS STATISTICS */}
      <section className="py-24 bg-[#0B1B4D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '50+', label: 'Advanced Labs' },
              { num: '10+', label: 'Academic Buildings' },
              { num: '20+', label: 'Sports Activities' },
              { num: '150+', label: 'Acres Campus' }
            ].map((stat, idx) => (
              <div key={idx}>
                <h4 className="text-5xl md:text-6xl font-extrabold text-white mb-2">{stat.num}</h4>
                <p className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STUDENT TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
            Student Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Arjun M.', course: 'Computer Science', text: "The innovation labs are accessible 24/7. Built my first startup right from the campus incubator!" },
            { name: 'Sneha P.', course: 'Business Admin', text: "The library and study spaces provide the perfect environment for focused learning and collaboration." },
            { name: 'Karan V.', course: 'Mechanical Eng.', text: "World-class sports facilities kept me active, and the hostel life is incredibly secure and fun." }
          ].map((test, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#E8EDF7] relative hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl text-blue-50 font-serif absolute top-6 left-8">"</div>
              <p className="text-slate-600 font-medium leading-relaxed mb-8 mt-6 relative z-10">
                {test.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/100?img=${idx+55}`} alt={test.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1B4D]">{test.name}</h4>
                  <p className="text-sm text-[#FF6B00] font-semibold">{test.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,107,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Discover A Campus Designed For Success
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Come see for yourself what makes our institution the perfect place to learn, grow, and succeed.
            </p>
            <Button className="bg-[#0B1B4D] hover:bg-[#061033] text-white h-16 px-12 text-xl font-bold rounded-full shadow-xl shadow-[#0B1B4D]/20 transition-all">
              Book Campus Visit
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
