'use client';

import { uploadToSupabase } from '../../../../../../utils/supabaseUpload';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

function ListCourseContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bidangName = searchParams?.get('name') || 'Nama Bidang Tidak Diketahui';

  const DUMMY_COURSES = [
    {
      id: 1,
      title: 'ADVANCED LEADERSHIP STRATEGY',
      desc: 'Elevate your executive capabilities with data-driven strategic planning and human-centric...',
      badge: 'STRATEGY',
      duration: '30 Days Access',
      facilitator: 'Dr. Jajang Sutarman',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
    {
      id: 2,
      title: 'DIGITAL TRANSFORMATION FOR SMBS',
      desc: 'Practical roadmap for small businesses to scale using modern cloud infrastructure and AI tools.',
      badge: 'DIGITAL',
      duration: '30 Days Access',
      facilitator: 'Dr. Jajang Sutarman',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
    {
      id: 3,
      title: 'PUBLIC POLICY CERTIFICATION',
      desc: 'Understanding modern governance, ethics, and policy analysis for the 21st-century public servant.',
      badge: 'POLICY',
      duration: '30 Days Access',
      facilitator: 'Dr. Jajang Sutarman',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
    {
      id: 4,
      title: 'AGILE MANAGEMENT WORKSHOP',
      desc: 'Advanced professional training designed to help you master modern industry standards and excel',
      badge: 'PROFESSIONAL',
      duration: 'Flexible Duration',
      facilitator: 'Expert Facilitator',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
    {
      id: 5,
      title: 'SUSTAINABILITY IN TECH',
      desc: 'Advanced professional training designed to help you master modern industry standards and excel',
      badge: 'PROFESSIONAL',
      duration: 'Flexible Duration',
      facilitator: 'Expert Facilitator',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
    {
      id: 6,
      title: 'GLOBAL MARKETING ESSENTIALS',
      desc: 'Advanced professional training designed to help you master modern industry standards and excel',
      badge: 'PROFESSIONAL',
      duration: 'Flexible Duration',
      facilitator: 'Expert Facilitator',
      actions: ['Material Course', 'Detail Course', 'Edit'],
      image: '',
    },
  ];

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(courses.length / itemsPerPage) || 1;
  const paginatedCourses = courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Parse parent program name from localStorage for the API category tag
  const getParentProgramName = () => {
    const saved = localStorage.getItem('admin_programs');
    if (saved) {
      try {
        const progs = JSON.parse(saved);
        const p = progs.find((x: any) => x.id.toString() === params?.id);
        if (p) return p.title;
      } catch (e) {}
    }
    return 'Corporate Program'; // fallback
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/programs?all=true', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter((p: any) => p.category && p.category.includes(bidangName));
        setCourses(filtered.map((p: any) => {
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
          desc: safeDesc,
          badge: getParentProgramName().replace(/ Program/gi, '').toUpperCase(),
          duration: p.duration ? `${p.duration} Days Access` : '30 Days Access',
          facilitator: customInstructor || (p.instructor ? p.instructor.name : 'Belum Ada Instruktur'),
          actions: ['Material Course', 'Detail Course', 'Edit'],
          image: p.thumbnail !== '/Logo_Performa_Puncak.png' ? p.thumbnail : '',
          };
        }));
      }
    } catch (e) {
      console.error('Failed to fetch courses:', e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!params?.bidangId) return;
    fetchCourses();
  }, [params?.bidangId, bidangName]);

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentCourse({
      title: '',
      desc: '',
      duration: '30',
      facilitator: '',
      image: '',
      badge: 'PROFESSIONAL',
      actions: ['Material Course', 'Detail Course', 'Edit']
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (course: any) => {
    setModalMode('edit');
    setCurrentCourse({ ...course });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCourse({ ...currentCourse, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!currentCourse?.title || !currentCourse?.desc) {
      alert("Harap lengkapi Nama Course dan Deskripsi!");
      return;
    }

    const payload = {
      title: currentCourse.title,
      description: currentCourse.desc,
      category: `${getParentProgramName()}||${bidangName}`,
      duration: parseInt(currentCourse.duration) || 30,
      price: 0,
      thumbnail: currentCourse.image || '/Logo_Performa_Puncak.png'
    };

    try {
      let res;
      if (modalMode === 'add') {
        res = await fetch('/api/programs', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/programs/${currentCourse.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        fetchCourses();
        handleCloseModal();
      } else {
        const errText = await res.text();
        alert(`Gagal menyimpan course: ${res.status} ${errText}`);
      }
    } catch (e: any) {
      console.error('Save error', e);
      alert('Network/Save error: ' + e.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus course ini?")) {
      try {
        const res = await fetch(`/api/programs/${currentCourse.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          fetchCourses();
          handleCloseModal();
        }
      } catch (e) {
        console.error('Delete error', e);
      }
    }
  };

  if (!isLoaded) return <div className="flex-1 bg-[#F9FAFC]"></div>;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F9FAFC] relative">
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 text-sm text-[#0B2545] truncate mr-4">
          <Link href="/admin/courses" className="text-neutral-500 hover:text-[#0B2545] transition-colors shrink-0">Program</Link>
          <span className="text-neutral-400 shrink-0">&gt;</span>
          <Link href={`/admin/courses/${params?.id}`} className="text-neutral-500 hover:text-[#0B2545] transition-colors shrink-0">...</Link>
          <span className="text-neutral-400 shrink-0">&gt;</span>
          <span className="font-bold truncate">Daftar Course Bidang {bidangName}</span>
        </div>
        
        <div className="flex items-center gap-6 shrink-0">
          <div className="relative hidden md:block">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Cari Course" 
              className="pl-4 pr-10 py-2 border border-neutral-300 rounded-full text-xs w-64 focus:outline-none focus:border-[#0B2545]" 
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#0B2545]">Super Admin</div>
              <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SYSTEM AUTHORITY</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm shrink-0">
              SA
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:px-12 font-sans pb-16">
        
        <div className="relative flex justify-center items-center mb-16 mt-8">
          <h2 className="text-4xl font-black text-[#0B2545] tracking-tight text-center leading-tight px-12">
            Daftar Course Bidang<br />{bidangName}
          </h2>
          <button 
            onClick={handleAddClick}
            className="absolute right-0 bg-[#E5832E] hover:bg-[#D47225] text-white px-8 py-3 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paginatedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all border border-neutral-100 flex flex-col p-4 relative group">
              {/* Direct Delete Button (Hover) */}
              <button 
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Apakah Anda yakin ingin menghapus course ini?")) {
                    try {
                      const res = await fetch(`/api/programs/${course.id}`, {
                        method: 'DELETE',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      });
                      if (res.ok) {
                        fetchCourses();
                      }
                    } catch (err) {}
                  }
                }}
                className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20"
                title="Hapus Course"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* Card Image */}
              <div className="h-40 w-full rounded-2xl bg-neutral-800 relative overflow-hidden mb-5">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="object-cover w-full h-full" />
                ) : (
                  <img src="/Logo_Performa_Puncak.png" alt="" className="object-cover w-full h-full opacity-20 blur-sm mix-blend-multiply" />
                )}
              </div>
              
              <div className="px-2 flex-1 flex flex-col">
                <div className="inline-block bg-[#FFF4EB] text-[#E5832E] text-[10px] font-extrabold px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">
                  {course.badge || 'COURSE'}
                </div>
                
                <h3 className="text-[15px] font-black text-[#0B2545] mb-2 leading-snug">{course.title}</h3>
                
                <p className="text-[11px] text-neutral-500 leading-relaxed mb-6 flex-1">
                  {course.desc}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#E5832E] font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {course.duration || 'Flexible Duration'}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#E5832E] font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {course.facilitator || 'Expert Facilitator'}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  {course.actions?.includes('Material Course') && (
                    <Link href={`/admin-course/${params?.id}/${params?.bidangId}/${course.id}/material?name=${encodeURIComponent(bidangName)}`} className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-2.5 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-1">
                      Material Course <span className="text-[14px]">→</span>
                    </Link>
                  )}
                  {course.actions?.includes('Detail Course') && (
                    <Link href={`/admin/courses/${params?.id}/${params?.bidangId}/${course.id}?name=${encodeURIComponent(bidangName)}`} className="w-full bg-[#E5832E] hover:bg-[#D47225] text-white py-2.5 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-1">
                      Detail Course <span className="text-[14px]">→</span>
                    </Link>
                  )}
                  {course.actions?.includes('Buka') && (
                    <Link href={`/admin/courses/${params?.id}/${params?.bidangId}/${course.id}?name=${encodeURIComponent(bidangName)}`} className="w-full bg-[#E5832E] hover:bg-[#D47225] text-white py-2.5 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-1">
                      Buka <span className="text-[14px]">→</span>
                    </Link>
                  )}
                  {course.actions?.includes('Edit') && (
                    <button 
                      onClick={() => handleEditClick(course)}
                      className="w-full border border-[#E5832E] text-[#E5832E] hover:bg-[#FFF4EB] py-2.5 rounded-full text-xs font-bold transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12 pb-8">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:bg-neutral-50'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${currentPage === page ? 'bg-[#0B2545] text-white' : 'border border-neutral-300 text-[#0B2545] hover:bg-neutral-50'}`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:bg-neutral-50'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 my-4 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-2 flex justify-between items-center shrink-0">
              <div className="flex gap-4 text-[#0B2545]">
                <button className="hover:bg-neutral-100 p-1 rounded transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                </button>
                <button className="hover:bg-neutral-100 p-1 rounded transition-colors opacity-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
                </button>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors border border-red-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-10 pb-8 overflow-y-auto space-y-5">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B2545]">Nama Course</label>
                <input 
                  type="text" 
                  value={currentCourse?.title || ''}
                  onChange={(e) => setCurrentCourse({...currentCourse, title: e.target.value})}
                  placeholder="Isi nama course"
                  className="w-full border border-[#0B2545] rounded-md px-3 py-2.5 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B2545]">Deskripsi Singkat</label>
                <textarea 
                  value={currentCourse?.desc || ''}
                  onChange={(e) => setCurrentCourse({...currentCourse, desc: e.target.value})}
                  placeholder="Isi deskripsi course"
                  rows={4}
                  className="w-full border border-[#0B2545] rounded-md px-3 py-2.5 text-sm text-[#0B2545] outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B2545]">Durasi Akses (Hari)</label>
                <input 
                  type="text" 
                  value={currentCourse?.duration || ''}
                  onChange={(e) => setCurrentCourse({...currentCourse, duration: e.target.value})}
                  placeholder="Contoh: 30"
                  className="w-full border border-[#0B2545] rounded-md px-3 py-2.5 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B2545]">Nama Instruktur</label>
                <input 
                  type="text" 
                  value={currentCourse?.facilitator || 'Menunggu Klaim dari Coach'}
                  readOnly
                  disabled
                  className="w-full border border-neutral-300 bg-neutral-100 rounded-md px-3 py-2.5 text-sm text-neutral-500 outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B2545]">Unggah Gambar/Foto</label>
                <div 
                  className="w-full h-32 border-2 border-dashed border-[#0B2545] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors relative overflow-hidden group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {currentCourse?.image ? (
                    <>
                      <img src={currentCourse.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Ganti Gambar</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-[#0B2545] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className="text-xs text-[#0B2545] font-semibold">Klik untuk unggah</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white text-sm font-bold py-3 rounded-md transition-colors"
                >
                  Simpan
                </button>
                {modalMode === 'edit' && (
                  <button 
                    onClick={handleDelete}
                    className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-500 text-sm font-bold py-3 rounded-md transition-colors"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ListCoursePage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#F9FAFC] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B2545]"></div></div>}>
      <ListCourseContent />
    </Suspense>
  );
}
