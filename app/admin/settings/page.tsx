'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState('Central High School')
  const [email, setEmail] = useState('admin@school.com')
  const [phone, setPhone] = useState('+1-555-0123')
  const [address, setAddress] = useState('123 Education Street, City, State 12345')

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage school information and preferences</p>
      </div>

      {/* School Information */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">School Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">School Name</label>
            <Input
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Academic Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Academic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Academic Year</label>
            <Input
              value="2024-2025"
              className="bg-secondary border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Total Classes</label>
            <Input
              value="20"
              className="bg-secondary border-border"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">SMS Alerts</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Dark Mode</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
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
