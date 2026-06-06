'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminAdmissionsPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admissions`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setApplications(res.data.data)
      }
    } catch (err) {
      toast.error('Failed to load applications')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchApplications()
  }, [token])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admissions/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success(`Application marked as ${status}`)
        fetchApplications()
      }
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  if (isLoading) return <div className="p-8 font-bold">Loading applications...</div>

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Admission Applications</h2>
        <p className="text-slate-500">Review and manage new student applications</p>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left font-extrabold text-[#0F172A]">Applicant Name</th>
                <th className="px-6 py-4 text-left font-extrabold text-[#0F172A]">Contact Details</th>
                <th className="px-6 py-4 text-left font-extrabold text-[#0F172A]">Class Applied</th>
                <th className="px-6 py-4 text-left font-extrabold text-[#0F172A]">Status</th>
                <th className="px-6 py-4 text-right font-extrabold text-[#0F172A]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? applications.map((app: any, idx: number) => (
                <tr key={app._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#0F172A]">{app.firstName} {app.lastName}</div>
                    <div className="text-xs text-slate-500 mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600 font-medium">{app.parentEmail}</div>
                    <div className="text-slate-500 text-xs mt-1">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#27598C]/10 text-[#27598C] px-3 py-1 rounded-full font-bold text-xs">
                      {app.classApplied}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {app.status === 'Pending' && <span className="flex items-center gap-1.5 text-yellow-600 font-bold text-xs"><Clock className="w-3.5 h-3.5" /> Pending</span>}
                    {app.status === 'Approved' && <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs"><CheckCircle className="w-3.5 h-3.5" /> Approved</span>}
                    {app.status === 'Rejected' && <span className="flex items-center gap-1.5 text-red-600 font-bold text-xs"><XCircle className="w-3.5 h-3.5" /> Rejected</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {app.status === 'Pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <Button onClick={() => handleStatusChange(app._id, 'Approved')} size="sm" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200">Approve</Button>
                        <Button onClick={() => handleStatusChange(app._id, 'Rejected')} size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">Reject</Button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 italic">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
