'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Upload, Download } from 'lucide-react'

const results = [
  { id: 1, exam: 'Mid-term Exam', class: '10-A', subject: 'Mathematics', publishedDate: '2024-05-25', totalStudents: 45, marksUploaded: 45, status: 'published' },
  { id: 2, exam: 'Mid-term Exam', class: '10-B', subject: 'English', publishedDate: '2024-05-26', totalStudents: 42, marksUploaded: 38, status: 'pending' },
  { id: 3, exam: 'Unit Test 1', class: '10-A', subject: 'Science', publishedDate: '2024-05-21', totalStudents: 45, marksUploaded: 45, status: 'published' },
  { id: 4, exam: 'Quiz', class: '10-C', subject: 'History', publishedDate: '2024-05-20', totalStudents: 38, marksUploaded: 38, status: 'published' },
]

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResults = results.filter((result) =>
    result.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Results</h2>
          <p className="text-muted-foreground">Publish and manage exam results</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Upload className="w-4 h-4 mr-2" />
          Upload Results
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by exam or subject..."
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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Exam</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Class</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Marks Uploaded</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Published Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <motion.tr
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{result.exam}</td>
                    <td className="py-3 px-4 text-muted-foreground">{result.class}</td>
                    <td className="py-3 px-4 text-foreground">{result.subject}</td>
                    <td className="py-3 px-4 text-foreground">
                      {result.marksUploaded}/{result.totalStudents}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{result.publishedDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={result.status === 'published' ? 'default' : 'secondary'}>
                        {result.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
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
