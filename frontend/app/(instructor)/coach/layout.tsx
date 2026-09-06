'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !savedUser) {
      window.location.href = '/login';
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      if (user.role === 'admin') {
        window.location.href = '/admin';
      } else if (user.role === 'student' || user.role === 'peserta') {
        window.location.href = '/dashboard';
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const menuItems = [
    { name: 'DASHBOARD', path: '/coach', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></> },
    { name: 'COURSE', path: '/coach/course', icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></> },
    { name: 'SCHEDULE', path: '/coach/schedule', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></> },
    { name: 'MY STUDENTS', path: '/coach/students', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></> },
    // { name: 'ASSESSMENTS', path: '/coach/assessments', icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></> },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden relative">
      
      {/* Sidebar Toggle Button for Mobile */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden absolute top-4 left-0 z-50 bg-[#E5832E] hover:bg-[#D47225] text-white p-2 rounded-r-md shadow-md transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 17 18 12 13 7"></polyline><line x1="6" y1="17" x2="6" y2="7"></line></svg>
        </button>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[280px] h-full flex-shrink-0 bg-[#0B2545] text-white flex flex-col z-40 shadow-2xl absolute md:relative transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-[280px] md:left-0'}`}>
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
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Profile" className="w-12 h-12 rounded-sm object-cover mb-3 shadow-md" />
            ) : (
              <div className="w-12 h-12 bg-[#2D5A8B] rounded-sm flex items-center justify-center mb-3 text-xl font-bold uppercase shadow-md">
                {currentUser?.name?.[0] || currentUser?.username?.[0] || 'C'}
              </div>
            )}
            <h3 className="font-bold text-base capitalize">{currentUser?.name || currentUser?.username || 'Coach'}</h3>
            <p className="text-xs text-white/60">{currentUser?.email || 'coach@ppg.com'}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2 text-sm font-bold tracking-wide">
          {menuItems.map((item) => {
            const isActive = item.path === '/coach' 
              ? pathname === '/coach'
              : pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-r-xl transition-colors ${
                  isActive 
                    ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' 
                    : 'text-[#5A879D] hover:text-white'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {item.icon}
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-6 space-y-4">
          <Link 
            href="/coach/profile" 
            className={`flex items-center gap-3 px-4 py-3 -mx-4 rounded-r-xl transition-colors font-bold text-sm tracking-wide ${
              pathname === '/coach/profile'
                ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' 
                : 'text-[#5A879D] hover:text-white border-l-4 border-transparent'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            INSTRUCTOR PROFILE
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-4 py-2 -mx-4 text-[#E53E3E] hover:text-red-400 transition-colors font-bold text-sm tracking-wide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            LOG OUT
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-50/50">
        {children}
      </main>
    </div>
  );
}
