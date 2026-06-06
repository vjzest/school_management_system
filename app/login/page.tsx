'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/lib/features/authSlice';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        dispatch(setCredentials({ admin: res.data.data, token: res.data.token }));
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F7FB] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#0D2640] to-[#27598C] -skew-y-2 origin-top-left shadow-2xl z-0"></div>
      <div className="absolute top-10 right-20 w-64 h-64 bg-[#E5D81A]/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#589C47]/10 rounded-full blur-3xl z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[420px] p-8 space-y-8 bg-white/90 backdrop-blur-xl rounded-[28px] shadow-2xl z-10 border border-white/50"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#0D2640] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#0D2640]/30 mb-4">
            <Shield className="w-8 h-8 text-[#E5D81A]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0D2640]">Royal Public School</h1>
          <p className="text-sm font-semibold text-[#27598C] uppercase tracking-widest">Admin Portal</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0D2640] font-bold text-xs uppercase tracking-wider ml-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 bg-slate-50 border-slate-200 focus:border-[#27598C] focus:ring-[#27598C]/20 rounded-xl transition-all"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#0D2640] font-bold text-xs uppercase tracking-wider ml-1">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 h-12 bg-slate-50 border-slate-200 focus:border-[#27598C] focus:ring-[#27598C]/20 rounded-xl transition-all"
                required 
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-[#589C47] hover:bg-[#488239] text-white font-bold rounded-xl shadow-lg shadow-[#589C47]/30 transition-all hover:-translate-y-0.5" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Secure Login'
            )}
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400">Restricted Access. Authorized Personnel Only.</p>
        </div>
      </motion.div>
    </div>
  );
}
