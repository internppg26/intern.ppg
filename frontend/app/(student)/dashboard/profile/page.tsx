'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  
  // States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instansi, setInstansi] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setInstansi(user.instansi || '');
        if (user.avatar) setAvatarUrl(user.avatar);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, avatar: avatarUrl, instansi })
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('user-updated'));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert('Gagal memperbarui profil');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat memperbarui profil');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password baru tidak cocok');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      alert('Password baru harus minimal 6 karakter');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (res.ok) {
        alert('Password berhasil diperbarui');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal memperbarui password');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat memperbarui password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus akun secara permanen? Tindakan ini tidak bisa dibatalkan.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        localStorage.clear();
        alert('Akun berhasil dihapus');
        router.push('/login');
      } else {
        alert('Gagal menghapus akun');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat menghapus akun');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full flex-grow">
        
        {/* Top Header & Alert */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-xs text-neutral-500 font-medium mb-8">
              <span>LMS</span>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-[#0B2545] font-bold">Profil Akun</span>
            </div>
            <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">Pengaturan Profil</h1>
            <p className="text-neutral-600 text-sm">Kelola informasi data diri dan keamanan akun Anda.</p>
          </div>

          {/* Success Alert */}
          {showSuccess && (
            <div className="hidden lg:flex items-center gap-4 bg-white border border-neutral-200 shadow-lg rounded-full py-3 px-6 shrink-0 transition-opacity">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div className="font-bold text-sm text-[#0B2545]">Profil berhasil diperbarui</div>
                <div className="text-xs text-neutral-500">Semua perubahan telah disimpan.</div>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-neutral-400 hover:text-neutral-600 ml-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <h2 className="font-bold text-[#0B2545] mb-8">Informasi Pribadi</h2>
              
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-full border-2 border-[#D47225] bg-[#FFF8F3] flex items-center justify-center overflow-hidden text-xl font-black text-[#D47225] shrink-0">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    initials || 'U'
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B2545] mb-1">Foto Profil</h3>
                  <p className="text-xs text-neutral-500 mb-4">Disarankan rasio 1:1, maksimal 2MB (JPG atau PNG).</p>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg, image/png" onChange={handleFileChange} />
                  <button onClick={() => fileInputRef.current?.click()} className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-6 py-2 rounded-full font-bold text-sm transition-colors">
                    Ubah Foto
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">NAMA LENGKAP</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">EMAIL</label>
                  <input type="email" value={email} disabled className="w-full bg-[#e9ecef] border-none rounded-xl px-4 py-3 text-neutral-500 font-medium outline-none cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">INSTANSI ASAL</label>
                  <input type="text" value={instansi} onChange={e => setInstansi(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">NOMOR TELEPON</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
              </div>

              <button onClick={handleUpdateProfile} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-md shadow-[#D47225]/20">
                Simpan Perubahan
              </button>
            </div>
            
            {/* Delete Account Box */}
            <div className="bg-[#FFF5F5] border border-dashed border-red-300 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="font-bold text-[#0B2545] mb-1">Hapus Akun</h3>
                <p className="text-xs text-neutral-600">Tindakan ini permanen. Semua data belajar dan progres kursus akan dihapus selamanya.</p>
              </div>
              <button onClick={handleDeleteAccount} className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2.5 rounded-full font-bold text-sm transition-colors shrink-0">
                Hapus Akun Saya
              </button>
            </div>

          </div>

          {/* Right Column: Password */}
          <div>
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm h-full">
              <h2 className="font-bold text-[#0B2545] mb-8">Ubah Kata Sandi</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">PASSWORD SAAT INI</label>
                  <div className="relative">
                    <input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showCurrentPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">PASSWORD BARU</label>
                  <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showNewPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">KONFIRMASI PASSWORD BARU</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button onClick={handleUpdatePassword} className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#0B2545]/20 mb-8">
                Perbarui Kata Sandi
              </button>

              <div className="bg-[#F4E3D7]/50 rounded-2xl p-6 flex items-start gap-4">
                <div className="text-[#D47225] mt-0.5 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0B2545] text-sm mb-1">Keamanan Akun</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Pastikan kata sandi Anda memiliki minimal 6 karakter dengan kombinasi angka dan simbol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
