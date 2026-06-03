'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import StudentList from '@/components/admin/student-list'

const students = [
  { id: 1, name: 'Alex Johnson', rollNo: 'S001', email: 'alex.johnson@school.com', class: '10-A', status: 'active' },
  { id: 2, name: 'Sarah Williams', rollNo: 'S002', email: 'sarah.williams@school.com', class: '10-A', status: 'active' },
  { id: 3, name: 'Mike Chen', rollNo: 'S003', email: 'mike.chen@school.com', class: '10-B', status: 'active' },
  { id: 4, name: 'Emma Davis', rollNo: 'S004', email: 'emma.davis@school.com', class: '10-A', status: 'inactive' },
  { id: 5, name: 'James Wilson', rollNo: 'S005', email: 'james.wilson@school.com', class: '10-C', status: 'active' },
  { id: 6, name: 'Lisa Anderson', rollNo: 'S006', email: 'lisa.anderson@school.com', class: '10-B', status: 'active' },
]

export default function StudentsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Students</h2>
          <p className="text-slate-500">Manage all students in your school</p>
        </div>
        <Button className="bg-[#FF7A00] hover:bg-orange-600 text-white rounded-xl px-6 shadow-md shadow-orange-500/20">
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </Button>
      </div>

      <StudentList students={students} />
    </div>
  )
}

