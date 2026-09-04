import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark flex flex-col items-center justify-center text-center text-white overflow-hidden">
        {/* Subtle background image or pattern could go here */}
        <div className="absolute inset-0 bg-brand-dark opacity-90 z-0"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-wide">About Us</h1>
          <p className="text-lg text-neutral-300">
            Empowering Human Capital Through Strategic Development and Peak Performance Solutions
          </p>
        </div>
      </section>

      {/* Founder & Manager Section */}
      <section className="py-16 bg-bg-beige/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Founder Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-center gap-6 max-w-md w-full">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                <img src="/foto_pak_ilham.jpg" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark">FOUNDER</h3>
                <p className="text-primary text-sm font-semibold mb-2">Ilhamuddin Nukman</p>
                <p className="text-xs text-neutral-gray leading-relaxed">
                  "Setiap orang memiliki kewajiban dan hak untuk bekerja dan berkarya memberikan yang terbaik dari semua kapabilitas dirinya.”
                </p>
              </div>
            </div>

            {/* Manager Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-center gap-6 max-w-md w-full">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                <img src="/foto_pak_hadi.png" alt="Manager" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark">MANAGER</h3>
                <p className="text-primary text-sm font-semibold mb-2">Hadi Isman</p>
                <p className="text-xs text-neutral-gray leading-relaxed">
                  "Setiap orang memiliki kewajiban dan hak untuk bekerja dan berkarya memberikan yang terbaik dari semua kapabilitas dirinya.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-full md:w-1/3 bg-white p-8 rounded-3xl flex justify-center items-center shadow-lg">
              <div className="w-48 h-auto flex justify-center items-center">
                <img src="/Logo_Performa_Puncak.png" alt="Logo Performa Puncak Group" className="w-full h-auto object-contain" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">PT. PERFORMA PUNCAK GROUP</h2>
              <p className="text-lg text-neutral-300 leading-relaxed text-justify">
                Performa Puncak adalah perusahaan yang fokus dalam penyediaan Peak Performance Services. Kami mendefinisikan Peak Performance sebagai kinerja utama dan terbaik yang memberikan hasil ultimate bagi mitra. Kami hadir untuk mendorong setiap elemen dan dimensi dalam organisasi mitra agar mencapai hasil yang maksimal melalui program pendampingan yang terukur, bertumbuh, dan berkembang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-16 uppercase">Vision, Mission & Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-10 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                👁️
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">VISION</h3>
              <p className="text-sm font-medium text-neutral-gray leading-relaxed text-justify">
                Berkomitmen memberikan pelayanan pengembangan performa puncak yang unggul dan berkualitas bagi mitra.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-10 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                🎯
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">MISSION</h3>
              <ul className="text-sm font-medium text-neutral-gray leading-relaxed list-disc list-outside ml-4 space-y-2">
                <li>Terciptanya kinerja unggul individu, tim, dan organisasi mitra.</li>
                <li>Terbentuknya sikap kerja yang mendukung hasil kinerja unggul pada organisasi mitra.</li>
                <li>Terwujudnya organisasi atau lembaga mitra yang unggul dan berkualitas.</li>
              </ul>
            </div>

            {/* Goals */}
            <div className="bg-white p-10 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                📈
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">GOALS</h3>
              <ul className="text-sm font-medium text-neutral-gray leading-relaxed list-disc list-outside ml-4 space-y-2">
                <li>Menyediakan support system pengembangan kinerja unggul bagi mitra.</li>
                <li>Menyediakan sistem diagnosa, asesmen, dan intervensi pengembangan performa puncak bagi mitra.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-bg-beige">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-16 uppercase">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'PEAK PERFORMANCE SUPPORT', desc: 'Kami sangat konsen untuk menjadikan sebuah instansi yang komprehensif.' },
              { title: 'EXCELLENCE SUPER TEAM', desc: 'Memastikan seluruh peserta pelatihan bertransformasi menjadi tim yang unggul (super team).' },
              { title: 'CONTINUOUS IMPROVEMENT', desc: 'Memiliki model evaluasi dan peningkatan berkelanjutan untuk menjamin nilai tambah maksimal.' },
              { title: 'INDIVIDUALIZED APPROACH', desc: 'Layanan yang berorientasi pada kebutuhan unik individu dan organisasi.' },
              { title: 'COMPREHENSIVE METHODOLOGY', desc: 'Pendekatan terpadu melalui Counseling, Mentoring, Coaching, Training, dan Outbound.' },
              { title: 'MEASURABLE ROI', desc: 'Memberikan hasil yang terukur bagi perusahaan untuk mendukung pertumbuhan bisnis yang berkelanjutan.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between h-full">
                <p className="text-sm font-medium text-neutral-gray mb-8">{item.desc}</p>
                <div className="flex justify-between items-center border-t border-neutral-100 pt-4 mt-auto">
                  <h4 className="text-sm font-bold text-brand-dark">{item.title}</h4>
                  <span className="text-primary text-xl">↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team & Experts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-16 uppercase">Our Team & Experts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'DR. ROBERT THEO', role: 'CEO & FOUNDER' },
              { name: 'SARAH MILLER', role: 'DIRECTOR' },
              { name: 'JAMES WILSON', role: 'HEAD MENTOR' },
              { name: 'SUSAN RODRIGUEZ', role: 'SENIOR CONSULTANT' }
            ].map((person, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-neutral-100 shadow-md">
                  <img src={`https://i.pravatar.cc/300?img=${i + 11}`} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
                <h4 className="text-lg font-bold text-brand-dark">{person.name}</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Network & Client */}
      <section className="py-20 bg-white border-t border-neutral-100 overflow-hidden">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-16 uppercase px-6">Our Network & Client</h2>
          
          <div className="relative flex overflow-hidden w-full group py-4">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Track 1 */}
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {[
                { name: 'TBINA', src: '/TBINA.jpg' },
                { name: 'British American Tobacco', src: '/British American Tobacco.png' },
                { name: 'KT&G Indonesia', src: '/KT&G Indonesia.png' },
                { name: 'Bank BTN', src: '/Bank BTN.png' },
                { name: 'Bank Bukopin', src: '/Bank Bukopin.png' },
                { name: 'Petrosida Gresik', src: '/Petrosida Gresik.jpg' },
                { name: 'PLN Nusantara Power', src: '/PLN Nusantara Power.png' },
                { name: 'Tractorindo', src: '/Tractorindo.png' },    
                { name: 'Bank BSI', src: '/Bank BSI.jpg' },
                { name: 'Bank BRI', src: '/Bank BRI.svg' },
                { name: 'SIG', src: '/SIG.png' },
                { name: 'PG Rajawali I', src: '/PG Rajawali I.png' },
                { name: 'UB', src: '/UB.png' },
                { name: 'UM', src: '/UM.jpg' },
                { name: 'UIN Malang', src: '/UIN Malang.jpg' },
                { name: 'Polinema', src: '/Polinema.png' },
                { name: 'Unej', src: '/Unej.jpg' },
                { name: 'UIN Tulungagung', src: '/UIN Tulungagung.png' },
                { name: 'IAIN Parepare', src: '/IAIN Parepare.jpg' },
                { name: 'STIE Malangkucecwara', src: '/STIE Malangkucecwara.png' },
                { name: 'Dikbud Malang', src: '/Dikbud Malang.png' },
                { name: 'Permasyarakatan Malang', src: '/Permasyarakatan Malang.png' },
                { name: 'Disporapar Malang', src: '/Disporapar Malang.jpg' },
                { name: 'BNN Malang', src: '/BNN Malang.jpg' },
                { name: 'DISPANGTAN Malang', src: '/DISPANGTAN Malang.jpg' },
              ].map((client, i) => (
                <div key={`set1-${i}`} className="flex items-center justify-center mx-8 w-40 h-24 opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <img src={client.src} alt={client.name} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for infinite loop) */}
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
              {[
                { name: 'TBINA', src: '/TBINA.jpg' },
                { name: 'British American Tobacco', src: '/British American Tobacco.png' },
                { name: 'KT&G Indonesia', src: '/KT&G Indonesia.png' },
                { name: 'Bank BTN', src: '/Bank BTN.png' },
                { name: 'Bank Bukopin', src: '/Bank Bukopin.png' },
                { name: 'Petrosida Gresik', src: '/Petrosida Gresik.jpg' },
                { name: 'PLN Nusantara Power', src: '/PLN Nusantara Power.png' },
                { name: 'Tractorindo', src: '/Tractorindo.png' },    
                { name: 'Bank BSI', src: '/Bank BSI.jpg' },
                { name: 'Bank BRI', src: '/Bank BRI.svg' },
                { name: 'SIG', src: '/SIG.png' },
                { name: 'PG Rajawali I', src: '/PG Rajawali I.png' },
                { name: 'UB', src: '/UB.png' },
                { name: 'UM', src: '/UM.jpg' },
                { name: 'UIN Malang', src: '/UIN Malang.jpg' },
                { name: 'Polinema', src: '/Polinema.png' },
                { name: 'Unej', src: '/Unej.jpg' },
                { name: 'UIN Tulungagung', src: '/UIN Tulungagung.png' },
                { name: 'IAIN Parepare', src: '/IAIN Parepare.jpg' },
                { name: 'STIE Malangkucecwara', src: '/STIE Malangkucecwara.png' },
                { name: 'Dikbud Malang', src: '/Dikbud Malang.png' },
                { name: 'Permasyarakatan Malang', src: '/Permasyarakatan Malang.png' },
                { name: 'Disporapar Malang', src: '/Disporapar Malang.jpg' },
                { name: 'BNN Malang', src: '/BNN Malang.jpg' },
                { name: 'DISPANGTAN Malang', src: '/DISPANGTAN Malang.jpg' },
              ].map((client, i) => (
                <div key={`set2-${i}`} className="flex items-center justify-center mx-8 w-40 h-24 opacity-60 hover:opacity-100 transition-opacity shrink-0">
                  <img src={client.src} alt={client.name} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
