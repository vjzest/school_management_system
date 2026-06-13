'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image as ImageIcon, Plus, Trash2, X, Upload } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function GalleryPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newImage, setNewImage] = useState({ title: '', description: '', date: new Date().toISOString().split('T')[0] })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<string>('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
 
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setImages(res.data.data)
      }
    } catch (err) {
      toast.error('Failed to load gallery')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchGallery()
  }, [token])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Image deleted')
      fetchGallery()
    } catch (err) {
      toast.error('Failed to delete image')
    }
  }

  const handleUploadAndSave = async () => {
    if (selectedFiles.length === 0) return toast.error('Please select at least one image')
    if (!newImage.title) return toast.error('Please enter a title')
    
    setIsUploading(true)
    let successCount = 0
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        setUploadProgress(`Uploading ${i + 1} of ${selectedFiles.length}...`)
        
        // 1. Upload to Cloudinary
        const formData = new FormData()
        formData.append('file', file)
        
        const uploadRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/upload/image`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (!uploadRes.data.success) throw new Error('Upload failed')
        
        const imageUrl = uploadRes.data.url
        
        // 2. Save to Gallery
        const imageTitle = selectedFiles.length > 1 ? `${newImage.title} (${i + 1})` : newImage.title
        
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/gallery`, {
          imageUrl,
          title: imageTitle,
          description: newImage.description,
          date: newImage.date
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (res.data.success) {
          successCount++
        }
      }
      
      toast.success(`${successCount} images added to gallery successfully!`)
      setIsAddOpen(false)
      setNewImage({ title: '', description: '', date: new Date().toISOString().split('T')[0] })
      setSelectedFiles([])
      fetchGallery()
    } catch (err) {
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
      setUploadProgress('')
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2 flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-[#27598C]" /> School Gallery
          </h2>
          <p className="text-slate-500">Manage and upload photos related to the school</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="bg-[#27598C] hover:bg-[#1f4770] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
      </div>

      {isAddOpen && (
        <Card className="border-0 shadow-lg mb-8 relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-slate-400 hover:text-slate-600" onClick={() => setIsAddOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-[#0D2640] mb-4">Upload New Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Image Files * (Multiple Allowed)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={e => setSelectedFiles(e.target.files ? Array.from(e.target.files) : [])}
                    ref={fileInputRef}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#27598C]/10 file:text-[#27598C] hover:file:bg-[#27598C]/20 border border-slate-200 rounded-xl p-1"
                  />
                  {selectedFiles.length > 0 && (
                    <p className="text-xs text-slate-500 mt-1 font-bold">{selectedFiles.length} file(s) selected</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Title *</label>
                  <Input value={newImage.title} onChange={e => setNewImage({...newImage, title: e.target.value})} placeholder="e.g. Annual Sports Day" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                  <Input type="date" value={newImage.date} onChange={e => setNewImage({...newImage, date: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Description (Optional)</label>
                  <Input value={newImage.description} onChange={e => setNewImage({...newImage, description: e.target.value})} placeholder="Short description..." />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleUploadAndSave} disabled={isUploading} className="bg-[#589C47] hover:bg-[#4a853b] text-white">
                {isUploading ? uploadProgress || 'Uploading...' : <><Upload className="w-4 h-4 mr-2" /> Upload to Gallery</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="font-bold text-slate-500 p-8">Loading gallery...</div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img: any, i) => (
            <motion.div 
              key={img._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100"
            >
              <div className="aspect-[4/3] w-full relative bg-slate-100">
                <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(img._id)} className="bg-red-500 hover:bg-red-600">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-[#0D2640] line-clamp-1">{img.title}</h4>
                {img.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{img.description}</p>}
                <p className="text-[10px] text-slate-400 font-medium mt-2">{new Date(img.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No images in the gallery yet.</p>
        </div>
      )}
    </div>
  )
}
