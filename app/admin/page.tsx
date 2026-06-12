'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, CreditCard, Award, TrendingUp, UserCheck, AlertCircle, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'

// Activity mapping helper will be used inside component

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
  const { token } = useAppSelector(state => state.auth);
  const [data, setData] = useState<any>({
    totalStudents: 0,
    totalTeachers: 0,
    revenueToday: 0,
    pendingFeesTotal: 0,
    pendingFeesCount: 0,
    presentToday: 0,
    totalPeriodsToday: 0,
    examsThisWeek: 0,
    recentActivities: [],
    schoolName: 'Royal Public School',
    academicYear: '2025-2026'
  });

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      }).catch(err => console.error(err));
    }
  }, [token]);

  const stats = [
    { title: 'Total Students', value: (data?.totalStudents || 0).toString(), icon: Users, change: 'Active enrolled', iconBg: 'bg-[#27598C]/10', iconColor: 'text-[#27598C]', trend: 'Live', link: '/admin/students' },
    { title: 'Total Teachers', value: (data?.totalTeachers || 0).toString(), icon: BookOpen, change: 'Active staff', iconBg: 'bg-[#589C47]/10', iconColor: 'text-[#589C47]', trend: 'Live', link: '/admin/teachers' },
    { title: 'Revenue Today', value: `₹${(data?.revenueToday || 0).toLocaleString()}`, icon: CreditCard, change: 'Collected today', iconBg: 'bg-[#0D2640]/10', iconColor: 'text-[#0D2640]', trend: 'Live', link: '/admin/fees' },
    { title: 'Pending Fees', value: `₹${(data?.pendingFeesTotal || 0).toLocaleString()}`, icon: AlertCircle, change: `${data?.pendingFeesCount || 0} students due`, iconBg: 'bg-[#E5D81A]/20', iconColor: 'text-yellow-600', trend: 'Action', link: '/admin/fees' },
  ];
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[24px] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#589C47]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Admin Panel</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Good Morning, Principal!</h2>
            <p className="text-slate-300 text-sm">{data.schoolName} &nbsp;•&nbsp; Academic Year {data.academicYear}</p>
          </div>
          <Link href="/admin/settings" className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            Edit
          </Link>
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
              <Link href={stat.link}>
                <Card className="border-0 bg-white shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1">
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
              </Link>
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
                {data.recentActivities && data.recentActivities.length > 0 ? data.recentActivities.map((item: any, i: number) => {
                  let Icon = Users;
                  let colorClass = 'bg-slate-100 text-slate-500';
                  if (item.type === 'student') { Icon = Users; colorClass = 'bg-[#27598C]/10 text-[#27598C]'; }
                  if (item.type === 'fee') { Icon = CreditCard; colorClass = 'bg-[#589C47]/10 text-[#589C47]'; }
                  if (item.type === 'exam') { Icon = Award; colorClass = 'bg-[#E5D81A]/20 text-yellow-600'; }

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#0D2640] text-sm truncate">{item.label}</p>
                        <p className="text-xs text-slate-500 truncate">{item.sub}</p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium shrink-0 hidden sm:block">{item.time}</span>
                    </motion.div>
                  )
                }) : (
                  <p className="text-sm text-slate-500 italic p-4 text-center">No recent activities found.</p>
                )}
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
                { label: 'Present Today', value: data.presentToday.toLocaleString(), total: data.totalStudents.toLocaleString(), color: 'bg-[#589C47]' },
                { label: 'Fees Pending', value: `₹${(data.pendingFeesTotal / 1000).toFixed(1)}K`, sub: `${data.pendingFeesCount} students`, color: 'bg-red-400' },
                { label: 'Classes Today', value: data.totalPeriodsToday.toString(), sub: 'Periods scheduled', color: 'bg-[#27598C]' },
                { label: 'Exams Scheduled', value: data.examsThisWeek.toString(), sub: 'Active/Upcoming', color: 'bg-[#E5D81A]' },
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
