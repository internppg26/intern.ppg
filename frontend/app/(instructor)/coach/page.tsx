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
  const [upcomingEvents, setUpcomingEvents] = React.useState<ScheduleEvent[]>([]);
  const [activeClasses, setActiveClasses] = React.useState<number>(0);
  const [pendingGrades, setPendingGrades] = React.useState<number>(0);
  const [pendingExams, setPendingExams] = React.useState<any[]>([]);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      setCurrentUser(user);

      if (!token) return;

      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        // Fetch Schedules
        const schedRes = await fetch('/api/schedules', { headers });
        if (schedRes.ok) {
          const schedData: ScheduleEvent[] = await schedRes.json();
          
          const today = new Date();
          const todayStr = today.toISOString().split('T')[0];
          
          const endDate = new Date(today);
          endDate.setDate(endDate.getDate() + 3);
          const endDateStr = endDate.toISOString().split('T')[0];

          const filteredSched = schedData
            .filter(ev => ev.date >= todayStr && ev.date <= endDateStr)
            .sort((a, b) => {
              if (a.date === b.date) return a.startTime.localeCompare(b.startTime);
              return a.date.localeCompare(b.date);
            });
          setUpcomingEvents(filteredSched);
        }

        // Fetch Programs to count active classes
        const progRes = await fetch('/api/programs?all=true', { headers });
        if (progRes.ok) {
          const progData = await progRes.json();
          const myClasses = progData.filter((p: any) => user && p.instructorId === user.id);
          setActiveClasses(myClasses.length);
        }

        // Fetch Exams to count pending grades
        const examRes = await fetch('/api/exams', { headers });
        if (examRes.ok) {
          const examData = await examRes.json();
          const pending = examData.filter((ex: any) => ex.score === null || ex.passed === null);
          setPendingGrades(pending.length);
          setPendingExams(pending);
        }
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-full relative">
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
              Selamat Datang, {currentUser?.name || 'Coach'}!
            </h1>
            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-md">
              Anda memiliki {upcomingEvents.length} sesi konsultasi terdekat (3 hari ke depan).
            </p>
            {/* <button 
              onClick={() => setIsReportModalOpen(true)}
              className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#D47225]/30"
            >
              Lihat Laporan Mingguan
            </button> */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-[2rem] p-6 border border-neutral-200 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">TERDEKAT</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0B2545] leading-none mb-1">{upcomingEvents.length}</h2>
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
              <h2 className="text-3xl font-black text-[#0B2545] leading-none mb-1">{activeClasses}</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">ACTIVE CLASSES</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
          
          {/* Schedule List */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#0B2545]">Jadwal Terdekat</h2>
              <Link href="/coach/schedule" className="text-sm font-bold text-neutral-600 hover:text-[#0B2545]">Lihat Kalender</Link>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[60px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-neutral-200">
              
              {upcomingEvents.map(ev => {
                const hour = parseInt(ev.startTime.split(':')[0], 10);
                const isAm = hour < 12;
                const isWorkshop = ev.type === 'Workshop';

                return (
                  <div key={ev.id} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-6 relative z-10">
                    <div className="w-16 text-center shrink-0">
                      <div className="text-[10px] font-bold text-neutral-400 mb-1">{ev.date}</div>
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

              {upcomingEvents.length === 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm relative z-10 text-center">
                  <p className="text-sm text-neutral-500 py-4">Tidak ada jadwal terdekat (3 hari ke depan).</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Report Modal (Hidden for now) */}
      {/* {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden relative">
            <div className="bg-[#0B2545] p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">Laporan Mingguan</h2>
                <p className="text-xs text-neutral-300">Ringkasan kinerja Anda minggu ini</p>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <span className="text-sm font-bold text-neutral-600">Total Sesi Selesai</span>
                <span className="text-lg font-black text-[#0B2545]">12 Sesi</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <span className="text-sm font-bold text-neutral-600">Tugas Dinilai</span>
                <span className="text-lg font-black text-[#0B2545]">45 Tugas</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <span className="text-sm font-bold text-neutral-600">Rata-rata Rating</span>
                <span className="text-lg font-black text-[#D47225]">4.9 / 5.0</span>
              </div>
              
              <button 
                onClick={() => {
                  alert('Fitur download laporan sedang dalam pengembangan.');
                  setIsReportModalOpen(false);
                }}
                className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-colors mt-4"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )} */}

    </div>
  );
}
