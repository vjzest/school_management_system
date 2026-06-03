'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit2 } from 'lucide-react'

const feeRecords = [
  { id: 1, student: 'Alex Johnson', amount: 5000, paid: 5000, dueDate: '2024-05-31', status: 'paid', month: 'May' },
  { id: 2, student: 'Sarah Williams', amount: 5000, paid: 5000, dueDate: '2024-05-31', status: 'paid', month: 'May' },
  { id: 3, student: 'Mike Chen', amount: 5000, paid: 2500, dueDate: '2024-05-31', status: 'partial', month: 'May' },
  { id: 4, student: 'Emma Davis', amount: 5000, paid: 0, dueDate: '2024-05-15', status: 'pending', month: 'May' },
  { id: 5, student: 'James Wilson', amount: 5000, paid: 5000, dueDate: '2024-05-31', status: 'paid', month: 'May' },
  { id: 6, student: 'Lisa Anderson', amount: 5000, paid: 5000, dueDate: '2024-05-31', status: 'paid', month: 'May' },
]

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = feeRecords.filter((record) =>
    record.student.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: feeRecords.reduce((sum, r) => sum + r.amount, 0),
    collected: feeRecords.reduce((sum, r) => sum + r.paid, 0),
    pending: feeRecords.reduce((sum, r) => sum + (r.amount - r.paid), 0),
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Fee Management</h2>
          <p className="text-muted-foreground">Track and manage student fees</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Fee Record
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <p className="text-muted-foreground text-sm">Total Fees</p>
          <p className="text-3xl font-bold text-foreground mt-2">${stats.total.toLocaleString()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6"
        >
          <p className="text-green-700 text-sm">Collected</p>
          <p className="text-3xl font-bold text-green-600 mt-2">${stats.collected.toLocaleString()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <p className="text-red-700 text-sm">Pending</p>
          <p className="text-3xl font-bold text-red-600 mt-2">${stats.pending.toLocaleString()}</p>
        </motion.div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by student name..."
                className="pl-10 bg-secondary border-border"
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
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Month</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Paid</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{record.student}</td>
                    <td className="py-3 px-4 text-muted-foreground">{record.month}</td>
                    <td className="py-3 px-4 text-foreground">${record.amount}</td>
                    <td className="py-3 px-4 text-foreground">${record.paid}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          record.status === 'paid'
                            ? 'default'
                            : record.status === 'partial'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
