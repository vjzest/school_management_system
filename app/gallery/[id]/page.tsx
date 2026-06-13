'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Image as ImageIcon, Info } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function ImageDetailPage() {
  const { id } = useParams()
  const [image, setImage] = useState<any>(null)
  const [activeImageUrl, setActiveImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchImageDetail = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/gallery/${id}`)
        if (res.data.success) {
          setImage(res.data.data)
          setActiveImageUrl(res.data.data.imageUrl || (res.data.data.imageUrls && res.data.data.imageUrls[0]) || '')
        } else {
          setError('Image not found')
        }
      } catch (err) {
        setError('Failed to load image details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchImageDetail()
  }, [id])

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="pt-28 pb-20 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Back Button */}
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[#27598C] hover:text-[#0D2640] font-bold text-sm transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </Link>

          {isLoading ? (
            <div className="flex justify-center items-center py-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#27598C]"></div>
            </div>
          ) : error || !image ? (
            <div className="py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
              <Info className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">Error</h3>
              <p className="text-slate-500">{error || 'Something went wrong'}</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-100 p-6 sm:p-8 space-y-6"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                {activeImageUrl ? (
                  <Image 
                    src={activeImageUrl} 
                    alt={image.title} 
                    fill 
                    className="object-contain"
                    priority 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Thumbnails list if multiple images exist */}
              {image.imageUrls && image.imageUrls.length > 1 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Album Images ({image.imageUrls.length})</p>
                  <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                    {image.imageUrls.map((url: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageUrl(url)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImageUrl === url ? 'border-[#27598C] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={url} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detail Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 bg-[#E5D81A]/20 text-[#0D2640] font-bold text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#E5D81A]/40">
                    <Calendar className="w-3.5 h-3.5 text-[#27598C]" />
                    {new Date(image.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D2640] tracking-tight leading-tight">
                  {image.title}
                </h1>

                {image.description ? (
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                    {image.description}
                  </p>
                ) : (
                  <p className="text-slate-400 italic text-sm">No description provided for this gallery image.</p>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}
