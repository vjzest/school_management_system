'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const activities = [
  { id: 1, user: 'John Doe', action: 'Student Admission', time: '2 hours ago', status: 'completed' },
  { id: 2, user: 'Jane Smith', action: 'Attendance Marked', time: '45 minutes ago', status: 'completed' },
  { id: 3, user: 'Admin', action: 'Fees Collected', time: '1 hour ago', status: 'completed' },
  { id: 4, user: 'Sarah Wilson', action: 'Exam Created', time: '3 hours ago', status: 'pending' },
  { id: 5, user: 'Mike Johnson', action: 'Report Generated', time: '5 hours ago', status: 'completed' },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function RecentActivity() {
  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
