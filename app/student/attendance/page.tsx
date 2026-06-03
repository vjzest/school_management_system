'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const attendanceData = [
  { month: 'January', attendance: 92 },
  { month: 'February', attendance: 88 },
  { month: 'March', attendance: 95 },
  { month: 'April', attendance: 90 },
  { month: 'May', attendance: 92 },
]

const attendanceStats = {
  present: 156,
  absent: 12,
  late: 8,
  total: 176,
}

const attendancePieData = [
  { name: 'Present', value: attendanceStats.present },
  { name: 'Absent', value: attendanceStats.absent },
  { name: 'Late', value: attendanceStats.late },
]

const COLORS = ['#10b981', '#ef4444', '#f59e0b']

export default function AttendancePage() {
  const percentage = ((attendanceStats.present / attendanceStats.total) * 100).toFixed(1)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">My Attendance</h2>
        <p className="text-slate-500">Track your attendance record</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
          <p className="text-slate-500 font-medium text-sm">Attendance %</p>
          <p className="text-3xl font-bold text-[#FF7A00] mt-2">{percentage}%</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-green-500"
        >
          <p className="text-green-600 font-medium text-sm">Present</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{attendanceStats.present}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-red-500"
        >
          <p className="text-red-600 font-medium text-sm">Absent</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{attendanceStats.absent}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-yellow-500"
        >
          <p className="text-yellow-600 font-medium text-sm">Late</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{attendanceStats.late}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#071B4A]">Monthly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                />
                <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#071B4A]">Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
