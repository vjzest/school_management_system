'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Royal Public School. How can I help you today?", isBot: true }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }])
    const userMsg = inputValue.toLowerCase()
    setInputValue('')

    // Simple bot logic
    setTimeout(() => {
      let reply = "Thanks for your message. Please contact our admission office at +91 9876543210 for more details."
      if (userMsg.includes('admission') || userMsg.includes('apply')) {
        reply = "Admissions for 2025-26 are now open! You can apply online through the Admissions page or visit our campus."
      } else if (userMsg.includes('fee')) {
        reply = "For fee structures, please contact the administration office or check the admission guidelines."
      } else if (userMsg.includes('hello') || userMsg.includes('hi')) {
        reply = "Hello there! How can I assist you with your queries about Royal Public School?"
      }
      setMessages(prev => [...prev, { text: reply, isBot: true }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 flex flex-col"
            style={{ height: '450px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D2640] to-[#27598C] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#27598C] font-bold text-xs">RPS</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">School Assistant</h3>
                  <p className="text-[#E5D81A] text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.isBot 
                        ? 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-tl-sm' 
                        : 'bg-[#27598C] text-white shadow-sm rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#27598C]/20 focus:border-[#27598C] transition-all"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="rounded-full bg-[#27598C] hover:bg-[#1a3d66] w-10 h-10 shrink-0 shadow-md"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4 text-white ml-0.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#0D2640] to-[#27598C] rounded-full shadow-[0_8px_20px_rgba(39,89,140,0.3)] flex items-center justify-center text-white relative border-2 border-white"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
