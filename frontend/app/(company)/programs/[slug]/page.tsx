import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Type definition for Page Props in Next.js 13+ App Router
type Props = {
  params: Promise<{ slug: string }>;
};

const programsData: Record<string, { title: string, description: string, trainings: string[] }> = {
  'corporate-program': {
    title: 'Corporate Program',
    description: 'Program pendampingan komprehensif untuk perusahaan guna mencapai High Performance Business.',
    trainings: [
      'Penjualan dan Pemasaran',
      'Kepemimpinan',
      'Management',
      'Pengembangan SDM',
      'Hukum',
      'Kesekretariatan',
      'Public Relation',
      'CSR',
      'Perbankan',
      'Finance',
      'Pengembangan Diri',
      'K3'
    ]
  },
  'government-program': {
    title: 'Government Program',
    description: 'Solusi pengembangan kompetensi dan manajemen kinerja SDM untuk instansi pemerintah.',
    trainings: [
      'Aset, Barang, dan Jasa', 'Bimtek Desa',
      'Bimtek DPRD', 'Bimtek Kehumasan',
      'Bimtek Kepegawaian', 'Bimtek Kesehatan',
      'Bimtek Keuangan', 'Bimtek Lingkungan Hidup',
      'Bimtek Pariwisata', 'Bimtek Pemerintahan',
      'Bimtek Perpajakan', 'Bimtek Pertanahan',
      'Bimtek Satpol PP'
    ]
  },
  'educational-program': {
    title: 'Educational Program',
    description: 'Program pengembangan kapasitas berkelanjutan bagi institusi pendidikan.',
    trainings: [
      'Guru',
      'Manajemen Sekolah',
      'Siswa'
    ]
  },
  'certification-program': {
    title: 'Certification Program',
    description: 'Program standarisasi dan pengakuan kompetensi profesi.',
    trainings: [
      'SDM',
      'Pelatihan',
      'Assesor',
      'K3'
    ]
  },
  'public-training-in-house': {
    title: 'Public Training & In-House',
    description: 'Fleksibilitas metode belajar melalui seminar terbuka maupun in-house training.',
    trainings: [
      'Self Transformation',
      'Team Transformation',
      'Manager Transformation',
      'Business Supporting',
      'Training for Trainer',
      'High Performance',
      'Coaching Series',
      'Self Management',
      'People Skill'
    ]
  },
  'entrepreneurial-program': {
    title: 'Entrepreneurial Program',
    description: 'Program khusus untuk mengembangkan mental, keterampilan, dan wawasan kewirausahaan.',
    trainings: [
      'Kewirausahaan Dasar',
      'Inkubasi Bisnis',
      'Manajemen Keuangan UMKM',
      'Digital Marketing'
    ]
  }
};

const sidebarLinks = [
  { slug: 'corporate-program', label: 'Corporate Program' },
  { slug: 'government-program', label: 'Government Program' },
  { slug: 'educational-program', label: 'Educational Program' },
  { slug: 'certification-program', label: 'Certification Program' },
  { slug: 'entrepreneurial-program', label: 'Entrepreneurial Program' },
  { slug: 'public-training-in-house', label: 'Public Training & In-House' }
];

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programsData[slug];

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#FFF4E0] py-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-500 mb-6 font-medium">
            <Link href="/" className="hover:text-[#E5832E]">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/programs" className="hover:text-[#E5832E]">Program</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-brand-dark font-bold">Detail</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter mb-4">
            Detail Program Pelatihan
          </h1>
          <p className="text-neutral-600 max-w-2xl text-sm md:text-base">
            Temukan beragam kategori pelatihan yang dirancang khusus untuk meningkatkan kapabilitas profesional di berbagai sektor industri dan pemerintahan.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 shrink-0">
              <div className="flex flex-col gap-2 sticky top-24">
                {sidebarLinks.map((link) => {
                  const isActive = link.slug === slug;
                  return (
                    <Link
                      key={link.slug}
                      href={`/programs/${link.slug}`}
                      className={`
                        px-6 py-4 rounded-full text-sm font-medium transition-all duration-200 flex justify-between items-center
                        ${isActive 
                          ? 'bg-brand-dark text-white shadow-md' 
                          : 'bg-white text-neutral-600 hover:bg-neutral-50 hover:text-brand-dark border border-neutral-100'}
                      `}
                    >
                      {link.label}
                      {isActive && <span className="text-[#E5832E] text-xs">▶</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Content / Detail Grid */}
            <div className="w-full lg:w-3/4">
              <h2 className="text-3xl font-black text-brand-dark mb-3 tracking-tight">
                {program.title}
              </h2>
              <p className="text-neutral-500 text-sm mb-10 leading-relaxed max-w-3xl">
                {program.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.trainings.map((training, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-5 rounded-xl border border-neutral-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    {/* Star Icon Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#FFF4E0] flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#E5832E" stroke="#E5832E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <span className="font-bold text-sm text-brand-dark">
                      {training}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
