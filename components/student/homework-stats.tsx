'use client'

import { motion } from 'framer-motion'

interface HomeworkStatsProps {
  pendingCount: number
  completedCount: number
}

export default function HomeworkStats({ pendingCount, completedCount }: HomeworkStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-yellow-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      >
        <p className="text-yellow-600 font-medium text-sm">Pending</p>
        <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
      >
        <p className="text-green-600 font-medium text-sm">Completed</p>
        <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
      </motion.div>
    </div>
  )
}
