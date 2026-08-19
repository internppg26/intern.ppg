'use client';

import React from 'react';
import Link from 'next/link';

export default function AssessmentsPage() {
  const assessments = [
    { id: 1, name: 'Siti Rahmawati', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', cohort: 'Batch #44 - UX Specialization', title: 'Final Portfolio Review: Interaction Design', module: 'Module 4: Advanced Prototyping', date: 'Oct 24, 2023', time: 'Overdue (2h)', status: 'NEEDS GRADING' },
    { id: 2, name: 'Budi Pratama', initials: 'BP', cohort: 'Batch #44 - UX Specialization', title: 'User Persona Research Docs', module: 'Module 1: User Psychology', date: 'Oct 24, 2023', time: '4:15 PM', status: 'NEEDS GRADING' },
    { id: 3, name: 'Farhan Hakim', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', cohort: 'Batch #42 - Data Science', title: 'Python Scripting Midterm', module: 'Module 2: Automation', date: 'Oct 23, 2023', time: '10:30 AM', status: 'REVIEWED' },
    { id: 4, name: 'Anisa Putri', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', cohort: 'Batch #44 - UX Specialization', title: 'Final Portfolio Review: Interaction Design', module: 'Module 4: Advanced Prototyping', date: 'Oct 22, 2023', time: '6:00 PM', status: 'NEEDS GRADING' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar / Search */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-full max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" placeholder="Search sessions, students, or reports..." className="w-full pl-12 pr-4 py-2.5 bg-neutral-100/80 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 transition-all" />
        </div>
        <div className="flex items-center gap-4 ml-4 border-l border-neutral-200 pl-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
          <div className="max-w-lg">
            <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">
              Assessments & Grading
            </h1>
            <p className="text-neutral-500 text-sm">
              Review student submissions, provide detailed feedback, and track the overall performance of your cohorts across all active modules.
            </p>
          </div>
          
          <div className="flex bg-neutral-100 p-1.5 rounded-full shrink-0 border border-neutral-200">
            <button className="px-6 py-2 bg-white rounded-full text-sm font-bold text-[#0B2545] shadow-sm">
              Pending Review (24)
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-bold text-neutral-500 hover:text-[#0B2545]">
              Completed
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by participant name..." 
              className="w-full pl-10 pr-4 py-3 bg-neutral-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
            />
          </div>
          
          <select className="px-5 py-3 bg-neutral-100 border-none rounded-full text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center]">
            <option>All Modules</option>
          </select>
          
          <select className="px-5 py-3 bg-neutral-100 border-none rounded-full text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center]">
            <option>Latest Submissions</option>
          </select>

          <button className="bg-[#0B2545] text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#13325B] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            More Filters
          </button>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-50/50">
            <div className="col-span-3">Participant Name</div>
            <div className="col-span-4">Assessment Title</div>
            <div className="col-span-2">Submitted Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-neutral-100">
            {assessments.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-neutral-50/50 transition-colors">
                
                {/* Name */}
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold">{item.initials}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2545] text-sm">{item.name}</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{item.cohort}</p>
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-4">
                  <h4 className="font-bold text-[#0B2545] text-sm">{item.title}</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{item.module}</p>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-[#0B2545]">{item.date}</p>
                  <p className={`text-[10px] font-bold mt-0.5 ${item.time.includes('Overdue') ? 'text-red-500' : 'text-neutral-500'}`}>
                    {item.time}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-block px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.status === 'NEEDS GRADING' 
                      ? 'bg-[#FFF8F3] text-[#D47225] border border-[#F4E3D7]' 
                      : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-center">
                  {item.status === 'NEEDS GRADING' ? (
                    <Link href={`/coach/assessments/${item.id}`} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-5 py-2.5 rounded-full text-[11px] font-bold transition-colors shadow-sm text-center w-full max-w-[120px]">
                      Grade /<br/>Review
                    </Link>
                  ) : (
                    <Link href={`/coach/assessments/${item.id}`} className="border-2 border-neutral-300 text-neutral-500 hover:border-[#0B2545] hover:text-[#0B2545] px-5 py-2.5 rounded-full text-[11px] font-bold transition-colors text-center w-full max-w-[120px]">
                      View<br/>Details
                    </Link>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Pagination & Bottom Info */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-neutral-500">Showing <span className="font-bold text-[#0B2545]">4 of 24</span> results</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-xs font-bold shadow-md">1</button>
            <button className="w-8 h-8 rounded-full bg-white text-neutral-500 hover:bg-neutral-50 flex items-center justify-center text-xs font-bold">2</button>
            <button className="w-8 h-8 rounded-full bg-white text-neutral-500 hover:bg-neutral-50 flex items-center justify-center text-xs font-bold">3</button>
            <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-neutral-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#0B2545] text-white flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 className="font-bold text-[#0B2545] mb-2">Review Efficiency</h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">Your average grading time is 2.4 hours per submission. Keep up the momentum!</p>
            <button className="text-[10px] font-bold text-[#D47225] uppercase tracking-widest flex items-center gap-1 hover:text-[#B55D1A]">
              VIEW DETAILED STATS <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
          
          <div className="bg-[#FFF8F3] border border-[#F4E3D7] rounded-3xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#D47225] text-white flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 className="font-bold text-[#0B2545] mb-2">AI Feedback Assistant</h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">Use our new generative feedback tool to draft high-quality responses faster while maintaining a personal touch.</p>
            <button className="bg-[#0B2545] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#13325B] transition-colors">
              Try AI Drafts
            </button>
          </div>

          <div className="bg-[#0B2545] border border-[#13325B] rounded-3xl p-6 shadow-sm text-white">
            <div className="w-10 h-10 rounded-full bg-[#13325B] flex items-center justify-center mb-4 text-[#67A0B5]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h3 className="font-bold mb-2">Grading Guidelines</h3>
            <p className="text-xs text-[#67A0B5] leading-relaxed mb-4">Refer to the updated 2023 Rubric to ensure consistency across all student assessments.</p>
            <button className="bg-white text-[#0B2545] px-5 py-2 rounded-full text-xs font-bold hover:bg-neutral-100 transition-colors">
              Open Rubric PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
