'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CourseLearningLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans">
      
      {/* Learning Sidebar */}
      <aside className="w-[320px] bg-white border-r border-neutral-200 flex flex-col hidden md:flex shrink-0">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <Link href="/dashboard/my-courses" className="flex items-center gap-2 text-[#D47225] font-bold text-xs uppercase tracking-widest mb-4 hover:text-[#964B13] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            KEMBALI KE LIST COURSE
          </Link>
          <h2 className="font-black text-[#0B2545] uppercase tracking-wide leading-tight">CORPORATE STRATEGY MASTERCLASS</h2>
        </div>

        {/* Modules Accordion */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {/* Segment 1 */}
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-xl overflow-hidden">
            <div className="p-4 flex justify-between items-center cursor-pointer">
              <h3 className="font-black text-[#0B2545] text-xs uppercase leading-relaxed w-4/5">BAB 1: FOUNDATION AND CORE PRINCIPLES</h3>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500 transform rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            
            <div className="pb-3 px-3 flex flex-col gap-2">
              <Link href={`/course/1/pre-test/intro`} className={`flex justify-between items-center p-3 rounded-lg border transition-colors ml-4 shadow-sm ${isActive('/pre-test') ? 'bg-[#0B2545] border-[#0B2545] text-white' : 'bg-white border-neutral-200 text-[#0B2545] hover:border-neutral-300'}`}>
                <span className={`text-xs ${isActive('/pre-test') ? 'font-bold' : 'font-medium'}`}>Pre-Test : 5 Foundation</span>
                <span className={`text-[10px] ${isActive('/pre-test') ? 'opacity-70' : 'font-bold text-neutral-400'}`}>10 min</span>
              </Link>
              <Link href={`/course/1/material`} className={`flex justify-between items-center p-3 rounded-lg border transition-colors ml-4 shadow-sm ${isActive('/material') ? 'bg-[#0B2545] border-[#0B2545] text-white' : 'bg-white border-neutral-200 text-[#0B2545] hover:border-neutral-300'}`}>
                <span className={`text-xs ${isActive('/material') ? 'font-bold' : 'font-medium'}`}>Sub-bab 1 : 5 Foundation</span>
                <span className={`text-[10px] ${isActive('/material') ? 'opacity-70' : 'font-bold text-neutral-400'}`}>10 min</span>
              </Link>
              <div className="flex justify-between items-center p-3 rounded-lg border border-neutral-200 bg-white text-[#0B2545] hover:border-neutral-300 transition-colors ml-4 shadow-sm cursor-pointer">
                <span className="text-xs font-medium">Sub-bab 2 : 6 Core Principles</span>
                <span className="text-[10px] font-bold text-neutral-400">15 min</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-neutral-200 bg-white text-[#0B2545] hover:border-neutral-300 transition-colors ml-4 shadow-sm cursor-pointer">
                <span className="text-xs font-medium">Post-Test : Bab 1 Review</span>
                <span className="text-[10px] font-bold text-neutral-400">15 min</span>
              </div>
            </div>
          </div>

          {/* Segment 2 */}
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-neutral-300 transition-colors">
            <h3 className="font-black text-[#0B2545] text-xs uppercase leading-relaxed w-4/5">SEGMENT 2:<br/>MARKET ANALYSIS</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          {/* Segment 3 */}
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-neutral-300 transition-colors">
            <h3 className="font-black text-[#0B2545] text-xs uppercase leading-relaxed w-4/5">SEGMENT 3:<br/>OPERATIONAL EXCELLENCE</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          {/* Segment 4 */}
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-neutral-300 transition-colors">
            <h3 className="font-black text-[#0B2545] text-xs uppercase leading-relaxed w-4/5">SEGMENT 4:<br/>CONCLUSION</h3>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shrink-0">
          <div className="text-xs font-medium text-neutral-500">
            Pelatihan Saya <span className="mx-2">&rsaquo;</span> <span className="text-[#0B2545] font-bold">Corporate Strategy Masterclass</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545] relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#D47225] rounded-full border border-white"></span>
            </button>
            <button className="hover:text-[#0B2545]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>

    </div>
  );
}
