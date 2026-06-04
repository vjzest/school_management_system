'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const homeworkItems = [
  { id: 1, subject: 'Mathematics', topic: 'Quadratic Equations', dueDate: '25 May 2025', daysLeft: 2, status: 'pending', description: 'Solve exercises 1–20 from Chapter 4.' },
  { id: 2, subject: 'English', topic: 'Essay Writing', dueDate: '26 May 2025', daysLeft: 3, status: 'pending', description: 'Write an essay on "My Favorite Season" (500 words).' },
  { id: 3, subject: 'Science', topic: 'Chemical Reactions', dueDate: '27 May 2025', daysLeft: 4, status: 'pending', description: 'Complete the lab report and submit with observations.' },
  { id: 4, subject: 'History', topic: 'Medieval Period', dueDate: '22 May 2025', daysLeft: 0, status: 'completed', description: 'Create a timeline of major historical events.' },
  { id: 5, subject: 'Computer Science', topic: 'Python Basics', dueDate: '28 May 2025', daysLeft: 5, status: 'pending', description: 'Write a Python program for basic calculations.' },
]

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-[#27598C]/10 text-[#27598C]',
  English: 'bg-[#589C47]/10 text-[#589C47]',
  Science: 'bg-purple-100 text-purple-700',
  History: 'bg-orange-100 text-orange-700',
  'Computer Science': 'bg-[#E5D81A]/20 text-yellow-700',
}

export default function HomeworkPage() {
  const pending = homeworkItems.filter(h => h.status === 'pending')
  const completed = homeworkItems.filter(h => h.status === 'completed')

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[20px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Assignments</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">My Homework</h2>
        <p className="text-slate-300 text-sm mt-1">Track and manage your assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total Tasks', value: homeworkItems.length, icon: BookOpen, bg: 'bg-[#27598C]/10', color: 'text-[#27598C]', border: 'border-l-[#27598C]' },
          { label: 'Pending', value: pending.length, icon: Clock, bg: 'bg-red-50', color: 'text-red-500', border: 'border-l-red-400' },
          { label: 'Completed', value: completed.length, icon: CheckCircle, bg: 'bg-[#589C47]/10', color: 'text-[#589C47]', border: 'border-l-[#589C47]' },
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
                  <p className="text-2xl font-extrabold text-[#0D2640] mt-0.5">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Pending Homework */}
      <div>
        <h3 className="text-base font-extrabold text-[#0D2640] mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" /> Pending Tasks
        </h3>
        <div className="space-y-3">
          {pending.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className="border-0 bg-white shadow-sm rounded-2xl hover:shadow-md transition-all">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${subjectColors[item.subject] || 'bg-slate-100 text-slate-600'}`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-[#0D2640] truncate">{item.topic}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.subject}</p>
                      </div>
                    </div>
                    <Badge className={`border-0 font-bold text-xs shrink-0 ${item.daysLeft <= 1 ? 'bg-red-50 text-red-500' : item.daysLeft <= 3 ? 'bg-[#E5D81A]/20 text-yellow-700' : 'bg-[#27598C]/10 text-[#27598C]'}`}>
                      {item.daysLeft === 0 ? 'Due Today' : `${item.daysLeft}d left`}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 pl-12">{item.description}</p>
                  <div className="flex items-center justify-between pl-12">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Due: {item.dueDate}</span>
                    <button className="text-xs font-bold text-[#27598C] hover:underline">Mark Done</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div>
        <h3 className="text-base font-extrabold text-[#0D2640] mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#589C47]" /> Completed
        </h3>
        <div className="space-y-3">
          {completed.map((item, i) => (
            <Card key={item.id} className="border-0 bg-white shadow-sm rounded-2xl opacity-70">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#589C47]/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#589C47]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#0D2640] line-through truncate">{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.subject} &nbsp;•&nbsp; Submitted</p>
                    </div>
                  </div>
                  <Badge className="border-0 bg-[#589C47]/10 text-[#589C47] font-bold text-xs shrink-0">Done ✓</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
