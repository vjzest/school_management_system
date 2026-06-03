'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const attendanceData = [
  { name: 'Mon', attendance: 95, expected: 100 },
  { name: 'Tue', attendance: 92, expected: 100 },
  { name: 'Wed', attendance: 98, expected: 100 },
  { name: 'Thu', attendance: 88, expected: 100 },
  { name: 'Fri', attendance: 94, expected: 100 },
  { name: 'Sat', attendance: 91, expected: 100 },
]

const feesData = [
  { name: 'Jan', collected: 15000, pending: 5000 },
  { name: 'Feb', collected: 18000, pending: 3000 },
  { name: 'Mar', collected: 22000, pending: 2000 },
  { name: 'Apr', collected: 20000, pending: 4000 },
  { name: 'May', collected: 25000, pending: 1000 },
  { name: 'Jun', collected: 28000, pending: 500 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function DashboardCharts() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="expected" stroke="var(--muted)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Fees Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend />
                <Bar dataKey="collected" fill="var(--primary)" />
                <Bar dataKey="pending" fill="var(--destructive)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
