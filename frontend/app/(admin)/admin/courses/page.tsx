'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_PROGRAMS = [
  { id: 1, title: 'CORPORATE PROGRAM', desc: 'Program pendampingan komprehensif untuk perusahaan guna mencapai High Performance Business dan Ultimate Performance melalui penciptaan Super Team dan kepemimpinan yang strategis.', count: 120, image: null },
  { id: 2, title: 'GOVERNMENT PROGRAM', desc: 'Solusi pengembangan kompetensi dan manajemen kinerja SDM untuk instansi pemerintah. Dirancang khusus untuk mendukung peningkatan efisiensi birokrasi dan kualitas pelayanan publik.', count: 120, image: null },
  { id: 3, title: 'EDUCATIONAL PROGRAM', desc: 'Program pengembangan kapasitas berkelanjutan bagi institusi pendidikan, tenaga pendidik, dan civitas akademika untuk menciptakan ekosistem belajar yang berkualitas.', count: 120, image: null },
  { id: 4, title: 'CERTIFICATION PROGRAM', desc: 'Program standarisasi dan pengakuan kompetensi profesi melalui serangkaian pelatihan dan asesmen yang ketat, mengacu pada standar industri yang diakui secara resmi.', count: 120, image: null },
  { id: 5, title: 'ENTREPRENEURIAL PROGRAM', desc: 'Program khusus untuk mengembangkan mental, keterampilan, dan wawasan kewirausahaan. Memberdayakan individu untuk membangun dan mengakselerasi bisnis berkinerja tinggi.', count: 120, image: null },
  { id: 6, title: 'PUBLIC TRAINING & IN-HOUSE PROGRAM', desc: 'Fleksibilitas metode belajar melalui seminar terbuka untuk masyarakat umum lintas sektor, maupun pelatihan eksklusif yang dikustomisasi khusus untuk internal organisasi mitra.', count: 120, image: null },
];

export default function AdminCoursesPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin_programs');
    if (saved) {
      try {
        setPrograms(JSON.parse(saved));
      } catch (e) {
        setPrograms(DEFAULT_PROGRAMS);
      }
    } else {
      setPrograms(DEFAULT_PROGRAMS);
    }
    setIsLoaded(true);
  }, []);

  const updatePrograms = (newPrograms: any[]) => {
    setPrograms(newPrograms);
    localStorage.setItem('admin_programs', JSON.stringify(newPrograms));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProgram, setCurrentProgram] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentProgram({ title: '', desc: '', count: 120, image: null });
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (prog: any) => {
    setModalMode('edit');
    setCurrentProgram({ ...prog });
    setPreviewImage(prog.image || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProgram(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setCurrentProgram({ ...currentProgram, image: imageUrl });
    }
  };

  const handleSave = () => {
    if (!currentProgram?.title || !currentProgram?.desc) {
      alert("Harap lengkapi Nama Program dan Deskripsi!");
      return;
    }

    if (modalMode === 'add') {
      const newProg = { 
        ...currentProgram, 
        id: Date.now() 
      };
      updatePrograms([newProg, ...programs]);
    } else {
      updatePrograms(programs.map(p => p.id === currentProgram.id ? currentProgram : p));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      updatePrograms(programs.filter(p => p.id !== currentProgram.id));
      handleCloseModal();
    }
  };

  if (!isLoaded) {
    return <div className="flex-1 bg-[#F9FAFC]"></div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F9FAFC] relative">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h1 className="font-bold text-sm text-[#0B2545]">Program</h1>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Cari Pelatihan" 
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
      <div className="flex-1 overflow-y-auto p-8 lg:px-12 font-sans">
        
        <div className="relative flex justify-center items-center mb-12">
          <h2 className="text-4xl font-black text-[#0B2545] tracking-tight">Program</h2>
          <button 
            onClick={handleAddClick}
            className="absolute right-0 bg-[#E5832E] hover:bg-[#D47225] text-white px-8 py-3 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Program
          </button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((prog) => (
            <div key={prog.id} className="group bg-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200/60 flex flex-col">
              <div className="h-48 bg-neutral-200 relative p-4">
                <div className="w-full h-full rounded-xl bg-neutral-300 overflow-hidden flex items-center justify-center relative group-hover:brightness-95 transition-all">
                  {prog.image ? (
                    <img src={prog.image} alt={prog.title} className="object-cover w-full h-full" />
                  ) : (
                    <>
                      <img src="/Logo_Performa_Puncak.png" alt="Training" className="object-cover w-full h-full opacity-50 blur-sm mix-blend-multiply" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                      </div>
                    </>
                  )}
                  
                  {/* Direct Delete Button (X) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Apakah Anda yakin ingin menghapus program ini?")) {
                        updatePrograms(programs.filter(p => p.id !== prog.id));
                      }
                    }}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20"
                    title="Hapus Program"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-[#0B2545] mb-3">{prog.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-6 flex-1 whitespace-pre-wrap">
                  {prog.desc}
                </p>
                
                <div className="flex items-center justify-end pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-[#E5832E] font-bold text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    {prog.count} pelatihan
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditClick(prog)}
                      className="px-4 py-1.5 rounded text-xs font-bold text-[#E5832E] border border-[#E5832E] hover:bg-[#FFF4EB] transition-colors"
                    >
                      Edit
                    </button>
                    <Link 
                      href={`/admin/courses/${prog.id}`}
                      className="px-4 py-1.5 rounded text-xs font-bold text-white bg-[#E5832E] hover:bg-[#D47225] transition-colors"
                    >
                      Buka
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-transparent">
              <div className="flex items-center gap-4 text-[#0B2545]">
                <button className="hover:bg-neutral-100 p-1.5 rounded transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></button>
                <button className="hover:bg-neutral-100 p-1.5 rounded transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg></button>
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] absolute left-1/2 -translate-x-1/2">
                Isi Informasi Program
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors border border-red-500"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-10 py-6 overflow-y-auto max-h-[70vh] space-y-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0B2545]">Nama Program</label>
                <input 
                  type="text" 
                  value={currentProgram?.title || ''}
                  onChange={(e) => setCurrentProgram({...currentProgram, title: e.target.value})}
                  placeholder="Isi nama program"
                  className="w-full border border-neutral-300 focus:border-[#0B2545] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0B2545]">Deskripsi</label>
                <textarea 
                  value={currentProgram?.desc || ''}
                  onChange={(e) => setCurrentProgram({...currentProgram, desc: e.target.value})}
                  placeholder="Isi deskripsi program"
                  rows={4}
                  className="w-full border border-neutral-300 focus:border-[#0B2545] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0B2545]">Unggah Gambar/Foto</label>
                <div className="relative border-2 border-dashed border-[#0B2545] rounded-xl overflow-hidden group hover:bg-neutral-50 transition-colors h-48 flex flex-col items-center justify-center cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  />
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-[#0B2545] flex flex-col items-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline><line x1="12" y1="12" x2="12" y2="18"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white font-bold py-3.5 rounded-md transition-colors"
                >
                  Simpan
                </button>
                {modalMode === 'edit' && (
                  <button 
                    onClick={handleDelete}
                    className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-600 font-bold py-3.5 rounded-md transition-colors"
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
