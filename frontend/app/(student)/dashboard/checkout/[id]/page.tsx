'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CheckoutPage() {
  const params = useParams();
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [price, setPrice] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [selectedBank, setSelectedBank] = useState('BRI');

  useEffect(() => {
    fetch(`/api/programs/${params?.id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      setCourseTitle(data.title);
      if (data.category) {
        let progName = data.category.split('||')[0].replace(/ Program/gi, '');
        setCourseProgramName(progName);
      }
      if (data.description) {
        try {
          const parsed = JSON.parse(data.description);
          setPrice(parsed.price || '');
          setInstructorName(parsed.instructorName || '');
        } catch (e) {}
      }
    });
  }, [params?.id]);

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Top Breadcrumb & Icons */}
        <div className="flex justify-between items-center mb-10">
          <div className="text-xs text-neutral-500 font-medium">
            <Link href="/dashboard/catalog" className="hover:text-[#0B2545]">Katalog Pelatihan</Link>
            <span className="mx-2">&rsaquo;</span>
            <span>{courseProgramName.toUpperCase()}</span>
            <span className="mx-2">&rsaquo;</span>
            <Link href={`/dashboard/catalog/${params?.id}`} className="hover:text-[#0B2545]">{courseTitle}</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Konfirmasi Pesanan</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2">Konfirmasi Pesanan</h1>
          <p className="text-neutral-600 text-sm">Selesaikan pembayaran untuk mulai belajar hari ini.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Column */}
          <div className="flex-1 space-y-8">
            
            {/* Detail Pesanan */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0B2545] mb-6">Detail Pesanan</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 aspect-video md:aspect-auto md:h-32 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" alt="Course" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="bg-[#F4E3D7] text-[#964B13] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest mb-3 inline-block">{courseProgramName.toUpperCase()}</span>
                  <h3 className="text-2xl font-black text-[#0B2545] leading-tight mb-2">{courseTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {instructorName || 'Belum Ada Instruktur'}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#0B2545]">Rp {price || '0'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilih Rekening Tujuan */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-[#0B2545]">Pilih Rekening Tujuan</h2>
                <span className="text-xs text-neutral-500 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Pengecekan manual oleh admin
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* BRI */}
                <div onClick={() => setSelectedBank('BRI')} className={`border-2 ${selectedBank === 'BRI' ? 'border-[#D47225] bg-[#FFF8F3]' : 'border-neutral-200 bg-white hover:border-[#D47225]'} rounded-2xl p-6 relative cursor-pointer transition-colors`}>
                  <div className="w-16 h-8 bg-white border border-neutral-200 rounded flex items-center justify-center mb-4">
                    <span className="text-[#00529C] font-black italic text-xs">BRI</span>
                  </div>
                  <h4 className="font-bold text-[#0B2545] text-sm mb-1">Transfer Bank BRI</h4>
                  
                  <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 ${selectedBank === 'BRI' ? 'border-[#D47225] border-t-4 bg-[#D47225]' : 'border-neutral-300 bg-white'}`}></div>
                </div>

                {/* Mandiri */}
                <div onClick={() => setSelectedBank('MANDIRI')} className={`border-2 ${selectedBank === 'MANDIRI' ? 'border-[#D47225] bg-[#FFF8F3]' : 'border-neutral-200 bg-white hover:border-[#D47225]'} rounded-2xl p-6 relative cursor-pointer transition-colors`}>
                  <div className="w-16 h-8 bg-white border border-neutral-200 rounded flex items-center justify-center mb-4">
                    <span className="text-[#F2A900] font-black italic text-xs">mandiri</span>
                  </div>
                  <h4 className="font-bold text-[#0B2545] text-sm mb-1">Transfer Bank Mandiri</h4>
                  
                  <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 ${selectedBank === 'MANDIRI' ? 'border-[#D47225] border-t-4 bg-[#D47225]' : 'border-neutral-300 bg-white'}`}></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[350px]">
            
            <div className="text-right text-xs text-neutral-500 mb-4">
              Butuh bantuan transaksi? <a href="#" className="text-[#0B2545] font-bold hover:underline">Hubungi Support</a>
            </div>

            {/* Ringkasan Pesanan Box */}
            <div className="bg-white border border-neutral-200 shadow-xl rounded-3xl p-8 mb-6">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">RINGKASAN PESANAN</h4>
              
              <div className="flex justify-between items-center text-sm mb-6 pb-6 border-b border-neutral-200">
                <span className="text-neutral-600 font-medium">Harga Dasar</span>
                <span className="text-[#0B2545] font-bold">Rp {price || '0'}</span>
              </div>
              
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">TOTAL PEMBAYARAN</h4>
                <div className="text-3xl font-black text-[#0B2545]">
                  Rp {price || '0'}
                </div>
              </div>

              <Link href={`/dashboard/payment/${params?.id}?bank=${selectedBank}`} className="block w-full bg-[#B55D1A] hover:bg-[#964B13] text-white text-center py-4 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#B55D1A]/30">
                Lanjutkan Pembayaran
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Secure Info Box */}
            <div className="bg-neutral-50 rounded-2xl p-6 flex gap-4 text-xs text-neutral-600 leading-relaxed border border-neutral-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              <div>
                Transaksi aman & terenkripsi. Dengan menekan tombol di atas, Anda menyetujui <a href="#" className="font-bold underline hover:text-[#0B2545]">Syarat & Ketentuan</a> kami.
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#0B2545]">Syarat Layanan</Link>
            <Link href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0B2545]">Pusat Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
