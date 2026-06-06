'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit2, Trash2, Calendar, FileText, Download } from 'lucide-react'
import { toast } from 'sonner'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export default function ExamsPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [exams, setExams] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    examName: '',
    studentClass: '',
    course: '',
    startDate: '',
    endDate: '',
    status: 'Scheduled',
    dateSheetUrl: ''
  })

  const fetchExams = () => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/exams`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          setExams(res.data.data)
        }
      }).catch(err => toast.error("Failed to load exams"))
    }
  }

  useEffect(() => {
    fetchExams()
  }, [token])

  const filteredExams = exams.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.studentClass.includes(searchTerm)
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res
      if (editId) {
        res = await axios.put(`http://localhost:5001/api/admin/exams/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/exams`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      if (res.data.success) {
        toast.success(`Exam ${editId ? 'updated' : 'created'} successfully!`)
        setIsAdding(false)
        fetchExams()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving exam")
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return
    try {
      const res = await axios.delete(`http://localhost:5001/api/admin/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success("Exam deleted successfully!")
        fetchExams()
      }
    } catch (err: any) {
      toast.error("Error deleting exam")
    }
  }

  const openEdit = (exam: any) => {
    setFormData({
      examName: exam.examName,
      studentClass: exam.studentClass,
      course: exam.course || '',
      startDate: exam.startDate ? exam.startDate.split('T')[0] : '',
      endDate: exam.endDate ? exam.endDate.split('T')[0] : '',
      status: exam.status || 'Scheduled',
      dateSheetUrl: exam.dateSheetUrl || ''
    })
    setEditId(exam._id)
    setIsAdding(true)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Exams & Date Sheets</h2>
          <p className="text-slate-500">Manage exam schedules and upload date sheets class-wise</p>
        </div>
        <Button 
          onClick={() => {
            setEditId(null)
            setFormData({ examName: '', studentClass: '', course: '', startDate: '', endDate: '', status: 'Scheduled', dateSheetUrl: '' })
            setIsAdding(true)
          }}
          className="bg-[#27598C] hover:bg-blue-800 text-white rounded-xl px-6 shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Exam
        </Button>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by exam name or class..."
              className="pl-9 bg-white border-slate-200 rounded-lg h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredExams.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No exams found. Click "Create Exam" to schedule one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Exam Details</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Class</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Schedule</th>
                    <th className="text-center py-3 px-6 font-bold text-slate-500">Date Sheet</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Status</th>
                    <th className="text-right py-3 px-6 font-bold text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((exam, index) => (
                    <motion.tr
                      key={exam._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-extrabold text-[#0F172A] text-base">{exam.examName}</p>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#27598C]">
                        Class {exam.studentClass} {exam.course && `(${exam.course})`}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{exam.startDate ? exam.startDate.split('T')[0] : 'TBD'} to {exam.endDate ? exam.endDate.split('T')[0] : 'TBD'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {exam.dateSheetUrl ? (
                          <a href={exam.dateSheetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            <Download className="w-3.5 h-3.5" /> View / Download
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Not uploaded</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className={
                          exam.status === 'Completed' ? 'bg-green-100 text-green-700 border-0' :
                          exam.status === 'Ongoing' ? 'bg-blue-100 text-blue-700 border-0' :
                          'bg-amber-100 text-amber-700 border-0'
                        }>
                          {exam.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="border-slate-200 hover:bg-slate-100 text-slate-600" onClick={() => openEdit(exam)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 hover:bg-red-50 text-red-600" onClick={() => handleDelete(exam._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-[#071B4A] text-white p-6 flex justify-between items-center shrink-0">
                <h3 className="text-xl font-bold">{editId ? 'Edit Exam & Date Sheet' : 'Create Exam & Upload Date Sheet'}</h3>
                <button onClick={() => setIsAdding(false)} className="text-white/70 hover:text-white">✕</button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-bold text-slate-500 mb-1">Exam Name</label>
                    <input required placeholder="e.g. Half-Yearly 2026" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.examName} onChange={e => setFormData({...formData, examName: e.target.value})} />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Class</label>
                    <select required className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.studentClass} onChange={e => setFormData({...formData, studentClass: e.target.value, course: ''})}>
                      <option value="">Select Class</option>
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => <option key={cls} value={cls}>Class {cls}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Stream (For 11/12 only)</label>
                    <select className="border border-slate-200 p-2.5 rounded-xl bg-white disabled:opacity-50" disabled={!['11', '12'].includes(formData.studentClass)} value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})}>
                      <option value="">None / All Streams</option>
                      {['PCM', 'PCB', 'Commerce', 'Arts'].map(str => <option key={str} value={str}>{str}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Start Date</label>
                    <input required type="date" className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">End Date</label>
                    <input required type="date" className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                  </div>

                  <div className="flex flex-col col-span-2">
                    <label className="text-xs font-bold text-slate-500 mb-1">Status</label>
                    <select className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Scheduled">Scheduled (Upcoming)</option>
                      <option value="Ongoing">Ongoing (Currently running)</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h4 className="font-extrabold text-[#27598C] mb-3 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-5 h-5" />
                    Upload Date Sheet / Routine
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-[#0F172A]">Document Upload</p>
                      <p className="text-xs text-slate-500 mt-1">Upload a PDF or Image of the full time-table for students to download.</p>
                      {formData.dateSheetUrl && (
                        <p className="text-xs font-bold text-[#589C47] mt-2">✓ Date Sheet Attached</p>
                      )}
                    </div>
                    <div>
                      <CloudinaryUpload 
                        label={formData.dateSheetUrl ? "Change Document" : "Upload Document"} 
                        onUploadSuccess={(url) => setFormData({...formData, dateSheetUrl: url})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 shrink-0">
                  <Button type="button" variant="outline" className="rounded-xl px-6" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" className="bg-[#27598C] hover:bg-blue-800 text-white rounded-xl px-8 shadow-lg shadow-blue-900/20">
                    {editId ? 'Save Changes' : 'Create Exam'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
