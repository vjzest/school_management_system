'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

const exams = [
  { id: 1, name: 'Mid-term Exam', class: '10-A', subject: 'Mathematics', date: '2024-06-15', totalMarks: 100, status: 'scheduled' },
  { id: 2, name: 'Mid-term Exam', class: '10-B', subject: 'English', date: '2024-06-16', totalMarks: 100, status: 'scheduled' },
  { id: 3, name: 'Unit Test 1', class: '10-A', subject: 'Science', date: '2024-05-25', totalMarks: 50, status: 'ongoing' },
  { id: 4, name: 'Quiz', class: '10-C', subject: 'History', date: '2024-05-20', totalMarks: 20, status: 'completed' },
  { id: 5, name: 'Final Exam', class: '10-A', subject: 'Mathematics', date: '2024-07-01', totalMarks: 100, status: 'scheduled' },
]

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100'
      case 'ongoing':
        return 'bg-blue-100'
      case 'scheduled':
        return 'bg-yellow-100'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Exams</h2>
          <p className="text-muted-foreground">Create and manage exams</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create Exam
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by exam name or subject..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg ${getStatusColor(exam.status)} border border-border/30`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{exam.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs text-muted-foreground">Class</p>
                        <p className="text-foreground font-medium">{exam.class}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Subject</p>
                        <p className="text-foreground font-medium">{exam.subject}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-foreground font-medium">{exam.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Marks</p>
                        <p className="text-foreground font-medium">{exam.totalMarks}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="capitalize" variant={exam.status === 'completed' ? 'default' : 'secondary'}>
                      {exam.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
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
