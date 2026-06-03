'use client'

import FeesStats from '@/components/student/fees-stats'
import FeesHistory from '@/components/student/fees-history'

const feeRecords = [
  { month: 'January', amount: 5000, paid: 5000, dueDate: '2024-01-31', status: 'paid', receiptNo: 'REC-001' },
  { month: 'February', amount: 5000, paid: 5000, dueDate: '2024-02-29', status: 'paid', receiptNo: 'REC-002' },
  { month: 'March', amount: 5000, paid: 5000, dueDate: '2024-03-31', status: 'paid', receiptNo: 'REC-003' },
  { month: 'April', amount: 5000, paid: 5000, dueDate: '2024-04-30', status: 'paid', receiptNo: 'REC-004' },
  { month: 'May', amount: 5000, paid: 2500, dueDate: '2024-05-31', status: 'partial', receiptNo: 'REC-005' },
]

export default function FeesPage() {
  const totalFees = feeRecords.reduce((sum, record) => sum + record.amount, 0)
  const totalPaid = feeRecords.reduce((sum, record) => sum + record.paid, 0)
  const pendingAmount = totalFees - totalPaid

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Fee Information</h2>
        <p className="text-slate-500">View your fee status and payment history</p>
      </div>

      <FeesStats 
        totalFees={totalFees} 
        totalPaid={totalPaid} 
        pendingAmount={pendingAmount} 
      />

      <FeesHistory feeRecords={feeRecords} />
    </div>
  )
}

