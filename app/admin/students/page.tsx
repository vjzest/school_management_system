'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/lib/hooks'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import StudentList from '@/components/admin/student-list'

export default function StudentsPage() {
  const { token } = useAppSelector((state: any) => state.auth)
  const [students, setStudents] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', admissionNo: '', studentClass: '',
    section: '', rollNo: '', dob: '', dateOfAdmission: '', contact: '', address: '',
    bloodGroup: '', transportMode: 'Self',
    fatherName: '', motherName: '', parentPhone: '',
    photoUrl: '', aadharCardUrl: '', course: ''
  })
  
  const fetchStudents = () => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) {
          const formatted = res.data.data.map((s: any) => ({
            id: s._id,
            name: `${s.firstName} ${s.lastName}`,
            rollNo: s.rollNo,
            class: s.course ? `${s.studentClass} ${s.course}-${s.section}` : `${s.studentClass}-${s.section}`,
            status: s.status?.toLowerCase() || 'active',
            admissionNo: s.admissionNo,
            parentPhone: s.parentDetails?.parentPhone || s.contact,
            contact: s.contact,
            address: s.address,
            bloodGroup: s.bloodGroup,
            course: s.course,
            transportMode: s.transportMode || 'Self',
            photoUrl: s.photoUrl,
            raw: s // Pass raw object to reconstruct form for edit
          }));
          setStudents(formatted);
        }
      }).catch(err => toast.error("Failed to load students"));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        parentDetails: {
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          parentPhone: formData.parentPhone
        }
      };

      let res;
      if (editId) {
        res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      if (res.data.success) {
        toast.success(`Student ${editId ? 'updated' : 'added'} successfully!`);
        setIsAdding(false);
        setEditId(null);
        setFormData({ 
          firstName: '', lastName: '', admissionNo: '', studentClass: '', section: '', rollNo: '', dob: '', dateOfAdmission: '', contact: '', address: '',
          bloodGroup: '', transportMode: 'Self', fatherName: '', motherName: '', parentPhone: '', photoUrl: '', aadharCardUrl: '', course: ''
        });
        fetchStudents();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving student. Please check input data.");
    }
  };

  const handleEdit = (rawStudent: any) => {
    setFormData({
      firstName: rawStudent.firstName || '',
      lastName: rawStudent.lastName || '',
      admissionNo: rawStudent.admissionNo || '',
      studentClass: rawStudent.studentClass || '',
      section: rawStudent.section || '',
      rollNo: rawStudent.rollNo || '',
      dob: rawStudent.dob ? rawStudent.dob.split('T')[0] : '',
      dateOfAdmission: rawStudent.dateOfAdmission ? rawStudent.dateOfAdmission.split('T')[0] : '',
      contact: rawStudent.contact || '',
      address: rawStudent.address || '',
      bloodGroup: rawStudent.bloodGroup || '',
      course: rawStudent.course || '',
      transportMode: rawStudent.transportMode || 'Self',
      fatherName: rawStudent.parentDetails?.fatherName || '',
      motherName: rawStudent.parentDetails?.motherName || '',
      parentPhone: rawStudent.parentDetails?.parentPhone || '',
      photoUrl: rawStudent.photoUrl || '',
      aadharCardUrl: rawStudent.aadharCardUrl || ''
    });
    setEditId(rawStudent._id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        toast.success("Student deleted successfully!");
        fetchStudents();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleting student.");
    }
  };
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">Students</h2>
          <p className="text-slate-500">Manage all students in your school</p>
        </div>
        <Button 
          onClick={() => {
            setEditId(null);
            setFormData({ firstName: '', lastName: '', admissionNo: '', studentClass: '', section: '', rollNo: '', dob: '', dateOfAdmission: '', contact: '', address: '', bloodGroup: '', transportMode: 'Self', fatherName: '', motherName: '', parentPhone: '', photoUrl: '', aadharCardUrl: '', course: '' });
            setIsAdding(true);
          }}
          className="bg-[#FF7A00] hover:bg-orange-600 text-white rounded-xl px-6 shadow-md shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </Button>
      </div>

      <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add Student Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#0D2640] text-white shrink-0">
              <h3 className="font-bold text-lg">{editId ? 'Edit Student' : 'Comprehensive Student Registration'}</h3>
              <button onClick={() => setIsAdding(false)} className="text-white/70 hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 bg-slate-50">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                {/* Academic Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Academic Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Admission No (e.g. S101)" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.admissionNo} onChange={e => setFormData({...formData, admissionNo: e.target.value})} />
                    <input required type="number" min="1" placeholder="Roll No" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} />
                    
                    <select 
                      required 
                      className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" 
                      value={formData.studentClass} 
                      onChange={e => setFormData({...formData, studentClass: e.target.value, section: '', course: ''})}
                    >
                      <option value="">Select Class</option>
                      {['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(cls => (
                        <option key={cls} value={cls}>{['Nursery', 'LKG', 'UKG'].includes(cls) ? cls : `Class ${cls}`}</option>
                      ))}
                    </select>



                    <select 
                      required 
                      className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600" 
                      value={formData.section} 
                      onChange={e => setFormData({...formData, section: e.target.value})}
                      disabled={!formData.studentClass}
                    >
                      <option value="">Select Section</option>
                      {['A', 'B', 'C'].map(sec => <option key={sec} value={sec}>Section {sec}</option>)}
                    </select>
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
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-500 mb-1 font-semibold">Date of Admission</label>
                      <input required type="date" className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-500" value={formData.dateOfAdmission} onChange={e => setFormData({...formData, dateOfAdmission: e.target.value})} />
                    </div>
                    <select 
                      className="border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600 col-span-2" 
                      value={formData.bloodGroup} 
                      onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                    >
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact & Parent Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Contact & Parents</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Father's Name" pattern="^[A-Za-z\s]+$" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                    <input required placeholder="Mother's Name" pattern="^[A-Za-z\s]+$" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} />
                    <input required placeholder="Parent Phone (10 digits)" pattern="^[0-9]{10}$" maxLength={10} title="Must be exactly 10 digits" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.parentPhone} onChange={e => setFormData({...formData, parentPhone: e.target.value})} />
                    <input required placeholder="Student Phone (10 digits)" pattern="^[0-9]{10}$" maxLength={10} title="Must be exactly 10 digits" className="border border-slate-200 p-2.5 rounded-xl bg-white" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                    <textarea required placeholder="Full Address" className="border border-slate-200 p-2.5 rounded-xl bg-white col-span-2 resize-none" rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>

                {/* Transport & Documents */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-[#27598C] border-b pb-2">Transport & Documents</h4>
                  <div className="space-y-4">
                    <select 
                      className="w-full border border-slate-200 p-2.5 rounded-xl bg-white text-slate-600"
                      value={formData.transportMode}
                      onChange={e => setFormData({...formData, transportMode: e.target.value})}
                    >
                      <option value="Self">Self / Dropped by Parent</option>
                      <option value="Walking">Walking</option>
                      <option value="Bus">School Bus</option>
                      <option value="Van">School Van</option>
                    </select>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {formData.photoUrl ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#589C47] shrink-0">
                              <img 
                                src={formData.photoUrl.endsWith('.pdf') ? '/placeholder-user.jpg' : formData.photoUrl} 
                                alt="Student" 
                                className="w-full h-full object-cover" 
                                onError={(e) => { e.currentTarget.src = '/placeholder-user.jpg'; e.currentTarget.onerror = null; }} 
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center shrink-0">
                              <span className="text-xs text-slate-400 font-bold">No img</span>
                            </div>
                          )}
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-[#0F172A]">Student Photo</span>
                            <span className="text-xs text-slate-500">Upload profile picture</span>
                          </div>
                        </div>
                        <CloudinaryUpload label={formData.photoUrl ? "Change" : "Upload"} onUploadSuccess={(url) => setFormData({...formData, photoUrl: url})} />
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold text-[#0F172A]">Aadhar Card</span>
                          {formData.aadharCardUrl ? (
                            <span className="text-xs font-bold text-[#589C47]">Document Attached ✓</span>
                          ) : (
                            <span className="text-xs text-slate-500">PDF or Image</span>
                          )}
                        </div>
                        <CloudinaryUpload label={formData.aadharCardUrl ? "Change" : "Upload"} onUploadSuccess={(url) => setFormData({...formData, aadharCardUrl: url})} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <Button type="button" variant="outline" className="rounded-xl px-6" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#589C47] hover:bg-[#4a823c] text-white rounded-xl px-8 shadow-lg shadow-[#589C47]/30">
                  {editId ? 'Update Student' : 'Enroll Student'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

