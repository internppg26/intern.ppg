import React from 'react';
import Link from 'next/link';

export default function BlogDetail() {
  // In a real app, you would fetch the blog post data based on params.slug.
  // For this demonstration, we'll display a rich, static layout matching the design.

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Top Action Bar (similar to screenshot) */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center text-neutral-500 hover:text-brand-dark transition-colors font-medium text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke berita
          </Link>
          
        </div>
      </div>

      {/* Main Content Article */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#1A365D] text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            STRATEGY
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B2545] uppercase leading-tight mb-4 tracking-tighter">
            HOW STRATEGIC CONSULTING DRIVES OPERATIONAL EXCELLENCE IN MODERN TECH
          </h1>
          <h2 className="text-[#3B82F6] text-sm md:text-base font-bold uppercase tracking-wider leading-relaxed max-w-3xl">
            DISCOVER THE CORE PRINCIPLES OF TRANSFORMATION THAT ARE HELPING GLOBAL LEADERS SCALE THEIR OPERATIONS WHILE MAINTAINING ELITE PERFORMANCE STANDARDS.
          </h2>
        </header>

        {/* Hero Image */}
        <figure className="mb-12 rounded-xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070" 
            alt="Strategic Consulting Laptop" 
            className="w-full h-auto object-cover aspect-video"
          />
        </figure>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-neutral-700">
          
          <h3 className="text-2xl font-bold text-[#111827] mb-4">Merespons Tantangan Bisnis di Era Digital</h3>
          
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            Perubahan tren pasar yang cepat menuntut para pemimpin perusahaan untuk tidak lagi sekadar menjadi manajer, melainkan coach dan navigator bagi timnya. Berangkat dari kebutuhan tersebut, Performa Puncak Group memformulasikan kurikulum yang tidak hanya berfokus pada teori, tetapi juga pada simulasi pengambilan keputusan di masa krisis.
          </p>

          <blockquote className="border-l-4 border-neutral-300 pl-4 py-1 my-6 italic text-neutral-500 text-sm">
            "Kepemimpinan hari ini bukan lagi soal hierarki dan memberi perintah. Pemimpin masa depan adalah mereka yang mampu membaca arah angin perubahan dan menggerakkan timnya dengan empati serta kelincahan mental. Itulah inti dari Agile Leadership 4.0."
            <br/>
            <span className="text-xs not-italic mt-2 block">— Lead Coach Performa Puncak Group</span>
          </blockquote>

          <figure className="my-10 rounded-xl overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" 
              alt="Team Meeting" 
              className="w-full h-auto object-cover aspect-video"
            />
          </figure>

          <h3 className="text-2xl font-bold text-[#111827] mb-4 mt-10">Integrasi Penuh dengan Metode ACMCTO</h3>
          
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            Berbeda dengan pelatihan kepemimpinan konvensional, program "Agile Leadership 4.0" mengintegrasikan metode andalan Performa Puncak Group, yaitu ACMCTO (Assessment, Coaching, Mentoring, Counseling, Training, Outbound).
          </p>

          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            Dalam implementasinya, setiap peserta (Corporate Leaders) akan melewati tahapan berikut:
          </p>

          <ol className="list-decimal list-inside space-y-2 mb-8 text-sm leading-relaxed text-neutral-600 pl-4">
            <li><strong>Assessment:</strong> Pemetaan profil psikologis dan gaya kepemimpinan default masing-masing peserta.</li>
            <li><strong>Training & Mentoring:</strong> Sesi intensif mengenai kerangka kerja Agile, manajemen risiko, dan komunikasi strategis.</li>
            <li><strong>1-on-1 Coaching:</strong> Pendampingan personal pasca-pelatihan untuk memastikan ilmu yang didapat benar-benar dieksekusi dalam penyelesaian masalah harian di kantor.</li>
          </ol>

          <h3 className="text-2xl font-bold text-[#111827] mb-4 mt-10">Tersedia di LMS Performa Puncak</h3>
          
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            Untuk mendukung fleksibilitas eksekutif yang memiliki jadwal padat, seluruh materi pendukung, e-learning, dan jadwal coaching dari program ini sudah terintegrasi secara penuh di dalam sistem LMS Performa Puncak. Klien HR dari tiap perusahaan juga dapat memantau grafik perkembangan (ROI) dari para manajer mereka secara real-time melalui Dasbor B2B.
          </p>

          <p className="mb-8 text-sm leading-relaxed text-neutral-600">
            Bagi perusahaan yang tertarik untuk melakukan pendaftaran atau kustomisasi program In-House Training, silakan menghubungi tim konsultan kami melalui halaman Contact Us atau langsung menjadwalkan sesi konsultasi gratis.
          </p>
          
        </div>
      </article>
      
    </div>
  );
}
