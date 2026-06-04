'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'

const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 92 },
]

const attendanceStats = { present: 156, absent: 12, late: 8, total: 176 }
const pieData = [
  { name: 'Present', value: attendanceStats.present },
  { name: 'Absent', value: attendanceStats.absent },
  { name: 'Late', value: attendanceStats.late },
]
const COLORS = ['#589C47', '#ef4444', '#E5D81A']

const recentRecords = [
  { date: '06 Jun 2025', day: 'Friday', status: 'present' },
  { date: '05 Jun 2025', day: 'Thursday', status: 'present' },
  { date: '04 Jun 2025', day: 'Wednesday', status: 'absent' },
  { date: '03 Jun 2025', day: 'Tuesday', status: 'present' },
  { date: '02 Jun 2025', day: 'Monday', status: 'late' },
]

export default function AttendancePage() {
  const percentage = ((attendanceStats.present / attendanceStats.total) * 100).toFixed(1)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[20px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">My Records</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">Attendance Overview</h2>
        <p className="text-slate-300 text-sm mt-1">Academic Year 2025–26 &nbsp;•&nbsp; Class X – A</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Attendance %', value: `${percentage}%`, icon: TrendingUp, iconBg: 'bg-[#27598C]/10', iconColor: 'text-[#27598C]', border: 'border-l-[#27598C]' },
          { label: 'Present', value: attendanceStats.present, icon: CheckCircle, iconBg: 'bg-[#589C47]/10', iconColor: 'text-[#589C47]', border: 'border-l-[#589C47]' },
          { label: 'Absent', value: attendanceStats.absent, icon: XCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500', border: 'border-l-red-400' },
          { label: 'Late', value: attendanceStats.late, icon: Clock, iconBg: 'bg-[#E5D81A]/15', iconColor: 'text-yellow-600', border: 'border-l-[#E5D81A]' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={`border-0 border-l-4 ${stat.border} bg-white shadow-sm rounded-2xl`}>
                <CardContent className="p-4 sm:p-5">
                  <div className={`w-9 h-9 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-[#0D2640] mt-0.5">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 bg-white shadow-sm rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-[#0D2640] text-base font-extrabold">Monthly Attendance (%)</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(v: any) => [`${v}%`, 'Attendance']}
                />
                <Bar dataKey="attendance" fill="#27598C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-[#0D2640] text-base font-extrabold">Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-row sm:flex-col gap-3 sm:gap-4 shrink-0">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-semibold text-slate-600">{item.name}: <b className="text-[#0D2640]">{item.value}</b></span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Records */}
      <Card className="border-0 bg-white shadow-sm rounded-2xl">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[#0D2640] text-base font-extrabold">Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-2">
            {recentRecords.map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${rec.status === 'present' ? 'bg-[#589C47]/10' : rec.status === 'absent' ? 'bg-red-50' : 'bg-[#E5D81A]/15'}`}>
                    {rec.status === 'present' ? <CheckCircle className="w-4 h-4 text-[#589C47]" /> : rec.status === 'absent' ? <XCircle className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-bold text-[#0D2640] text-sm">{rec.date}</p>
                    <p className="text-xs text-slate-500">{rec.day}</p>
                  </div>
                </div>
                <Badge className={`border-0 font-bold capitalize text-xs ${rec.status === 'present' ? 'bg-[#589C47]/10 text-[#589C47]' : rec.status === 'absent' ? 'bg-red-50 text-red-500' : 'bg-[#E5D81A]/20 text-yellow-700'}`}>
                  {rec.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
