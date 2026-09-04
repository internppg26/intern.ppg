import React from 'react';
import Link from 'next/link';

const programDetails = [
  {
    title: 'CORPORATE PROGRAM',
    slug: 'corporate-program',
    description: 'Program pendampingan komprehensif untuk perusahaan guna mencapai High Performance Business dan Ultimate Performance melalui penciptaan Super Team dan kepemimpinan yang strategis.',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop',
    count: 12
  },
  {
    title: 'GOVERNMENT PROGRAM',
    slug: 'government-program',
    description: 'Solusi pengembangan kompetensi dan manajemen kinerja SDM untuk instansi pemerintah. Dirancang khusus untuk mendukung peningkatan efisiensi birokrasi dan kualitas pelayanan publik.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    count: 13
  },
  {
    title: 'EDUCATIONAL PROGRAM',
    slug: 'educational-program',
    description: 'Program pengembangan kapasitas berkelanjutan bagi institusi pendidikan, tenaga pendidik, dan civitas akademika untuk menciptakan ekosistem belajar yang berkualitas.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    count: 3
  },
  {
    title: 'CERTIFICATION PROGRAM',
    slug: 'certification-program',
    description: 'Program standarisasi dan pengakuan kompetensi profesi melalui serangkaian pelatihan dan asesmen yang ketat, mengacu pada standar industri yang diakui secara resmi.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    count: 4
  },
  {
    title: 'ENTREPRENEURIAL PROGRAM',
    slug: 'entrepreneurial-program',
    description: 'Program khusus untuk mengembangkan mental, keterampilan, dan wawasan kewirausahaan. Memberdayakan individu untuk membangun dan mengakselerasi bisnis berkinerja tinggi.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    count: 4
  },
  {
    title: 'PUBLIC TRAINING & IN HOUSE PROGRAM',
    slug: 'public-training-in-house',
    description: 'Fleksibilitas metode belajar melalui seminar terbuka untuk masyarakat umum lintas sektor, maupun pelatihan eksklusif yang dikustomisasi khusus untuk internal organisasi mitra.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    count: 9
  }
];

export default function ProgramsPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Header Section */}
      <section className="bg-[#FFF4E0] py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">
            EXPLORE OUR PROGRAMS
          </h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programDetails.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                {/* Card Image */}
                <div className="w-full h-48 bg-neutral-200 relative overflow-hidden">
                   <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Card Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-brand-dark mb-4 uppercase">{program.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1 text-justify">
                    {program.description}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center text-neutral-500 text-xs font-medium mb-6 pt-6 border-t border-neutral-100">
                    <svg className="w-4 h-4 mr-2 text-[#E5832E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
                    </svg>
                    {program.count} Jenis Pelatihan
                  </div>
                  
                  {/* Button */}
                  <Link href={`/programs/${program.slug}`} className="w-full bg-[#E5832E] hover:bg-[#D47225] text-white font-bold py-3 px-4 rounded-full text-sm flex items-center justify-center transition-colors">
                    Lihat Detail
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
