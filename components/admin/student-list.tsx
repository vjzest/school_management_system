'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Edit2, Trash2 } from 'lucide-react'

interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  status: string
  admissionNo: string
  parentPhone: string
  transportMode: string
  photoUrl?: string
  address?: string
  contact?: string
  bloodGroup?: string
  raw: any
}

interface StudentListProps {
  students: Student[]
  onEdit: (student: any) => void
  onDelete: (id: string) => void
}

export default function StudentList({ students, onEdit, onDelete }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('All')
  const [filterSection, setFilterSection] = useState('All')
  const [filterCourse, setFilterCourse] = useState('All')
  const [filterBloodGroup, setFilterBloodGroup] = useState('All')

  // Derive unique classes, sections, and courses from the students data
  const uniqueClasses = Array.from(new Set(students.map(s => s.raw.studentClass))).sort((a: any, b: any) => Number(a) - Number(b))
  const uniqueSections = Array.from(new Set(students.map(s => s.raw.section))).filter(Boolean).sort()
  const uniqueCourses = Array.from(new Set(students.map(s => s.raw.course))).filter(Boolean).sort()
  const allBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const filteredStudents = students.filter((student) => {
    // 1. Search Logic
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      student.name.toLowerCase().includes(term) ||
      student.rollNo.toString().toLowerCase().includes(term) ||
      student.admissionNo.toLowerCase().includes(term) ||
      (student.address && student.address.toLowerCase().includes(term)) ||
      (student.contact && student.contact.toLowerCase().includes(term)) ||
      (student.parentPhone && student.parentPhone.toLowerCase().includes(term));

    // 2. Class, Section & Course Filter Logic
    const matchesClass = filterClass === 'All' || student.raw.studentClass === filterClass;
    const matchesSection = filterSection === 'All' || student.raw.section === filterSection;
    const matchesCourse = filterCourse === 'All' || student.raw.course === filterCourse;

    // 3. Blood Group Filter Logic
    const matchesBloodGroup = filterBloodGroup === 'All' || student.bloodGroup === filterBloodGroup;

    return matchesSearch && matchesClass && matchesSection && matchesCourse && matchesBloodGroup;
  })

  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by name, roll no, adm no, address, phone..."
              className="pl-12 bg-slate-50 border-slate-100 rounded-xl h-12 text-[#0F172A] placeholder:text-slate-400 focus-visible:ring-[#FF7A00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              className="bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="All">All Classes</option>
              {uniqueClasses.map(c => <option key={c as string} value={c as string}>Class {c as string}</option>)}
            </select>
            {uniqueCourses.length > 0 && (
              <select
                className="bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-[#0F172A] focus:ring-[#FF7A00] outline-none"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="All">All Streams</option>
                {uniqueCourses.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
              </select>
            )}
            <select
              className="bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            >
              <option value="All">All Sections</option>
              {uniqueSections.map(s => <option key={s as string} value={s as string}>Section {s as string}</option>)}
            </select>
            <select
              className="bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
            >
              <option value="All">All Blood Groups</option>
              {allBloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-4 font-bold text-slate-500">Student Info</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Class & Roll</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Parent Contact</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Transport</th>
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
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {student.photoUrl && !student.photoUrl.endsWith('.pdf') ? (
                        <img 
                          src={student.photoUrl} 
                          alt={student.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                          onError={(e) => { e.currentTarget.src = '/placeholder-user.jpg'; e.currentTarget.onerror = null; }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {student.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#0F172A]">{student.name}</p>
                        <p className="text-xs text-slate-500">Adm: {student.admissionNo}</p>
                        {student.bloodGroup && <p className="text-xs font-bold text-red-500">Blood: {student.bloodGroup}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-[#0F172A]">{student.class}</p>
                    <p className="text-xs text-slate-500">Roll: {student.rollNo}</p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">{student.parentPhone || 'N/A'}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{student.transportMode}</td>
                  <td className="py-4 px-4">
                    {student.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Active</Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">Inactive</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(student.raw)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { if(confirm('Are you sure you want to delete this student?')) onDelete(student.id) }} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
