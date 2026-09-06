'use client';

import { uploadToSupabase } from '../../../../utils/supabaseUpload';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function InstructorProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: 'Prof. Adrian Puncak',
    professionalTitle: 'Senior Business Strategist',
    shortBio: '',
    linkedinUrl: 'https://linkedin.com/in/adrian-puncak',
    avatar: ''
  });

  const [securityData, setSecurityData] = useState({
    email: 'adrian.puncak@performapuncak.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        
        let initialData = {
          fullName: user.name || '',
          professionalTitle: '',
          shortBio: '',
          linkedinUrl: '',
          avatar: user.avatar || ''
        };

        if (user.instansi) {
          try {
            const parsed = JSON.parse(user.instansi);
            if (parsed.title) initialData.professionalTitle = parsed.title;
            if (parsed.bio) initialData.shortBio = parsed.bio;
            if (parsed.linkedin) initialData.linkedinUrl = parsed.linkedin;
          } catch(e) {
            // Not JSON
          }
        }

        setFormData(initialData);
        if (user.email) {
          setSecurityData(prev => ({ ...prev, email: user.email }));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const instansiData = JSON.stringify({
        title: formData.professionalTitle,
        bio: formData.shortBio,
        linkedin: formData.linkedinUrl
      });

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: formData.fullName,
          instansi: instansiData,
          avatar: formData.avatar
        })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Profil berhasil disimpan!');
      } else {
        const err = await res.json();
        alert('Gagal menyimpan profil: ' + (err.error || res.statusText));
      }
    } catch (e: any) {
      alert('Terjadi kesalahan: ' + e.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (!securityData.currentPassword || !securityData.newPassword) {
      alert('Password lama dan baru wajib diisi!');
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: securityData.currentPassword,
          newPassword: securityData.newPassword
        })
      });

      if (res.ok) {
        alert('Password berhasil diperbarui!');
        setSecurityData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      } else {
        const err = await res.json();
        alert('Gagal memperbarui password: ' + (err.error || res.statusText));
      }
    } catch (e: any) {
      alert('Terjadi kesalahan: ' + e.message);
    }
  };

  const handleEnable2FA = () => {
    alert('Fitur Two-Factor Authentication akan segera hadir.');
  };

  return (
    <div className="flex flex-col min-h-full relative bg-[#F8F9FA]">
      {/* Top Bar / Search */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-full max-w-xl">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search sessions, students, or reports..." className="w-full bg-[#F5F5F5] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20" />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full flex-1">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#0B2545] mb-2 tracking-tight">Instructor Profile Settings</h1>
          <p className="text-neutral-500 text-sm">Manage your public instructor bio and account security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Public Profile Info */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-lg font-black text-[#0B2545] mb-6 border-b border-neutral-100 pb-4">Public Profile Information</h2>
            
            <div className="flex flex-col items-center mb-8">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3 bg-[#E8EDF2] flex items-center justify-center cursor-pointer relative group"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.avatar ? (
                  <>
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold">Ubah</span>
                    </div>
                  </>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-[#B87B2E] text-xs font-bold uppercase tracking-widest hover:text-[#8C5D23] transition-colors"
              >
                CHANGE PHOTO
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-neutral-600 tracking-widest uppercase mb-2">FULL NAME</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 tracking-widest uppercase mb-2">PROFESSIONAL TITLE</label>
                <input 
                  type="text" 
                  value={formData.professionalTitle}
                  onChange={(e) => setFormData({...formData, professionalTitle: e.target.value})}
                  className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 tracking-widest uppercase mb-2">SHORT BIO</label>
                <textarea 
                  value={formData.shortBio}
                  onChange={(e) => setFormData({...formData, shortBio: e.target.value})}
                  placeholder="Write a short professional bio describing your expertise and background..."
                  className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors h-28 resize-none"
                  maxLength={500}
                ></textarea>
                <div className="text-right text-xs text-neutral-400 mt-1">
                  {formData.shortBio.length} / 500
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 tracking-widest uppercase mb-2">LINKEDIN URL</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  <input 
                    type="text" 
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                    className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md pl-11 pr-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSaveProfile}
                  className="w-full bg-[#D87F20] hover:bg-[#B86B19] text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-md"
                >
                  SAVE PROFILE
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Security & Login */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-black text-[#0B2545] mb-6 border-b border-neutral-100 pb-4">Security & Login</h2>
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-neutral-600 tracking-widest uppercase mb-2">EMAIL ADDRESS</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input 
                    type="email" 
                    value={securityData.email}
                    disabled
                    className="w-full bg-[#F5F5F5] border border-transparent rounded-md pl-11 pr-4 py-3 text-sm text-neutral-500 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="flex items-start gap-1.5 mt-2 text-neutral-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  <span className="text-[10px]">Contact administrator to change registered email.</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0B2545]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <h3 className="text-xs font-bold text-[#0B2545] tracking-widest uppercase">CHANGE PASSWORD</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-1">CURRENT PASSWORD</label>
                    <div className="relative">
                      <input 
                        type={showCurrentPassword ? "text" : "password"}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                        className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors pr-10"
                      />
                      <button 
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                      >
                        {showCurrentPassword ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-1">NEW PASSWORD</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                        className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors pr-10"
                      />
                      <button 
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                      >
                        {showNewPassword ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-1">CONFIRM NEW PASSWORD</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                        className="w-full bg-[#FFF9F3] border border-transparent focus:border-[#D87F20] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors pr-10"
                      />
                      <button 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                      >
                        {showConfirmPassword ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleUpdatePassword}
                  className="w-full bg-[#0C2B40] hover:bg-[#133c5a] text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-md"
                >
                  UPDATE PASSWORD
                </button>
              </div>
            </div>

            <div className="bg-[#F8F9FA] border border-neutral-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-[#0B2545] mb-1">TWO-FACTOR AUTHENTICATION</h3>
                <p className="text-xs text-neutral-500">Add an extra layer of security to your account.</p>
              </div>
              <button 
                onClick={handleEnable2FA}
                className="px-6 py-2 border-2 border-[#0B2545] text-[#0B2545] text-xs font-bold rounded-full hover:bg-[#0B2545] hover:text-white transition-colors shrink-0 uppercase tracking-wide"
              >
                ENABLE
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0B2545] text-white px-8 py-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-2">Performa Puncak Group</h2>
            <p className="text-white/50 text-xs">© 2012 PT. Performa Puncak Group. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-8 text-[10px] font-bold tracking-widest text-white/70">
            <Link href="#" className="hover:text-white transition-colors">SUPPORT CENTER</Link>
            <Link href="#" className="hover:text-white transition-colors">API DOCS</Link>
            <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
