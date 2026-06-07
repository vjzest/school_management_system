'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, CheckCircle, Upload, Star, Shield, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentEmail: '',
    phone: '',
    classApplied: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!formData.firstName || !formData.lastName || !formData.parentEmail || !formData.phone || !formData.classApplied) {
      toast.error("Please fill all required fields")
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admissions/apply`, formData)
      if (res.data.success) {
        toast.success("Application submitted successfully!")
        setFormData({ firstName: '', lastName: '', parentEmail: '', phone: '', classApplied: '' })
      }
    } catch (err) {
      toast.error("Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }
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
              <div className="inline-flex items-center gap-2 bg-[#E5D81A]/20 text-[#27598C] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-8 border border-[#E5D81A]/40">
                <span className="w-2 h-2 rounded-full bg-[#E5D81A] animate-pulse"></span>
                Admissions 2025–26 Now Open
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#0D2640] tracking-tight leading-[1.1] mb-5">
                Your Journey To <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27598C] to-[#589C47]">Greatness Begins Here</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                Join Royal Public School's vibrant community of scholars. We are looking for bright, passionate students ready to excel and make a difference.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <a href="#application-form" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold h-12 sm:h-14 px-8 rounded-full shadow-lg shadow-[#27598C]/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    Apply Online Now <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <Button className="w-full sm:w-auto bg-white text-[#27598C] border-2 border-[#27598C]/30 hover:border-[#27598C] font-bold h-12 sm:h-14 px-8 rounded-full transition-all text-sm sm:text-base">
                  Admission Guidelines
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                {[{ n: '100%', l: 'Placement Support' }, { n: 'CBSE', l: 'Affiliated' }, { n: '3-Step', l: 'Easy Process' }].map((stat, i) => (
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
                  <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" alt="Admissions" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2640]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white">
                    <h3 className="text-xl sm:text-2xl font-extrabold mb-1">Class of 2026</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Become part of the legacy.</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="absolute top-4 sm:top-10 left-0 sm:-left-4 lg:left-0 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-44 sm:w-56">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#589C47]/10 rounded-xl flex items-center justify-center text-[#589C47] shrink-0"><CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Simple Process</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">100% Online</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }} className="absolute bottom-10 sm:bottom-32 left-0 sm:-left-8 lg:-left-4 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-48 sm:w-56">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E5D81A]/20 rounded-xl flex items-center justify-center text-yellow-700 shrink-0"><Star className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Merit Awards</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500">Up to 50% Waiver</p>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }} className="absolute top-24 sm:top-32 right-0 sm:-right-8 lg:-right-4 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[24px] shadow-xl border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 w-44 sm:w-56">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#27598C]/10 rounded-xl flex items-center justify-center text-[#27598C] shrink-0"><Shield className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <div>
                    <h4 className="font-extrabold text-[#0D2640] text-xs sm:text-sm">Secure Portal</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Data Privacy Assured</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h4 className="text-[#589C47] font-bold uppercase tracking-widest text-sm mb-4">HOW IT WORKS</h4>
            <h2 className="text-4xl font-extrabold text-[#0D2640] tracking-tight">Streamlined Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            {[
              { s: '01', t: 'Submit Application', d: 'Fill the online form with your personal and academic details along with class preference.' },
              { s: '02', t: 'Document Upload & Test', d: 'Upload required documents. Eligible students will be invited for a simple entrance evaluation.' },
              { s: '03', t: 'Offer & Enrollment', d: 'Successful candidates receive an offer letter. Pay the admission fee to confirm your seat.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[28px] p-9 border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#27598C]/30 transition-all relative z-10 group">
                <div className="text-5xl font-extrabold text-[#E5D81A]/40 group-hover:text-[#E5D81A]/70 transition-colors mb-5">{step.s}</div>
                <h3 className="text-xl font-extrabold text-[#0D2640] mb-3">{step.t}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX */}
      <section className="relative h-[440px] w-full bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070-5b58402eeae6?q=80&w=1470&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0D2640]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <GraduationCap className="w-14 h-14 text-[#E5D81A] mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Merit Should Be Rewarded</h2>
          <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-13 px-8 text-base font-extrabold rounded-full shadow-xl transition-all">View Scholarships</Button>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="application-form" className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 scroll-mt-20">
        <div className="bg-white rounded-[36px] border border-slate-100 shadow-[0_20px_60px_rgba(39,89,140,0.07)] overflow-hidden flex flex-col lg:flex-row">
          {/* Left Info */}
          <div className="bg-[#0D2640] lg:w-2/5 p-12 lg:p-14 text-white relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#27598C]/50 rounded-full blur-[60px]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5D81A]/10 rounded-full blur-[40px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-4">Begin Your Application</h2>
              <p className="text-slate-300 mb-10 text-sm">Fill out the form with accurate details. Our admissions team will review within 48 hours.</p>
              <div className="space-y-7">
                {[
                  { Icon: FileText, t: 'Have Documents Ready', d: 'Report cards, ID proof, and passport photo.' },
                  { Icon: Shield, t: 'Secure Submission', d: 'Your data is encrypted and confidential.' },
                  { Icon: CheckCircle, t: 'Quick Response', d: 'We respond within 2 working days.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <item.Icon className="w-5 h-5 text-[#E5D81A]" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.t}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-3/5 p-12 lg:p-14 bg-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-bold text-[#0D2640] text-sm">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-[#F4F7FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#27598C] focus:ring-1 focus:ring-[#27598C] transition-all text-sm" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-[#0D2640] text-sm">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-[#F4F7FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#27598C] focus:ring-1 focus:ring-[#27598C] transition-all text-sm" placeholder="Last Name" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-bold text-[#0D2640] text-sm">Parent's Email</label>
                  <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="w-full bg-[#F4F7FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#27598C] focus:ring-1 focus:ring-[#27598C] transition-all text-sm" placeholder="parent@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-[#0D2640] text-sm">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#F4F7FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#27598C] focus:ring-1 focus:ring-[#27598C] transition-all text-sm" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-bold text-[#0D2640] text-sm">Class Applying For</label>
                <select name="classApplied" value={formData.classApplied} onChange={handleChange} className="w-full bg-[#F4F7FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#27598C] focus:ring-1 focus:ring-[#27598C] transition-all text-slate-500 text-sm appearance-none">
                  <option value="">Select class...</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-slate-200 hover:border-[#27598C] bg-[#F4F7FB] rounded-[20px] p-7 text-center transition-colors cursor-pointer group mt-4">
                <Upload className="w-7 h-7 mx-auto mb-3 text-slate-400 group-hover:text-[#27598C] transition-colors" />
                <p className="font-bold text-[#0D2640] text-sm">Drag & Drop Previous Report Card</p>
                <p className="text-xs text-slate-500 mt-1">PDF or Image (Max 5MB)</p>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#27598C] hover:bg-[#1a3d66] text-white h-14 text-base font-extrabold rounded-xl shadow-lg shadow-[#27598C]/25 transition-all mt-4">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[36px] p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Still Have Questions?</h2>
            <p className="text-slate-300 mb-10 text-base">Our admissions counselors are here to help you choose the right path for your child.</p>
            <Button className="bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] h-14 px-12 text-base font-extrabold rounded-full shadow-xl transition-all">Contact Counselors</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
