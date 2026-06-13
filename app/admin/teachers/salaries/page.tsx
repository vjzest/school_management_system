'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreditCard, DollarSign, Calendar, CheckCircle2, AlertCircle, RefreshCw, Users } from 'lucide-react'
import { toast } from 'sonner'

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

export default function SalariesPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [records, setRecords] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPayingId, setIsPayingId] = useState<string | null>(null)

  // Filter & Generation States
  const currentYear = new Date().getFullYear()
  const currentMonthValue = new Date().getMonth() + 1
  
  const [filterMonth, setFilterMonth] = useState<string>('')
  const [filterYear, setFilterYear] = useState<string>(currentYear.toString())
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const [genMonth, setGenMonth] = useState<string>(currentMonthValue.toString())
  const [genYear, setGenYear] = useState<string>(currentYear.toString())

  const fetchSalaryRecords = async () => {
    setIsLoading(true)
    try {
      const params: any = {}
      if (filterMonth && filterMonth !== 'all') params.month = filterMonth
      if (filterYear && filterYear !== 'all') params.year = filterYear
      if (filterStatus && filterStatus !== 'all') params.status = filterStatus

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers/salary/records`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      })
      if (res.data.success) {
        setRecords(res.data.data)
      }
    } catch (err) {
      toast.error('Failed to load salary records')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchSalaryRecords()
    }
  }, [token, filterMonth, filterYear, filterStatus])

  const handleGeneratePayroll = async () => {
    setIsGenerating(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers/salary/generate`, {
        month: parseInt(genMonth),
        year: parseInt(genYear)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success(`Payroll generated! ${res.data.count} new records created.`)
        // Reset filters to view the newly generated month
        setFilterMonth(genMonth)
        setFilterYear(genYear)
        setFilterStatus('all')
        fetchSalaryRecords()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to generate payroll')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePaySalary = async (id: string) => {
    setIsPayingId(id)
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers/salary/${id}/pay`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success('Salary marked as Paid successfully!')
        fetchSalaryRecords()
      }
    } catch (err) {
      toast.error('Failed to pay salary')
    } finally {
      setIsPayingId(null)
    }
  }

  // Calculate stats for current visible records
  const totalSalaryExpense = records.reduce((sum, r) => sum + r.amount, 0)
  const paidSalary = records.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0)
  const pendingSalary = records.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0)
  const pendingCount = records.filter(r => r.status === 'Pending').length

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-1">Teacher Salary Management</h2>
          <p className="text-slate-500">Generate payroll and track salary payments for school staff</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-slate-500">Total Payroll Expense</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#27598C]"><DollarSign className="w-4 h-4" /></div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-black text-[#0D2640]">₹{totalSalaryExpense.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">For currently filtered records</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-slate-500">Total Salary Paid</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 className="w-4 h-4" /></div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-black text-green-600">₹{paidSalary.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">Successfully disbursed</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-slate-500">Pending Salaries</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600"><AlertCircle className="w-4 h-4" /></div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-black text-yellow-600">₹{pendingSalary.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">{pendingCount} staff members pending</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-slate-500">Staff Payroll Status</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-[#0D2640]/10 flex items-center justify-center text-[#0D2640]"><Users className="w-4 h-4" /></div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="text-2xl font-black text-[#0D2640]">
              {records.length > 0 ? `${Math.round(((records.length - pendingCount) / records.length) * 100)}%` : '0%'}
            </div>
            <p className="text-xs text-slate-400 mt-1">Paid progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Payroll Generator */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl h-fit">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-base font-extrabold text-[#0D2640] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#27598C]" /> Generate Payroll
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <p className="text-xs text-slate-500">
              Bulk-generate pending salary records for all active teachers for the selected month/year.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Month</label>
                <Select value={genMonth} onValueChange={setGenMonth}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map(m => (
                      <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Year</label>
                <Select value={genYear} onValueChange={setGenYear}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[`${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`].map(yr => (
                      <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGeneratePayroll} 
                disabled={isGenerating} 
                className="w-full bg-[#589C47] hover:bg-[#4a853b] text-white rounded-xl shadow-md font-bold mt-2"
              >
                {isGenerating ? 'Generating...' : 'Generate Month Payroll'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Filters + Records Table */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl lg:col-span-3">
          <CardHeader className="pb-2 pt-5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-base font-extrabold text-[#0D2640] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#27598C]" /> Disbursal Logs
            </CardTitle>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-[120px] rounded-xl h-9">
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {MONTHS.map(m => (
                    <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[100px] rounded-xl h-9">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {[`${currentYear - 2}`, `${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`].map(yr => (
                    <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[110px] rounded-xl h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl text-slate-500" onClick={fetchSalaryRecords}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500 font-semibold">Loading records...</div>
            ) : records.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50 border-b">
                      <TableHead className="font-extrabold text-[#0D2640] px-6 py-3">Teacher ID</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640]">Teacher Name</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640]">Salary Month</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640]">Base Salary</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640]">Status</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640]">Payment Date</TableHead>
                      <TableHead className="font-extrabold text-[#0D2640] text-right px-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((rec, idx) => {
                      const teacher = rec.teacherId || {}
                      const monthName = MONTHS.find(m => m.value === rec.month)?.label || rec.month
                      return (
                        <TableRow key={rec._id} className="hover:bg-slate-50/50 border-b">
                          <TableCell className="font-semibold text-slate-700 px-6 py-4">{teacher.employeeId || 'N/A'}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-bold text-[#0D2640]">{teacher.firstName ? `${teacher.firstName} ${teacher.lastName}` : 'N/A'}</p>
                              <p className="text-xs text-slate-400">{teacher.designation || 'Staff'}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-slate-600">{monthName} {rec.year}</TableCell>
                          <TableCell className="font-bold text-slate-800">₹{rec.amount?.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              rec.status === 'Paid' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${rec.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                              {rec.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-slate-500">
                            {rec.paymentDate ? new Date(rec.paymentDate).toLocaleDateString() : '—'}
                          </TableCell>
                          <TableCell className="text-right px-6">
                            {rec.status === 'Pending' ? (
                              <Button
                                size="sm"
                                disabled={isPayingId === rec._id}
                                onClick={() => handlePaySalary(rec._id)}
                                className="bg-[#27598C] hover:bg-[#1a3d66] text-white font-bold rounded-xl text-xs py-1.5"
                              >
                                {isPayingId === rec._id ? 'Paying...' : 'Mark Paid'}
                              </Button>
                            ) : (
                              <span className="text-xs font-bold text-slate-400">Complete</span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-16 text-center text-slate-400">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p className="font-medium">No salary records found for this period</p>
                <p className="text-xs text-slate-400 mt-1">Please select a different month/year or generate payroll.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
