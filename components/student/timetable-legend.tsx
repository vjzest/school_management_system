'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TimetableLegendProps {
  colors: Record<string, string>
}

export default function TimetableLegend({ colors }: TimetableLegendProps) {
  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-[#071B4A]">Subject Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(colors).map(([subject, color]) => (
            <div key={subject} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-lg shadow-sm ${color.split(' ')[0]}`}></div>
              <span className="font-bold text-[#0F172A]">{subject}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
