'use client'

import { motion } from 'framer-motion'

interface TimetableGridProps {
  timetable: { day: string; slots: string[] }[]
  timeSlots: string[]
  colors: Record<string, string>
}

export default function TimetableGrid({ timetable, timeSlots, colors }: TimetableGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-left font-bold text-slate-500">Day / Time</th>
              {timeSlots.map((slot) => (
                <th key={slot} className="px-6 py-4 text-center font-bold text-slate-500 text-sm whitespace-nowrap">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((row, dayIndex) => (
              <tr key={row.day} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 font-bold text-[#0F172A] whitespace-nowrap">{row.day}</td>
                {row.slots.map((subject, slotIndex) => {
                  // Get the specific styles based on subject, stripping off any hover states from legacy
                  const colorClass = colors[subject] || 'bg-slate-100 text-slate-700'
                  return (
                    <td key={slotIndex} className="px-4 py-3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (dayIndex + slotIndex) * 0.05 }}
                        className={`p-3 rounded-xl text-center font-bold text-sm ${colorClass} shadow-sm transition-transform hover:-translate-y-0.5`}
                      >
                        {subject}
                      </motion.div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
