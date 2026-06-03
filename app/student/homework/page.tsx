'use client'

import HomeworkStats from '@/components/student/homework-stats'
import HomeworkList from '@/components/student/homework-list'

const homeworkItems = [
  { id: 1, subject: 'Mathematics', topic: 'Quadratic Equations', dueDate: '2024-05-25', daysLeft: 2, status: 'pending', description: 'Solve exercises 1-20 from Chapter 4' },
  { id: 2, subject: 'English', topic: 'Essay Writing', dueDate: '2024-05-26', daysLeft: 3, status: 'pending', description: 'Write an essay on "My Favorite Season" (500 words)' },
  { id: 3, subject: 'Science', topic: 'Chemical Reactions', dueDate: '2024-05-27', daysLeft: 4, status: 'pending', description: 'Complete the lab report and submit with observations' },
  { id: 4, subject: 'History', topic: 'Medieval Period', dueDate: '2024-05-22', daysLeft: 0, status: 'completed', description: 'Create a timeline of major historical events' },
  { id: 5, subject: 'Computer Science', topic: 'Python Basics', dueDate: '2024-05-28', daysLeft: 5, status: 'pending', description: 'Write a Python program for basic calculations' },
]

export default function HomeworkPage() {
  const pendingCount = homeworkItems.filter(h => h.status === 'pending').length
  const completedCount = homeworkItems.filter(h => h.status === 'completed').length

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Homework</h2>
        <p className="text-slate-500">Track your assignments and homework</p>
      </div>

      <HomeworkStats pendingCount={pendingCount} completedCount={completedCount} />

      <HomeworkList items={homeworkItems} />
    </div>
  )
}

