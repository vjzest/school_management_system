import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Users, Star } from 'lucide-react'
import Image from 'next/image'

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-200">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto px-4">
          <h4 className="text-[#FF7A00] font-bold uppercase tracking-widest text-sm mb-4">OUR FACULTY</h4>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6">
            Meet Our Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-orange-400">Teachers</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Our highly qualified educators bring years of experience and a passion for teaching to shape the minds of our students.
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
              <div className="w-full h-64 bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                <Image src={`https://i.pravatar.cc/300?img=${i+10}`} alt="Teacher" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#0F172A]">Dr. {['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'][i-1]}</h3>
                <div className="flex items-center text-orange-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" /> 4.9
                </div>
              </div>
              <p className="text-[#FF7A00] font-medium text-sm mb-4">{['Mathematics', 'Physics', 'Computer Science', 'English', 'History', 'Biology'][i-1]} Department</p>
              <p className="text-slate-500 text-sm line-clamp-2">Experienced educator with over 10 years of teaching excellence and student mentorship.</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
