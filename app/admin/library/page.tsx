'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Book, Edit2, Trash2 } from 'lucide-react'

const books = [
  { id: 1, title: 'Advanced Mathematics', author: 'Dr. Smith', isbn: 'ISBN-001', copies: 5, available: 3, status: 'available' },
  { id: 2, title: 'English Literature', author: 'Prof. Johnson', isbn: 'ISBN-002', copies: 8, available: 5, status: 'available' },
  { id: 3, title: 'Science Guide', author: 'Dr. Williams', isbn: 'ISBN-003', copies: 6, available: 2, status: 'available' },
  { id: 4, title: 'World History', author: 'Prof. Brown', isbn: 'ISBN-004', copies: 4, available: 0, status: 'unavailable' },
  { id: 5, title: 'Computer Programming', author: 'Mr. Davis', isbn: 'ISBN-005', copies: 7, available: 6, status: 'available' },
]

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalBooks: books.length,
    totalCopies: books.reduce((sum, b) => sum + b.copies, 0),
    availableCopies: books.reduce((sum, b) => sum + b.available, 0),
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Library Management</h2>
          <p className="text-muted-foreground">Manage library books and inventory</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <p className="text-muted-foreground text-sm">Total Books</p>
          <p className="text-3xl font-bold text-foreground mt-2">{stats.totalBooks}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <p className="text-muted-foreground text-sm">Total Copies</p>
          <p className="text-3xl font-bold text-foreground mt-2">{stats.totalCopies}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6"
        >
          <p className="text-green-700 text-sm">Available</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.availableCopies}</p>
        </motion.div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">ISBN: {book.isbn}</span>
                        <span className="text-foreground">Total: {book.copies}</span>
                        <span className="text-green-600 font-medium">Available: {book.available}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={book.status === 'available' ? 'default' : 'destructive'}>
                      {book.status}
                    </Badge>
                    <div className="flex gap-2">
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
