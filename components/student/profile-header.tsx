'use client'

import { motion } from 'framer-motion'

interface ProfileHeaderProps {
  name: string
  rollNo: string
  className: string
  initials: string
}

export default function ProfileHeader({ name, rollNo, className, initials }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 flex items-center gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 right-32 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      
      <div className="w-28 h-28 bg-gradient-to-tr from-[#FF7A00] to-orange-400 rounded-2xl flex items-center justify-center text-white text-5xl font-extrabold shadow-lg shadow-orange-500/30 z-10">
        {initials}
      </div>
      <div className="z-10">
        <h1 className="text-4xl font-extrabold text-[#071B4A]">{name}</h1>
        <div className="flex gap-4 mt-3">
          <span className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold border border-slate-100">
            Class {className}
          </span>
          <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
            Roll No: {rollNo}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
