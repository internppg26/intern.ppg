'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  // --- States ---
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [videoCount, setVideoCount] = useState(0);
  const [pdfCount, setPdfCount] = useState(0);
  
  // Data States
  const [about, setAbout] = useState('');
  const [price, setPrice] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [instructorRole, setInstructorRole] = useState('');
  const [instructorImage, setInstructorImage] = useState<string | null>(null);
  const [learnItems, setLearnItems] = useState<{title: string, desc: string}[]>([]);
  const [chapters, setChapters] = useState<{
    id: number, 
    title: string, 
    isExpanded: boolean, 
    subChapters: any[]
  }[]>([]);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setCurrentUser(JSON.parse(userStr));
    
    // Fetch course details
    fetch(`/api/programs/${params?.id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert("Program tidak ditemukan!");
        return;
      }
      setCourseTitle(data.title);
      if (data.category) {
        let progName = data.category.split('||')[0].replace(/ Program/gi, '');
        setCourseProgramName(progName);
      }
      if (data.description) {
        try {
          const parsed = JSON.parse(data.description);
          setAbout(parsed.about || '');
          setPrice(parsed.price || '');
          setInstructorName(parsed.instructorName || '');
          setInstructorRole(parsed.instructorRole || '');
          setInstructorImage(parsed.instructorImage || null);
          setLearnItems(parsed.learnItems || []);
          
          if (Array.isArray(parsed.chapters)) {
            setChapters(parsed.chapters);
            
            let videos = 0;
            let pdfs = 0;
            parsed.chapters.forEach((ch: any) => {
              if (Array.isArray(ch.subChapters)) {
                ch.subChapters.forEach((sub: any) => {
                  if (Array.isArray(sub.blocks)) {
                    sub.blocks.forEach((blk: any) => {
                      if (blk.type === 'video' || (blk.type === 'embed' && (blk.content.includes('youtube') || blk.content.includes('video')))) {
                        videos++;
                      } else if (blk.type === 'file' || blk.type === 'pdf' || (blk.type === 'embed' && blk.content.includes('drive'))) {
                        pdfs++;
                      }
                    });
                  }
                });
              }
            });
            setVideoCount(videos);
            setPdfCount(pdfs);
          }
        } catch (e) {
          setAbout(data.description);
        }
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));

    // Fetch enrollment status
    fetch('/api/enrollments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const enr = data.find((e: any) => e.programId === Number(params?.id));
        setEnrollment(enr || null);
      }
      setLoadingEnrollment(false);
    })
    .catch(() => setLoadingEnrollment(false));
  }, [params?.id]);

  const toggleChapter = (chapterId: number) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, isExpanded: !ch.isExpanded } : ch));
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Top Bar */}
      <div className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="text-[10px] md:text-xs font-bold text-neutral-500 truncate mr-4">
          <Link href="/dashboard/catalog" className="hover:text-[#D47225] transition-colors shrink-0">Katalog Pelatihan</Link> <span className="mx-2">&rsaquo;</span> <span className="hover:text-[#D47225] transition-colors shrink-0">{courseProgramName.toUpperCase()}</span> <span className="text-[#0B2545] font-black ml-1 truncate">&gt; Course {courseTitle}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-[#0B2545]">{currentUser?.name || 'Loading...'}</div>
            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{currentUser?.role || 'PESERTA'}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              (currentUser?.name || 'P').substring(0, 2).toUpperCase()
            )}
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-[1400px] mx-auto w-full mt-8">
        {/* Hero Section */}
        <div className="bg-[#0B2545] rounded-3xl p-10 flex flex-col lg:flex-row justify-between items-center relative overflow-hidden mb-8 shadow-lg">
          <div className="lg:w-1/2 relative z-10 text-white">
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">{courseTitle}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[#EAF1F8] text-[#0B2545] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                {courseProgramName.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="font-bold">4.8</span>
                <span className="text-white/60">(1.5k Ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className="font-bold">2,450</span>
                <span className="text-white/60">Alumni</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-5/12 mt-8 lg:mt-0 relative z-10">
            <div className="rounded-2xl overflow-hidden border-4 border-[#0B2545] shadow-2xl aspect-video">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Course Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content Info */}
          <div className="w-full lg:w-2/3 space-y-12 mt-8">
            
            {/* ABOUT THIS COURSE */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">ABOUT THIS COURSE</h2>
              </div>
              <div className="text-neutral-600 whitespace-pre-wrap text-sm leading-relaxed border border-neutral-200 rounded-xl p-6 bg-white shadow-sm">
                {about || 'Belum ada deskripsi course.'}
              </div>
            </section>

            {/* WHAT YOU WILL LEARN */}
            {learnItems.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                  <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">WHAT YOU WILL LEARN</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learnItems.map((item, idx) => (
                    <div key={idx} className="bg-[#FFF8F3] rounded-2xl p-6 border border-[#F4E3D7]">
                      <div className="font-black text-[#0B2545] text-lg mb-2 break-words">{item.title}</div>
                      <div className="text-xs text-neutral-600 leading-relaxed break-words">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* COURSE TIMELINE & MODULES */}
            {chapters.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                  <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">COURSE TIMELINE & MODULES</h2>
                </div>
                
                <div className="space-y-3">
                  {chapters.map((ch, idx) => (
                    <div key={ch.id} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <div 
                        className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-50"
                        onClick={() => toggleChapter(ch.id)}
                      >
                        <div className="flex items-center gap-4 w-full">
                          <span className="text-[#964B13] font-black text-lg w-4 text-center">{idx + 1}</span>
                          <span className="font-bold text-[#0B2545] text-sm break-words flex-1">Bab {idx + 1} : {ch.title || 'Tanpa Judul'}</span>
                        </div>
                        <div className="flex items-center shrink-0 ml-4">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${ch.isExpanded ? 'rotate-180' : ''}`}>
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                      
                      {ch.isExpanded && ch.subChapters && ch.subChapters.length > 0 && (
                        <div className="border-t border-neutral-100 bg-neutral-50/50 p-4 space-y-2">
                          {ch.subChapters.map((sub: any, sIdx: number) => (
                            <div key={sub.id || sIdx} className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4 text-sm font-bold text-[#0B2545]">
                              <span className="text-[#964B13] shrink-0">{idx + 1}.{sIdx + 1}</span> 
                              <span className="shrink-0">Sub-bab {sIdx + 1} :</span>
                              <span className="break-words font-medium">{typeof sub === 'string' ? sub : (sub.title || 'Tanpa Judul')}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Panel: Settings */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24 mt-8">
            
            {/* Investment Box */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 text-center">
                INVESTMENT
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="font-bold text-[#0B2545]">Rp</span>
                <span className="text-4xl font-black text-[#0B2545]">
                  {price || 'Gratis'}
                </span>
              </div>

              {!loadingEnrollment && (
                <>
                  {!enrollment ? (
                    <Link href={`/dashboard/checkout/${params?.id}`} className="block w-full bg-[#B55D1A] hover:bg-[#964B13] text-white text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase mb-8 transition-colors shadow-lg shadow-[#B55D1A]/30">
                      ENROLL NOW / DAFTAR SEKARANG
                    </Link>
                  ) : enrollment.paymentStatus === 'verified' ? (
                    <Link href={`/dashboard/my-courses/${params?.id}/material`} className="block w-full bg-[#0B2545] hover:bg-[#13325B] text-white text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase mb-8 transition-colors shadow-lg shadow-[#0B2545]/30 flex items-center justify-center gap-2">
                      LANJUTKAN BELAJAR <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ) : enrollment.paymentStatus === 'pending' ? (
                    <Link href={`/dashboard/payment/${params?.id}/status`} className="block w-full bg-orange-100 text-orange-600 text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase mb-8 transition-colors shadow-sm">
                      MENUNGGU VERIFIKASI
                    </Link>
                  ) : (
                    <Link href={`/dashboard/payment/${params?.id}/status`} className="block w-full bg-red-100 text-red-600 text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase mb-8 transition-colors shadow-sm">
                      PEMBAYARAN DITOLAK
                    </Link>
                  )}
                </>
              )}

              <div className="space-y-4">
                <p className="text-xs font-bold text-[#0B2545]">This Course Includes:</p>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="10 8 16 12 10 16"></polyline></svg>
                  {videoCount} Video
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  {pdfCount} PDF
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  Professional Certificate
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  Full Lifetime Access
                </div>
              </div>
            </div>

            {/* Instructor Box */}
            {(instructorName || instructorImage) && (
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  INSTRUKTUR
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F4E3D7] flex items-center justify-center shrink-0">
                    {instructorImage ? (
                      <img src={instructorImage} alt="Instructor" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-[#D47225] text-xl">{(instructorName || 'I').substring(0,1)}</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-bold text-[#0B2545] mb-1">{instructorName || 'Tanpa Nama'}</div>
                    <div className="text-[10px] font-bold text-[#D47225] uppercase">{instructorRole || 'INSTRUKTUR'}</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
