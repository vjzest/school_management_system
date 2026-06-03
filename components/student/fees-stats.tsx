'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface FeesStatsProps {
  totalFees: number
  totalPaid: number
  pendingAmount: number
}

export default function FeesStats({ totalFees, totalPaid, pendingAmount }: FeesStatsProps) {
  return (
    <>
      {/* Alert */}
      {pendingAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 shadow-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900">Pending Payment</p>
            <p className="text-sm text-red-800">You have Rs. {pendingAmount.toLocaleString()} pending payment. Please pay before the due date.</p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
          <p className="text-slate-500 font-medium text-sm">Total Fees</p>
          <p className="text-3xl font-bold text-[#0F172A] mt-2">Rs. {totalFees.toLocaleString()}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
          <p className="text-green-600 font-medium text-sm">Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-2">Rs. {totalPaid.toLocaleString()}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 border-l-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 ${pendingAmount > 0 ? 'border-red-500' : 'border-green-500'}`}
        >
          <p className={`font-medium text-sm ${pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>Pending</p>
          <p className={`text-3xl font-bold mt-2 ${pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
            Rs. {pendingAmount.toLocaleString()}
          </p>
        </motion.div>
      </div>
    </>
  )
}
