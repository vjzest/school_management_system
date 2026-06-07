'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield, Plus, X, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ALL_PERMISSIONS = ['dashboard', 'students', 'teachers', 'attendance', 'fees', 'admissions', 'exams', 'results', 'timetable', 'settings']

export default function AdminStaffPage() {
  const { token, admin } = useAppSelector((state: any) => state.auth)
  const router = useRouter()
  const [admins, setAdmins] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'SUB_ADMIN',
    permissions: [] as string[]
  })

  useEffect(() => {
    if (admin?.role !== 'SUPER_ADMIN') {
      toast.error('You do not have access to this module')
      router.push('/admin/dashboard')
    } else if (token) {
      fetchAdmins()
    }
  }, [token, admin])

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setAdmins(res.data.data)
      }
    } catch (err) {
      toast.error('Failed to load admin users')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePermission = (perm: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm) 
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm]
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (formData.id) {
        // Update
        const payload = { role: formData.role, permissions: formData.permissions }
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/users/${formData.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) toast.success('Admin updated successfully')
      } else {
        // Create
        if (!formData.password) {
          toast.error('Password is required for new admin')
          return
        }
        const payload = { ...formData }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/users`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) toast.success('Admin created successfully')
      }
      setShowForm(false)
      setFormData({ id: '', name: '', email: '', password: '', role: 'SUB_ADMIN', permissions: [] })
      fetchAdmins()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Action failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success('Admin deleted')
        fetchAdmins()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  const handleEdit = (admin: any) => {
    setFormData({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      password: '',
      role: admin.role,
      permissions: admin.permissions || []
    })
    setShowForm(true)
  }

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A]">Admin Staff Management</h2>
          <p className="text-slate-500">Manage roles and permissions for sub-admins</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#27598C] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Admin
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">{formData.id ? 'Edit Admin Permissions' : 'Create New Sub-Admin'}</h3>
              <Button variant="ghost" onClick={() => { setShowForm(false); setFormData({ id: '', name: '', email: '', password: '', role: 'SUB_ADMIN', permissions: [] }) }}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold mb-1 block">Name</label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={!!formData.id} required />
                </div>
                <div>
                  <label className="text-sm font-bold mb-1 block">Email</label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!!formData.id} required />
                </div>
                {!formData.id && (
                  <div>
                    <label className="text-sm font-bold mb-1 block">Password</label>
                    <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required={!formData.id} />
                  </div>
                )}
                <div>
                  <label className="text-sm font-bold mb-1 block">Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border rounded-lg p-2 h-10">
                    <option value="SUB_ADMIN">Sub Admin (Restricted Access)</option>
                    <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                  </select>
                </div>
              </div>

              {formData.role === 'SUB_ADMIN' && (
                <div>
                  <label className="text-sm font-bold mb-2 block">Module Permissions</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {ALL_PERMISSIONS.map(perm => (
                      <label key={perm} className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                        <input type="checkbox" checked={formData.permissions.includes(perm)} onChange={() => togglePermission(perm)} className="w-4 h-4 text-[#27598C]" />
                        <span className="capitalize text-sm font-medium">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-[#27598C]">{formData.id ? 'Save Changes' : 'Create Admin'}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 text-left">Name / Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a._id} className="border-b">
                <td className="p-4">
                  <div className="font-bold">{a.name}</div>
                  <div className="text-sm text-slate-500">{a.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {a.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  {a.role === 'SUPER_ADMIN' ? (
                    <span className="text-xs text-slate-500 font-bold">All Modules</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {a.permissions?.map((p: string) => (
                        <span key={p} className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 capitalize">{p}</span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(a)}><Edit className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(a._id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
