import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark opacity-90 z-0"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <p className="text-sm md:text-base font-semibold mb-4 tracking-wider text-neutral-300 uppercase">
            Implementing the Comprehensive ACMCTO Model For Organizational Excellence
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-wide leading-tight">
            Our Peak Performance Services
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Sinergi layanan Peak Performance kami beroperasi secara sistematis. Diawali dari diagnose, intervensi, hingga evaluasi. Kami menyesuaikan setiap pendekatan dengan kebutuhan spesifik organisasi Anda untuk mencapai hasil kinerja yang ultimate.
          </p>
        </div>
      </section>

      {/* Service 1: Assessment & Coaching */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" alt="Assessment & Coaching" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6 uppercase">Assessment & Coaching</h2>
              <p className="text-neutral-gray leading-relaxed text-justify">
                Layanan diagnostik dan pendampingan strategis. Kami melakukan asesmen psikologi dan non-psikologi secara komprehensif untuk menggali potensi tersembunyi individu. Hasil asesmen ini dilanjutkan dengan program coaching yang dirancang spesifik untuk envisioning, empowering, enlarging performance value, hingga mencapai tahap extreme performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Mentoring & Counseling */}
      <section className="py-20 bg-bg-beige">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop" alt="Mentoring & Counseling" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6 uppercase">Mentoring & Counseling</h2>
              <p className="text-neutral-gray leading-relaxed text-justify">
                Pendekatan personal yang berorientasi pada penyelesaian masalah dan kesejahteraan SDM. Layanan konseling kami ditujukan agar klien mampu mengatasi masalah psikologis dan menyesuaikan diri dengan lingkungan kerja. Didukung dengan program mentoring berkelanjutan untuk memastikan setiap individu menggali potensi kebahagiaan dan kesehatan selama bekerja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Training & Outbound Gathering */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" alt="Training & Outbound" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6 uppercase">Training & Outbound Gathering</h2>
              <p className="text-neutral-gray leading-relaxed text-justify">
                Sinergi antara peningkatan kapasitas intelektual dan ketahanan mental-emosional. Program training kami membekali peserta dengan pengetahuan, keterampilan, dan sikap kerja yang berorientasi pada target kinerja. Dikombinasikan dengan outbound luar ruangan yang dirancang untuk menghancurkan hambatan organisasi dan mengefektifkan kerja sama (super team).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Research & Publishing */}
      <section className="py-20 bg-bg-beige">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop" alt="Research & Publishing" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6 uppercase">Research & Publishing</h2>
              <p className="text-neutral-gray leading-relaxed text-justify">
                Dukungan strategis berbasis data dan landasan keilmuan yang valid. Kami memfasilitasi kegiatan penelitian dan publikasi yang dilaksanakan secara ketat sesuai dengan standar akademik dan pendekatan ilmiah, memberikan solusi dan referensi yang terukur bagi pertumbuhan bisnis mitra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
            BUTUH SOLUSI YANG LEBIH SESUAI UNTUK PERUSAHAAN ANDA?
          </h2>
          <p className="text-lg text-neutral-gray mb-10">
            Hubungi spesialis kami untuk merancang roadmap kinerja yang disesuaikan dengan tujuan organisasi Anda.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-full shadow-md transition-colors uppercase text-sm">
            Hubungi Konsultan Kami <span className="ml-2">✉</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
