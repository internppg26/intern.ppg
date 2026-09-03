'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/enrollments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setCourses(data);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const [activeTab, setActiveTab] = useState('Sedang Berjalan');

  const ongoingCourses = courses.filter(c => c.status === 'Sedang Berjalan');
  const completedCourses = courses.filter(c => c.status === 'Selesai');

  const displayedCourses = activeTab === 'Sedang Berjalan' ? ongoingCourses : completedCourses;

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <span>LMS</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Pelatihan Saya</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2">Pelatihan Saya</h1>
          <p className="text-neutral-600 text-sm">Lanjutkan pembelajaran dan pantau progres kompetensi Anda.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 mb-10 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('Sedang Berjalan')}
            className={`px-6 py-3 font-bold border-b-2 ${activeTab === 'Sedang Berjalan' ? 'text-[#0B2545] border-[#D47225]' : 'text-neutral-500 border-transparent hover:text-neutral-700'}`}
          >
            Sedang Berjalan ({ongoingCourses.length})
          </button>
          <button 
            onClick={() => setActiveTab('Selesai')}
            className={`px-6 py-3 font-bold border-b-2 ${activeTab === 'Selesai' ? 'text-[#0B2545] border-[#D47225]' : 'text-neutral-500 border-transparent hover:text-neutral-700'}`}
          >
            Selesai ({completedCourses.length})
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div>Loading...</div>
          ) : displayedCourses.map((enrollment) => {
            const course = enrollment.Program;
            if (!course) return null;
            const category = course.category ? course.category.split('||')[0].replace(/ Program/gi, '') : 'PROGRAM';
            const isVerified = enrollment.paymentStatus === 'verified';
            const isPending = enrollment.paymentStatus === 'pending';
            
            return (
              <div key={enrollment.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow flex flex-col p-4">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-neutral-100">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" alt={course.title} className="w-full h-full object-cover mix-blend-multiply" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="bg-[#0B2545] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest shadow-sm">
                      {category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-[#0B2545] text-lg mb-6 leading-tight flex-grow">{course.title}</h3>
                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2 text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-neutral-500">PROGRES</span>
                      <span className="text-[#0B2545]">{enrollment.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-[#F4E3D7] rounded-full h-2">
                      <div className="bg-[#D47225] h-2 rounded-full" style={{ width: `${enrollment.progress || 0}%` }}></div>
                    </div>
                  </div>
                  
                  {isVerified ? (
                    <Link href={`/dashboard/my-courses/${course.id}/material`} className="block w-full bg-[#0B2545] hover:bg-[#13325B] text-white text-center py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      Lanjutkan Belajar
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ) : isPending ? (
                    <div className="block w-full bg-neutral-200 text-neutral-500 text-center py-3 rounded-xl text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2">
                      Menunggu Verifikasi Admin
                    </div>
                  ) : (
                    <div className="block w-full bg-red-100 text-red-600 text-center py-3 rounded-xl text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2">
                      Pembayaran Ditolak
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gradient-to-br from-[#0B2545] to-[#13325B] rounded-2xl p-8 text-white md:col-span-1 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D47225]/20 rounded-full blur-2xl"></div>
            <h4 className="text-[10px] font-bold text-[#D47225] uppercase tracking-widest mb-2 relative z-10">AKTIVITAS MINGGU INI</h4>
            <p className="text-sm text-white/80 mb-6 relative z-10">Kamu telah belajar selama 12 jam.</p>
            <div className="flex gap-4 relative z-10">
              <div className="bg-white/10 rounded-full w-16 h-16 flex flex-col items-center justify-center border border-white/20">
                <span className="font-black text-xl leading-none">12</span>
                <span className="text-[10px]">Jam</span>
              </div>
              <div className="bg-white/10 rounded-full w-16 h-16 flex flex-col items-center justify-center border border-white/20">
                <span className="font-black text-xl leading-none">4</span>
                <span className="text-[10px]">Modul</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF8F3] flex items-center justify-center text-[#D47225]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 0-4 4-4 9a4 4 0 0 0 8 0c0-5-4-9-4-9z"></path></svg>
            </div>
            <div>
              <div className="font-black text-3xl text-[#0B2545]">5 Hari</div>
              <div className="text-sm text-neutral-500">Belajar Beruntun</div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF8F3] flex items-center justify-center text-[#D47225]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div>
              <div className="font-black text-3xl text-[#0B2545]">850</div>
              <div className="text-sm text-neutral-500">Poin XP</div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 flex justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0B2545]">Syarat Layanan</Link>
            <Link href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0B2545]">Pusat Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
