'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Edit2, Trash2 } from 'lucide-react'

interface Student {
  id: number
  name: string
  rollNo: string
  email: string
  class: string
  status: string
}

interface StudentListProps {
  students: Student[]
}

export default function StudentList({ students }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by name or roll number..."
              className="pl-12 bg-slate-50 border-slate-100 rounded-xl h-12 text-[#0F172A] placeholder:text-slate-400 focus-visible:ring-[#FF7A00]"
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
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-4 font-bold text-slate-500">Name</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Roll No</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Email</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Class</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Status</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#0F172A]">{student.name}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{student.rollNo}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{student.email}</td>
                  <td className="py-4 px-4 font-bold text-[#0F172A]">{student.class}</td>
                  <td className="py-4 px-4">
                    {student.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Active</Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">Inactive</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
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
  )
}
