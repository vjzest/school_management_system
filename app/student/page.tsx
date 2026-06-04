'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle, AlertCircle, BookOpen, Calendar,
  TrendingUp, Bell, FileText, Clock
} from 'lucide-react'
import Link from 'next/link'

const dashboardStats = [
  { label: 'Attendance', value: '92%', icon: CheckCircle, iconBg: 'bg-[#589C47]/15', iconColor: 'text-[#589C47]', change: '+2%', trend: 'up' },
  { label: 'Pending Fees', value: '₹2,500', icon: AlertCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500', change: 'Due', trend: 'warn' },
  { label: 'Homework', value: '3 Due', icon: BookOpen, iconBg: 'bg-[#27598C]/10', iconColor: 'text-[#27598C]', change: '2 Today', trend: 'up' },
  { label: 'Next Class', value: '10:30 AM', icon: Calendar, iconBg: 'bg-[#E5D81A]/15', iconColor: 'text-yellow-600', change: 'Math', trend: 'up' },
]

const upcomingClasses = [
  { subject: 'Mathematics', teacher: 'Dr. Smith', time: '10:30 – 11:30 AM', room: 'A-101', color: 'border-l-[#27598C]' },
  { subject: 'English Literature', teacher: 'Ms. Johnson', time: '11:45 AM – 12:45 PM', room: 'A-102', color: 'border-l-[#589C47]' },
  { subject: 'Physics', teacher: 'Dr. Williams', time: '1:00 – 2:00 PM', room: 'Lab-1', color: 'border-l-[#E5D81A]' },
]

const quickLinks = [
  { label: 'View Results', href: '/student/results', icon: TrendingUp, color: 'bg-[#27598C] text-white' },
  { label: 'My Timetable', href: '/student/timetable', icon: Calendar, color: 'bg-[#589C47] text-white' },
  { label: 'Pay Fees', href: '/student/fees', icon: FileText, color: 'bg-[#0D2640] text-white' },
  { label: 'Homework', href: '/student/homework', icon: BookOpen, color: 'bg-[#E5D81A] text-[#0D2640]' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function StudentDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[24px] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Good Morning 👋</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Welcome, Rahul Sharma</h2>
          <p className="text-slate-300 text-sm">Class X – A &nbsp;•&nbsp; Roll No. 15 &nbsp;•&nbsp; Royal Public School</p>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 bg-white shadow-sm rounded-2xl hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.trend === 'warn' ? 'bg-red-50 text-red-500' : 'bg-[#589C47]/10 text-[#589C47]'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0D2640]">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-4 gap-3">
        {quickLinks.map((link, idx) => {
          const Icon = link.icon
          return (
            <Link key={idx} href={link.href}>
              <div className={`${link.color} rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 text-center hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer shadow-sm`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-bold leading-tight">{link.label}</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Schedule & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Today's Schedule */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="border-0 bg-white shadow-sm rounded-2xl">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0D2640] text-base font-extrabold">Today's Schedule</CardTitle>
                <Link href="/student/timetable" className="text-xs text-[#27598C] font-bold hover:underline">View All</Link>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 sm:p-4 rounded-xl bg-slate-50 border-l-4 ${classItem.color} hover:bg-slate-100 transition-colors`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-[#0D2640] text-sm truncate">{classItem.subject}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{classItem.teacher}</p>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{classItem.time}</span>
                          <span>Room {classItem.room}</span>
                        </div>
                      </div>
                      <Badge className="bg-[#27598C]/10 text-[#27598C] border-0 font-bold text-xs shrink-0">Live</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notices */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="border-0 bg-white shadow-sm rounded-2xl">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0D2640] text-base font-extrabold">Notices & Alerts</CardTitle>
                <Bell className="w-4 h-4 text-[#E5D81A]" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {[
                  { title: 'Annual Sports Day – June 15', desc: 'All students must register by June 10.', type: 'event', icon: '🏆' },
                  { title: 'Unit Test – Mathematics', desc: 'Chapters 1–5 will be covered. Stay prepared.', type: 'exam', icon: '📝' },
                  { title: 'Fee Reminder', desc: 'Quarter 2 fees due before June 20.', type: 'fees', icon: '💳' },
                ].map((notice, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm shrink-0">
                      {notice.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#0D2640] text-sm truncate">{notice.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notice.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
