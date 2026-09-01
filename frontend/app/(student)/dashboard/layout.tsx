'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userName, setUserName] = React.useState('Alex Morgan');
  const [userEmail, setUserEmail] = React.useState('alexmorgan@gmail.com');

  React.useEffect(() => {
    const fetchUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          if (user.name) setUserName(user.name);
          if (user.email) setUserEmail(user.email);
        } catch (e) {
          console.error('Error parsing user data', e);
        }
      }
    };

    fetchUser();
    window.addEventListener('user-updated', fetchUser);
    return () => window.removeEventListener('user-updated', fetchUser);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0B2545] text-white flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8">
            <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-wide">Performa Puncak Group</span>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 mb-4">
          <div className="bg-[#13325B] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 bg-[#2D5A8B] rounded-sm flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3 className="font-bold text-base">{userName}</h3>
            <p className="text-xs text-white/60 truncate max-w-[150px]">{userEmail}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2 text-sm font-bold tracking-wide">
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname === '/dashboard' ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            BERANDA PESERTA
          </Link>
          <Link href="/dashboard/catalog" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/catalog') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            KATALOG PELATIHAN
          </Link>
          <Link href="/dashboard/my-courses" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/my-courses') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            PELATIHAN SAYA
          </Link>
          <Link href="/dashboard/schedule" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/schedule') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            JADWAL COACHING
          </Link>
          <Link href="/dashboard/downloads" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/downloads') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            MATERI UNDUHAN
          </Link>
          <Link href="/dashboard/certificates" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/certificates') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            E-CERTIFICATE
          </Link>
          <Link href="/dashboard/profile" className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${pathname.startsWith('/dashboard/profile') ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' : 'text-[#5A879D] hover:text-white'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            PROFIL AKUN
          </Link>
        </nav>

        {/* Footer actions */}
        <div className="p-6">
          <Link href="/login" className="flex items-center gap-3 text-[#E53E3E] hover:text-red-400 transition-colors font-bold text-sm tracking-wide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            LOG OUT
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {children}
      </main>

    </div>
  );
}
