'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function PublicGalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/gallery`)
        if (res.data.success) {
          setImages(res.data.data)
        }
      } catch (err) {
        console.error('Failed to load gallery')
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="pt-28 pb-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#E5D81A]/20 text-[#27598C] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full mb-6 border border-[#E5D81A]/40">
              <span className="w-2 h-2 rounded-full bg-[#E5D81A] animate-pulse"></span>
              Photo Gallery
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D2640] mb-4">School Gallery</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Explore the vibrant life and memorable moments of Royal Public School.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#27598C]"></div>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img: any, i) => (
                <motion.div 
                  key={img._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
                >
                  <div className="aspect-[4/3] w-full relative bg-slate-100">
                    <Image src={img.imageUrl} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#0D2640] text-lg mb-1">{img.title}</h3>
                    {img.description && <p className="text-sm text-slate-500 line-clamp-2">{img.description}</p>}
                    <p className="text-xs text-slate-400 font-medium mt-3">{new Date(img.date).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
              <ImageIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-600 mb-2">No Images Yet</h3>
              <p className="text-slate-500">Check back later for new photos from our school events.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
