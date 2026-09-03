'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CoachCoursePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/programs?all=true', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        setCurrentUser(user);

        // Filter: only show courses with no instructor OR where this coach is the instructor
        const visible = data.filter((p: any) => p.instructorId === null || (user && p.instructorId === user.id));
        
        setCourses(visible.map((p: any) => {
          let program = 'Program';
          if (p.category && p.category.includes('||')) {
            program = p.category.split('||')[0];
          }
          let safeDesc = p.description || '';
          let customInstructor = '';
          try {
            const parsed = JSON.parse(safeDesc);
            safeDesc = parsed.shortDesc || parsed.about || safeDesc;
            customInstructor = parsed.instructorName || '';
          } catch(e) {}
          
          return {
            id: p.id,
            title: p.title,
            tag: program.replace(/ Program/gi, '').toUpperCase(),
            program: program,
            desc: safeDesc,
            duration: p.duration ? `${p.duration} Days Access` : '30 Days Access',
            instructor: customInstructor || (p.instructor ? p.instructor.name : 'Belum Ada Instruktur'),
            img: p.thumbnail !== '/Logo_Performa_Puncak.png' ? p.thumbnail : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
            isEnrolled: p.instructorId !== null
          };
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollCode, setEnrollCode] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleOpenEnroll = (id: number) => {
    setSelectedCourseId(id);
    setEnrollCode('');
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourseId) {
      try {
        const res = await fetch(`/api/programs/${selectedCourseId}/claim`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          setIsEnrollModalOpen(false);
          fetchCourses();
        } else {
          const errText = await res.text();
          alert(`Gagal mengambil kelas ini (Status: ${res.status}): ${errText}`);
        }
      } catch (err: any) {
        console.error(err);
        alert(`Network Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="text-[10px] md:text-xs font-bold text-neutral-500 uppercase tracking-wide">
          <span className="text-[#0B2545]">PROGRAM</span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-[#0B2545]">{currentUser?.name || 'Coach Pratama'}</div>
            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{currentUser?.role || 'INSTRUKTUR'}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm overflow-hidden">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              (currentUser?.name || 'CP').substring(0, 2).toUpperCase()
            )}
          </div>
        </div>
      </div>

      <div className="p-8 max-w-[1200px] mx-auto w-full">
        {/* Header Title */}
        <h1 className="text-3xl font-black text-[#0B2545] tracking-tight text-center mb-10">Daftar Course</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari program pelatihan..." 
              className="w-full pl-12 pr-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-md text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-md text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-12px)_center] min-w-[160px]"
            >
              <option value="">Filter by Program</option>
              <option value="Corporate Program">Corporate Program</option>
              <option value="Government Program">Government Program</option>
              <option value="Educational Program">Educational Program</option>
              <option value="Certification Program">Certification Program</option>
              <option value="Entrepreneurial Program">Entrepreneurial Program</option>
              <option value="Public & In-House Program">Public &amp; In-House Program</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {(() => {
          const filteredCourses = courses.filter(c => {
            const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesProgram = programFilter === '' || programFilter === 'Filter by Program' ? true : c.program === programFilter;
            return matchesSearch && matchesProgram;
          });

          const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
          
          // Ensure current page is valid after filtering
          const safeCurrentPage = Math.min(currentPage, totalPages);
          if (safeCurrentPage !== currentPage) {
             setCurrentPage(safeCurrentPage);
          }

          const paginatedCourses = filteredCourses.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow flex flex-col p-6">
                    
                    <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/2.5] relative">
                      <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#0B2545] text-white text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-widest shadow-sm">
                          {course.program.replace(' Program', '').replace(' & In-House', '')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-[#FFF8F3] text-[#D47225] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        {course.tag}
                      </span>
                      <h3 className="font-black text-[#0B2545] text-lg leading-tight mb-2 uppercase">{course.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">{course.desc}</p>
                    </div>

                    <div className="space-y-2 mb-6 mt-auto">
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        {course.instructor}
                      </div>
                    </div>

                    {/* Dynamic Buttons based on isEnrolled */}
                    {course.isEnrolled ? (
                      <div className="space-y-3">
                        <Link href={`/coach-course/${course.id}/material`} className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                          Material Course &rarr;
                        </Link>
                        <Link href={`/coach/course/${course.id}`} className="w-full bg-[#D47225] hover:bg-[#B55D1A] text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                          Detail Course &rarr;
                        </Link>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleOpenEnroll(course.id)}
                        className="w-full bg-[#D47225] hover:bg-[#B55D1A] text-white py-3 mt-auto rounded-full text-sm font-bold flex items-center justify-center transition-colors shadow-lg shadow-[#D47225]/20"
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-10">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={safeCurrentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${
                        safeCurrentPage === i + 1 
                          ? 'bg-[#0B2545] text-white shadow-md' 
                          : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={safeCurrentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Enroll Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-[#0B2545]">
            <div className="p-8">
              <h2 className="text-xl font-medium text-center text-black mb-8">Klaim Course</h2>
              
              <form onSubmit={handleEnrollSubmit}>
                <div className="mb-8">
                  <p className="text-sm text-neutral-600 mb-4 text-center">
                    Apakah Anda yakin ingin mengklaim (mengambil alih) kelas ini sebagai Instruktur?
                  </p>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-3 rounded text-sm font-bold transition-colors shadow-lg"
                >
                  Ya, Klaim Kelas Ini
                </button>
              </form>
            </div>
            
            {/* Optional Close button, using standard UI pattern though not visible in simple mockup */}
            <button 
              onClick={() => setIsEnrollModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
