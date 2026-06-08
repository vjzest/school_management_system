'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import TeacherList from '@/components/admin/teacher-list'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function TeachersPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [teachers, setTeachers] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', employeeId: '', qualification: '',
    designation: 'Teacher', experienceYears: '', baseSalary: '',
    dob: '', joinDate: '', gender: '', bloodGroup: '',
    contact: '', email: '', address: '',
    photoUrl: '', aadharCardUrl: '', panCardUrl: ''
  })
  
  const fetchTeachers = () => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          const formatted = res.data.data.map((t: any) => ({
            id: t._id,
            name: `${t.firstName} ${t.lastName}`,
            employeeId: t.employeeId,
            qualification: t.qualification,
            status: t.status?.toLowerCase() || 'active',
            contact: t.contact,
            experience: t.experienceYears || 0,
            photoUrl: t.photoUrl,
            raw: t
          }))
          setTeachers(formatted)
        }
      }).catch(err => toast.error("Failed to load teachers"));
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editId 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers`;
      
      const method = editId ? 'put' : 'post';

      const res = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success(`Teacher ${editId ? 'updated' : 'added'} successfully!`);
        setIsAdding(false);
        setEditId(null);
        setFormData({ 
          firstName: '', lastName: '', employeeId: '', qualification: '',
          designation: 'Teacher', experienceYears: '', baseSalary: '',
          dob: '', joinDate: '', gender: '', bloodGroup: '',
          contact: '', email: '', address: '',
          photoUrl: '', aadharCardUrl: '', panCardUrl: ''
        });
        fetchTeachers();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving teacher. Please check input data.");
    }
  };

  const handleEdit = (rawTeacher: any) => {
    setFormData({
      firstName: rawTeacher.firstName || '',
      lastName: rawTeacher.lastName || '',
      employeeId: rawTeacher.employeeId || '',
      qualification: rawTeacher.qualification || '',
      designation: rawTeacher.designation || 'Teacher',
      experienceYears: rawTeacher.experienceYears || '',
      baseSalary: rawTeacher.baseSalary || '',
      dob: rawTeacher.dob ? rawTeacher.dob.split('T')[0] : '',
      joinDate: rawTeacher.joinDate ? rawTeacher.joinDate.split('T')[0] : '',
      gender: rawTeacher.gender || '',
      bloodGroup: rawTeacher.bloodGroup || '',
      contact: rawTeacher.contact || '',
      email: rawTeacher.email || '',
      address: rawTeacher.address || '',
      photoUrl: rawTeacher.photoUrl || '',
      aadharCardUrl: rawTeacher.aadharCardUrl || '',
      panCardUrl: rawTeacher.panCardUrl || ''
    });
    setEditId(rawTeacher._id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        toast.success("Teacher deleted successfully!");
        fetchTeachers();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleting teacher.");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Teachers</h2>
          <p className="text-slate-500">Manage all teaching staff and faculty</p>
        </div>
        <Button 
          onClick={() => {
            setEditId(null);
            setFormData({ 
              firstName: '', lastName: '', employeeId: '', qualification: '',
              designation: 'Teacher', experienceYears: '', baseSalary: '',
              dob: '', joinDate: '', gender: '', bloodGroup: '',
              contact: '', email: '', address: '',
              photoUrl: '', aadharCardUrl: '', panCardUrl: ''
            });
            setIsAdding(true);
          }}
          className="bg-[#FF7A00] hover:bg-orange-600 text-white rounded-xl px-6 shadow-md shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Teacher
        </Button>
      </div>

      <TeacherList teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="sticky top-0 bg-[#071B4A] text-white p-6 flex justify-between items-center z-10 shadow-md">
                <h3 className="text-2xl font-bold">{editId ? 'Edit Teacher' : 'Comprehensive Teacher Registration'}</h3>
                <button onClick={() => setIsAdding(false)} className="text-white hover:text-orange-400 transition-colors">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* Employment Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Employment Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Employee ID (e.g. EMP101)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} />
                    <input required placeholder="Designation (e.g. Senior Teacher)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
                    <input required placeholder="Qualification (e.g. M.Sc B.Ed)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} />
                    <input required type="number" min="0" placeholder="Experience (Years)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: e.target.value})} />
                    <input required type="number" min="0" placeholder="Base Salary (₹)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.baseSalary} onChange={e => setFormData({...formData, baseSalary: e.target.value})} />
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-500 mb-1 font-semibold">Date of Joining</label>
                      <input required type="date" className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-500" value={formData.joinDate} onChange={e => setFormData({...formData, joinDate: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="First Name" pattern="^[A-Za-z\s]+$" title="Only letters allowed" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input required placeholder="Last Name" pattern="^[A-Za-z\s]+$" title="Only letters allowed" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-500 mb-1 font-semibold">Date of Birth</label>
                      <input required type="date" className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-500" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                    </div>

                    <select 
                      required 
                      className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" 
                      value={formData.gender} 
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="">Select Gender</option>
                      {['Male', 'Female', 'Other'].map(gen => <option key={gen} value={gen}>{gen}</option>)}
                    </select>

                    <select 
                      className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" 
                      value={formData.bloodGroup} 
                      onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                    >
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Contact Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Phone Number (10 digits)" pattern="^[0-9]{10}$" maxLength={10} title="Must be exactly 10 digits" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                    <input placeholder="Email Address" type="email" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <textarea required placeholder="Full Address" className="border border-slate-200 p-2.5 rounded-xl bg-white col-span-2 resize-none" rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>

                {/* Documents Upload */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Documents</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border border-slate-200 p-4 rounded-xl bg-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {formData.photoUrl && !formData.photoUrl.endsWith('.pdf') ? (
                          <img src={formData.photoUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">?</div>
                        )}
                        <div>
                          <p className="font-bold text-[#0F172A] text-sm">Teacher Photo</p>
                          <p className="text-xs text-slate-500">Upload profile picture</p>
                        </div>
                      </div>
                      {formData.photoUrl ? (
                         <div className="flex items-center gap-3">
                           <span className="text-xs font-bold text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Uploaded</span>
                           <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, photoUrl: url})} label="Change" accept=".jpg,.jpeg,.png" />
                         </div>
                      ) : (
                        <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, photoUrl: url})} label="Upload Photo" accept=".jpg,.jpeg,.png" />
                      )}
                    </div>

                    <div className="border border-slate-200 p-4 rounded-xl bg-white flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#0F172A] text-sm">Aadhar Card</p>
                        <p className="text-xs text-slate-500">PDF or Image</p>
                      </div>
                      {formData.aadharCardUrl ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Uploaded</span>
                          <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, aadharCardUrl: url})} label="Change" />
                        </div>
                      ) : (
                        <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, aadharCardUrl: url})} label="Upload" />
                      )}
                    </div>

                    <div className="border border-slate-200 p-4 rounded-xl bg-white flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#0F172A] text-sm">PAN Card</p>
                        <p className="text-xs text-slate-500">PDF or Image</p>
                      </div>
                      {formData.panCardUrl ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Uploaded</span>
                          <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, panCardUrl: url})} label="Change" />
                        </div>
                      ) : (
                        <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, panCardUrl: url})} label="Upload" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 sticky bottom-0 bg-slate-50 pb-2">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="rounded-xl border-slate-300 text-slate-600 px-6">Cancel</Button>
                  <Button type="submit" className="bg-[#2D6A4F] hover:bg-green-800 text-white rounded-xl px-8 shadow-lg shadow-green-900/20">{editId ? 'Update Teacher' : 'Register Teacher'}</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
