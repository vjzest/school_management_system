'use client'

import ProfileHeader from '@/components/student/profile-header'
import ProfileSection from '@/components/student/profile-section'

export default function ProfilePage() {
  const personalFields = [
    { label: 'Full Name', value: 'Rahul Sharma' },
    { label: 'Roll No', value: 'S001' },
    { label: 'Class', value: '10-A' },
    { label: 'Admission No', value: 'ADM-2021-001' },
    { label: 'Date of Birth', value: '15/05/2010' },
    { label: 'Gender', value: 'Male' },
  ]

  const contactFields = [
    { label: 'Email', value: 'rahul.sharma@school.com' },
    { label: 'Phone', value: '+91-9876543210' },
    { label: 'Address', value: '123 Main Street, City' },
    { label: 'City', value: 'Mumbai' },
  ]

  const parentFields = [
    { label: "Father's Name", value: 'Rajesh Sharma' },
    { label: "Father's Phone", value: '+91-9876543211' },
    { label: "Mother's Name", value: 'Anjali Sharma' },
    { label: "Mother's Phone", value: '+91-9876543212' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-[#071B4A] mb-2">My Profile</h2>
        <p className="text-slate-500">View and manage your profile information</p>
      </div>

      <ProfileHeader 
        name="Rahul Sharma" 
        rollNo="S001" 
        className="10-A" 
        initials="RS" 
      />

      <div className="grid gap-8">
        <ProfileSection title="Personal Information" fields={personalFields} />
        <ProfileSection title="Contact Information" fields={contactFields} />
        <ProfileSection title="Parent/Guardian Information" fields={parentFields} />
      </div>
    </div>
  )
}

