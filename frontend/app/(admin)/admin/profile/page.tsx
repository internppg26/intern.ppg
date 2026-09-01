'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'AlexMorgan@gmail.com',
    username: 'AlexMorgan123',
    password: '***********',
    role: 'Admin',
    status: 'Active'
  });

  useEffect(() => {
    const savedImage = localStorage.getItem('admin_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('admin_profile_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#F9FAFC]">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center text-sm font-bold">
          <Link href="/admin" className="text-neutral-400 hover:text-neutral-600 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back
          </Link>
          <span className="text-neutral-400 mx-2">{'>'}</span>
          <span className="text-[#0B2545]">Admin Profile</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-neutral-400 hover:text-[#0B2545] transition-colors relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 font-sans">
        
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#0B2545] mb-2 tracking-tight">Profil Admin</h2>
          <p className="text-neutral-500 text-sm">
            Kelola informasi akun dan pengaturan keamanan Anda.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 mb-6 shadow-sm flex items-start gap-6">
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full bg-neutral-200 overflow-hidden border-4 border-white shadow-md">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src="/alex-morgan.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                }} />
              )}
            </div>
            <button 
              onClick={handleButtonClick}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#0B2545] shadow-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </button>
          </div>
          
          <div className="flex flex-col items-start pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-xs font-bold mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Super Admin
            </div>
            <h3 className="text-2xl font-black text-[#0B2545] mb-1">{formData.name}</h3>
            <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              admin@performapuncak.id
            </div>
            <button 
              onClick={handleButtonClick}
              className="px-6 py-2 border border-neutral-300 text-[#0B2545] text-sm font-bold rounded-md hover:bg-neutral-50 transition-colors"
            >
              Ubah Foto
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*"
              className="hidden" 
            />
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4">
            <svg className="text-[#0B2545]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <h3 className="text-lg font-black text-[#0B2545]">Informasi Personal</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Nama Lengkap</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Email Adress</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Role</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-neutral-600">Status</label>
              <input 
                type="text" 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full bg-[#F9FAFC] border border-neutral-200 focus:bg-white focus:border-[#0B2545] rounded-lg px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
