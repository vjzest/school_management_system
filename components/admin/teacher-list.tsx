'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Edit2, Trash2 } from 'lucide-react'

interface Teacher {
  id: string
  name: string
  employeeId: string
  qualification: string
  status: string
  contact: string
  experience: number
  photoUrl?: string
  raw: any
}

interface TeacherListProps {
  teachers: Teacher[]
  onEdit: (teacher: any) => void
  onDelete: (id: string) => void
}

export default function TeacherList({ teachers, onEdit, onDelete }: TeacherListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('All')

  // Derive unique qualifications/subjects from the teachers data
  const uniqueSubjects = Array.from(new Set(teachers.map(t => t.qualification))).filter(Boolean).sort()

  const filteredTeachers = teachers.filter((teacher) => {
    // 1. Comprehensive Search Logic
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      teacher.name.toLowerCase().includes(term) ||
      teacher.employeeId.toLowerCase().includes(term) ||
      teacher.qualification.toLowerCase().includes(term) ||
      (teacher.contact && teacher.contact.toLowerCase().includes(term)) ||
      (teacher.raw.email && teacher.raw.email.toLowerCase().includes(term)) ||
      (teacher.raw.address && teacher.raw.address.toLowerCase().includes(term)) ||
      (teacher.raw.designation && teacher.raw.designation.toLowerCase().includes(term)) ||
      (teacher.raw.gender && teacher.raw.gender.toLowerCase().includes(term)) ||
      (teacher.raw.bloodGroup && teacher.raw.bloodGroup.toLowerCase().includes(term))

    // 2. Subject / Qualification Filter Logic
    const matchesSubject = filterSubject === 'All' || teacher.qualification === filterSubject

    return matchesSearch && matchesSubject
  })

  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by name, emp id, subject, phone, email, address..."
              className="pl-12 bg-slate-50 border-slate-100 rounded-xl h-12 text-[#0F172A] placeholder:text-slate-400 focus-visible:ring-[#FF7A00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              className="bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="All">All Qualifications / Subjects</option>
              {uniqueSubjects.map(sub => <option key={sub as string} value={sub as string}>{sub as string}</option>)}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-4 font-bold text-slate-500">Teacher Info</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Qualification / Subject</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Contact</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Experience</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Status</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <motion.tr
                  key={teacher.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {teacher.photoUrl && !teacher.photoUrl.endsWith('.pdf') ? (
                        <img 
                          src={teacher.photoUrl} 
                          alt={teacher.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                          onError={(e) => { e.currentTarget.src = '/placeholder-user.jpg'; e.currentTarget.onerror = null; }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#0F172A]">{teacher.name}</p>
                        <p className="text-xs text-slate-500">Emp ID: {teacher.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-[#0F172A]">{teacher.qualification}</p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">{teacher.contact || 'N/A'}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{teacher.experience} Yrs</td>
                  <td className="py-4 px-4">
                    {teacher.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Active</Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">Inactive</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(teacher.raw)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { if(confirm('Are you sure you want to delete this teacher?')) onDelete(teacher.id) }} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredTeachers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No teachers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
