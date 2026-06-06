'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import { Button } from './button';
import { UploadCloud, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  accept?: string;
}

export function CloudinaryUpload({ onUploadSuccess, label = "Upload Document/PDF", accept = ".pdf,.jpg,.jpeg,.png" }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useAppSelector((state: any) => state.auth);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setSuccess(false);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/upload/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setSuccess(true);
        onUploadSuccess(res.data.url); // Pass the Cloudinary URL back to the parent form
      }
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input 
          type="file" 
          accept={accept}
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <Button variant="outline" type="button" disabled={uploading} className="gap-2">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {uploading ? 'Uploading...' : label}
        </Button>
      </div>
      
      {success && (
        <div className="flex items-center text-sm text-emerald-600 font-medium">
          <CheckCircle className="w-4 h-4 mr-1" />
          Uploaded
        </div>
      )}
    </div>
  );
}
