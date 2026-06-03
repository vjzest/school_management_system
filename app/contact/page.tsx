import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-200">
      <Navbar />
      
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 min-h-[60vh]">
         <div className="text-center mb-16">
            <h4 className="text-[#FF7A00] font-bold uppercase tracking-widest text-sm mb-4">CONTACT US</h4>
            <h1 className="text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">Get In Touch</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Have questions about our platform? Our team is here to help you.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-[32px] text-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Mail className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-2">Email Us</h3>
               <p className="text-slate-500 font-medium">support@education.com</p>
            </div>
            
            <div className="bg-white p-10 rounded-[32px] text-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Phone className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-2">Call Us</h3>
               <p className="text-slate-500 font-medium">+91 98765 43210</p>
            </div>

            <div className="bg-white p-10 rounded-[32px] text-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <MapPin className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-[#0F172A] mb-2">Visit Us</h3>
               <p className="text-slate-500 font-medium">123 Education Hub, Tech City</p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  )
}
