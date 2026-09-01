'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Top Breadcrumb & Icons */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs text-neutral-500 font-medium">
            <Link href="/dashboard/catalog" className="hover:text-[#0B2545]">Katalog Pelatihan</Link>
            <span className="mx-2">&rsaquo;</span>
            <span>Corporate Program</span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-[#0B2545] font-bold">Corporate Strategy Masterclass</span>
          </div>
          <div className="flex gap-4 text-neutral-600">
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></button>
            <button className="hover:text-[#0B2545]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0B2545] rounded-3xl p-10 md:p-12 text-white flex flex-col lg:flex-row items-center gap-10 mb-12">
          <div className="flex-1">
            <div className="flex gap-2 mb-6">
              <span className="bg-[#D47225] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">MASTERCLASS</span>
              <span className="bg-[#8BA4B5] text-[#0B2545] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">CORPORATE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-none mb-10 tracking-tight uppercase">
              PROFESSIONAL<br/>DEVELOPMENT:<br/>CORPORATE<br/>STRATEGY<br/>MASTERCLASS
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-[#E5832E]">★</span> <strong className="text-white">4.8</strong> (2.5k Ratings)
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <strong className="text-white">12,450</strong> Students
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                English, Indonesian
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[450px] relative aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-white/10">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#D47225] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Column */}
          <div className="flex-1">
            
            <section className="mb-12">
              <h2 className="text-2xl font-black text-[#0B2545] border-l-4 border-[#D47225] pl-4 mb-6 uppercase">ABOUT THIS COURSE</h2>
              <div className="text-neutral-600 space-y-4 text-sm leading-relaxed">
                <p>Unlock the complexities of corporate strategy in this intensive masterclass designed for future leaders. Gain insights into competitive positioning, organizational growth, and dynamic market entry strategies. This program combines academic rigor with practical frameworks used by Fortune 500 consulting firms.</p>
                <p>Participants will deep dive into financial modeling, cross-functional leadership, and sustainable business transformation in the digital era.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-[#0B2545] border-l-4 border-[#D47225] pl-4 mb-6 uppercase">WHAT YOU WILL LEARN</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Framework Design", desc: "Define and execute competitive business frameworks tailored for global expansion." },
                  { title: "Market Analysis", desc: "Analyze complex market data to drive strategic decisions and risk mitigation." },
                  { title: "Change Management", desc: "Master organizational change management principles for agile environments." },
                  { title: "Team Leadership", desc: "Lead high-performance teams through volatile and uncertain market conditions." },
                ].map((item, i) => (
                  <div key={i} className="bg-[#FFF8F3] p-6 rounded-xl border border-[#F4E3D7]">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#B55D1A] text-white flex items-center justify-center flex-shrink-0 mt-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div>
                        <h3 className="font-black text-[#0B2545] mb-2">{item.title}</h3>
                        <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-[#0B2545] border-l-4 border-[#D47225] pl-4 mb-6 uppercase">COURSE TIMELINE & MODULES</h2>
              <div className="space-y-4">
                {[
                  { num: "01", title: "Phase 1: Foundation and Core Principles" },
                  { num: "02", title: "Phase 2: Strategic Implementation" },
                  { num: "03", title: "Phase 3: Organizational Change Management" },
                  { num: "04", title: "Phase 4: Capstone Project & Evaluation" },
                ].map((item, i) => (
                  <div key={i} className="border border-neutral-200 rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-[#0B2545] transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-[#D47225] font-black">{item.num}</span>
                      <span className="font-bold text-[#0B2545]">{item.title}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[350px]">
            
            {/* Investment Box */}
            <div className="bg-white border border-neutral-200 shadow-xl rounded-2xl p-8 mb-8 sticky top-8">
              <div className="mb-8 text-center">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">INVESTMENT</span>
                <div className="text-4xl font-black text-[#0B2545]">
                  <span className="text-xl">Rp </span>4.999.000
                </div>
              </div>
              
              <Link href="/dashboard/checkout" className="block w-full bg-[#B55D1A] hover:bg-[#964B13] text-white text-center py-4 rounded-xl font-bold text-sm tracking-wider uppercase mb-8 transition-colors shadow-lg shadow-[#B55D1A]/30">
                ENROLL NOW / DAFTAR SEKARANG
              </Link>

              <div>
                <h4 className="text-xs font-bold text-[#0B2545] mb-4">This Course Includes:</h4>
                <ul className="space-y-4 text-xs text-neutral-600 font-medium">
                  <li className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B55D1A" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    24 Hours of On-demand Video
                  </li>
                  <li className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B55D1A" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    15 Downloadable Resources
                  </li>
                  <li className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B55D1A" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                    Professional Certificate
                  </li>
                  <li className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B55D1A" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Full Lifetime Access
                  </li>
                </ul>
              </div>
            </div>

            {/* Instructor Box */}
            <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">INSTRUCTOR</span>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" alt="Instructor" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-[#0B2545] text-sm">Dr. Jane Smith</h4>
                  <p className="text-xs text-[#D47225] font-medium">Senior Strategy Consultant</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#0B2545]">Syarat Layanan</Link>
            <Link href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0B2545]">Pusat Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
