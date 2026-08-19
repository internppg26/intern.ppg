'use client';

import React from 'react';
import Link from 'next/link';

export default function AssessmentDetailPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/coach/assessments" className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div className="relative w-full max-w-lg hidden md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" placeholder="Search sessions, students, or reports..." className="w-full pl-12 pr-4 py-2 bg-neutral-100/80 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20" />
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-neutral-200 pl-4 ml-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
          <button className="bg-[#0B2545] hover:bg-[#13325B] text-white px-5 py-2 rounded-full text-xs font-bold transition-colors">
            Mulai LMS
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto w-full flex-grow flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left Panel: Submission Info & Viewer */}
        <div className="w-full xl:w-2/3 flex flex-col gap-6">
          
          {/* Student Header */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Siti Rahmawati" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0B2545]">Siti Rahmawati</h2>
                <p className="text-xs text-neutral-500 mt-1">Cohort B - Advanced Digital Marketing</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Submitted on</p>
              <p className="text-sm font-semibold text-[#0B2545]">Oct 24, 2024 &bull; 14:30 WIB</p>
            </div>
          </div>

          {/* Alert */}
          <div className="bg-[#FFF1F1] border border-[#FFD5D5] rounded-2xl p-4 flex items-center gap-3 text-red-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span className="text-xs font-bold">Submitted 2 hours late</span>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="text-xs font-bold text-[#0B2545]">Siti_Rahmawati_Portfolio_Final.pdf</span>
              </div>
              <button className="text-neutral-400 hover:text-[#0B2545] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>
            
            <div className="flex-grow bg-[#E2E8F0] relative overflow-hidden flex items-center justify-center">
              {/* Fake PDF rendering visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 -rotate-45 transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/20 rotate-45 transform -translate-x-32 translate-y-32"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 opacity-50">
                <div className="w-16 h-16 rounded-xl bg-neutral-400 text-white flex items-center justify-center shadow-inner">
                  <span className="font-black text-xl">PDF</span>
                </div>
                <span className="font-bold text-neutral-600 tracking-widest text-sm uppercase">PDF Viewer Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Grading & Feedback */}
        <div className="w-full xl:w-1/3 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col sticky top-24" style={{ height: 'calc(100vh - 120px)' }}>
          
          <div className="p-8 border-b border-neutral-100 flex-shrink-0">
            <h2 className="text-xl font-black text-[#0B2545] mb-2">Evaluation & Feedback</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Grading based on Final Portfolio Rubric v2
            </div>
          </div>

          <div className="p-8 overflow-y-auto custom-scrollbar flex-grow space-y-8">
            
            {/* Score */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Final Score</h3>
                <Link href="#" className="text-[10px] font-bold text-[#00628B] hover:underline flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  View Grading Guidelines (PDF)
                </Link>
              </div>
              <div className="w-32 h-32 rounded-full bg-[#FFF8F3] border-4 border-[#F4E3D7] flex items-center justify-center">
                <div className="flex items-baseline gap-1 text-[#0B2545]">
                  <input type="text" defaultValue="0" className="w-[72px] text-center text-4xl font-black bg-transparent outline-none focus:border-b-2 border-[#D47225]" />
                  <span className="text-sm font-bold text-neutral-400">/100</span>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex flex-col h-full min-h-[300px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Instructor Feedback</h3>
                <button className="bg-[#0B2545] hover:bg-[#13325B] text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  Draft with AI Assistant
                </button>
              </div>
              <textarea 
                className="w-full flex-grow bg-[#FFF8F3] border-none rounded-2xl p-6 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#D47225]/30 resize-none placeholder:text-neutral-400"
                placeholder="Provide detailed feedback on the portfolio submission here. Focus on strengths and areas for improvement..."
              ></textarea>
            </div>

          </div>

          <div className="p-6 border-t border-neutral-100 bg-white flex justify-end gap-4 rounded-b-3xl">
            <button className="px-8 py-3 rounded-full border-2 border-[#0B2545] text-[#0B2545] font-bold text-xs hover:bg-neutral-50 transition-colors">
              Save as Draft
            </button>
            <button className="px-8 py-3 rounded-full bg-[#D47225] hover:bg-[#B55D1A] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-[#D47225]/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Submit Grade
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
