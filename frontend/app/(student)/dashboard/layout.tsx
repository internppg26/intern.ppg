'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userName, setUserName] = React.useState('Alex Morgan');
  const [userEmail, setUserEmail] = React.useState('alexmorgan@gmail.com');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = () => {
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (!token || !savedUser) {
        window.location.href = '/login';
        return;
      }

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          
          if (user.role === 'admin') {
            window.location.href = '/admin';
            return;
          } else if (user.role === 'instructor' || user.role === 'coach') {
            window.location.href = '/coach';
            return;
          }

          setUserName(user.name || 'User');
          setUserEmail(user.email || '');
          setUserAvatar(user.avatar || '');
        } catch (e) {
          console.error('Error parsing user data', e);
        }
      }
    };

    fetchUser();
    window.addEventListener('user-updated', fetchUser);
    return () => window.removeEventListener('user-updated', fetchUser);
  }, []);

  const isMaterialPage = pathname.includes('/material');

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden relative">
      
      {/* Sidebar Toggle Button for Mobile */}
      {!isMaterialPage && !isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden absolute top-4 left-0 z-50 bg-[#E5832E] hover:bg-[#D47225] text-white p-2 rounded-r-md shadow-md transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 17 18 12 13 7"></polyline><line x1="6" y1="17" x2="6" y2="7"></line></svg>
        </button>
      )}

      {/* Mobile Overlay */}
      {!isMaterialPage && isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!isMaterialPage && (
        <aside className={`w-[280px] h-full flex-shrink-0 bg-[#0B2545] text-white flex flex-col z-40 absolute md:relative transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-[280px] md:left-0'}`}>
          {/* Logo and Mobile Close */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-sm tracking-wide">Performa Puncak Group</span>
            </div>
            <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

        {/* User Profile */}
        <div className="px-6 py-4 mb-4">
          <div className="bg-[#13325B] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 bg-[#2D5A8B] rounded-sm flex items-center justify-center mb-3 overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              )}
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
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {children}
      </main>

    </div>
  );
}
