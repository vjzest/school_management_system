'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Truck, Edit2, Trash2, MapPin } from 'lucide-react'

const routes = [
  { id: 1, routeName: 'North Route', driver: 'John Smith', vehicle: 'BUS-001', capacity: 50, occupied: 45, pickupPoints: 5, status: 'active' },
  { id: 2, routeName: 'South Route', driver: 'Mike Johnson', vehicle: 'BUS-002', capacity: 50, occupied: 42, pickupPoints: 6, status: 'active' },
  { id: 3, routeName: 'East Route', driver: 'Sarah Williams', vehicle: 'BUS-003', capacity: 45, occupied: 38, pickupPoints: 4, status: 'active' },
  { id: 4, routeName: 'West Route', driver: 'Emma Davis', vehicle: 'BUS-004', capacity: 50, occupied: 48, pickupPoints: 7, status: 'active' },
  { id: 5, routeName: 'Central Route', driver: 'James Wilson', vehicle: 'BUS-005', capacity: 45, occupied: 0, pickupPoints: 3, status: 'inactive' },
]

export default function TransportPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRoutes = routes.filter(
    (route) =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Transport Management</h2>
          <p className="text-muted-foreground">Manage school buses and routes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Route
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by route name or driver..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{route.routeName}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Driver</p>
                          <p className="text-foreground font-medium">{route.driver}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vehicle</p>
                          <p className="text-foreground font-medium">{route.vehicle}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Capacity</p>
                          <p className="text-foreground font-medium">{route.occupied}/{route.capacity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pickup Points</p>
                          <p className="text-foreground font-medium">{route.pickupPoints}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={route.status === 'active' ? 'default' : 'secondary'}>
                      {route.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
