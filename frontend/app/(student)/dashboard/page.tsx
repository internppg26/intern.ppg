'use client';

import React from 'react';
import Link from 'next/link';

export default function StudentDashboard() {
  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full">
      
      {/* Header Row */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2 uppercase">WELCOME BACK, ALEX MORGAN!</h1>
          <p className="text-[#E5832E] font-bold text-sm">Here is your learning progress for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#0B2545] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#0B2545] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center text-[#0B2545]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#0B2545]">12</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Active Courses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center text-[#0B2545]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#0B2545]">48</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Completed</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center text-[#0B2545]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15l-3 3-2-2-3 3v-8"></path><circle cx="12" cy="8" r="4"></circle><path d="M16 15l3 3 2-2 3 3v-8"></path></svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#0B2545]">15</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Certificates</p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-lg font-black text-[#0B2545] uppercase tracking-wide">ADVANCED CORPORATE COMPLIANCE & ETHICS 2024</h3>
          <span className="mt-2 md:mt-0 px-3 py-1 bg-neutral-200 text-neutral-700 text-[10px] font-bold rounded uppercase tracking-widest">MODULE 4 OF 8</span>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-[#E5832E] uppercase tracking-widest">Progress</span>
            <span className="text-sm font-black text-[#0B2545]">65%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div className="bg-[#D47225] h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/course/2/material" className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
            RESUME COURSE / LANJUT BELAJAR
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Jadwal Coaching */}
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-[#0B2545] uppercase tracking-wide">JADWAL COACHING & ASESMEN</h3>
            <a href="#" className="text-[#D47225] text-[10px] font-bold uppercase tracking-widest hover:underline">VIEW ALL</a>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Quarterly Performance Review", date: "Oct 24, 2023 • 02:00 PM", icon: <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> },
              { title: "Leadership Skill Assessment", date: "Oct 26, 2023 • 09:00 AM", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path> },
              { title: "1-on-1 Mentoring Session", date: "Oct 28, 2023 • 11:30 AM", icon: <polygon points="23 7 16 12 23 17 23 7"></polygon> }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg group hover:border-[#D47225] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F4F7F9] rounded flex items-center justify-center text-[#0B2545]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2545] mb-1 group-hover:text-[#D47225] transition-colors">{item.title}</h4>
                    <p className="text-xs text-[#D47225] font-bold">{item.date}</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 group-hover:text-[#D47225]"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </div>

        {/* File Unduhan */}
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-[#0B2545] uppercase tracking-wide">FILE UNDUHAN TERBARU</h3>
            <a href="#" className="text-[#D47225] text-[10px] font-bold uppercase tracking-widest hover:underline">BROWSE FILES</a>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Company_Policy_2024.pdf", size: "2.4 MB • PDF", type: "pdf" },
              { title: "Learning_Syllabus_Leadership.docx", size: "850 KB • Word", type: "doc" },
              { title: "Budgeting_Exercise_v1.xlsx", size: "1.2 MB • Excel", type: "xls" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg group hover:bg-neutral-100 transition-colors cursor-pointer border border-transparent hover:border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-200 rounded flex items-center justify-center text-[#0B2545]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2545] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#D47225] font-bold">{item.size}</p>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2" className="text-[#D47225]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}