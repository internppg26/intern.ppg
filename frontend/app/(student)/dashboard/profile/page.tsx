'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <div className="hidden lg:flex items-center gap-4 bg-white border border-neutral-200 shadow-lg rounded-full py-3 px-6 shrink-0">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[#0B2545]">Profil berhasil diperbarui</div>
              <div className="text-xs text-neutral-500">Semua perubahan telah disimpan.</div>
            </div>
            <button className="text-neutral-400 hover:text-neutral-600 ml-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <h2 className="font-bold text-[#0B2545] mb-8">Informasi Pribadi</h2>
              
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-full border-2 border-[#D47225] bg-[#FFF8F3] flex items-center justify-center text-xl font-black text-[#D47225] shrink-0">
                  AM
                </div>
                <div>
                  <h3 className="font-bold text-[#0B2545] mb-1">Foto Profil</h3>
                  <p className="text-xs text-neutral-500 mb-4">Disarankan rasio 1:1, maksimal 2MB (JPG atau PNG).</p>
                  <button className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-6 py-2 rounded-full font-bold text-sm transition-colors">
                    Ubah Foto
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">NAMA LENGKAP</label>
                  <input type="text" defaultValue="Alex Morgan" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">EMAIL</label>
                  <input type="email" defaultValue="alexmorgan@gmail.com" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">INSTANSI ASAL</label>
                  <input type="text" defaultValue="Puncak Group" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">NOMOR TELEPON</label>
                  <input type="text" defaultValue="+62 812 3456 7890" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                </div>
              </div>

              <button className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-md shadow-[#D47225]/20">
                Simpan Perubahan
              </button>
            </div>
            
            {/* Delete Account Box */}
            <div className="bg-[#FFF5F5] border border-dashed border-red-300 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="font-bold text-[#0B2545] mb-1">Hapus Akun</h3>
                <p className="text-xs text-neutral-600">Tindakan ini permanen. Semua data belajar dan progres kursus akan dihapus selamanya.</p>
              </div>
              <button className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2.5 rounded-full font-bold text-sm transition-colors shrink-0">
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
                    <input type={showCurrentPassword ? "text" : "password"} defaultValue="password123" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showCurrentPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">PASSWORD BARU</label>
                  <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} defaultValue="newpass123" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showNewPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">KONFIRMASI PASSWORD BARU</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} defaultValue="newpass123" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 pr-12 text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545] outline-none" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#0B2545]/20 mb-8">
                Perbarui Kata Sandi
              </button>

              <div className="bg-[#F4E3D7]/50 rounded-2xl p-6 flex items-start gap-4">
                <div className="text-[#D47225] mt-0.5 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0B2545] text-sm mb-1">Keamanan Akun</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">Pastikan kata sandi Anda memiliki minimal 8 karakter dengan kombinasi angka dan simbol.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#0B2545]">Syarat Layanan</a>
            <a href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#0B2545]">Pusat Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
