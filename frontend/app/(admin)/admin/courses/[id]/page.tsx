'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BidangPelatihanPage() {
  const params = useParams();
  
  const DEFAULT_PROGRAMS = [
    { id: 1, title: 'CORPORATE PROGRAM' },
    { id: 2, title: 'GOVERNMENT PROGRAM' },
    { id: 3, title: 'EDUCATIONAL PROGRAM' },
    { id: 4, title: 'INDIVIDUAL PROGRAM' },
    { id: 5, title: 'CUSTOM PROGRAM' },
    { id: 6, title: 'OTHER PROGRAM' },
  ];

  const DEFAULT_CORPORATE_BIDANGS = [
    { id: 1, name: 'Penjualan dan Pemasaran (Sales and Marketing Training)' },
    { id: 2, name: 'Kepemimpinan (Leadership Training)' },
    { id: 3, name: 'Pengelolaan dan Pengembangan Pelatihan (Management Training)' },
    { id: 4, name: 'Kepemimpinan (Leadership Training)' },
    { id: 5, name: 'Kepemimpinan (Leadership Training)' },
    { id: 6, name: 'Kepemimpinan (Leadership Training)' },
    { id: 7, name: 'Kepemimpinan (Leadership Training)' },
  ];

  const DEFAULT_GOVERNMENT_BIDANGS = [
    { id: 1, name: 'Bimtek Pengelolaan Aset, Barang, dan Jasa' },
    { id: 2, name: 'Bimtek Desa' },
    { id: 3, name: 'Bimtek DPRD' },
    { id: 4, name: 'Bimtek Kehumasan' },
    { id: 5, name: 'Bimtek Kepegawaian' },
    { id: 6, name: 'Bimtek Kesehatan' },
    { id: 7, name: 'Bimtek Keuangan' },
    { id: 8, name: 'Bimtek Lingkungan Hidup' },
    { id: 9, name: 'Bimtek Pemerintahan' },
    { id: 10, name: 'Bimtek Perpajakan' },
    { id: 11, name: 'Bimtek Pertanahan' },
    { id: 12, name: 'Bimtek Satpol PP' },
  ];

  const DEFAULT_EDUCATIONAL_BIDANGS = [
    { id: 1, name: 'Pelatihan untuk Pengembangan Guru' },
    { id: 2, name: 'Pelatihan Manajemen Sekolah' },
    { id: 3, name: 'Pelatihan untuk Pengembangan Siswa' },
  ];

  const DEFAULT_CERTIFICATION_BIDANGS = [
    { id: 1, name: 'Skema Sertifikasi Manajemen dan Pengembangan Sumber Daya Manusia' },
    { id: 2, name: 'Skema Sertifikasi Pelatihan' },
    { id: 3, name: 'Skema Sertifikasi Assesor Assement Center' },
    { id: 4, name: 'Skema Sertifikasi Kesehatan dan Keselamatan Kerja (K3)' },
  ];

  const DEFAULT_PUBLIC_BIDANGS = [
    { id: 1, name: 'Self Transformation' },
    { id: 2, name: 'Team Transformation' },
    { id: 3, name: 'Manager Transformation' },
    { id: 4, name: 'Business Supporting Competencies' },
    { id: 5, name: 'Training for Trainer' },
    { id: 6, name: 'High Performance Series' },
    { id: 7, name: 'Counseling Mentoring Coaching Series' },
    { id: 8, name: 'Self Concept and Self Management' },
    { id: 9, name: 'People Skill Training' },
  ];

  const [bidangs, setBidangs] = useState<any[]>([]);
  const [programTitle, setProgramTitle] = useState('Corporate Program');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentBidang, setCurrentBidang] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDefaultBidangs = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('government')) return DEFAULT_GOVERNMENT_BIDANGS;
    if (t.includes('educational')) return DEFAULT_EDUCATIONAL_BIDANGS;
    if (t.includes('certification') || t.includes('sertifikasi')) return DEFAULT_CERTIFICATION_BIDANGS;
    if (t.includes('public') || t.includes('in-house') || t.includes('in house')) return DEFAULT_PUBLIC_BIDANGS;
    return DEFAULT_CORPORATE_BIDANGS;
  };

  useEffect(() => {
    if (!params?.id) return;
    
    // Load program title
    let title = 'Corporate Program';
    const programsStr = localStorage.getItem('admin_programs');
    let programsList = DEFAULT_PROGRAMS;
    
    if (programsStr) {
      try {
        programsList = JSON.parse(programsStr);
      } catch (e) {}
    }
    
    const prog = programsList.find((p: any) => p.id.toString() === params.id);
    if (prog && prog.title) {
      title = prog.title;
    }
    setProgramTitle(title);

    // Load or initialize bidangs
    const saved = localStorage.getItem(`admin_bidangs_${params.id}`);
    if (saved) {
      try {
        setBidangs(JSON.parse(saved));
      } catch (e) {
        setBidangs(getDefaultBidangs(title));
      }
    } else {
      setBidangs(getDefaultBidangs(title));
    }
    setIsLoaded(true);
  }, [params.id]);

  const updateBidangs = (newBidangs: any[]) => {
    setBidangs(newBidangs);
    localStorage.setItem(`admin_bidangs_${params.id}`, JSON.stringify(newBidangs));
  };

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentBidang({ name: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (bidang: any) => {
    setModalMode('edit');
    setCurrentBidang({ ...bidang });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBidang(null);
  };

  const handleSave = () => {
    if (!currentBidang?.name) {
      alert("Harap lengkapi Nama Bidang!");
      return;
    }

    if (modalMode === 'add') {
      const newBidang = { 
        ...currentBidang, 
        id: Date.now() 
      };
      updateBidangs([newBidang, ...bidangs]);
    } else {
      updateBidangs(bidangs.map(b => b.id === currentBidang.id ? currentBidang : b));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bidang ini?")) {
      updateBidangs(bidangs.filter(b => b.id !== currentBidang.id));
      handleCloseModal();
    }
  };

  if (!isLoaded) return <div className="flex-1 bg-[#F9FAFC]"></div>;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F9FAFC] relative">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 text-sm text-[#0B2545]">
          <Link href="/admin/courses" className="text-neutral-500 hover:text-[#0B2545] transition-colors">Program</Link>
          <span className="text-neutral-400">&gt;</span>
          <span className="font-bold">Daftar Bidang Pelatihan {programTitle}</span>
        </div>
        
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
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-12 mt-4 sm:mt-8 relative">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight leading-tight">
              Daftar Pelatihan<br className="hidden sm:block" /> {programTitle}
            </h2>
          </div>
          <button 
            onClick={handleAddClick}
            className="bg-[#E5832E] hover:bg-[#D47225] text-white px-6 sm:px-8 py-3 rounded-full text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 w-full sm:w-auto sm:absolute sm:right-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Pelatihan
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-[#0B2545] font-bold mb-4">Bidang Pelatihan</h3>
          
          <div className="flex flex-col gap-3">
            {bidangs.map((bidang) => (
              <div key={bidang.id} className="bg-white border-2 border-[#0B2545] rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm text-[#0B2545]">{bidang.name}</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleEditClick(bidang)}
                    className="px-6 py-1.5 rounded text-sm text-[#0B2545] border border-[#0B2545] hover:bg-neutral-50 transition-colors"
                  >
                    Edit
                  </button>
                  <Link 
                    href={`/admin/courses/${params.id}/${bidang.id}?name=${encodeURIComponent(bidang.name)}`}
                    className="px-4 py-1.5 rounded text-sm text-[#0B2545] border border-[#0B2545] hover:bg-neutral-50 transition-colors"
                  >
                    Lihat Daftar Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-8 pt-6 pb-2 flex justify-end items-center">
              <button 
                onClick={handleCloseModal}
                className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors border border-red-500"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-10 pb-10 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-[#0B2545]">Nama Bidang</label>
                <input 
                  type="text" 
                  value={currentBidang?.name || ''}
                  onChange={(e) => setCurrentBidang({...currentBidang, name: e.target.value})}
                  placeholder="Isi nama bidang"
                  className="w-full border border-[#0B2545] rounded-md px-4 py-3 text-sm text-[#0B2545] outline-none transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white font-bold py-3 rounded-md transition-colors"
                >
                  Simpan
                </button>
                {modalMode === 'edit' && (
                  <button 
                    onClick={handleDelete}
                    className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-500 font-bold py-3 rounded-md transition-colors"
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
