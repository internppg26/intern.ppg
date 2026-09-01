import React from 'react';

const services = [
  {
    title: 'Counseling',
    description: 'Program pendampingan yang berorientasi pada penyelesaian masalah psikologis atau hambatan kerja pada klien, agar individu mampu menyesuaikan diri secara cepat dengan lingkungan kerja.'
  },
  {
    title: 'Mentoring',
    description: 'Pendampingan berkelanjutan bagi setiap individu untuk memastikan kesejahteraan karyawan selama bekerja, serta menggali potensi kebahagiaan dan kesehatan individu.'
  },
  {
    title: 'Coaching',
    description: 'Program strategis yang bertujuan untuk Envisioning performance, Empowering performance, Enlarging performance value, hingga mencapai Extreme performance.'
  },
  {
    title: 'Training',
    description: 'Proses pemberian pelatihan khusus kepada peserta (trainee) sehingga mereka mendapatkan pengetahuan, keterampilan, dan sikap yang sesuai dengan harapan kerja.'
  },
  {
    title: 'Outbound',
    description: 'Kegiatan luar ruangan (outdoor) yang dirancang secara khusus untuk membangun karakter, meningkatkan kerjasama tim (team building), dan melatih jiwa kepemimpinan.'
  },
  {
    title: 'Support Services',
    description: 'Layanan pendukung profesional yang mencakup Assessment psikologi dan Research & Publishing untuk memastikan keputusan berbasis data yang akurat.'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Services</h2>
          <p className="text-neutral-gray">
            Kami menerapkan pendekatan sistematis melalui ACMCTO Model (Counseling, Mentoring, Coaching, Training, Outbound) yang dirancang khusus untuk memenuhi kebutuhan unik setiap mitra kami.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border-2 border-brand-dark/20 hover:border-brand-dark transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h3>
              <p className="text-neutral-gray text-sm font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
