'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, CreditCard, Award, TrendingUp, UserCheck, AlertCircle, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const stats = [
  { title: 'Total Students', value: '1,248', icon: Users, change: '+12 this month', iconBg: 'bg-[#27598C]/10', iconColor: 'text-[#27598C]', trend: '+12%' },
  { title: 'Total Teachers', value: '156', icon: BookOpen, change: '+3 this month', iconBg: 'bg-[#589C47]/10', iconColor: 'text-[#589C47]', trend: '+5%' },
  { title: 'Fees Collected', value: '₹4.5L', icon: CreditCard, change: 'This quarter', iconBg: 'bg-[#0D2640]/10', iconColor: 'text-[#0D2640]', trend: '+8%' },
  { title: 'Exam Pass Rate', value: '94%', icon: Award, change: 'Last board exam', iconBg: 'bg-[#E5D81A]/20', iconColor: 'text-yellow-600', trend: '+2%' },
]

const recentActivities = [
  { label: 'New student enrolled', sub: 'Priya Sharma – Class IX', time: '10 min ago', icon: Users, color: 'bg-[#27598C]/10 text-[#27598C]' },
  { label: 'Fee payment received', sub: '₹8,500 – Rahul Mehta', time: '45 min ago', icon: CreditCard, color: 'bg-[#589C47]/10 text-[#589C47]' },
  { label: 'Attendance marked', sub: 'Class X-A – 42/44 present', time: '1 hr ago', icon: UserCheck, color: 'bg-[#0D2640]/10 text-[#0D2640]' },
  { label: 'Exam result published', sub: 'Unit Test 3 – Mathematics', time: '2 hrs ago', icon: Award, color: 'bg-[#E5D81A]/20 text-yellow-600' },
  { label: 'Teacher absent today', sub: 'Mr. James – Physics Dept.', time: '2 hrs ago', icon: AlertCircle, color: 'bg-red-50 text-red-500' },
]

const quickActions = [
  { label: 'Add Student', href: '/admin/students', icon: Users, color: 'bg-[#27598C] text-white' },
  { label: 'Mark Attendance', href: '/admin/attendance', icon: UserCheck, color: 'bg-[#589C47] text-white' },
  { label: 'Exam Results', href: '/admin/results', icon: TrendingUp, color: 'bg-[#0D2640] text-white' },
  { label: 'Fee Records', href: '/admin/fees', icon: CreditCard, color: 'bg-[#E5D81A] text-[#0D2640]' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[24px] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#589C47]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Admin Panel</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Good Morning, Principal!</h2>
          <p className="text-slate-300 text-sm">Royal Public School &nbsp;•&nbsp; Academic Year 2025–26</p>
        </div>
      </div>

      {/* Stat Cards */}
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
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#589C47]/10 text-[#589C47]">{stat.trend}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0D2640]">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Link key={idx} href={action.href}>
              <div className={`${action.color} rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 text-center hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer shadow-sm`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-bold leading-tight">{action.label}</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Activity + Mini Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-0 bg-white shadow-sm rounded-2xl">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0D2640] text-base font-extrabold">Recent Activity</CardTitle>
                <span className="text-xs text-slate-400 font-medium">Today</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {recentActivities.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#0D2640] text-sm truncate">{item.label}</p>
                        <p className="text-xs text-slate-500 truncate">{item.sub}</p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium shrink-0 hidden sm:block">{item.time}</span>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Snapshot */}
        <div>
          <Card className="border-0 bg-white shadow-sm rounded-2xl h-full">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-[#0D2640] text-base font-extrabold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#27598C]" /> Today's Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              {[
                { label: 'Present Today', value: '1,190', total: '1,248', color: 'bg-[#589C47]' },
                { label: 'Fees Pending', value: '₹58K', sub: '24 students', color: 'bg-red-400' },
                { label: 'Classes Today', value: '48', sub: '6 periods each', color: 'bg-[#27598C]' },
                { label: 'Exams This Week', value: '3', sub: 'Unit tests', color: 'bg-[#E5D81A]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1.5 h-10 ${item.color} rounded-full shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                    <p className="font-extrabold text-[#0D2640] text-base">{item.value}</p>
                  </div>
                  {item.total && (
                    <span className="text-xs text-slate-400 font-medium">/ {item.total}</span>
                  )}
                  {item.sub && (
                    <span className="text-xs text-slate-400 font-medium hidden sm:block">{item.sub}</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
