'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Check, X, Clock, UserMinus, Save, Download, FileSpreadsheet, Users, UserCheck, UserX } from 'lucide-react'
import { toast } from 'sonner'

export default function AttendancePage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [students, setStudents] = useState<any[]>([])
  
  // Filters
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterClass, setFilterClass] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterSection, setFilterSection] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Attendance State: { studentId: status }
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Fetch Students
  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          setStudents(res.data.data)
        }
      }).catch(err => toast.error("Failed to load students"))
    }
  }, [token])

  // Fetch Attendance for the selected date
  useEffect(() => {
    if (token && selectedDate) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/attendance?date=${selectedDate}&type=Student`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          const fetchedData: Record<string, string> = {}
          res.data.data.forEach((record: any) => {
            fetchedData[record.referenceId] = record.status
          })
          setAttendanceData(fetchedData)
        }
      }).catch(err => toast.error("Failed to load attendance records"))
    }
  }, [token, selectedDate])

  // Derive unique classes, sections, and courses from students
  const uniqueClasses = Array.from(new Set(students.map(s => s.studentClass))).sort((a: any, b: any) => Number(a) - Number(b))
  const uniqueCourses = Array.from(new Set(students.map(s => s.course))).filter(Boolean).sort()
  const uniqueSections = Array.from(new Set(students.map(s => s.section))).filter(Boolean).sort()

  // Auto-select first class if none selected
  useEffect(() => {
    if (uniqueClasses.length > 0 && !filterClass) {
      setFilterClass(uniqueClasses[0] as string)
    }
  }, [uniqueClasses, filterClass])

  // Auto-select first section if none selected
  useEffect(() => {
    if (uniqueSections.length > 0 && !filterSection) {
      setFilterSection(uniqueSections[0] as string)
    }
  }, [uniqueSections, filterSection])

  // Filter students based on selection
  const filteredStudents = students.filter(s => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(term) ||
      (s.rollNo && s.rollNo.toString().includes(term)) ||
      (s.admissionNo && s.admissionNo.toLowerCase().includes(term))

    const matchesClass = !filterClass || s.studentClass === filterClass
    const matchesCourse = !filterCourse || s.course === filterCourse
    const matchesSection = !filterSection || s.section === filterSection

    return matchesSearch && matchesClass && matchesCourse && matchesSection
  })

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }))
  }

  const markAll = (status: string) => {
    const newData = { ...attendanceData }
    filteredStudents.forEach(s => {
      newData[s._id] = status
    })
    setAttendanceData(newData)
  }

  const handleSave = async () => {
    if (filteredStudents.length === 0) return toast.error("No students to mark attendance for")
    
    // Check if all filtered students have a status
    const unmarked = filteredStudents.filter(s => !attendanceData[s._id])
    if (unmarked.length > 0) {
      if(!window.confirm(`There are ${unmarked.length} unmarked students. Proceed anyway?`)) return
    }

    // Build payload
    const records = filteredStudents.map(s => ({
      referenceId: s._id,
      status: attendanceData[s._id] || 'Absent' // Default to absent if not explicitly marked
    }))

    setIsSaving(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/attendance`, {
        date: selectedDate,
        type: 'Student',
        records
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success("Attendance saved successfully!")
        // update local state just in case
        const fetchedData = { ...attendanceData }
        res.data.data.forEach((record: any) => {
          fetchedData[record.referenceId] = record.status
        })
        setAttendanceData(fetchedData)
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save attendance")
    } finally {
      setIsSaving(false)
    }
  }

  // Stats for currently filtered students
  const stats = {
    present: filteredStudents.filter(s => attendanceData[s._id] === 'Present').length,
    absent: filteredStudents.filter(s => attendanceData[s._id] === 'Absent').length,
    halfDay: filteredStudents.filter(s => attendanceData[s._id] === 'Half-Day').length,
    leave: filteredStudents.filter(s => attendanceData[s._id] === 'Leave').length,
    total: filteredStudents.length,
    marked: filteredStudents.filter(s => attendanceData[s._id]).length
  }

  // Export to CSV Function
  const handleExport = (exportAll: boolean) => {
    const listToExport = exportAll ? students : filteredStudents
    if (listToExport.length === 0) {
      return toast.error("No students to export")
    }

    const headers = ['Roll No', 'Admission No', 'Student Name', 'Class', 'Section', 'Stream', 'Status']
    const rows = listToExport.map(s => {
      const status = attendanceData[s._id] || 'Unmarked'
      return [
        s.rollNo || '',
        s.admissionNo || '',
        `"${s.firstName} ${s.lastName}"`,
        s.studentClass || '',
        s.section || '',
        s.course || '',
        status
      ].join(',')
    })

    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    
    const fileName = exportAll 
      ? `Full_Attendance_${selectedDate}.csv`
      : `Attendance_Class${filterClass}_${filterSection}_${selectedDate}.csv`
    
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Class Attendance</h2>
          <p className="text-slate-500">Mark and manage daily attendance records</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white border-slate-200 shadow-sm rounded-xl px-4 py-2 text-slate-700 w-auto"
          />
          <Button 
            onClick={() => handleExport(false)} 
            variant="outline"
            className="border-[#27598C] text-[#27598C] hover:bg-blue-50 rounded-xl px-4 shadow-sm"
            title="Export current class list"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Class
          </Button>
          <Button 
            onClick={() => handleExport(true)} 
            variant="outline"
            className="border-[#FF7A00] text-[#FF7A00] hover:bg-orange-50 rounded-xl px-4 shadow-sm"
            title="Export all school attendance"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-[#2D6A4F] hover:bg-green-800 text-white rounded-xl px-6 shadow-md shadow-green-900/20"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? 'Saving...' : 'Save Attendance'}
          </Button>
        </div>
      </div>

      {/* Selectors and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Class / Section Selectors */}
        <Card className="lg:col-span-5 border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl flex flex-col justify-center p-4">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            <div className="flex-1">
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none"
                value={filterClass}
                onChange={(e) => {
                  setFilterClass(e.target.value)
                  setFilterCourse('') // reset course on class change
                }}
              >
                <option value="">Select Class</option>
                {uniqueClasses.map(c => <option key={c as string} value={c as string}>{['Nursery', 'LKG', 'UKG'].includes(c as string) ? c : `Class ${c}`}</option>)}
              </select>
            </div>
            
            <div className="flex-1">
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none"
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {uniqueSections.map(s => <option key={s as string} value={s as string}>Section {s as string}</option>)}
              </select>
            </div>

            {(filterClass === '11' || filterClass === '12') && uniqueCourses.length > 0 && (
              <div className="flex-1">
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none"
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                >
                  <option value="">All Streams</option>
                  {uniqueCourses.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
                </select>
              </div>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4 h-fit">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-slate-100 rounded-md"><Users className="w-3.5 h-3.5 text-slate-500" /></div>
              <p className="text-slate-500 text-xs font-semibold truncate">Total</p>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-extrabold text-[#0F172A] leading-none">{stats.total}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">{stats.marked} marked</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-emerald-100 rounded-md"><UserCheck className="w-3.5 h-3.5 text-emerald-600" /></div>
              <p className="text-emerald-700 text-xs font-semibold truncate">Present</p>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-extrabold text-emerald-600 leading-none">{stats.present}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-red-50 border border-red-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-red-100 rounded-md"><UserX className="w-3.5 h-3.5 text-red-600" /></div>
              <p className="text-red-700 text-xs font-semibold truncate">Absent</p>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-extrabold text-red-600 leading-none">{stats.absent}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-amber-100 rounded-md"><Clock className="w-3.5 h-3.5 text-amber-600" /></div>
              <p className="text-amber-700 text-xs font-semibold truncate">Leave</p>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-extrabold text-amber-600 leading-none">{stats.leave + stats.halfDay}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search student..."
                className="pl-9 bg-white border-slate-200 rounded-lg h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <span className="text-sm text-slate-500 self-center mr-2">Mark All:</span>
              <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-9" onClick={() => markAll('Present')}>
                <Check className="w-3 h-3 mr-1" /> Present
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 h-9" onClick={() => markAll('Absent')}>
                <X className="w-3 h-3 mr-1" /> Absent
              </Button>
              <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 h-9" onClick={() => markAll('Leave')}>
                <UserMinus className="w-3 h-3 mr-1" /> Leave
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No students found in the selected class/section.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left py-3 px-6 font-bold text-slate-500 w-16">Roll</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Student Info</th>
                    <th className="text-right py-3 px-6 font-bold text-slate-500">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.sort((a, b) => Number(a.rollNo) - Number(b.rollNo)).map((student, index) => {
                    const status = attendanceData[student._id]
                    
                    return (
                      <motion.tr
                        key={student._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.3) }}
                        className={`border-b border-slate-50 transition-colors ${
                          status === 'Present' ? 'bg-emerald-50/30' : 
                          status === 'Absent' ? 'bg-red-50/30' : 
                          status === 'Leave' || status === 'Half-Day' ? 'bg-amber-50/30' : 
                          'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-4 px-6 font-bold text-slate-400">
                          {student.rollNo}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {student.photoUrl && !student.photoUrl.endsWith('.pdf') ? (
                              <img src={student.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                {student.firstName.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-[#0F172A]">{student.firstName} {student.lastName}</p>
                              <p className="text-xs text-slate-500">Adm: {student.admissionNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant={status === 'Present' ? 'default' : 'outline'}
                              className={status === 'Present' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                              onClick={() => handleStatusChange(student._id, 'Present')}
                            >
                              Present
                            </Button>
                            <Button 
                              size="sm" 
                              variant={status === 'Absent' ? 'default' : 'outline'}
                              className={status === 'Absent' ? 'bg-red-500 hover:bg-red-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                              onClick={() => handleStatusChange(student._id, 'Absent')}
                            >
                              Absent
                            </Button>
                            <Button 
                              size="sm" 
                              variant={status === 'Half-Day' ? 'default' : 'outline'}
                              className={status === 'Half-Day' ? 'bg-amber-500 hover:bg-amber-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                              onClick={() => handleStatusChange(student._id, 'Half-Day')}
                            >
                              Half-Day
                            </Button>
                            <Button 
                              size="sm" 
                              variant={status === 'Leave' ? 'default' : 'outline'}
                              className={status === 'Leave' ? 'bg-amber-500 hover:bg-amber-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                              onClick={() => handleStatusChange(student._id, 'Leave')}
                            >
                              Leave
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
