'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

interface FeeRecord {
  month: string
  amount: number
  paid: number
  dueDate: string
  status: string
  receiptNo: string
}

interface FeesHistoryProps {
  feeRecords: FeeRecord[]
}

export default function FeesHistory({ feeRecords }: FeesHistoryProps) {
  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-[#071B4A]">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 font-bold text-slate-500">Month</th>
                <th className="text-left py-3 px-4 font-bold text-slate-500">Amount</th>
                <th className="text-left py-3 px-4 font-bold text-slate-500">Paid</th>
                <th className="text-left py-3 px-4 font-bold text-slate-500">Due Date</th>
                <th className="text-left py-3 px-4 font-bold text-slate-500">Status</th>
                <th className="text-left py-3 px-4 font-bold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((record, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#0F172A]">{record.month}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">Rs. {record.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">Rs. {record.paid.toLocaleString()}</td>
                  <td className="py-4 px-4 text-slate-500">{record.dueDate}</td>
                  <td className="py-4 px-4">
                    {record.status === 'paid' ? (
                       <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Paid</Badge>
                    ) : (
                       <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">Partial</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {record.status === 'paid' && (
                      <Button variant="ghost" size="sm" className="text-[#FF7A00] hover:text-white hover:bg-[#FF7A00]">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
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
  )
}
