'use client';

import React from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-full relative overflow-hidden">
      
      {/* Decorative Confetti Background (Simplified) */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-[#E5832E] rounded-sm transform rotate-45"></div>
        <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-[#4CAF50] rounded-full"></div>
        <div className="absolute bottom-[40%] left-[25%] w-4 h-4 bg-[#0B2545] rounded-sm transform rotate-12 opacity-30"></div>
        <div className="absolute top-[15%] right-[30%] w-3 h-3 bg-[#D47225] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[15%] w-2 h-2 bg-[#4CAF50] rounded-sm transform rotate-45"></div>
      </div>

      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow flex flex-col items-center">
        
        {/* Top Breadcrumb & Icons */}
        <div className="w-full flex justify-between items-center mb-10 relative z-10">
          <div className="text-xs text-neutral-500 font-medium hidden md:block">
            <Link href="/dashboard/catalog" className="hover:text-[#0B2545]">Katalog Pelatihan</Link>
            <span className="mx-2">&rsaquo;</span>
            <span>Corporate Program</span>
            <span className="mx-2">&rsaquo;</span>
            <Link href="/dashboard/catalog/1" className="hover:text-[#0B2545]">Corporate Strategy Masterclass</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Konfirmasi Pesanan</span>
          </div>
          <div className="flex gap-4 text-neutral-600 ml-auto">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl shadow-neutral-200/50 relative z-10">
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-green-500 rounded-full scale-75 shadow-lg shadow-green-500/40"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="relative z-10"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#0B2545] mb-4 leading-tight">Pembayaran<br/>Berhasil!</h1>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm mx-auto">
              Terima kasih! Pembayaran Anda untuk <strong className="text-[#0B2545]">Corporate Strategy Masterclass</strong> telah kami terima.
            </p>
          </div>

          <div className="bg-[#FEF3E2] border border-[#F4E3D7] rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-neutral-600">ID Transaksi</span>
              <span className="font-bold text-[#0B2545]">#INV-99823</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-neutral-600">Tanggal</span>
              <span className="font-bold text-[#0B2545]">30 Juli 2026</span>
            </div>
            <div className="border-t border-[#F4E3D7] my-4"></div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600">Total Pembayaran</span>
              <span className="font-black text-[#B55D1A] text-lg">Rp 4.999.000</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/dashboard" className="block w-full bg-[#964B13] hover:bg-[#7a3b0e] text-white text-center py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#964B13]/20">
              Mulai Belajar Sekarang
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <button className="w-full bg-white border border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Unduh Kwitansi (PDF)
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-neutral-500 font-medium">
            Butuh bantuan? <a href="#" className="text-[#964B13] font-bold hover:underline">Hubungi Support</a>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#0B2545]">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0B2545]">Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
