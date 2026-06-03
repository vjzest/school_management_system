'use client'

import TimetableGrid from '@/components/student/timetable-grid'
import TimetableLegend from '@/components/student/timetable-legend'

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
  'English': 'bg-blue-100 text-blue-700',
  'Mathematics': 'bg-purple-100 text-purple-700',
  'Science': 'bg-green-100 text-green-700',
  'History': 'bg-orange-100 text-orange-700',
  'PE': 'bg-red-100 text-red-700',
  'Art': 'bg-pink-100 text-pink-700',
  'Computer': 'bg-cyan-100 text-cyan-700',
}

export default function TimetablePage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">My Timetable</h2>
        <p className="text-slate-500">Your class schedule for the week</p>
      </div>

      <TimetableGrid 
        timetable={timetable} 
        timeSlots={timeSlots} 
        colors={colors} 
      />

      <TimetableLegend colors={colors} />
    </div>
  )
}
