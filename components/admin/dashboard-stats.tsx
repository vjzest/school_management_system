'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, CreditCard, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Total Students',
    value: '1,248',
    icon: Users,
    change: '+12%',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
  },
  {
    title: 'Total Teachers',
    value: '156',
    icon: BookOpen,
    change: '+5%',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'Fees Collected',
    value: '$45,250',
    icon: CreditCard,
    change: '+8%',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    title: 'Exam Pass Rate',
    value: '94%',
    icon: Award,
    change: '+2%',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function DashboardStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs font-medium text-green-500 dark:text-green-400">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
