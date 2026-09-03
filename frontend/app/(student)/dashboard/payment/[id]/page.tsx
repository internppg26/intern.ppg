'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [price, setPrice] = useState('');

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        } catch (e) {}
      }
    });
  }, [params?.id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleConfirmPayment = async () => {
    if (!uploadedFile) return;
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = async () => {
        const base64Str = reader.result;
        const res = await fetch('/api/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            programId: params?.id,
            paymentProof: base64Str
          })
        });
        if (res.ok) {
          router.push(`/dashboard/payment/${params?.id}/status`);
        } else {
          const d = await res.json();
          alert("Gagal: " + (d.error || "Terjadi kesalahan"));
          setIsLoading(false);
        }
      };
    } catch (e) {
      alert("Error: " + e);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow flex flex-col items-center">
        
        {/* Top Breadcrumb & Icons - aligning to left */}
        <div className="w-full flex justify-between items-center mb-10">
          <div className="text-xs text-neutral-500 font-medium hidden md:block">
            <Link href="/dashboard/catalog" className="hover:text-[#0B2545]">Katalog Pelatihan</Link>
            <span className="mx-2">&rsaquo;</span>
            <span>{courseProgramName.toUpperCase()}</span>
            <span className="mx-2">&rsaquo;</span>
            <Link href={`/dashboard/catalog/${params?.id}`} className="hover:text-[#0B2545]">{courseTitle}</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Konfirmasi Pesanan</span>
          </div>
          <div className="flex gap-4 text-neutral-600 ml-auto">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 max-w-lg w-full shadow-lg relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-[#0B2545] mb-2">Selesaikan Pembayaran Anda</h1>
            <p className="text-neutral-500 text-sm">Silakan transfer tepat sesuai nominal di bawah ini.</p>
          </div>

          <div className="bg-[#FEF3E2] rounded-2xl p-8 text-center mb-8">
            <h2 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">TOTAL NOMINAL TRANSFER</h2>
            <div className="text-4xl font-black text-[#0B2545]">Rp {price || '0'}</div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-neutral-600 mb-3">Transfer ke rekening berikut:</p>
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-neutral-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#0B2545] text-sm mb-1">Bank BCA</h3>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-black text-[#0B2545] tracking-widest">1234 567 890</span>
                  <button className="text-neutral-400 hover:text-[#0B2545]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                </div>
                <p className="text-xs text-neutral-500">a.n PT. Performa Puncak Group</p>
              </div>
              <div className="w-12 h-6 bg-white border border-neutral-200 rounded flex items-center justify-center">
                <span className="text-[#0066AE] font-black italic text-[8px]">BCA</span>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 mb-8">
            <h3 className="font-bold text-[#0B2545] text-sm mb-4">Sudah melakukan transfer?</h3>
            {uploadedFile ? (
              <div className="border-2 border-green-500 bg-green-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative">
                <button 
                  onClick={() => setUploadedFile(null)} 
                  className="absolute top-3 right-3 text-green-700 hover:text-green-900"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-bold text-green-800 mb-1">Bukti Transfer Terunggah</span>
                <span className="text-xs text-green-600 truncate max-w-[200px]">{uploadedFile.name}</span>
              </div>
            ) : (
              <label className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D47225] hover:bg-orange-50/50 transition-colors">
                <input type="file" className="hidden" accept="image/jpeg,image/png,application/pdf" onChange={handleFileUpload} />
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2" className="mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span className="text-sm font-medium text-[#0B2545] mb-1">Klik untuk unggah Bukti Transfer</span>
                <span className="text-[10px] text-neutral-400 font-medium">(JPG, PNG, PDF max 2MB)</span>
              </label>
            )}
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleConfirmPayment}
              disabled={isLoading || !uploadedFile}
              className={`w-full ${(!uploadedFile || isLoading) ? 'bg-neutral-300' : 'bg-[#B55D1A] hover:bg-[#964B13]'} text-white text-center py-4 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#B55D1A]/20`}
            >
              {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
            </button>
            <button className="w-full bg-white border border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Butuh bantuan? Hubungi Admin
            </button>
          </div>

          <div className="mt-8 text-center text-[10px] text-neutral-400 font-medium leading-relaxed">
            Pembayaran diproses secara otomatis oleh sistem kami.<br/>
            Waktu verifikasi bukti transfer manual: 5-10 menit.
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex gap-12 mt-8 text-xs font-bold text-neutral-600">
          <a href="#" className="flex items-center gap-2 hover:text-[#0B2545]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> Panduan Transfer</a>
          <a href="#" className="flex items-center gap-2 hover:text-[#0B2545]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Keamanan Transaksi</a>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-auto">
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
