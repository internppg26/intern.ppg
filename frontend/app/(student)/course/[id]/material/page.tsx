'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseMaterialPage() {
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
              <h1 className="text-4xl font-black text-[#0B2545] tracking-tight uppercase">SUB-BAB 1 : 5 FOUNDATION</h1>
            </div>
            <div className="bg-white border border-neutral-200 rounded-full px-6 py-2 flex items-center gap-2 shadow-sm shrink-0">
              <span className="text-xl font-black text-[#0B2545]">10</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">MENIT</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-10 shadow-sm">
            
            <p className="text-neutral-600 leading-relaxed mb-8">
              Selamat datang di modul pertama. Pada bagian ini, kita akan mengeksplorasi pondasi dasar dari kepemimpinan transformasional di era digital. Memahami lima pilar utama ini adalah langkah awal yang krusial bagi setiap pemimpin organisasi.
            </p>

            <h2 className="text-2xl font-black text-[#0B2545] mb-6">Watch the Foundation Video</h2>

            {/* Video Player Placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 group cursor-pointer shadow-lg">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#0B2545" className="ml-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-neutral-200 p-6 absolute bottom-0 left-0 right-0 z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href={`/course/${id}/pre-test/quiz`} className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
            <span>&lt;</span> SEBELUMNYA
          </Link>
          <button className="bg-[#0B2545] hover:bg-[#13325B] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-[#0B2545]/20">
            SELANJUTNYA <span>&gt;</span>
          </button>
        </div>
      </div>

    </div>
  );
}
