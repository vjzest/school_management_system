'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Search, Save, FileText, CheckCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export default function ResultsPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  
  const [exams, setExams] = useState<any[]>([])
  
  // Selection State
  const [selectedExamId, setSelectedExamId] = useState('')
  const [selectedSection, setSelectedSection] = useState('')

  // Currently uploaded URL for selected section
  const [currentPdfUrl, setCurrentPdfUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // 1. Fetch Exams
  const fetchExams = () => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/exams`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          setExams(res.data.data)
        }
      }).catch(err => toast.error("Failed to load exams"))
    }
  }

  useEffect(() => {
    fetchExams()
  }, [token])

  // 2. When Exam and Section are selected, find if a result is already uploaded
  useEffect(() => {
    if (selectedExamId && selectedSection) {
      const exam = exams.find(e => e._id === selectedExamId)
      if (exam && exam.sectionResults) {
        const existing = exam.sectionResults.find((sr: any) => sr.section === selectedSection)
        if (existing) {
          setCurrentPdfUrl(existing.resultPdfUrl)
        } else {
          setCurrentPdfUrl('')
        }
      } else {
        setCurrentPdfUrl('')
      }
    } else {
      setCurrentPdfUrl('')
    }
  }, [selectedExamId, selectedSection, exams])

  const handleSaveResult = async () => {
    if (!selectedExamId || !selectedSection) return toast.error("Please select exam and section")
    if (!currentPdfUrl) return toast.error("Please upload a PDF document first")
    
    setIsSaving(true)
    
    const exam = exams.find(e => e._id === selectedExamId)
    if (!exam) return

    let updatedSectionResults = exam.sectionResults ? [...exam.sectionResults] : []
    const existingIndex = updatedSectionResults.findIndex(sr => sr.section === selectedSection)
    
    if (existingIndex >= 0) {
      updatedSectionResults[existingIndex].resultPdfUrl = currentPdfUrl
    } else {
      updatedSectionResults.push({ section: selectedSection, resultPdfUrl: currentPdfUrl })
    }

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/exams/${selectedExamId}`, {
        sectionResults: updatedSectionResults
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success(`Result document for Section ${selectedSection} saved successfully!`)
        fetchExams() // Refresh data
      }
    } catch (error) {
      toast.error("Failed to save result document")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteResult = async (sectionToDelete: string) => {
    if (!selectedExamId) return
    if (!window.confirm(`Are you sure you want to delete the result document for Section ${sectionToDelete}?`)) return
    
    const exam = exams.find(e => e._id === selectedExamId)
    if (!exam) return

    let updatedSectionResults = exam.sectionResults ? [...exam.sectionResults] : []
    updatedSectionResults = updatedSectionResults.filter(sr => sr.section !== sectionToDelete)

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/exams/${selectedExamId}`, {
        sectionResults: updatedSectionResults
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success(`Result document for Section ${sectionToDelete} deleted successfully!`)
        fetchExams() // Refresh data
        if (selectedSection === sectionToDelete) {
          setCurrentPdfUrl('')
        }
      }
    } catch (error) {
      toast.error("Failed to delete result document")
    }
  }

  const selectedExam = exams.find(e => e._id === selectedExamId)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Class Results Upload</h2>
          <p className="text-slate-500">Directly upload PDF result documents for each class and section</p>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6">
        <h3 className="font-bold text-[#0F172A] text-base mb-4 border-b pb-2">1. Select Class & Exam Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-2">Select Exam (Class is linked)</label>
            <select
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-[#0F172A] outline-none hover:border-blue-300 transition-colors"
              value={selectedExamId}
              onChange={(e) => {
                setSelectedExamId(e.target.value)
                setSelectedSection('')
              }}
            >
              <option value="">-- Select Exam --</option>
              {exams.map(ex => (
                <option key={ex._id} value={ex._id}>
                  {ex.examName} - Class {ex.studentClass} {ex.course ? `(${ex.course})` : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-2">Select Section</label>
            <select
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-[#0F172A] outline-none disabled:opacity-50 hover:border-blue-300 transition-colors"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedExamId}
            >
              <option value="">-- Select Section --</option>
              {['A', 'B', 'C'].map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {selectedExamId && selectedSection && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-6 border-t-4 border-t-[#589C47]">
            <h3 className="font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#589C47]" />
              Upload Result Document
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Upload the final result sheet (PDF/Image) for <strong>{selectedExam?.examName} - Class {selectedExam?.studentClass} Section {selectedSection}</strong>
            </p>
            
            <div className="flex items-center justify-between bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-[#0F172A]">Result File</p>
                {currentPdfUrl ? (
                  <div className="flex flex-col items-start gap-2 mt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-md">
                      <CheckCircle className="w-4 h-4" /> Document Attached
                    </span>
                    <a href={currentPdfUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                      Preview Uploaded Document
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-md inline-block">
                    No document uploaded yet for this section.
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <CloudinaryUpload 
                  label={currentPdfUrl ? "Replace Document" : "Upload Document"} 
                  onUploadSuccess={(url) => setCurrentPdfUrl(url)} 
                />
                <Button 
                  onClick={handleSaveResult}
                  disabled={!currentPdfUrl || isSaving}
                  className="bg-[#27598C] hover:bg-blue-800 text-white rounded-lg px-6 shadow-md shadow-blue-900/20 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Result'}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl overflow-hidden mt-6">
            <div className="bg-slate-50/50 border-b border-slate-100 p-4">
              <h3 className="font-bold text-[#0F172A] text-base">Results Status: {selectedExam?.examName}</h3>
              <p className="text-xs text-slate-500">View and download uploaded results for all sections of Class {selectedExam?.studentClass}</p>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Section</th>
                    <th className="text-left py-3 px-6 font-bold text-slate-500">Status</th>
                    <th className="text-right py-3 px-6 font-bold text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {['A', 'B', 'C'].map(sec => {
                    const existing = selectedExam?.sectionResults?.find((sr: any) => sr.section === sec)
                    return (
                      <tr key={sec} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-bold text-[#0F172A]">Section {sec}</td>
                        <td className="py-4 px-6">
                          {existing?.resultPdfUrl ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100">
                              <CheckCircle className="w-3.5 h-3.5" /> Uploaded
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold border border-amber-100">
                              Pending Upload
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {existing?.resultPdfUrl ? (
                            <div className="flex items-center justify-end gap-2">
                              <a href={existing.resultPdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                <FileText className="w-3.5 h-3.5" /> View
                              </a>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 w-7 p-0 border-red-200 hover:bg-red-50 text-red-600 rounded-md"
                                onClick={() => handleDeleteResult(sec)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Not available</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
