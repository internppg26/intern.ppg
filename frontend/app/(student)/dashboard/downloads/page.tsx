'use client';

import React, { useState } from 'react';

export default function DownloadsPage() {
  const [activeFilter, setActiveFilter] = useState('All Files');

  const files = [
    { id: 1, title: 'Strategic_Human_Capital_v2.pdf', size: '4.2 MB', type: 'PDF', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
    { id: 2, title: 'Project_Budget_Template.xlsx', size: '1.8 MB', type: 'Excel', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><rect x="8" y="13" width="8" height="4"></rect><path d="M10 13v4"></path><path d="M14 13v4"></path><path d="M8 15h8"></path></> },
    { id: 3, title: 'Leadership_Training_Module_1.pdf', size: '5.5 MB', type: 'PDF', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
    { id: 4, title: 'Standard_Operating_Procedures.docx', size: '2.1 MB', type: 'Word', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
    { id: 5, title: 'Market_Analysis_Report_Q4.pdf', size: '3.7 MB', type: 'PDF', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
    { id: 6, title: 'Feedback_Form_Assessment.docx', size: '0.5 MB', type: 'Word', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path></> },
  ];

  const filteredFiles = activeFilter === 'All Files' 
    ? files 
    : files.filter(file => file.type === activeFilter);

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <span>LMS</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Materi Unduhan</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2">File & Materi Unduhan</h1>
          <p className="text-neutral-600 text-sm">Berkas dan materi yang telah Anda unduh dapat diakses secara offline dalam batas waktu sesuai course yang Anda ikuti.</p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All Files', 'PDF', 'Word', 'Excel', 'Images', 'Video'].map((tag) => (
            <button 
              key={tag} 
              onClick={() => setActiveFilter(tag)}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                activeFilter === tag 
                  ? 'bg-[#D47225] text-white font-bold shadow-md shadow-[#D47225]/20 border border-[#D47225]' 
                  : 'border border-neutral-200 bg-white text-neutral-600 font-medium hover:border-[#D47225] hover:text-[#D47225]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* File Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFiles.map((file) => (
            <div key={file.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F4E3D7] text-[#964B13] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {file.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B2545] text-sm break-all leading-tight mb-1">{file.title}</h3>
                  <div className="text-xs text-neutral-400 font-medium">
                    {file.size} &bull; {file.type}
                  </div>
                </div>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-[#D47225] text-[#D47225] font-bold text-sm hover:bg-[#D47225] hover:text-white transition-colors">
                Buka
              </button>
            </div>
          ))}
        </div>

        {/* Need More Help Box */}
        <div className="bg-[#FFF8F3] border border-dashed border-[#E5832E] rounded-3xl p-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white border border-[#E5832E] rounded-full flex items-center justify-center text-[#E5832E] mb-4 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 className="text-xl font-black text-[#964B13] mb-2">Butuh materi lainnya?</h3>
          <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Jika Anda tidak menemukan file yang dicari, silakan hubungi administrator program pelatihan Anda.
          </p>
          <button className="bg-[#0B2545] hover:bg-[#13325B] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#0B2545]/20">
            Hubungi Support
          </button>
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
