'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Check, X } from 'lucide-react'

const attendanceRecords = [
  { id: 1, student: 'Alex Johnson', date: '2024-05-20', status: 'present', class: '10-A' },
  { id: 2, student: 'Sarah Williams', date: '2024-05-20', status: 'present', class: '10-A' },
  { id: 3, student: 'Mike Chen', date: '2024-05-20', status: 'absent', class: '10-B' },
  { id: 4, student: 'Emma Davis', date: '2024-05-20', status: 'present', class: '10-A' },
  { id: 5, student: 'James Wilson', date: '2024-05-20', status: 'late', class: '10-C' },
  { id: 6, student: 'Lisa Anderson', date: '2024-05-20', status: 'present', class: '10-B' },
  { id: 7, student: 'John Smith', date: '2024-05-20', status: 'absent', class: '10-C' },
  { id: 8, student: 'Mary Johnson', date: '2024-05-20', status: 'present', class: '10-A' },
]

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('2024-05-20')

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      record.date === selectedDate
  )

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    total: attendanceRecords.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100'
      case 'absent':
        return 'bg-red-100'
      case 'late':
        return 'bg-yellow-100'
      default:
        return 'bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    return status === 'present' ? (
      <Check className="w-4 h-4 text-green-600" />
    ) : status === 'absent' ? (
      <X className="w-4 h-4 text-red-600" />
    ) : (
      <span className="text-yellow-600 font-bold">!</span>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Attendance</h2>
          <p className="text-muted-foreground">Track daily attendance records</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-4"
        >
          <p className="text-muted-foreground text-sm">Total Students</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <p className="text-green-700 text-sm">Present</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.present}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p className="text-red-700 text-sm">Absent</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.absent}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <p className="text-yellow-700 text-sm">Late</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.late}</p>
        </motion.div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-secondary border-border w-full md:w-auto"
              />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by student name..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-lg ${getStatusColor(record.status)} transition-colors`}
              >
                <div>
                  <p className="font-medium text-foreground">{record.student}</p>
                  <p className="text-sm text-muted-foreground">{record.class}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {record.status}
                  </Badge>
                  {getStatusIcon(record.status)}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
