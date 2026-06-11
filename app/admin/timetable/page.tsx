'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Edit2, Save, Calendar, Clock } from 'lucide-react'
import { toast } from 'sonner'

const defaultTimeSlots = [
  { start: '9:00 AM', end: '10:00 AM' },
  { start: '10:00 AM', end: '11:00 AM' },
  { start: '11:00 AM', end: '12:00 PM' },
  { start: '12:00 PM', end: '12:30 PM' },
  { start: '12:30 PM', end: '1:30 PM' }
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const colors: Record<string, string> = {
  'English': 'bg-blue-100 text-blue-900 border-blue-200',
  'Mathematics': 'bg-purple-100 text-purple-900 border-purple-200',
  'Science': 'bg-green-100 text-green-900 border-green-200',
  'History': 'bg-orange-100 text-orange-900 border-orange-200',
  'PE': 'bg-red-100 text-red-900 border-red-200',
  'Art': 'bg-pink-100 text-pink-900 border-pink-200',
  'Computer': 'bg-cyan-100 text-cyan-900 border-cyan-200',
  'Hindi': 'bg-yellow-100 text-yellow-900 border-yellow-200',
  'Free': 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'
}

export default function TimetablePage() {
  const { token } = useAppSelector((state: any) => state.auth)
  
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [timeSlots, setTimeSlots] = useState<{start: string, end: string}[]>(defaultTimeSlots)

  // State shape: timetableData['Monday'][0] = 'Math'
  const [timetableData, setTimetableData] = useState<Record<string, string[]>>({})

  const initializeEmptyTimetable = (slots = timeSlots) => {
    const empty: Record<string, string[]> = {}
    days.forEach(day => {
      empty[day] = Array(slots.length).fill('Free')
    })
    setTimetableData(empty)
  }

  useEffect(() => {
    initializeEmptyTimetable()
  }, [])

  const fetchTimetable = async () => {
    if (!token || !selectedClass || !selectedSection) return
    
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/timetable?studentClass=${selectedClass}&section=${selectedSection}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        const fetched = res.data.data // Array of day objects
        if (fetched.length > 0) {
          // Extract columns from the first day that has periods
          let slotsToUse = [...defaultTimeSlots]
          const dayWithPeriods = fetched.find((d: any) => d.periods && d.periods.length > 0)
          if (dayWithPeriods) {
            slotsToUse = dayWithPeriods.periods.map((p: any) => ({ start: p.startTime, end: p.endTime }))
            setTimeSlots(slotsToUse)
          }

          const newData: Record<string, string[]> = {}
          days.forEach(day => {
            const dayRecord = fetched.find((d: any) => d.dayOfWeek === day)
            if (dayRecord && dayRecord.periods && dayRecord.periods.length > 0) {
              newData[day] = slotsToUse.map((ts) => {
                const period = dayRecord.periods.find((p: any) => p.startTime === ts.start)
                return period ? period.subject : 'Free'
              })
            } else {
              newData[day] = Array(slotsToUse.length).fill('Free')
            }
          })
          setTimetableData(newData)
        } else {
          setTimeSlots(defaultTimeSlots)
          initializeEmptyTimetable(defaultTimeSlots)
        }
      }
    } catch (err) {
      toast.error("Failed to load timetable")
    }
  }

  // Refetch when class or section changes
  useEffect(() => {
    setIsEditing(false)
    if (selectedClass && selectedSection) {
      fetchTimetable()
    } else {
      setTimeSlots(defaultTimeSlots)
      initializeEmptyTimetable(defaultTimeSlots)
    }
  }, [selectedClass, selectedSection, token])

  const handleSubjectChange = (day: string, slotIndex: number, subject: string) => {
    setTimetableData(prev => {
      const newDayData = [...prev[day]]
      newDayData[slotIndex] = subject || 'Free'
      return { ...prev, [day]: newDayData }
    })
  }

  const handleTimeSlotChange = (index: number, field: 'start'|'end', value: string) => {
    setTimeSlots(prev => {
      const newSlots = [...prev]
      newSlots[index] = { ...newSlots[index], [field]: value }
      return newSlots
    })
  }

  const addColumn = () => {
    setTimeSlots(prev => [...prev, { start: 'New', end: 'Time' }])
    setTimetableData(prev => {
      const newData = { ...prev }
      days.forEach(day => newData[day] = [...(newData[day] || []), 'Free'])
      return newData
    })
  }

  const handleSaveTimetable = async () => {
    if (!selectedClass || !selectedSection) return toast.error("Select Class and Section first")
    
    setIsSaving(true)
    
    try {
      // We need to save each day. The API accepts one day at a time.
      const promises = days.map(day => {
        const periods = timeSlots.map((ts, index) => ({
          startTime: ts.start,
          endTime: ts.end,
          subject: timetableData[day][index]
        })).filter(p => p.subject !== 'Free') // Optional: remove 'Free' or keep it. Let's keep it so empty slots are stored as 'Free'

        return axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/timetable`, {
          studentClass: selectedClass,
          section: selectedSection,
          dayOfWeek: day,
          periods: periods
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })

      await Promise.all(promises)
      
      toast.success(`Timetable for Class ${selectedClass}-${selectedSection} saved successfully!`)
      setIsEditing(false)
      fetchTimetable()
    } catch (error) {
      toast.error("Failed to save timetable")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Class Timetable</h2>
          <p className="text-slate-500">View and update weekly schedules class and section wise</p>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6">
        <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-6">
          <div className="flex gap-6 w-full md:w-auto">
            <div className="flex flex-col flex-1">
              <label className="text-xs font-bold text-slate-500 mb-2">Select Class</label>
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-[#0F172A] outline-none hover:border-blue-300 w-48"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">-- Select --</option>
                {['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                  <option key={c} value={c}>{['Nursery', 'LKG', 'UKG'].includes(c) ? c : `Class ${c}`}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col flex-1">
              <label className="text-xs font-bold text-slate-500 mb-2">Select Section</label>
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-[#0F172A] outline-none hover:border-blue-300 w-48 disabled:opacity-50"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">-- Select --</option>
                {['A', 'B', 'C'].map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                disabled={!selectedClass || !selectedSection}
                className="bg-[#FF7A00] hover:bg-orange-600 text-white rounded-xl px-6 shadow-md disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Timetable
              </Button>
            ) : (
              <>
                <Button 
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="rounded-xl px-6 border-slate-200"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveTimetable}
                  disabled={isSaving}
                  className="bg-[#27598C] hover:bg-blue-800 text-white rounded-xl px-6 shadow-md"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Schedule'}
                </Button>
                <Button 
                  onClick={addColumn}
                  className="bg-[#589C47] hover:bg-[#48823b] text-white rounded-xl px-4 shadow-md"
                >
                  + Add Column
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {selectedClass && selectedSection ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-left font-extrabold text-[#0F172A] w-40 border-r border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#27598C]" /> Day / Time
                    </div>
                  </th>
                  {timeSlots.map((slot, index) => (
                    <th key={index} className="px-4 py-4 text-center font-bold text-slate-500 border-r border-slate-100 last:border-0 min-w-[120px]">
                      {isEditing ? (
                        <div className="flex flex-col gap-1 items-center">
                          <input 
                            value={slot.start}
                            onChange={e => handleTimeSlotChange(index, 'start', e.target.value)}
                            className="w-full text-center text-xs border border-slate-200 rounded p-1"
                            placeholder="Start"
                          />
                          <input 
                            value={slot.end}
                            onChange={e => handleTimeSlotChange(index, 'end', e.target.value)}
                            className="w-full text-center text-xs border border-slate-200 rounded p-1"
                            placeholder="End"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-300" />
                          {slot.start} <span className="text-[10px] font-normal text-slate-400">to {slot.end}</span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={day} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-600 border-r border-slate-100 bg-slate-50/50">
                      {day}
                    </td>
                    {timetableData[day]?.map((subject: string, slotIndex: number) => (
                      <td key={slotIndex} className="px-4 py-4 border-r border-slate-100 last:border-0 text-center min-w-[120px]">
                        {isEditing ? (
                          <Input
                            value={subject === 'Free' ? '' : subject}
                            onChange={(e) => handleSubjectChange(day, slotIndex, e.target.value)}
                            placeholder="Free"
                            className="text-center font-medium h-9 text-xs min-w-[100px] w-full bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                          />
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (dayIndex * 0.05) + (slotIndex * 0.02) }}
                            className={`p-2 rounded-lg text-center font-bold text-xs border ${colors[subject] || 'bg-slate-100 text-slate-600 border-slate-200'}`}
                          >
                            {subject}
                          </motion.div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <Calendar className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-[#0F172A]">No Class Selected</h3>
          <p className="text-slate-500 mt-1 max-w-sm">Please select a class and section from the dropdown above to view or edit the timetable.</p>
        </div>
      )}

    </div>
  )
}
