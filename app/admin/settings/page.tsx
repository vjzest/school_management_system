'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { token } = useAppSelector((state: any) => state.auth)

  const [settings, setSettings] = useState({
    schoolName: '',
    email: '',
    phone: '',
    address: '',
    academicYear: '',
    totalClasses: '',
    emailNotifications: false,
    smsAlerts: false,
    darkMode: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success && res.data.data) {
          setSettings(res.data.data)
        }
      }).catch(err => {
        toast.error("Failed to load settings")
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }, [token])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success("Settings updated successfully!")
      }
    } catch (err) {
      toast.error("Failed to update settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (isLoading) return <div className="p-8">Loading settings...</div>

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage school information and preferences</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">School Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">School Name</label>
            <Input name="schoolName" value={settings.schoolName} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input type="email" name="email" value={settings.email} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
            <Input name="phone" value={settings.phone} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Address</label>
            <Input name="address" value={settings.address} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Academic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Academic Year</label>
            <Input name="academicYear" value={settings.academicYear} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Total Classes</label>
            <Input name="totalClasses" value={settings.totalClasses} onChange={handleChange} className="bg-secondary border-border" />
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Email Notifications</span>
              <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">SMS Alerts</span>
              <input type="checkbox" name="smsAlerts" checked={settings.smsAlerts} onChange={handleChange} className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Dark Mode</span>
              <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} className="w-4 h-4" />
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Help & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground">For support or issues, please contact:</p>
          <div className="space-y-2">
            <p className="text-foreground"><strong>Email:</strong> support@schoolhub.com</p>
            <p className="text-foreground"><strong>Phone:</strong> +1-800-SCHOOL</p>
            <p className="text-foreground"><strong>Documentation:</strong> <a href="#" className="text-primary hover:underline">View Docs</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
