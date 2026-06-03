'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, FileText, CheckCircle, Upload, PlayCircle, Star, Shield
} from 'lucide-react'

export default function AdmissionsPage() {
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
                Admissions 2026 Now Open
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#0B1B4D] tracking-tight leading-[1.1] mb-6">
                Your Journey To <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Greatness Begins Here</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                Join a vibrant community of scholars, innovators, and leaders. We are looking for passionate individuals ready to make a global impact.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Button className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-600 text-white font-bold h-16 px-10 rounded-full shadow-xl shadow-orange-500/20 transition-all text-lg flex items-center justify-center gap-2">
                  Apply Online Now <ArrowRight className="w-5 h-5" />
                </Button>
                <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0B1B4D] border-2 border-[#E8EDF7] hover:border-[#FF6B00] font-bold h-16 px-10 rounded-full transition-all text-lg">
                  Admission Guidelines
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E8EDF7]">
                {[
                  { n: '100%', l: 'Placement Support' },
                  { n: '₹50M+', l: 'Scholarships Given' },
                  { n: '3-Step', l: 'Easy Process' }
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
                  <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" alt="Admissions" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-3xl font-extrabold mb-1">Class of 2026</h3>
                    <p className="text-white/80">Become part of the legacy.</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-15, 15, -15] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-10 left-0 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Simple Process</h4>
                    <p className="text-xs font-semibold text-slate-500">100% Online Application</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [15, -15, 15] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-32 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6B00]">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Merit Scholarships</h4>
                    <p className="text-xs font-semibold text-slate-500">Up to 100% Waiver</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-32 -right-10 bg-white/80 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white z-20 flex items-center gap-4 w-64"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B1B4D]">Secure Portal</h4>
                    <p className="text-xs font-semibold text-slate-500">Data Privacy Assured</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADMISSION PROCESS BENTO */}
      <section className="py-24 bg-white border-y border-[#E8EDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4">HOW IT WORKS</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B4D] tracking-tight">
              Streamlined Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#E8EDF7] -translate-y-1/2 z-0"></div>

            {[
              { s: '01', t: 'Submit Application', d: 'Fill the online form with your personal and academic details along with program preference.' },
              { s: '02', t: 'Document Upload & Test', d: 'Upload required documents. Eligible candidates will be invited for an online entrance evaluation.' },
              { s: '03', t: 'Offer & Enrollment', d: 'Successful candidates receive an offer letter. Pay the admission fee to secure your seat.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-10 border border-[#E8EDF7] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#FF6B00] transition-all relative z-10 group">
                <div className="text-5xl font-extrabold text-transparent [-webkit-text-stroke:2px_#E8EDF7] group-hover:[-webkit-text-stroke:2px_#FF6B00] transition-colors mb-6">
                  {step.s}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B1B4D] mb-4">{step.t}</h3>
                <p className="text-slate-500 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARALLAX SCHOLARSHIP */}
      <section className="relative h-[500px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070-5b58402eeae6?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0B1B4D]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Star className="w-16 h-16 text-[#FF6B00] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Merit Should Be Rewarded
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            We believe financial constraints should never stand in the way of exceptional talent. Explore our extensive scholarship programs covering up to 100% of tuition fees.
          </p>
          <Button className="bg-[#FF6B00] hover:bg-orange-600 text-white h-14 px-8 text-lg font-extrabold rounded-full shadow-[0_20px_50px_rgba(255,107,0,0.3)] transition-all">
            View Scholarships
          </Button>
        </div>
      </section>

      {/* 4. PREMIUM APPLICATION FORM AREA */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[40px] border border-[#E8EDF7] shadow-[0_30px_60px_rgba(11,27,77,0.05)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side Info */}
          <div className="bg-[#0B1B4D] lg:w-2/5 p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF6B00]/30 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-6">Begin Your Application</h2>
              <p className="text-slate-300 mb-12">Fill out the form with accurate details. Our admissions team will review your profile within 48 hours.</p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Have Documents Ready</h4>
                    <p className="text-slate-400 text-sm mt-1">Transcripts, ID proof, and passport photos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Secure Submission</h4>
                    <p className="text-slate-400 text-sm mt-1">Your data is encrypted and strictly confidential.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:w-3/5 p-12 lg:p-16 bg-white relative">
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-[#0B1B4D] text-sm ml-1">First Name</label>
                  <input type="text" className="w-full bg-[#F8FAFF] border border-[#E8EDF7] rounded-xl px-5 py-4 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-[#0B1B4D] text-sm ml-1">Last Name</label>
                  <input type="text" className="w-full bg-[#F8FAFF] border border-[#E8EDF7] rounded-xl px-5 py-4 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-[#0B1B4D] text-sm ml-1">Email Address</label>
                  <input type="email" className="w-full bg-[#F8FAFF] border border-[#E8EDF7] rounded-xl px-5 py-4 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-[#0B1B4D] text-sm ml-1">Phone Number</label>
                  <input type="tel" className="w-full bg-[#F8FAFF] border border-[#E8EDF7] rounded-xl px-5 py-4 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#0B1B4D] text-sm ml-1">Select Program</label>
                <select className="w-full bg-[#F8FAFF] border border-[#E8EDF7] rounded-xl px-5 py-4 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all text-slate-500 appearance-none">
                  <option>Choose a program...</option>
                  <option>B.Tech Computer Science</option>
                  <option>BBA Business Administration</option>
                  <option>MBA Master of Business</option>
                  <option>B.Des UI/UX Design</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-[#E8EDF7] hover:border-[#FF6B00] bg-[#F8FAFF] rounded-[24px] p-8 text-center transition-colors cursor-pointer group mt-8">
                <Upload className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
                <p className="font-bold text-[#0B1B4D]">Drag & Drop Resume/Transcripts</p>
                <p className="text-xs text-slate-500 mt-1">PDF or DOCX (Max 10MB)</p>
              </div>

              <Button className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white h-16 text-lg font-extrabold rounded-xl shadow-lg shadow-orange-500/30 transition-all mt-6">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,107,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Our admissions counselors are here to help you navigate the process and choose the right path.
            </p>
            <Button className="bg-[#0B1B4D] hover:bg-[#061033] text-white h-16 px-12 text-xl font-bold rounded-full shadow-xl shadow-[#0B1B4D]/20 transition-all">
              Contact Counselors
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
