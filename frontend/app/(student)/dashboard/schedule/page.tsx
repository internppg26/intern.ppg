'use client';

import React from 'react';

export default function SchedulePage() {
  const sessions = [
    {
      id: 1,
      title: "Leadership Strategy: One-on-One Session",
      date: "Oct 24, 2023 • 02:00 PM",
      mentor: "Dr. Helena Vance",
      status: "upcoming",
      icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect></>
    },
    {
      id: 2,
      title: "Digital Transformation Workshop",
      date: "Oct 26, 2023 • 10:00 AM",
      mentor: "Marcus Aurelius",
      status: "upcoming",
      icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect></>
    },
    {
      id: 3,
      title: "Performance Assessment Review",
      date: "Oct 18, 2023 • 03:00 PM",
      mentor: "Dr. Helena Vance",
      status: "completed",
      icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>
    },
    {
      id: 4,
      title: "Public Speaking & Pitching Drills",
      date: "Nov 02, 2023 • 01:00 PM",
      mentor: "Sara Tancredi",
      status: "upcoming",
      icon: <><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect></>
    }
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <span>LMS</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Jadwal Coaching</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">Jadwal Coaching & Asesmen</h1>
          <p className="text-neutral-600 text-sm">Jadwal sesi live mentoring dan tatap muka online Anda.</p>
        </div>

        {/* Sessions List */}
        <div className="space-y-6 mb-12">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white border border-neutral-200 rounded-full p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-4">
              <div className="flex items-center gap-6 pl-2">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${session.status === 'completed' ? 'bg-neutral-100 text-neutral-400' : 'bg-[#F4E3D7] text-[#964B13]'}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {session.icon}
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-base mb-1 ${session.status === 'completed' ? 'text-neutral-400' : 'text-[#0B2545]'}`}>
                    {session.title}
                  </h3>
                  <div className={`flex items-center gap-4 text-xs font-medium ${session.status === 'completed' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      {session.mentor}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="pr-2 shrink-0">
                {session.status === 'completed' ? (
                  <button disabled className="w-full md:w-auto bg-neutral-100 text-neutral-400 px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Completed
                  </button>
                ) : (
                  <button className="w-full md:w-auto bg-[#964B13] hover:bg-[#7A3D0F] text-white px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#964B13]/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                    Join Session
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reschedule Box */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#12365A] rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/5 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          
          <div className="relative z-10 md:max-w-xl mb-6 md:mb-0">
            <h3 className="text-2xl font-black mb-3 tracking-wide">Need to reschedule?</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              If you cannot attend a session, please notify your mentor at least 24 hours in advance to avoid penalty credits.
            </p>
          </div>
          
          <button className="relative z-10 bg-white text-[#0B2545] hover:bg-neutral-100 px-8 py-3 rounded-full font-bold text-sm transition-colors shrink-0">
            Contact Support
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6">
        <div className="max-w-5xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
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
