'use client';

import React from 'react';
import Link from 'next/link';

export default function CertificatesPage() {
  const [certificates, setCertificates] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState('User');

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserName(user.name || 'User');
      } catch (e) {}
    }

    fetch('/api/enrollments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const completed = data.filter(e => e.status === 'completed' || e.isCompleted === true);
        const certs = completed.map((enr) => {
           const course = enr.Program;
           if (!course) return null;
           return {
             id: enr.id,
             title: course.title,
             issued: new Date(enr.completedAt || enr.updatedAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
             certId: `PPG-CERT-${enr.id.toString().padStart(4, '0')}`,
             image: course.thumbnail && course.thumbnail !== '/Logo_Performa_Puncak.png' ? course.thumbnail : 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
           };
        }).filter(Boolean);
        setCertificates(certs);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const handlePrint = (cert: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Certificate - ${cert.title}</title>
            <style>
              body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff; }
              @page { size: A4 landscape; margin: 0; }
              .cert-container { 
                width: 100%; height: 100vh; position: relative; overflow: hidden;
                display: flex; flex-direction: column; justify-content: center; padding-left: 100px; box-sizing: border-box;
              }
              .decor-left { position: absolute; left: 0; top: 0; bottom: 0; width: 60px; background: #0B2545; }
              .decor-top-left { position: absolute; left: 60px; top: 0; width: 200px; height: 150px; background: #D47225; border-bottom-right-radius: 100%; }
              .decor-bottom-right { position: absolute; right: 0; bottom: 0; width: 300px; height: 300px; background: #F4E3D7; border-top-left-radius: 100%; z-index: -1; }
              .content { max-width: 800px; z-index: 10; position: relative; }
              .header { font-size: 14px; text-transform: uppercase; letter-spacing: 4px; color: #D47225; font-weight: bold; margin-bottom: 20px; }
              h1 { font-size: 42px; color: #0B2545; margin: 0 0 40px 0; font-weight: 900; }
              .awarded-to { font-size: 16px; color: #666; margin-bottom: 10px; }
              .name { font-size: 36px; font-weight: bold; color: #0B2545; border-bottom: 3px solid #D47225; display: inline-block; padding-bottom: 10px; margin-bottom: 30px; text-transform: uppercase; }
              .desc { font-size: 18px; color: #555; max-width: 600px; line-height: 1.6; margin-bottom: 50px; }
              .course-title { font-weight: bold; color: #0B2545; }
              .footer { display: flex; justify-content: space-between; align-items: flex-end; max-width: 750px; }
              .signature { border-top: 1px solid #000; padding-top: 10px; width: 200px; text-align: center; }
              .signature p { margin: 0; font-size: 14px; font-weight: bold; }
              .signature span { font-size: 12px; color: #666; }
              .meta { text-align: right; }
              .meta p { margin: 5px 0; font-size: 14px; color: #555; }
              .meta strong { color: #0B2545; }
            </style>
          </head>
          <body>
            <div class="cert-container">
              <div class="decor-left"></div>
              <div class="decor-top-left"></div>
              <div class="decor-bottom-right"></div>
              
              <div class="content">
                <div class="header">Certificate of Completion</div>
                <h1>${cert.title}</h1>
                <div class="awarded-to">This certificate is proudly presented to</div>
                <div class="name">${userName}</div>
                <div class="desc">
                  Has been awarded a certificate of completion for the <span class="course-title">${cert.title}</span> course, demonstrating a commitment to continuous learning and professional development.
                </div>
                
                <div class="footer">
                  <div class="signature">
                    <div style="font-family: 'Brush Script MT', cursive; font-size: 32px; color: #0B2545; padding-bottom: 10px;">M. Rizqi</div>
                    <p>M. Rizqi Fahruddien</p>
                    <span>CEO, Performa Puncak Group</span>
                  </div>
                  
                  <div class="meta">
                    <p>Issued on: <strong>${cert.issued}</strong></p>
                    <p>Certificate ID: <strong>${cert.certId}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
            <script>
              setTimeout(() => {
                const element = document.querySelector('.cert-container');
                const opt = {
                  margin:       0,
                  filename:     'Certificate_${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf',
                  image:        { type: 'jpeg', quality: 1 },
                  html2canvas:  { scale: 2, useCORS: true },
                  jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
                };
                html2pdf().set(opt).from(element).save().then(() => {
                  setTimeout(() => window.close(), 500);
                });
              }, 1000);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <span>LMS</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">E-Certificate</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">Sertifikat Elektronik</h1>
          <p className="text-neutral-600 text-sm">Kumpulan sertifikat dari pelatihan yang telah Anda selesaikan.</p>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            <div className="col-span-2 text-center py-10">Memuat sertifikat...</div>
          ) : certificates.map((cert) => (
            <div key={cert.id} className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              
              {/* Image Preview Area */}
              <div className="aspect-[4/3] bg-[#F8F9FA] relative p-6 border-b border-neutral-200">
                {cert.image ? (
                  <div className="w-full h-full relative rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
                    {/* Mock certificate elements */}
                    <div className="absolute inset-8 border border-white/60 p-4 flex flex-col items-center justify-center text-center">
                       <div className="text-[8px] uppercase tracking-widest text-[#0B2545] font-bold mb-4">Certificate of Achievement</div>
                       <div className="w-12 h-12 rounded-full border-2 border-[#D47225] flex items-center justify-center text-[#D47225] mb-4">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                       </div>
                       <div className="w-32 h-1 bg-neutral-300 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                    <div className="w-24 h-1 bg-neutral-200 rounded-full mb-2"></div>
                    <div className="w-32 h-1 bg-neutral-200 rounded-full"></div>
                  </div>
                )}
                
                {/* Check Badge */}
                <div className="absolute -bottom-4 right-6 w-8 h-8 bg-white rounded-full p-1 shadow-md">
                  <div className="w-full h-full bg-[#D47225] rounded-full flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-black text-[#0B2545] text-lg mb-4">{cert.title}</h3>
                
                <div className="space-y-2 mb-8 text-xs font-medium text-neutral-500">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Issued: {cert.issued}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    ID: {cert.certId}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button onClick={() => handlePrint(cert)} className="flex-1 bg-[#D47225] hover:bg-[#B55D1A] text-white py-3 rounded-full font-bold text-sm transition-colors shadow-md shadow-[#D47225]/20">
                    Unduh PDF
                  </button>
                  <button className="flex-1 border-2 border-neutral-300 text-neutral-600 hover:border-[#0B2545] hover:text-[#0B2545] py-3 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State / Add More Card */}
          <div className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-100 hover:border-neutral-400 transition-all cursor-pointer min-h-[300px]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-neutral-400 shadow-sm mb-6 border border-neutral-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <h3 className="font-black text-[#0B2545] text-lg mb-2">Selesaikan Pelatihan Lainnya</h3>
            <p className="text-neutral-500 text-sm max-w-xs mb-6">Dapatkan sertifikat baru dengan menyelesaikan kursus yang Anda ambil.</p>
            <Link href="/dashboard/catalog" className="text-[#0B2545] font-bold text-sm border-b-2 border-[#0B2545] hover:text-[#D47225] hover:border-[#D47225] pb-1 transition-colors">
              Lihat Katalog Kursus
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#0B2545]">Syarat Layanan</a>
            <a href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#0B2545]">Pusat Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
