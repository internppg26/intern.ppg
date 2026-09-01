'use client';

import React from 'react';
import Link from 'next/link';

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "Corporate Strategy Masterclass",
      issued: "25 Oct 2023",
      certId: "PPG-CERT-9981",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: 2,
      title: "Financial Analysis for Managers",
      issued: "12 Sep 2023",
      certId: "PPG-CERT-8820",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2036"
    },
    {
      id: 3,
      title: "Human Resource Leadership",
      issued: "05 Aug 2023",
      certId: "PPG-CERT-7734",
      image: null
    }
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <span>LMS</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">E-Certificate</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">Sertifikat Elektronik</h1>
          <p className="text-neutral-600 text-sm">Kumpulan sertifikat dari pelatihan yang telah Anda selesaikan.</p>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              
              {/* Image Preview Area */}
              <div className="aspect-[4/3] bg-[#F8F9FA] relative p-6 border-b border-neutral-200">
                {cert.image ? (
                  <div className="w-full h-full relative rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
                    {/* Mock certificate elements */}
                    <div className="absolute inset-8 border border-white/60 p-4 flex flex-col items-center justify-center text-center">
                       <div className="text-[8px] uppercase tracking-widest text-[#0B2545] font-bold mb-4">Certificate of Achievement</div>
                       <div className="w-12 h-12 rounded-full border-2 border-[#D47225] flex items-center justify-center text-[#D47225] mb-4">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                       </div>
                       <div className="w-32 h-1 bg-neutral-300 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                    <div className="w-24 h-1 bg-neutral-200 rounded-full mb-2"></div>
                    <div className="w-32 h-1 bg-neutral-200 rounded-full"></div>
                  </div>
                )}
                
                {/* Check Badge */}
                <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rounded-full p-1 shadow-md">
                  <div className="w-full h-full bg-[#D47225] rounded-full flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-black text-[#0B2545] text-lg mb-4">{cert.title}</h3>
                
                <div className="space-y-2 mb-8 text-xs font-medium text-neutral-500">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Issued: {cert.issued}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    ID: {cert.certId}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button className="flex-1 bg-[#D47225] hover:bg-[#B55D1A] text-white py-3 rounded-full font-bold text-sm transition-colors shadow-md shadow-[#D47225]/20">
                    Unduh PDF
                  </button>
                  <button className="flex-1 border-2 border-neutral-300 text-neutral-600 hover:border-[#0B2545] hover:text-[#0B2545] py-3 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State / Add More Card */}
          <div className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-100 hover:border-neutral-400 transition-all cursor-pointer min-h-[300px]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-neutral-400 shadow-sm mb-6 border border-neutral-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <h3 className="font-black text-[#0B2545] text-lg mb-2">Selesaikan Pelatihan Lainnya</h3>
            <p className="text-neutral-500 text-sm max-w-xs mb-6">Dapatkan sertifikat baru dengan menyelesaikan kursus yang Anda ambil.</p>
            <Link href="/dashboard/catalog" className="text-[#0B2545] font-bold text-sm border-b-2 border-[#0B2545] hover:text-[#D47225] hover:border-[#D47225] pb-1 transition-colors">
              Lihat Katalog Kursus
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#0B2545]">Syarat Layanan</a>
            <a href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#0B2545]">Pusat Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
