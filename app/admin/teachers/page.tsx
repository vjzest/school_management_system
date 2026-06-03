'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

const teachers = [
  { id: 1, name: 'Dr. Robert Smith', subject: 'Mathematics', email: 'robert.smith@school.com', experience: '12 years', status: 'active' },
  { id: 2, name: 'Ms. Jennifer White', subject: 'English', email: 'jennifer.white@school.com', experience: '8 years', status: 'active' },
  { id: 3, name: 'Mr. David Brown', subject: 'Science', email: 'david.brown@school.com', experience: '10 years', status: 'active' },
  { id: 4, name: 'Ms. Emily Davis', subject: 'History', email: 'emily.davis@school.com', experience: '6 years', status: 'active' },
  { id: 5, name: 'Mr. James Wilson', subject: 'Physical Education', email: 'james.wilson@school.com', experience: '5 years', status: 'inactive' },
  { id: 6, name: 'Ms. Lisa Anderson', subject: 'Art', email: 'lisa.anderson@school.com', experience: '7 years', status: 'active' },
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Teachers</h2>
          <p className="text-muted-foreground">Manage teaching staff and faculty</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or subject..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Experience</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{teacher.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{teacher.subject}</td>
                    <td className="py-3 px-4 text-muted-foreground">{teacher.email}</td>
                    <td className="py-3 px-4 text-foreground">{teacher.experience}</td>
                    <td className="py-3 px-4">
                      <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
