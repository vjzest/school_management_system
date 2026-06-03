'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, AlertCircle, CheckCircle, InfoIcon } from 'lucide-react'

const notifications = [
  { id: 1, title: 'Exam Scheduled', message: 'Mid-term exam for Class 10-A scheduled on June 15', type: 'info', time: '2 hours ago' },
  { id: 2, title: 'Attendance Alert', message: 'Low attendance for Class 10-B (65%)', type: 'warning', time: '4 hours ago' },
  { id: 3, title: 'Fees Reminder', message: '5 students have pending fees', type: 'alert', time: '1 day ago' },
  { id: 4, title: 'New Admission', message: 'New student admission request received', type: 'success', time: '2 days ago' },
  { id: 5, title: 'System Update', message: 'System maintenance scheduled for next week', type: 'info', time: '3 days ago' },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'alert':
      return 'bg-red-50 border-red-200'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200'
    case 'success':
      return 'bg-green-50 border-green-200'
    case 'info':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-yellow-600" />
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'info':
      return <InfoIcon className="w-5 h-5 text-blue-600" />
    default:
      return <Bell className="w-5 h-5 text-gray-600" />
  }
}

export default function NotificationsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Notifications</h2>
        <p className="text-muted-foreground">View all system notifications and alerts</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${getTypeColor(notification.type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
