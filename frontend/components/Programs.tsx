import React from 'react';

const programs = [
  {
    title: 'Corporate Program',
    description: 'Program pengembangan kinerja yang disesuaikan untuk kebutuhan spesifik perusahaan dalam mencapai Ultimate Performance.',
    icon: '/Corporate Program.png'
  },
  {
    title: 'Government Program',
    description: 'Solusi pengembangan kompetensi dan manajemen SDM yang dirancang untuk mendukung efisiensi instansi pemerintah.',
    icon: '/Government Program.png'
  },
  {
    title: 'Educational Program',
    description: 'Program pengembangan kapasitas bagi akademisi, praktisi pendidikan, dan siswa untuk mendukung ekosistem pendidikan.',
    icon: '/Educational Program.png'
  },
  {
    title: 'Certification Program',
    description: 'Program pengakuan kompetensi resmi melalui serangkaian asesmen dan pelatihan yang mengacu pada standar industri yang diakui.',
    icon: '/Certification Program.png'
  },
  {
    title: 'Entrepreneurial Program',
    description: 'Program untuk menumbuhkan jiwa kewirausahaan, mulai dari pengembangan ide bisnis hingga strategi pertumbuhan usaha.',
    icon: '/Entrepreneurial Program.png'
  },
  {
    title: 'Public Training & In-House',
    description: 'Fleksibilitas metode belajar baik melalui seminar publik yang bersifat terbuka maupun pelatihan khusus organisasi mitra.',
    icon: '/Public Training & In House.png'
  }
];

export default function Programs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Programs</h2>
          <p className="text-neutral-gray">
            Kami mengemas layanan keahlian kami ke dalam program-program terstruktur yang dirancang khusus untuk kebutuhan sektor yang berbeda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-primary/30 hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 mb-6">
                <img src={program.icon} alt={`Icon ${program.title}`} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">{program.title}</h3>
              <p className="text-neutral-gray text-sm font-medium leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
