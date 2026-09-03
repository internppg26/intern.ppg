'use client';

import React, { useState, useEffect } from 'react';

type ScheduleEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  type: string;
  link?: string;
  notes?: string;
  instructor?: { id: number; name: string; email: string; };
};

export default function SchedulePage() {
  const [sessions, setSessions] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/schedules', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatus = (date: string, endTime: string) => {
    const now = new Date();
    const endDateStr = `${date}T${endTime}`;
    const endDate = new Date(endDateStr);
    
    // If invalid date parsing
    if (isNaN(endDate.getTime())) return 'upcoming';
    
    return now > endDate ? 'completed' : 'upcoming';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderLinkButton = (link: string | undefined) => {
    if (!link) return (
      <button disabled className="w-full md:w-auto bg-neutral-100 text-neutral-400 px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
        No Link Provided
      </button>
    );
    
    const isZoom = link.includes('zoom.us');
    const isMeet = link.includes('meet.google.com');
    const isMaps = link.includes('maps') || link.includes('goo.gl/maps');
    
    let text = 'Buka Tautan';
    let icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
    
    if (isZoom) {
      text = 'Join Zoom';
      icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
    } else if (isMeet) {
      text = 'Join Meet';
      icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
    } else if (isMaps) {
      text = 'Buka Maps';
      icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
    }

    return (
      <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#964B13] hover:bg-[#7A3D0F] text-white px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#964B13]/20">
        {icon}
        {text}
      </a>
    );
  };

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
          {sessions.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm">
              <p className="text-neutral-500">Belum ada jadwal yang dijadwalkan untuk Anda.</p>
            </div>
          ) : (
            sessions.map((session) => {
              const status = getStatus(session.date, session.endTime);
              const isWorkshop = session.type === 'Workshop';
              
              let iconSVG = <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect></>;
              if (status === 'completed') {
                iconSVG = <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>;
              } else if (isWorkshop) {
                iconSVG = <><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect></>;
              }
              
              return (
                <div key={session.id} className="bg-white border border-neutral-200 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-4">
                  <div className="flex items-center gap-6 pl-2">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${status === 'completed' ? 'bg-neutral-100 text-neutral-400' : 'bg-[#F4E3D7] text-[#964B13]'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {iconSVG}
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-bold text-base mb-1 ${status === 'completed' ? 'text-neutral-400' : 'text-[#0B2545]'}`}>
                        {session.title}
                      </h3>
                      <div className={`flex items-center gap-4 text-xs font-medium ${status === 'completed' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {formatDate(session.date)} • {session.startTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          {session.instructor?.name || 'Instructor'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pr-2 shrink-0">
                    {status === 'completed' ? (
                      <button disabled className="w-full md:w-auto bg-neutral-100 text-neutral-400 px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Completed
                      </button>
                    ) : (
                      renderLinkButton(session.link)
                    )}
                  </div>
                </div>
              );
            })
          )}
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
