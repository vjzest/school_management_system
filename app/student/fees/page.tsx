'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Download, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const feeRecords = [
  { month: 'January', amount: 5000, paid: 5000, dueDate: '31 Jan 2025', status: 'paid', receiptNo: 'REC-001' },
  { month: 'February', amount: 5000, paid: 5000, dueDate: '28 Feb 2025', status: 'paid', receiptNo: 'REC-002' },
  { month: 'March', amount: 5000, paid: 5000, dueDate: '31 Mar 2025', status: 'paid', receiptNo: 'REC-003' },
  { month: 'April', amount: 5000, paid: 5000, dueDate: '30 Apr 2025', status: 'paid', receiptNo: 'REC-004' },
  { month: 'May', amount: 5000, paid: 2500, dueDate: '31 May 2025', status: 'partial', receiptNo: 'REC-005' },
]

export default function FeesPage() {
  const totalFees = feeRecords.reduce((s, r) => s + r.amount, 0)
  const totalPaid = feeRecords.reduce((s, r) => s + r.paid, 0)
  const pendingAmount = totalFees - totalPaid

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-[20px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5D81A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Fee Portal</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">Fee Information</h2>
        <p className="text-slate-300 text-sm mt-1">Academic Year 2025–26 &nbsp;•&nbsp; Class X – A</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total Fees', value: `₹${totalFees.toLocaleString()}`, icon: CreditCard, bg: 'bg-[#27598C]/10', color: 'text-[#27598C]', border: 'border-l-[#27598C]' },
          { label: 'Amount Paid', value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle, bg: 'bg-[#589C47]/10', color: 'text-[#589C47]', border: 'border-l-[#589C47]' },
          { label: 'Pending', value: `₹${pendingAmount.toLocaleString()}`, icon: AlertCircle, bg: 'bg-red-50', color: 'text-red-500', border: 'border-l-red-400' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={`border-0 border-l-4 ${stat.border} bg-white shadow-sm rounded-2xl`}>
                <CardContent className="p-4 sm:p-5">
                  <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-extrabold text-[#0D2640] mt-0.5">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Payment History Table */}
      <Card className="border-0 bg-white shadow-sm rounded-2xl">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[#0D2640] text-base font-extrabold">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          {/* Mobile Card View */}
          <div className="space-y-3 sm:hidden">
            {feeRecords.map((rec, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0D2640]">{rec.month}</span>
                  <Badge className={`border-0 font-bold text-xs capitalize ${rec.status === 'paid' ? 'bg-[#589C47]/10 text-[#589C47]' : 'bg-[#E5D81A]/20 text-yellow-700'}`}>
                    {rec.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-slate-500 text-xs">Amount</span><p className="font-semibold text-[#0D2640]">₹{rec.amount.toLocaleString()}</p></div>
                  <div><span className="text-slate-500 text-xs">Paid</span><p className="font-semibold text-[#589C47]">₹{rec.paid.toLocaleString()}</p></div>
                  <div><span className="text-slate-500 text-xs">Due Date</span><p className="font-semibold text-[#0D2640]">{rec.dueDate}</p></div>
                  <div><span className="text-slate-500 text-xs">Receipt</span><p className="font-semibold text-[#0D2640]">{rec.receiptNo}</p></div>
                </div>
                {rec.status === 'paid' && (
                  <Button variant="ghost" size="sm" className="w-full text-[#27598C] hover:bg-[#27598C]/10 font-bold text-xs rounded-lg">
                    <Download className="w-3 h-3 mr-1.5" /> Download Receipt
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Month', 'Amount', 'Paid', 'Due Date', 'Receipt No.', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-bold text-slate-500 text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeRecords.map((rec, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0D2640]">{rec.month}</td>
                    <td className="py-4 px-4 text-slate-600 font-medium">₹{rec.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-[#589C47] font-bold">₹{rec.paid.toLocaleString()}</td>
                    <td className="py-4 px-4 text-slate-500">{rec.dueDate}</td>
                    <td className="py-4 px-4 text-slate-500">{rec.receiptNo}</td>
                    <td className="py-4 px-4">
                      <Badge className={`border-0 font-bold text-xs capitalize ${rec.status === 'paid' ? 'bg-[#589C47]/10 text-[#589C47]' : 'bg-[#E5D81A]/20 text-yellow-700'}`}>
                        {rec.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {rec.status === 'paid' && (
                        <Button variant="ghost" size="sm" className="text-[#27598C] hover:bg-[#27598C]/10 font-bold text-xs">
                          <Download className="w-3.5 h-3.5 mr-1.5" /> Receipt
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pay Now CTA */}
      {pendingAmount > 0 && (
        <div className="bg-[#0D2640] rounded-[20px] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#E5D81A] font-bold text-xs uppercase tracking-widest mb-1">Action Required</p>
            <h3 className="text-white font-extrabold text-lg">₹{pendingAmount.toLocaleString()} Pending</h3>
            <p className="text-slate-400 text-sm">Please clear your dues before the due date to avoid late fees.</p>
          </div>
          <Button className="w-full sm:w-auto bg-[#E5D81A] hover:bg-yellow-300 text-[#0D2640] font-extrabold h-12 px-8 rounded-full shadow-lg shrink-0">
            Pay Now
          </Button>
        </div>
      )}
    </div>
  )
}
