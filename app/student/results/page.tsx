'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Award, TrendingUp, BookOpen } from 'lucide-react'

const examResults = [
  { exam: 'Unit Test 1', subject: 'Mathematics', marks: 85, totalMarks: 100, percentage: 85, grade: 'A', date: '10 May 2025' },
  { exam: 'Unit Test 1', subject: 'English', marks: 78, totalMarks: 100, percentage: 78, grade: 'B+', date: '11 May 2025' },
  { exam: 'Unit Test 1', subject: 'Science', marks: 88, totalMarks: 100, percentage: 88, grade: 'A', date: '12 May 2025' },
  { exam: 'Quiz', subject: 'History', marks: 18, totalMarks: 20, percentage: 90, grade: 'A+', date: '15 May 2025' },
]

const chartData = examResults.map(r => ({ name: r.subject.slice(0, 4), marks: r.marks, total: r.totalMarks }))

function getGradeColor(grade: string) {
  if (grade === 'A+') return 'bg-[#E5D81A]/20 text-yellow-700'
  if (grade === 'A') return 'bg-[#589C47]/10 text-[#589C47]'
  if (grade.startsWith('B')) return 'bg-[#27598C]/10 text-[#27598C]'
  return 'bg-red-50 text-red-500'
}

export default function ResultsPage() {
  const avg = (examResults.reduce((s, r) => s + r.percentage, 0) / examResults.length).toFixed(1)
  const best = Math.max(...examResults.map(r => r.percentage))

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[20px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Academic Performance</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">My Results</h2>
        <p className="text-slate-300 text-sm mt-1">Unit Test 1 &nbsp;•&nbsp; May 2025</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Exams Taken', value: examResults.length, icon: BookOpen, bg: 'bg-[#27598C]/10', color: 'text-[#27598C]', border: 'border-l-[#27598C]' },
          { label: 'Average %', value: `${avg}%`, icon: TrendingUp, bg: 'bg-[#589C47]/10', color: 'text-[#589C47]', border: 'border-l-[#589C47]' },
          { label: 'Best Score', value: `${best}%`, icon: Award, bg: 'bg-[#E5D81A]/20', color: 'text-yellow-600', border: 'border-l-[#E5D81A]' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={`border-0 border-l-4 ${s.border} bg-white shadow-sm rounded-2xl`}>
                <CardContent className="p-4 sm:p-5">
                  <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0D2640] mt-0.5">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Chart */}
      <Card className="border-0 bg-white shadow-sm rounded-2xl">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[#0D2640] text-base font-extrabold">Marks Comparison</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                formatter={(v: any) => [`${v}`, 'Marks']}
              />
              <Bar dataKey="marks" fill="#27598C" radius={[6, 6, 0, 0]} />
              <Bar dataKey="total" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Results Cards — Mobile */}
      <div className="space-y-3 sm:hidden">
        {examResults.map((r, i) => (
          <Card key={i} className="border-0 bg-white shadow-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-extrabold text-[#0D2640]">{r.subject}</p>
                  <p className="text-xs text-slate-500">{r.exam} &nbsp;•&nbsp; {r.date}</p>
                </div>
                <Badge className={`${getGradeColor(r.grade)} border-0 font-extrabold text-sm px-3`}>{r.grade}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#27598C] rounded-full" style={{ width: `${r.percentage}%` }}></div>
                </div>
                <span className="text-sm font-extrabold text-[#27598C]">{r.marks}/{r.totalMarks}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Table — Desktop */}
      <Card className="hidden sm:block border-0 bg-white shadow-sm rounded-2xl">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[#0D2640] text-base font-extrabold">Detailed Results</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Exam', 'Subject', 'Marks', 'Total', '%', 'Grade', 'Date'].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-bold text-slate-500 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {examResults.map((r, i) => (
                <motion.tr key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#0D2640]">{r.exam}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{r.subject}</td>
                  <td className="py-4 px-4 font-extrabold text-[#27598C]">{r.marks}</td>
                  <td className="py-4 px-4 text-slate-400">{r.totalMarks}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#27598C] rounded-full" style={{ width: `${r.percentage}%` }}></div>
                      </div>
                      <span className="font-bold text-[#0D2640]">{r.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`${getGradeColor(r.grade)} border-0 font-extrabold`}>{r.grade}</Badge>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{r.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
