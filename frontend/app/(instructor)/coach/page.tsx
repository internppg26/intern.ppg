'use client';

import React from 'react';
import Link from 'next/link';

type ScheduleEvent = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  link?: string;
  notes?: string;
};

export default function CoachDashboardPage() {
  const [todayEvents, setTodayEvents] = React.useState<ScheduleEvent[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('coach_schedule_events');
    if (saved) {
      try {
        const parsed: ScheduleEvent[] = JSON.parse(saved);
        const todayStr = new Date().toISOString().split('T')[0];
        const filtered = parsed
          .filter(ev => ev.date === todayStr)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
        setTodayEvents(filtered);
      } catch (e) {
        console.error("Failed to parse events", e);
      }
    } else {
      // Mock if nothing in local storage yet
      const todayStr = new Date().toISOString().split('T')[0];
      setTodayEvents([
        { id: '1', title: '1-on-1 Mentoring - Budi Utomo', date: todayStr, startTime: '09:00', endTime: '10:00', type: 'Mentoring' },
        { id: '2', title: 'Workshop: Effective Comm.', date: todayStr, startTime: '13:30', endTime: '15:30', type: 'Workshop' }
      ]);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar / Search */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-full max-w-xl">
          
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
        {/* Welcome Banner */}
        <div className="bg-[#0B2545] rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative mb-8 shadow-xl">
          <div className="relative z-10 md:w-3/5 text-white">
            <h1 className="text-4xl font-black mb-4 tracking-tight leading-tight">
              Selamat Datang, Coach<br />Pratama!
            </h1>
            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-md">
              Anda memiliki {todayEvents.length} sesi konsultasi hari ini dan 15 penilaian yang menunggu tinjauan Anda. Mari kita bentuk pemimpin masa depan bersama.
            </p>
            <button className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#D47225]/30">
              Lihat Laporan Mingguan
            </button>
          </div>
          
          {/* Decorative elements for the right side mimicking the image */}
          <div className="md:w-2/5 mt-8 md:mt-0 relative z-10 flex justify-end">
            <div className="w-[300px] h-[200px] bg-white rounded-2xl p-4 shadow-2xl rotate-3 opacity-90 relative overflow-hidden">
               <div className="w-full h-8 bg-neutral-100 rounded-lg mb-3"></div>
               <div className="w-2/3 h-4 bg-neutral-100 rounded mb-6"></div>
               <div className="flex gap-2 mb-4">
                 <div className="flex-1 h-16 bg-[#0B2545]/10 rounded-lg"></div>
                 <div className="flex-1 h-16 bg-[#0B2545]/10 rounded-lg"></div>
               </div>
               <div className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-[2rem] p-6 border border-neutral-200 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">HARI INI</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0B2545] leading-none mb-1">{todayEvents.length}</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">UPCOMING SESSIONS</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-neutral-200 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#D47225] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">BERJALAN</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0B2545] leading-none mb-1">2</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">ACTIVE CLASSES</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-neutral-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">BUTUH TINDAKAN</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-red-600 leading-none mb-1">15</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">PENDING GRADES</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Schedule List */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#0B2545]">Jadwal Hari Ini</h2>
              <Link href="/coach/schedule" className="text-sm font-bold text-neutral-600 hover:text-[#0B2545]">Lihat Kalender</Link>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[60px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-neutral-200">
              
              {todayEvents.map(ev => {
                const hour = parseInt(ev.startTime.split(':')[0], 10);
                const isAm = hour < 12;
                const isWorkshop = ev.type === 'Workshop';

                return (
                  <div key={ev.id} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-6 relative z-10">
                    <div className="w-16 text-center shrink-0">
                      <div className="text-lg font-black text-[#0B2545]">{ev.startTime}</div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase">{isAm ? 'PAGI' : 'SIANG'}</div>
                    </div>
                    <div className="w-px h-12 bg-neutral-200 shrink-0 hidden md:block"></div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-[#0B2545] text-sm mb-1">{ev.title}</h4>
                      <p className="text-xs text-neutral-500">{ev.notes || ev.type}</p>
                    </div>
                    {!isWorkshop ? (
                      <button className="shrink-0 bg-[#0B2545] hover:bg-[#13325B] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line></svg>
                        Join Meet
                      </button>
                    ) : (
                      <span className="shrink-0 bg-neutral-100 text-neutral-500 px-5 py-2.5 rounded-full text-xs font-bold">
                        Belum Dimulai
                      </span>
                    )}
                  </div>
                );
              })}

              {todayEvents.length === 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm relative z-10 text-center">
                  <p className="text-sm text-neutral-500 py-4">Tidak ada jadwal untuk hari ini.</p>
                </div>
              )}

            </div>
          </div>

          {/* Pending Tasks */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#0B2545]">Tugas Tertunda</h2>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">15 Urgent</span>
            </div>
            
            <div className="space-y-4">
              {/* Task 1 */}
              <div className="bg-[#FFF8F3] border border-[#F4E3D7] rounded-2xl p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2545] text-sm mb-1">Grade Leadership Assessment</h4>
                    <p className="text-xs text-neutral-500">Submitted by 12 Students &bull; Due Today</p>
                  </div>
                </div>
                <button className="bg-[#964B13] hover:bg-[#72360B] text-white px-5 py-2 rounded-full text-xs font-bold transition-colors shadow-sm">
                  Review
                </button>
              </div>

              {/* Task 2 */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2545] text-sm mb-1">Student Feedback Needed</h4>
                    <p className="text-xs text-neutral-500">Mentoring Session #42 - Ani S.</p>
                  </div>
                </div>
                <button className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-5 py-1.5 rounded-full text-xs font-bold transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
