'use client'

import ResultsStats from '@/components/student/results-stats'
import ResultsChart from '@/components/student/results-chart'
import ResultsTable from '@/components/student/results-table'

const examResults = [
  { exam: 'Unit Test 1', subject: 'Mathematics', marks: 85, totalMarks: 100, percentage: 85, grade: 'A', date: '2024-05-10' },
  { exam: 'Unit Test 1', subject: 'English', marks: 78, totalMarks: 100, percentage: 78, grade: 'B+', date: '2024-05-11' },
  { exam: 'Unit Test 1', subject: 'Science', marks: 88, totalMarks: 100, percentage: 88, grade: 'A', date: '2024-05-12' },
  { exam: 'Quiz', subject: 'History', marks: 18, totalMarks: 20, percentage: 90, grade: 'A+', date: '2024-05-15' },
]

const chartData = [
  { name: 'Mathematics', marks: 85 },
  { name: 'English', marks: 78 },
  { name: 'Science', marks: 88 },
  { name: 'History', marks: 18 },
]

export default function ResultsPage() {
  const averagePercentage = (examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length).toFixed(1)

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">My Results</h2>
        <p className="text-slate-500">View your exam results and performance</p>
      </div>

      <ResultsStats 
        totalExams={examResults.length} 
        averagePercentage={averagePercentage} 
      />

      <ResultsChart data={chartData} />

      <ResultsTable results={examResults} />
    </div>
  )
}
