'use client';

import React from 'react';
import Link from 'next/link';

export default function StudentDashboard() {
  const [userName, setUserName] = React.useState('');
  const [activeCourses, setActiveCourses] = React.useState(0);
  const [completedCourses, setCompletedCourses] = React.useState(0);
  const [certificatesCount, setCertificatesCount] = React.useState(0);
  const [recentCourse, setRecentCourse] = React.useState<any>(null);
  
  const [schedules, setSchedules] = React.useState<any[]>([]);
  const [completedEnrollments, setCompletedEnrollments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.name) setUserName(user.name.toUpperCase());
      } catch (e) {
        console.error(e);
      }
    }

    if (token) {
      // Fetch Enrollments
      fetch('/api/enrollments', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const activeList = data.filter((e: any) => !e.isCompleted);
          const completedList = data.filter((e: any) => e.status === 'completed' || e.isCompleted === true);
          setActiveCourses(activeList.length);
          setCompletedCourses(completedList.length);
          setCompletedEnrollments(completedList);
          if (activeList.length > 0) {
            setRecentCourse(activeList[0]);
          }
        }
      })
      .catch(console.error);

      // Fetch Schedules
      fetch('/api/schedules', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSchedules(data);
        }
      })
      .catch(console.error);

      // Fetch Certificates
      fetch('/api/certificates', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCertificatesCount(data.length);
        }
      })
      .catch(console.error);
    }
  }, []);

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full">
      
      {/* Header Row */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2 uppercase">WELCOME BACK{userName ? `, ${userName}` : ''}!</h1>
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
            <h2 className="text-3xl font-black text-[#0B2545]">{activeCourses}</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Active Courses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center text-[#0B2545]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#0B2545]">{completedCourses}</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Completed</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center text-[#0B2545]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15l-3 3-2-2-3 3v-8"></path><circle cx="12" cy="8" r="4"></circle><path d="M16 15l3 3 2-2 3 3v-8"></path></svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#0B2545]">{certificatesCount}</h2>
            <p className="text-xs font-bold text-[#E5832E] uppercase tracking-wider">Certificates</p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      {recentCourse ? (
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-lg font-black text-[#0B2545] uppercase tracking-wide">{recentCourse.Program?.title || 'Active Course'}</h3>
            <span className="mt-2 md:mt-0 px-3 py-1 bg-neutral-200 text-neutral-700 text-[10px] font-bold rounded uppercase tracking-widest">IN PROGRESS</span>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-[#E5832E] uppercase tracking-widest">Progress</span>
              <span className="text-sm font-black text-[#0B2545]">{recentCourse.progress || 0}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-[#D47225] h-2 rounded-full" style={{ width: `${recentCourse.progress || 0}%` }}></div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href={`/dashboard/my-courses/${recentCourse.programId}/material`} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
              RESUME COURSE / LANJUT BELAJAR
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm mb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <h3 className="text-lg font-black text-[#0B2545] mb-2">Belum Ada Pelatihan Aktif</h3>
          <p className="text-neutral-500 text-sm mb-6 max-w-md">Anda belum memulai pelatihan apa pun. Silakan telusuri katalog kami untuk menemukan program yang sesuai dengan kebutuhan Anda.</p>
          <Link href="/dashboard/catalog" className="bg-[#0B2545] hover:bg-[#13325B] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#0B2545]/20">
            Jelajahi Katalog
          </Link>
        </div>
      )}

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Jadwal Coaching */}
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-[#0B2545] uppercase tracking-wide">JADWAL COACHING & ASESMEN</h3>
            <Link href="/dashboard/schedule" className="text-[#D47225] text-[10px] font-bold uppercase tracking-widest hover:underline">VIEW ALL</Link>
          </div>
          
          <div className="space-y-4">
            {schedules.length > 0 ? schedules.slice(0, 3).map((item, i) => {
              const programName = item.Program?.category ? item.Program.category.split('||')[0].replace(/ Program/gi, '') : 'Program';
              return (
                <div key={i} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg group hover:border-[#D47225] transition-colors cursor-pointer" onClick={() => window.location.href = '/dashboard/schedule'}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F4F7F9] rounded flex items-center justify-center text-[#0B2545]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B2545] mb-1 group-hover:text-[#D47225] transition-colors">{item.topic}</h4>
                      <p className="text-xs text-[#D47225] font-bold">{item.date} • {item.startTime} - {item.endTime}</p>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 group-hover:text-[#D47225]"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              );
            }) : (
              <div className="text-sm text-neutral-500 italic p-4 text-center">Belum ada jadwal coaching.</div>
            )}
          </div>
        </div>

        {/* E-Certificate */}
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-[#0B2545] uppercase tracking-wide">E-CERTIFICATE TERBARU</h3>
            <Link href="/dashboard/certificates" className="text-[#D47225] text-[10px] font-bold uppercase tracking-widest hover:underline">VIEW ALL</Link>
          </div>
          
          <div className="space-y-4">
            {completedEnrollments.length > 0 ? completedEnrollments.slice(0, 3).map((enr, i) => {
              const programName = enr.Program?.category ? enr.Program.category.split('||')[0].replace(/ Program/gi, '') : 'Program';
              return (
                <div key={i} className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg group hover:bg-neutral-100 transition-colors cursor-pointer border border-transparent hover:border-neutral-200" onClick={() => window.location.href = '/dashboard/certificates'}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-200 rounded flex items-center justify-center text-[#0B2545]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B2545] mb-1">Sertifikat {programName}</h4>
                      <p className="text-xs text-[#D47225] font-bold">Lulus Program</p>
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2" className="text-[#D47225]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </div>
              );
            }) : (
              <div className="text-sm text-neutral-500 italic p-4 text-center">Belum ada E-Certificate.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}