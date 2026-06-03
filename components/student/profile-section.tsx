'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Field {
  label: string
  value: string
}

interface ProfileSectionProps {
  title: string
  fields: Field[]
}

export default function ProfileSection({ title, fields }: ProfileSectionProps) {
  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader className="border-b border-slate-50 pb-4">
        <CardTitle className="text-xl text-[#071B4A] font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {fields.map((field, idx) => (
            <div key={idx} className="space-y-2">
              <label className="text-sm font-bold text-slate-500">{field.label}</label>
              <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-[#0F172A] font-semibold">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
