'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !savedUser) {
      window.location.href = '/login';
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      if (user.role === 'instructor' || user.role === 'coach') {
        window.location.href = '/coach';
      } else if (user.role === 'student' || user.role === 'peserta') {
        window.location.href = '/dashboard';
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const menuItems = [
    { name: 'DASHBOARD OVERVIEW', path: '/admin', icon: <><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></> },
    { name: 'USER MANAGEMENT', path: '/admin/users', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></> },
    { name: 'COURSE & PROGRAMS', path: '/admin/courses', icon: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></> },
    { name: 'CONTENT (CMS)', path: '/admin/cms', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
    { name: 'TRANSACTIONS', path: '/admin/transactions', icon: <><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></> },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden relative">
      
      {/* Sidebar Toggle Button (Visible when closed) */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-6 left-0 z-50 bg-[#E5832E] hover:bg-[#D47225] text-white p-2 rounded-r-md shadow-md transition-colors"
          title="Open Sidebar"
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
      <aside className={`bg-[#0B2545] text-white flex-col flex flex-shrink-0 z-40 shadow-2xl transition-all duration-300 absolute md:relative h-full ${isSidebarOpen ? 'w-[280px] left-0' : 'w-0 -left-[280px] md:left-0 overflow-hidden'}`}>
        {/* Logo and Toggle */}
        <div className="p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 shrink-0">
              <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden">Performa Puncak Group</span>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute -right-3 bg-[#E5832E] hover:bg-[#D47225] text-white p-1 rounded border border-[#0B2545] shadow-md transition-colors"
            title="Close Sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="11 17 6 12 11 7"></polyline><line x1="18" y1="17" x2="18" y2="7"></line></svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-4 text-xs font-bold tracking-widest">
          {menuItems.map((item) => {
            const isActive = item.path === '/admin' 
              ? pathname === '/admin'
              : pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-r-xl transition-colors ${
                  isActive 
                    ? 'bg-[#0E5177] text-white border-l-4 border-[#E5832E]' 
                    : 'text-[#5A879D] hover:text-white'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {item.icon}
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-6 space-y-5 border-t border-white/5">
          <Link href="/admin/profile" className="flex items-center gap-4 text-[#5A879D] hover:text-white transition-colors font-bold text-xs tracking-widest">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            ADMIN PROFILE
          </Link>
          <Link href="/login" className="flex items-center gap-4 text-[#E53E3E] hover:text-red-400 transition-colors font-bold text-xs tracking-widest">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            LOG OUT
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#F9FAFC] overflow-hidden min-w-0">
        {children}
      </main>
    </div>
  );
}
