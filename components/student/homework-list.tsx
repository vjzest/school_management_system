'use client'

import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { BookOpen, Calendar } from 'lucide-react'

interface HomeworkItem {
  id: number
  subject: string
  topic: string
  dueDate: string
  daysLeft: number
  status: string
  description: string
}

interface HomeworkListProps {
  items: HomeworkItem[]
}

const getDaysColor = (daysLeft: number) => {
  if (daysLeft <= 1) return 'border-red-500 bg-red-50/30'
  if (daysLeft <= 3) return 'border-yellow-500 bg-yellow-50/30'
  return 'border-green-500 bg-green-50/30'
}

const getDaysTextColor = (daysLeft: number) => {
  if (daysLeft <= 1) return 'text-red-700'
  if (daysLeft <= 3) return 'text-yellow-700'
  return 'text-green-700'
}

export default function HomeworkList({ items }: HomeworkListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-6 rounded-2xl border-l-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 bg-white ${getDaysColor(item.daysLeft)}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-lg text-[#0F172A]">{item.subject}</h3>
                <p className="text-sm font-medium text-[#FF7A00] mt-0.5">{item.topic}</p>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 ml-4">
              {item.status === 'completed' ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 px-3 py-1">Completed</Badge>
              ) : (
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 px-3 py-1">Pending</Badge>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Due: {item.dueDate}</span>
            </div>
            {item.status === 'pending' && (
              <div className={`text-sm font-bold ${getDaysTextColor(item.daysLeft)}`}>
                {item.daysLeft === 0 ? 'Due Today!' : `${item.daysLeft} day${item.daysLeft > 1 ? 's' : ''} left`}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
