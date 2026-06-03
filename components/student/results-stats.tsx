'use client'

import { motion } from 'framer-motion'

interface ResultsStatsProps {
  totalExams: number
  averagePercentage: string
}

export default function ResultsStats({ totalExams, averagePercentage }: ResultsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      >
        <p className="text-slate-500 font-medium text-sm">Total Exams</p>
        <p className="text-3xl font-bold text-[#0F172A] mt-2">{totalExams}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      >
        <p className="text-blue-600 font-medium text-sm">Average Score</p>
        <p className="text-3xl font-bold text-blue-600 mt-2">{averagePercentage}%</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      >
        <p className="text-green-600 font-medium text-sm">Best Score</p>
        <p className="text-3xl font-bold text-green-600 mt-2">90%</p>
      </motion.div>
    </div>
  )
}
