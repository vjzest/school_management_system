'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface ResultRecord {
  exam: string
  subject: string
  marks: number
  totalMarks: number
  percentage: number
  grade: string
  date: string
}

interface ResultsTableProps {
  results: ResultRecord[]
}

const getGradeColor = (grade: string) => {
  if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-700 hover:bg-green-200'
  if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  if (grade === 'C+' || grade === 'C') return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
  return 'bg-red-100 text-red-700 hover:bg-red-200'
}

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
    <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-[#071B4A]">Exam Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-4 font-bold text-slate-500">Exam</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Subject</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Marks</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Percentage</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Grade</th>
                <th className="text-left py-4 px-4 font-bold text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#0F172A]">{result.exam}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{result.subject}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{result.marks}/{result.totalMarks}</td>
                  <td className="py-4 px-4 font-bold text-blue-600">{result.percentage}%</td>
                  <td className="py-4 px-4">
                    <Badge className={`${getGradeColor(result.grade)} border-0 px-3 py-1 shadow-none`}>
                      {result.grade}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{result.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
