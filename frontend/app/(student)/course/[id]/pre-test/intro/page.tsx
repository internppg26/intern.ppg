'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PreTestIntroPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      
      {/* Content wrapper with scrolling */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12 pb-32">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#0B2545] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">BAB 1</span>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">&mdash; INTRODUCTION</span>
              </div>
              <h1 className="text-4xl font-black text-[#0B2545] tracking-tight uppercase">PRE-TEST : 5 FOUNDATION</h1>
            </div>
            <div className="bg-white border border-neutral-200 rounded-full px-6 py-2 flex items-center gap-2 shadow-sm shrink-0">
              <span className="text-xl font-black text-[#0B2545]">15</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">MENIT</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-10 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B2545] mb-4">Selamat Datang di Sesi Pre-Test</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Sesi ini dirancang untuk mengukur pemahaman awal Anda mengenai materi Foundation. Hasil tes ini tidak akan mempengaruhi kelulusan Anda, melainkan sebagai tolak ukur perkembangan belajar Anda di platform ini.
            </p>

            {/* Instruction Box */}
            <div className="bg-[#F8F9FA] border border-neutral-200 rounded-3xl p-8 mb-10">
              <div className="flex items-center gap-2 mb-4 text-[#D47225]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <h3 className="font-bold text-[#0B2545] text-sm">Petunjuk Pengerjaan:</h3>
              </div>
              <ul className="space-y-4 text-sm text-neutral-600 pl-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200">
                <li className="relative before:absolute before:-left-[29px] before:top-1.5 before:w-2 before:h-2 before:bg-[#0B2545] before:rounded-full">Terdapat 10 pertanyaan pilihan ganda.</li>
                <li className="relative before:absolute before:-left-[29px] before:top-1.5 before:w-2 before:h-2 before:bg-[#0B2545] before:rounded-full">Waktu pengerjaan adalah 15 menit.</li>
                <li className="relative before:absolute before:-left-[29px] before:top-1.5 before:w-2 before:h-2 before:bg-[#0B2545] before:rounded-full">Klik tombol "Mulai Quiz" untuk memulai pengerjaan.</li>
              </ul>
            </div>

            <div className="border-t border-neutral-200 pt-8 flex flex-wrap gap-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">DURASI</div>
                  <div className="font-black text-[#0B2545] text-sm">15 Menit</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">JUMLAH SOAL</div>
                  <div className="font-black text-[#0B2545] text-sm">10 Soal</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">STATUS</div>
                  <div className="font-black text-[#0B2545] text-sm">Belum Dimulai</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-neutral-200 p-6 absolute bottom-0 left-0 right-0 z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href={`/course/${id}/material`} className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
            <span>&lt;</span> KEMBALI KE MATERI
          </Link>
          <Link href={`/course/${id}/pre-test/quiz`} className="bg-[#0B2545] hover:bg-[#13325B] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-[#0B2545]/20">
            MULAI QUIZ <span>&gt;</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
