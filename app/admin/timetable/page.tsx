'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

const timetable = [
  { day: 'Monday', slots: ['English', 'Mathematics', 'Science', 'History', 'PE'] },
  { day: 'Tuesday', slots: ['Mathematics', 'Science', 'English', 'Art', 'Computer'] },
  { day: 'Wednesday', slots: ['Science', 'English', 'Mathematics', 'Computer', 'History'] },
  { day: 'Thursday', slots: ['History', 'PE', 'Mathematics', 'Science', 'English'] },
  { day: 'Friday', slots: ['Art', 'Computer', 'English', 'Mathematics', 'Science'] },
  { day: 'Saturday', slots: ['Computer', 'History', 'PE', 'English', 'Mathematics'] },
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']

const colors: Record<string, string> = {
  'English': 'bg-blue-100 text-blue-900',
  'Mathematics': 'bg-purple-100 text-purple-900',
  'Science': 'bg-green-100 text-green-900',
  'History': 'bg-orange-100 text-orange-900',
  'PE': 'bg-red-100 text-red-900',
  'Art': 'bg-pink-100 text-pink-900',
  'Computer': 'bg-cyan-100 text-cyan-900',
}

export default function TimetablePage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Class Timetable</h2>
          <p className="text-muted-foreground">View and manage class schedules</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Edit Timetable
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Day / Time</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="px-4 py-3 text-center font-semibold text-foreground text-sm">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, dayIndex) => (
                <tr key={row.day} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{row.day}</td>
                  {row.slots.map((subject, slotIndex) => (
                    <td key={slotIndex} className="px-4 py-3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (dayIndex + slotIndex) * 0.05 }}
                        className={`p-2 rounded-lg text-center font-medium text-sm ${colors[subject] || 'bg-gray-100'}`}
                      >
                        {subject}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Subject Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(colors).map(([subject, color]) => (
              <div key={subject} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${color.split(' ')[0]}`}></div>
                <span className="text-sm text-foreground">{subject}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
