'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const timetable = [
  { day: 'Mon', slots: ['English', 'Mathematics', 'Science', 'History', 'PE'] },
  { day: 'Tue', slots: ['Mathematics', 'Science', 'English', 'Art', 'Computer'] },
  { day: 'Wed', slots: ['Science', 'English', 'Mathematics', 'Computer', 'History'] },
  { day: 'Thu', slots: ['History', 'PE', 'Mathematics', 'Science', 'English'] },
  { day: 'Fri', slots: ['Art', 'Computer', 'English', 'Mathematics', 'Science'] },
  { day: 'Sat', slots: ['Computer', 'History', 'PE', 'English', 'Mathematics'] },
]

const timeSlots = ['9:00', '10:00', '11:00', '12:00', '1:00']

const subjectColors: Record<string, { bg: string; text: string; dot: string }> = {
  English:     { bg: 'bg-[#27598C]/10', text: 'text-[#27598C]', dot: 'bg-[#27598C]' },
  Mathematics: { bg: 'bg-purple-100',   text: 'text-purple-700', dot: 'bg-purple-500' },
  Science:     { bg: 'bg-[#589C47]/10', text: 'text-[#589C47]', dot: 'bg-[#589C47]' },
  History:     { bg: 'bg-orange-100',   text: 'text-orange-700', dot: 'bg-orange-500' },
  PE:          { bg: 'bg-red-100',      text: 'text-red-600',    dot: 'bg-red-500' },
  Art:         { bg: 'bg-pink-100',     text: 'text-pink-700',   dot: 'bg-pink-500' },
  Computer:    { bg: 'bg-[#E5D81A]/20', text: 'text-yellow-700', dot: 'bg-[#E5D81A]' },
}

const subjects = Object.keys(subjectColors)
const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })

export default function TimetablePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[20px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Weekly Schedule</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">My Timetable</h2>
        <p className="text-slate-300 text-sm mt-1">Class X – A &nbsp;•&nbsp; Academic Year 2025–26</p>
      </div>

      {/* Mobile: Day Cards */}
      <div className="space-y-4 lg:hidden">
        {timetable.map((day, di) => {
          const isToday = day.day === today
          return (
            <motion.div key={di} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: di * 0.06 }}>
              <Card className={`border-0 shadow-sm rounded-2xl ${isToday ? 'ring-2 ring-[#27598C]' : 'bg-white'}`}>
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-[#0D2640] text-sm font-extrabold">{day.day}</CardTitle>
                    {isToday && <span className="text-xs bg-[#E5D81A]/20 text-yellow-700 font-bold px-2 py-0.5 rounded-full">Today</span>}
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  <div className="flex gap-2 flex-wrap">
                    {day.slots.map((subject, si) => {
                      const style = subjectColors[subject] || { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' }
                      return (
                        <div key={si} className={`${style.bg} ${style.text} rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                          {subject} <span className="text-slate-400 font-normal">{timeSlots[si]}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Desktop: Grid Table */}
      <Card className="hidden lg:block border-0 bg-white shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 text-xs uppercase tracking-wider w-20">Day</th>
                  {timeSlots.map(t => (
                    <th key={t} className="text-left py-3 px-4 font-bold text-slate-400 text-xs uppercase tracking-wider">{t} AM</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((day, di) => {
                  const isToday = day.day === today
                  return (
                    <tr key={di} className={`border-t border-slate-100 ${isToday ? 'bg-[#27598C]/5' : 'hover:bg-slate-50/70'} transition-colors`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#0D2640] text-sm">{day.day}</span>
                          {isToday && <span className="w-2 h-2 rounded-full bg-[#E5D81A] animate-pulse"></span>}
                        </div>
                      </td>
                      {day.slots.map((subject, si) => {
                        const style = subjectColors[subject] || { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' }
                        return (
                          <td key={si} className="py-3 px-4">
                            <div className={`${style.bg} ${style.text} rounded-xl px-3 py-2 text-xs font-bold text-center whitespace-nowrap`}>
                              {subject}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-0 bg-white shadow-sm rounded-2xl">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[#0D2640] text-sm font-extrabold">Subject Legend</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {subjects.map(subject => {
              const style = subjectColors[subject]
              return (
                <div key={subject} className={`${style.bg} ${style.text} rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                  {subject}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
