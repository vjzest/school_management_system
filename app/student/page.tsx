'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, BookOpen, Calendar } from 'lucide-react'

const dashboardStats = [
  { label: 'Attendance', value: '92%', icon: CheckCircle, color: 'text-green-400' },
  { label: 'Pending Fees', value: 'Rs. 2,500', icon: AlertCircle, color: 'text-orange-400' },
  { label: 'Homework', value: '3 Due', icon: BookOpen, color: 'text-blue-400' },
  { label: 'Next Class', value: '10:30 AM', icon: Calendar, color: 'text-purple-400' },
]

const upcomingClasses = [
  { subject: 'Mathematics', teacher: 'Dr. Smith', time: '10:30 AM - 11:30 AM', room: 'A-101' },
  { subject: 'English', teacher: 'Ms. Johnson', time: '11:45 AM - 12:45 PM', room: 'A-102' },
  { subject: 'Science', teacher: 'Dr. Williams', time: '1:00 PM - 2:00 PM', room: 'Lab-1' },
]

const recentResults = [
  { exam: 'Unit Test 1', subject: 'Mathematics', marks: 85, totalMarks: 100, percentage: '85%', grade: 'A' },
  { exam: 'Quiz', subject: 'English', marks: 18, totalMarks: 20, percentage: '90%', grade: 'A+' },
  { exam: 'Mid-term', subject: 'Science', marks: 88, totalMarks: 100, percentage: '88%', grade: 'A' },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function StudentDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Welcome, Rahul Sharma</h2>
        <p className="text-slate-500">Here's your academic overview for today</p>
      </div>

      {/* Quick Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#071B4A]">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-[#0F172A]">{classItem.subject}</p>
                        <p className="text-sm text-muted-foreground mt-1">{classItem.teacher}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{classItem.time}</span>
                          <span>•</span>
                          <span>Room: {classItem.room}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">Upcoming</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  )
}
