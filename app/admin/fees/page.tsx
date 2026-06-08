'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, IndianRupee, CreditCard, Banknote, History, Receipt, ArrowRight, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function FeesPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [students, setStudents] = useState<any[]>([])
  const [feeRecords, setFeeRecords] = useState<any[]>([])
  
  // Filters
  const [filterClass, setFilterClass] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterSection, setFilterSection] = useState('')
  const [feeCycle, setFeeCycle] = useState('April 2026')
  const [searchTerm, setSearchTerm] = useState('')

  // Modals
  const [isGenerating, setIsGenerating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  // Generate Form
  const [genForm, setGenForm] = useState({
    dueDate: '', baseFee: '', transportFee: '', libraryFee: '', labFee: '', extracurricularFee: ''
  })

  // Update Form
  const [updateForm, setUpdateForm] = useState({
    amountPaid: '', lateFine: '', discount: '', paymentMethod: '', transactionId: '', remarks: ''
  })

  // Fetch initial basic data
  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) setStudents(res.data.data)
      }).catch(err => console.error(err))
    }
  }, [token])

  const fetchFees = () => {
    if (token && feeCycle) {
      const queryParam = feeCycle === 'Overall' ? '' : feeCycle;
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/fees?feeCycle=${queryParam}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          setFeeRecords(res.data.data)
        }
      }).catch(err => toast.error("Failed to load fee records"))
    }
  }

  useEffect(() => {
    fetchFees()
  }, [token, feeCycle])

  // Derive dropdown options
  const uniqueClasses = Array.from(new Set(students.map(s => s.studentClass))).sort((a: any, b: any) => Number(a) - Number(b))
  const uniqueCourses = Array.from(new Set(students.map(s => s.course))).filter(Boolean).sort()
  const uniqueSections = Array.from(new Set(students.map(s => s.section))).filter(Boolean).sort()

  const cycles = [
    'Overall',
    'January 2026', 'February 2026', 'March 2026', 'April 2026', 
    'May 2026', 'June 2026', 'July 2026', 'August 2026', 
    'September 2026', 'October 2026', 'November 2026', 'December 2026',
    'Term 1', 'Term 2', 'Annual'
  ]

  // Filter records based on UI
  const filteredRecords = feeRecords.filter(record => {
    if (!record.studentId) return false
    const s = record.studentId
    const matchesClass = !filterClass || s.studentClass === filterClass
    const matchesCourse = !filterCourse || s.course === filterCourse
    const matchesSection = !filterSection || s.section === filterSection
    const term = searchTerm.toLowerCase()
    const matchesSearch = 
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(term) ||
      (s.admissionNo && s.admissionNo.toLowerCase().includes(term))

    return matchesClass && matchesCourse && matchesSection && matchesSearch
  })

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!filterClass) return toast.error("Please select a class to generate fees for")
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/fees/generate`, {
        studentClass: filterClass,
        section: filterSection,
        course: filterCourse,
        feeCycle,
        dueDate: genForm.dueDate,
        baseFee: Number(genForm.baseFee) || 0,
        transportFee: Number(genForm.transportFee) || 0,
        libraryFee: Number(genForm.libraryFee) || 0,
        labFee: Number(genForm.labFee) || 0,
        extracurricularFee: Number(genForm.extracurricularFee) || 0
      }, { headers: { Authorization: `Bearer ${token}` } })

      if (res.data.success) {
        toast.success(res.data.message)
        setIsGenerating(false)
        fetchFees()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to generate fees")
    }
  }

  const openUpdateModal = (record: any) => {
    setSelectedRecord(record)
    setUpdateForm({
      amountPaid: record.amountPaid || '',
      lateFine: record.lateFine || '',
      discount: record.discount || '',
      paymentMethod: record.paymentMethod || 'Cash',
      transactionId: record.transactionId || '',
      remarks: record.remarks || ''
    })
    setIsUpdating(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/fees/${selectedRecord._id}`, {
        amountPaid: Number(updateForm.amountPaid),
        lateFine: Number(updateForm.lateFine),
        discount: Number(updateForm.discount),
        paymentMethod: updateForm.paymentMethod,
        transactionId: updateForm.transactionId,
        remarks: updateForm.remarks
      }, { headers: { Authorization: `Bearer ${token}` } })

      if (res.data.success) {
        toast.success("Fee record updated successfully")
        setIsUpdating(false)
        fetchFees()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update fee")
    }
  }

  const stats = {
    totalExpected: filteredRecords.reduce((acc, curr) => acc + curr.totalAmount, 0),
    totalCollected: filteredRecords.reduce((acc, curr) => acc + curr.amountPaid, 0),
    pendingRecords: filteredRecords.filter(r => r.status === 'Pending').length,
    paidRecords: filteredRecords.filter(r => r.status === 'Paid').length
  }

  // Export to CSV Function
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      return toast.error("No records to export")
    }

    const headers = ['Roll No', 'Admission No', 'Student Name', 'Class', 'Section', 'Stream', 'Fee Cycle', 'Base Fee', 'Transport Fee', 'Total Amount', 'Amount Paid', 'Status', 'Payment Date', 'Payment Method']
    const rows = filteredRecords.map(r => {
      const s = r.studentId || {}
      return [
        s.rollNo || '',
        s.admissionNo || '',
        `"${s.firstName || ''} ${s.lastName || ''}"`,
        s.studentClass || '',
        s.section || '',
        s.course || '',
        r.feeCycle || '',
        r.baseFee || 0,
        r.transportFee || 0,
        r.totalAmount || 0,
        r.amountPaid || 0,
        r.status || '',
        r.paymentDate ? r.paymentDate.split('T')[0] : '',
        r.paymentMethod || ''
      ].join(',')
    })

    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    
    const fileName = `Fee_Records_${feeCycle === 'Overall' ? 'All_Cycles' : feeCycle}_Class_${filterClass || 'All'}.csv`
    
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Fee Management</h2>
          <p className="text-slate-500">Manage class-wise fee collections and records</p>
        </div>
        <div className="flex gap-3">
          <select
            className="bg-white border-slate-200 shadow-sm rounded-xl px-4 py-2 text-[#0F172A] font-bold outline-none cursor-pointer"
            value={feeCycle}
            onChange={(e) => setFeeCycle(e.target.value)}
          >
            {cycles.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <Button 
            onClick={handleExport}
            variant="outline"
            className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-green-50 rounded-xl px-4 shadow-sm"
            title="Export filtered records to CSV"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            onClick={() => setIsGenerating(true)}
            disabled={feeCycle === 'Overall'}
            className="bg-[#27598C] hover:bg-blue-800 text-white rounded-xl px-6 shadow-md shadow-blue-900/20 disabled:opacity-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate Class Fees
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card - Selectors */}
        <Card className="lg:col-span-4 border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl flex flex-col justify-center p-4">
          <h3 className="font-bold text-[#0F172A] text-sm mb-3">Filter by Class & Section</h3>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterClass}
              onChange={(e) => {
                setFilterClass(e.target.value)
                setFilterCourse('')
              }}
            >
              <option value="">All Classes</option>
              {uniqueClasses.map(c => <option key={c as string} value={c as string}>{['Nursery', 'LKG', 'UKG'].includes(c as string) ? c : `Class ${c}`}</option>)}
            </select>
            
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            >
              <option value="">All Sections</option>
              {uniqueSections.map(s => <option key={s as string} value={s as string}>Section {s as string}</option>)}
            </select>

            {(filterClass === '11' || filterClass === '12') && uniqueCourses.length > 0 && (
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-[#0F172A] focus:ring-[#FF7A00] outline-none col-span-2"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="">All Streams</option>
                {uniqueCourses.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
              </select>
            )}
          </div>
        </Card>

        {/* Right - Stats */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4 h-fit">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-slate-100 rounded-md"><IndianRupee className="w-3.5 h-3.5 text-slate-500" /></div>
              <p className="text-slate-500 text-xs font-semibold truncate">Expected</p>
            </div>
            <div className="mt-2">
              <p className="text-xl font-extrabold text-[#0F172A] leading-none">₹{stats.totalExpected}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-emerald-100 rounded-md"><Banknote className="w-3.5 h-3.5 text-emerald-600" /></div>
              <p className="text-emerald-700 text-xs font-semibold truncate">Collected</p>
            </div>
            <div className="mt-2">
              <p className="text-xl font-extrabold text-emerald-600 leading-none">₹{stats.totalCollected}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-red-50 border border-red-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-red-100 rounded-md"><History className="w-3.5 h-3.5 text-red-600" /></div>
              <p className="text-red-700 text-xs font-semibold truncate">Pending</p>
            </div>
            <div className="mt-2">
              <p className="text-xl font-extrabold text-red-600 leading-none">{stats.pendingRecords} <span className="text-xs font-medium">students</span></p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-blue-100 rounded-md"><Receipt className="w-3.5 h-3.5 text-blue-600" /></div>
              <p className="text-blue-700 text-xs font-semibold truncate">Fully Paid</p>
            </div>
            <div className="mt-2">
              <p className="text-xl font-extrabold text-blue-600 leading-none">{stats.paidRecords} <span className="text-xs font-medium">students</span></p>
            </div>
          </motion.div>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search student or admission no..."
              className="pl-9 bg-white border-slate-200 rounded-lg h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No fee records found for the selected criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left py-3 px-6 font-bold text-slate-500 w-16">Roll</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Student Info</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Class</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Fee Cycle</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Total Fee</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Paid</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Status</th>
                    <th className="text-right py-3 px-6 font-bold text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.sort((a, b) => Number(a.studentId?.rollNo) - Number(b.studentId?.rollNo)).map((record, index) => {
                    const student = record.studentId
                    return (
                      <motion.tr
                        key={record._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.3) }}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-400">
                          {student.rollNo || '-'}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {student.photoUrl && !student.photoUrl.endsWith('.pdf') ? (
                              <img src={student.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                {student.firstName.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-[#0F172A]">{student.firstName} {student.lastName}</p>
                              <p className="text-[10px] text-slate-500">Adm: {student.admissionNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-600">
                          {student.studentClass} {student.section && `- ${student.section}`} {student.course && `(${student.course})`}
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-500">
                          {record.feeCycle}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-700">₹{record.totalAmount}</td>
                        <td className="py-4 px-6 font-bold text-emerald-600">₹{record.amountPaid}</td>
                        <td className="py-4 px-6">
                          <Badge variant="outline" className={
                            record.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border-0' :
                            record.status === 'Partial' ? 'bg-blue-100 text-blue-700 border-0' :
                            'bg-red-100 text-red-700 border-0'
                          }>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            onClick={() => openUpdateModal(record)}
                          >
                            Collect / Edit
                            <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Fees Modal */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#071B4A] text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Generate Class Fees</h3>
                  <p className="text-sm text-blue-200">For {feeCycle}</p>
                </div>
                <button onClick={() => setIsGenerating(false)} className="text-white hover:text-orange-400">✕</button>
              </div>
              <form onSubmit={handleGenerate} className="p-6 space-y-4">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-sm mb-4">
                  <strong>Note:</strong> Fees will be generated for all students currently matching the <strong>Class and Section filters</strong> on the main page. Make sure you select a Class first!
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Due Date</label>
                    <input required type="date" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.dueDate} onChange={e => setGenForm({...genForm, dueDate: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Base Tuition Fee (₹)</label>
                    <input required type="number" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.baseFee} onChange={e => setGenForm({...genForm, baseFee: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Transport Fee (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.transportFee} onChange={e => setGenForm({...genForm, transportFee: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Library Fee (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.libraryFee} onChange={e => setGenForm({...genForm, libraryFee: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Lab Fee (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.labFee} onChange={e => setGenForm({...genForm, labFee: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Extracurricular Fee (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl" value={genForm.extracurricularFee} onChange={e => setGenForm({...genForm, extracurricularFee: e.target.value})} />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
                  <Button type="button" variant="outline" onClick={() => setIsGenerating(false)} className="rounded-xl px-6">Cancel</Button>
                  <Button type="submit" className="bg-[#FF7A00] hover:bg-orange-600 text-white rounded-xl px-6">Generate</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update/Collect Fee Modal */}
      <AnimatePresence>
        {isUpdating && selectedRecord && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#2D6A4F] text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Collect Fee Payment</h3>
                  <p className="text-sm text-green-200">{selectedRecord.studentId?.firstName} {selectedRecord.studentId?.lastName} • {feeCycle}</p>
                </div>
                <button onClick={() => setIsUpdating(false)} className="text-white hover:text-green-300">✕</button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Base Total</p>
                    <p className="text-2xl font-extrabold text-[#0F172A] mt-1">₹{selectedRecord.baseFee + selectedRecord.transportFee + selectedRecord.libraryFee + selectedRecord.labFee + selectedRecord.extracurricularFee}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 text-center shadow-sm">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Already Paid</p>
                    <p className="text-2xl font-extrabold text-emerald-600 mt-1">₹{selectedRecord.amountPaid}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">New Total Paid Amount (₹)</label>
                    <input required type="number" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.amountPaid} onChange={e => setUpdateForm({...updateForm, amountPaid: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Payment Method</label>
                    <select className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.paymentMethod} onChange={e => setUpdateForm({...updateForm, paymentMethod: e.target.value})}>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Late Fine (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.lateFine} onChange={e => setUpdateForm({...updateForm, lateFine: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Discount/Concession (₹)</label>
                    <input type="number" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.discount} onChange={e => setUpdateForm({...updateForm, discount: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Transaction ID / Ref No</label>
                    <input type="text" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.transactionId} onChange={e => setUpdateForm({...updateForm, transactionId: e.target.value})} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1">Remarks</label>
                    <input type="text" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={updateForm.remarks} onChange={e => setUpdateForm({...updateForm, remarks: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
                  <Button type="button" variant="outline" onClick={() => setIsUpdating(false)} className="rounded-xl px-6">Cancel</Button>
                  <Button type="submit" className="bg-[#2D6A4F] hover:bg-green-800 text-white rounded-xl px-6">Save Payment</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
