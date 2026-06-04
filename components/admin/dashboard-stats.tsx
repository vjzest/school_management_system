'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, CreditCard, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { title: 'Total Students', value: '1,248', icon: Users, change: '+12%', iconBg: 'bg-[#27598C]/10', iconColor: 'text-[#27598C]' },
  { title: 'Total Teachers', value: '156', icon: BookOpen, change: '+5%', iconBg: 'bg-[#589C47]/10', iconColor: 'text-[#589C47]' },
  { title: 'Fees Collected', value: '₹4.5L', icon: CreditCard, change: '+8%', iconBg: 'bg-[#0D2640]/10', iconColor: 'text-[#0D2640]' },
  { title: 'Exam Pass Rate', value: '94%', icon: Award, change: '+2%', iconBg: 'bg-[#E5D81A]/20', iconColor: 'text-yellow-600' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function DashboardStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-0 bg-white shadow-sm rounded-2xl hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#589C47]/10 text-[#589C47]">{stat.change}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-[#0D2640]">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
