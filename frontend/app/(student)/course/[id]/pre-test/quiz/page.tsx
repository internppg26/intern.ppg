'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function PreTestQuizPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number | null>>({});

  const questions = [
    {
      id: 1,
      text: "Apa yang menjadi fokus utama dalam kepemimpinan transformasional di era digital?",
      options: [
        { id: 1, text: "Mempertahankan status quo demi stabilitas operasional." },
        { id: 2, text: "Menginspirasi dan memotivasi tim untuk berinovasi dan beradaptasi dengan perubahan." },
        { id: 3, text: "Fokus semata pada pencapaian target metrik jangka pendek tanpa visi jangka panjang." },
        { id: 4, text: "Mengurangi interaksi manusia dan sepenuhnya bergantung pada otomatisasi AI." },
      ]
    },
    {
      id: 2,
      text: "Manakah dari berikut ini yang BUKAN merupakan pilar utama kepemimpinan digital?",
      options: [
        { id: 1, text: "Ketangkasan digital (Digital agility)" },
        { id: 2, text: "Ketergantungan penuh pada struktur hierarki tradisional" },
        { id: 3, text: "Pengambilan keputusan berbasis data" },
        { id: 4, text: "Membangun budaya kolaborasi yang kuat" },
      ]
    },
    {
      id: 3,
      text: "Apa tujuan utama dari framework strategi 'Blue Ocean'?",
      options: [
        { id: 1, text: "Menciptakan ruang pasar yang tidak diperebutkan (uncontested market space)." },
        { id: 2, text: "Menghancurkan kompetitor di pasar yang sudah ada." },
        { id: 3, text: "Menurunkan harga produk serendah mungkin." },
        { id: 4, text: "Meningkatkan pengeluaran pemasaran untuk pangsa pasar." },
      ]
    },
    {
      id: 4,
      text: "Metrik apa yang paling relevan untuk mengukur keberhasilan inovasi produk baru?",
      options: [
        { id: 1, text: "Tingkat absensi karyawan" },
        { id: 2, text: "Tingkat adopsi pengguna dan ROI (Return on Investment)" },
        { id: 3, text: "Jumlah baris kode yang ditulis oleh tim developer" },
        { id: 4, text: "Jumlah rapat yang diadakan selama proses pengembangan" },
      ]
    },
    {
      id: 5,
      text: "Dalam change management, apa penyebab paling umum penolakan (resistance) dari karyawan?",
      options: [
        { id: 1, text: "Kurangnya pemahaman tentang alasan perlunya perubahan." },
        { id: 2, text: "Bonus tahunan yang terlalu tinggi." },
        { id: 3, text: "Terlalu banyak libur nasional." },
        { id: 4, text: "Karyawan terlalu sering dilibatkan dalam pengambilan keputusan." },
      ]
    },
    {
      id: 6,
      text: "Pendekatan mana yang paling efektif dalam memimpin tim lintas generasi (multigenerational teams)?",
      options: [
        { id: 1, text: "Menerapkan satu gaya kepemimpinan otoriter untuk semua orang." },
        { id: 2, text: "Mengabaikan masukan dari generasi yang lebih muda." },
        { id: 3, text: "Memahami gaya komunikasi dan motivasi yang berbeda dari setiap generasi." },
        { id: 4, text: "Hanya merekrut orang dari satu kelompok usia tertentu." },
      ]
    },
    {
      id: 7,
      text: "Apa peran utama data analytics dalam pengambilan keputusan strategis?",
      options: [
        { id: 1, text: "Untuk menggantikan sepenuhnya intuisi manusia." },
        { id: 2, text: "Mengumpulkan data sebanyak mungkin tanpa dianalisis." },
        { id: 3, text: "Memberikan wawasan objektif untuk meminimalkan risiko keputusan." },
        { id: 4, text: "Hanya digunakan untuk tujuan pelaporan keuangan akhir tahun." },
      ]
    },
    {
      id: 8,
      text: "Manakah pendekatan yang tepat saat menghadapi krisis (crisis management) di perusahaan?",
      options: [
        { id: 1, text: "Menyembunyikan informasi dari publik dan karyawan." },
        { id: 2, text: "Komunikasi transparan, cepat, dan empati kepada semua pemangku kepentingan." },
        { id: 3, text: "Menunggu masalah selesai dengan sendirinya." },
        { id: 4, text: "Menyalahkan pihak ketiga segera setelah krisis terjadi." },
      ]
    },
    {
      id: 9,
      text: "Apa perbedaan mendasar antara visi dan misi organisasi?",
      options: [
        { id: 1, text: "Tidak ada perbedaan, keduanya adalah hal yang sama." },
        { id: 2, text: "Visi adalah apa yang ingin dicapai di masa depan, misi adalah bagaimana mencapainya saat ini." },
        { id: 3, text: "Visi dibuat oleh CEO, misi dibuat oleh karyawan." },
        { id: 4, text: "Misi berorientasi pada keuntungan finansial, visi pada citra publik." },
      ]
    },
    {
      id: 10,
      text: "Pada tahap apa analisis SWOT paling baik digunakan dalam perencanaan strategis?",
      options: [
        { id: 1, text: "Setelah produk gagal di pasar." },
        { id: 2, text: "Pada tahap evaluasi akhir tahun saja." },
        { id: 3, text: "Pada awal perencanaan (situational analysis) untuk memahami posisi perusahaan." },
        { id: 4, text: "Saat menentukan anggaran untuk pesta perusahaan." },
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentSelected = selectedOptions[currentQuestionIndex] || null;

  const handleSelectOption = (optionId: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      router.push(`/course/${id}/material`);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      router.push(`/course/${id}/pre-test/intro`);
    }
  };

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
              <span className="text-xl font-black text-[#0B2545]">00:14:59</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-10 shadow-sm">
            
            {/* Progress Bar */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-black text-[#0B2545] uppercase tracking-widest shrink-0">SOAL {currentQuestionIndex + 1} DARI {questions.length}</span>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#0B2545] h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-[#0B2545] mb-8 leading-tight">
              {currentQuestion.id}. {currentQuestion.text}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((opt) => (
                <label 
                  key={opt.id} 
                  className={`flex items-center p-5 rounded-full border cursor-pointer transition-colors ${
                    currentSelected === opt.id 
                      ? 'border-[#0B2545] bg-[#F8F9FA]' 
                      : 'border-neutral-200 hover:border-[#0B2545]/50'
                  }`}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${
                    currentSelected === opt.id ? 'border-[#0B2545]' : 'border-neutral-300'
                  }`}>
                    {currentSelected === opt.id && <div className="w-2.5 h-2.5 bg-[#0B2545] rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{opt.text}</span>
                </label>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-neutral-200 p-6 absolute bottom-0 left-0 right-0 z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={handlePrev}
            className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2"
          >
            <span>&lt;</span> SEBELUMNYA
          </button>
          <button 
            onClick={handleNext}
            className="bg-[#0B2545] hover:bg-[#13325B] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-[#0B2545]/20"
          >
            SELANJUTNYA <span>&gt;</span>
          </button>
        </div>
      </div>

    </div>
  );
}
