'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const params = useParams();
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [price, setPrice] = useState('0');

  useEffect(() => {
    fetch('/api/enrollments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const enr = data.find((e: any) => e.programId === Number(params?.id));
        if (enr) {
          setEnrollment(enr);
          const course = enr.Program;
          if (course && course.category) {
            let progName = course.category.split('||')[0].replace(/ Program/gi, '');
            setCourseProgramName(progName);
          }
          if (course && course.description) {
            try {
              const parsed = JSON.parse(course.description);
              setPrice(parsed.price || '0');
            } catch(e) {}
          }
        }
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  if (!enrollment) {
    return <div className="p-12 text-center">Data pendaftaran tidak ditemukan.</div>;
  }

  const isPending = enrollment.paymentStatus === 'pending';
  const isVerified = enrollment.paymentStatus === 'verified';
  const isRejected = enrollment.paymentStatus === 'rejected';

  const dateStr = new Date(enrollment.enrolledAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="flex flex-col min-h-full relative overflow-hidden">
      
      {/* Decorative Background */}
      {isVerified && (
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
          <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-[#E5832E] rounded-sm transform rotate-45"></div>
          <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-[#4CAF50] rounded-full"></div>
          <div className="absolute bottom-[40%] left-[25%] w-4 h-4 bg-[#0B2545] rounded-sm transform rotate-12 opacity-30"></div>
          <div className="absolute top-[15%] right-[30%] w-3 h-3 bg-[#D47225] rounded-full"></div>
          <div className="absolute bottom-[20%] right-[15%] w-2 h-2 bg-[#4CAF50] rounded-sm transform rotate-45"></div>
        </div>
      )}

      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow flex flex-col items-center">
        
        {/* Top Breadcrumb & Icons */}
        <div className="w-full flex justify-between items-center mb-10 relative z-10">
          <div className="text-xs text-neutral-500 font-medium hidden md:block">
            <Link href="/dashboard/catalog" className="hover:text-[#0B2545]">Katalog Pelatihan</Link>
            <span className="mx-2">&rsaquo;</span>
            <span>{courseProgramName.toUpperCase()}</span>
            <span className="mx-2">&rsaquo;</span>
            <Link href={`/dashboard/catalog/${params?.id}`} className="hover:text-[#0B2545]">{enrollment.Program?.title}</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Status Pembayaran</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl shadow-neutral-200/50 relative z-10">
          
          <div className="flex justify-center mb-6">
            {isVerified && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-green-500 rounded-full scale-75 shadow-lg shadow-green-500/40"></div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="relative z-10"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            )}
            {isPending && (
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full scale-75 shadow-lg shadow-orange-500/40"></div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="relative z-10"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
            )}
            {isRejected && (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-red-500 rounded-full scale-75 shadow-lg shadow-red-500/40"></div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="relative z-10"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#0B2545] mb-4 leading-tight">
              {isVerified && <>Pembayaran<br/>Berhasil!</>}
              {isPending && <>Menunggu<br/>Konfirmasi Admin</>}
              {isRejected && <>Pembayaran<br/>Ditolak</>}
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm mx-auto">
              {isVerified && <>Terima kasih! Pembayaran Anda untuk <strong className="text-[#0B2545]">{enrollment.Program?.title}</strong> telah kami terima.</>}
              {isPending && <>Pembayaran Anda untuk <strong className="text-[#0B2545]">{enrollment.Program?.title}</strong> sedang kami proses.</>}
              {isRejected && <>Mohon maaf, bukti transfer Anda untuk <strong className="text-[#0B2545]">{enrollment.Program?.title}</strong> tidak valid.</>}
            </p>
          </div>

          <div className="bg-[#FEF3E2] border border-[#F4E3D7] rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-neutral-600">ID Transaksi</span>
              <span className="font-bold text-[#0B2545]">#INV-{enrollment.id}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-neutral-600">Tanggal</span>
              <span className="font-bold text-[#0B2545]">{dateStr}</span>
            </div>
            <div className="border-t border-[#F4E3D7] my-4"></div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-600">Total Pembayaran</span>
              <span className="font-black text-[#B55D1A] text-lg">Rp {price}</span>
            </div>
          </div>

          <div className="space-y-4">
            {isVerified ? (
              <Link href={`/dashboard/catalog/${params?.id}`} className="block w-full bg-[#964B13] hover:bg-[#7a3b0e] text-white text-center py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#964B13]/20">
                Mulai Belajar Sekarang
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ) : (
              <Link href="/dashboard/my-courses" className="block w-full bg-[#0B2545] hover:bg-[#13325B] text-white text-center py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#0B2545]/20">
                Kembali ke Pelatihan Saya
              </Link>
            )}
            
            {isVerified && (
              <button className="w-full bg-white border border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Unduh Kwitansi (PDF)
              </button>
            )}
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
