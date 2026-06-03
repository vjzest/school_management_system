'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Home, Users } from 'lucide-react'

const hostels = [
  { id: 1, name: 'Boys Hostel A', type: 'Boys', capacity: 50, occupied: 48, warden: 'Mr. Smith', status: 'active' },
  { id: 2, name: 'Boys Hostel B', type: 'Boys', capacity: 50, occupied: 45, warden: 'Mr. Johnson', status: 'active' },
  { id: 3, name: 'Girls Hostel A', type: 'Girls', capacity: 40, occupied: 38, warden: 'Ms. Williams', status: 'active' },
  { id: 4, name: 'Girls Hostel B', type: 'Girls', capacity: 40, occupied: 35, warden: 'Ms. Davis', status: 'active' },
]

const rooms = [
  { id: 1, hostel: 'Boys Hostel A', roomNo: '101', capacity: 4, occupied: 4, students: ['John', 'Mike', 'Alex', 'Sam'] },
  { id: 2, hostel: 'Boys Hostel A', roomNo: '102', capacity: 4, occupied: 3, students: ['James', 'David', 'Chris'] },
  { id: 3, hostel: 'Girls Hostel A', roomNo: '201', capacity: 2, occupied: 2, students: ['Sarah', 'Emma'] },
]

export default function HostelPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'hostels' | 'rooms'>('hostels')

  const filteredHostels = hostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredRooms = rooms.filter((room) =>
    room.hostel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Hostel Management</h2>
          <p className="text-muted-foreground">Manage hostels and room allocations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Hostel
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('hostels')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'hostels'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Hostels
        </button>
        <button
          onClick={() => setActiveTab('rooms')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'rooms'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Rooms
        </button>
      </div>

      {activeTab === 'hostels' && (
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by hostel name..."
                  className="pl-10 bg-secondary border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredHostels.map((hostel, index) => (
                <motion.div
                  key={hostel.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Home className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{hostel.name}</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="text-foreground font-medium">{hostel.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Warden</p>
                            <p className="text-foreground font-medium">{hostel.warden}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Occupancy</p>
                            <p className="text-foreground font-medium">{hostel.occupied}/{hostel.capacity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={hostel.status === 'active' ? 'default' : 'secondary'}>
                      {hostel.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'rooms' && (
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by hostel or room number..."
                  className="pl-10 bg-secondary border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Room {room.roomNo}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{room.hostel}</p>
                        <p className="text-sm mt-2">
                          <span className="text-foreground font-medium">Students: </span>
                          <span className="text-muted-foreground">{room.students.join(', ')}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-semibold">{room.occupied}/{room.capacity}</p>
                      <p className="text-xs text-muted-foreground">Occupied</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
