import { motion } from 'framer-motion'
import DashboardStats from '@/components/admin/dashboard-stats'
import DashboardCharts from '@/components/admin/dashboard-charts'
import RecentActivity from '@/components/admin/recent-activity'

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Dashboard</h2>
        <p className="text-slate-500">Welcome back! Here's your school overview.</p>
      </div>

      <DashboardStats />
    </div>
  )
}
