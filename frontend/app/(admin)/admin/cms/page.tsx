'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminCMSPage() {
  const [articles, setArticles] = React.useState([
    { id: 1, tag: 'STRATEGY', date: 'OCT 26, 2024', title: 'NAVIGATING EXPONENTIAL GROWTH FOR TECH STARTUPS', desc: 'The landscape for early-stage companies is shifting. We explore how to maintain culture during rapid expansion phases.', image: '/Logo_Performa_Puncak.png' },
    { id: 2, tag: 'EDUCATION', date: 'OCT 20, 2024', title: 'UPCOMING EXECUTIVE LEADERSHIP WORKSHOP', desc: 'Join our network of elite professionals for a three-day intensive on disruptive leadership in the digital era.', image: '/Logo_Performa_Puncak.png' },
    { id: 3, tag: 'INSIGHTS', date: 'SEP 28, 2024', title: 'BUILDING SUSTAINABLE TECH ECOSYSTEMS', desc: 'Sustainability is no longer optional. How modern corporations are integrating ESG into their core tech stack.', image: '/Logo_Performa_Puncak.png' },
    { id: 4, tag: 'WORK', date: 'SEP 14, 2024', title: 'THE FUTURE OF HYBRID COLLABORATION', desc: 'New tools and methodologies for keeping distributed teams engaged and productive in 2025.', image: '/Logo_Performa_Puncak.png' },
    { id: 5, tag: 'UPDATES', date: 'SEP 02, 2024', title: 'Q3 PLATFORM MAINTENANCE SCHEDULE', desc: 'Essential updates on our LMS infrastructure and planned downtime for performance optimization.', image: '/Logo_Performa_Puncak.png' },
    { id: 6, tag: 'RESOURCES', date: 'AUG 20, 2024', title: 'TOP 10 PRODUCTIVITY TOOLS FOR LEADERS', desc: 'Our curated list of software that top-tier executives use to streamline their daily workflows.', image: '/Logo_Performa_Puncak.png' },
    { id: 7, tag: 'STRATEGY', date: 'OCT 26, 2024', title: 'NAVIGATING EXPONENTIAL GROWTH FOR TECH STARTUPS', desc: 'The landscape for early-stage companies is shifting. We explore how to maintain culture during rapid expansion phases.', image: '/Logo_Performa_Puncak.png' },
    { id: 8, tag: 'EDUCATION', date: 'OCT 20, 2024', title: 'UPCOMING EXECUTIVE LEADERSHIP WORKSHOP', desc: 'Join our network of elite professionals for a three-day intensive on disruptive leadership in the digital era.', image: '/Logo_Performa_Puncak.png' },
    { id: 9, tag: 'INSIGHTS', date: 'SEP 28, 2024', title: 'BUILDING SUSTAINABLE TECH ECOSYSTEMS', desc: 'Sustainability is no longer optional. How modern corporations are integrating ESG into their core tech stack.', image: '/Logo_Performa_Puncak.png' },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [modalData, setModalData] = React.useState({ judul: '', caption: '', tag: '', image: '' });
  const [isSelectingTopNews, setIsSelectingTopNews] = React.useState(false);
  const [topNewsId, setTopNewsId] = React.useState(1);

  React.useEffect(() => {
    const saved = localStorage.getItem('cms_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      localStorage.setItem('cms_articles', JSON.stringify(articles));
    }
  }, []);

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('cms_articles', JSON.stringify(articles));
  }, [articles]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setModalData({ ...modalData, image: imageUrl });
    }
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white font-sans relative">
      
      {/* Public Header Mock */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-neutral-100 shrink-0 relative">
        <div className="flex items-center gap-3 z-10">
          <div className="w-8 h-8">
            <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm text-[#0B2545] tracking-wide">Performa Puncak Group</span>
        </div>
        
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-xs font-bold text-[#0B2545]">
          <Link href="#" className="hover:text-[#E5832E] transition-colors">Home</Link>
          <Link href="#" className="hover:text-[#E5832E] transition-colors">About Us</Link>
          <Link href="#" className="hover:text-[#E5832E] transition-colors">Services</Link>
          <Link href="#" className="hover:text-[#E5832E] transition-colors">Program</Link>
          <Link href="/admin/schedule" className="hover:text-[#E5832E] transition-colors">Schedule</Link>
          <Link href="/admin/cms" className="text-[#E5832E] border-b-2 border-[#E5832E] pb-1">Blog</Link>
          <Link href="#" className="hover:text-[#E5832E] transition-colors">Gallery</Link>
        </nav>
        
        {/* Placeholder for symmetry / Future CTA */}
        <div className="hidden lg:block w-32 z-10"></div>
        {/* Mobile menu */}
        <div className="w-8 h-8 lg:hidden"></div>
      </header>

      {/* Main CMS Layout */}
      <main className="flex-1 px-8 lg:px-16 py-10 max-w-[1400px] mx-auto w-full">
        
        {/* Page Title & Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <h1 className="text-4xl lg:text-5xl font-black text-[#0B2545] uppercase tracking-tight">
            BLOG, NEWS & <span className="text-[#E5832E]">INSIGHTS</span>
          </h1>
          <button 
            onClick={() => setIsSelectingTopNews(!isSelectingTopNews)}
            className={`${isSelectingTopNews ? 'bg-[#f59e0b] text-white hover:bg-[#d97706] border-[#f59e0b]' : 'border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[#fffbeb]'} border-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shrink-0`}
          >
            {isSelectingTopNews ? 'SIMPAN TOP NEWS' : 'GANTI TOP NEWS'}
          </button>
        </div>

        {/* Hero Section */}
        {(() => {
          const topNews = articles.find(a => a.id === topNewsId) || articles[0] || { tag: 'STRATEGY', title: 'HOW STRATEGIC CONSULTING DRIVES OPERATIONAL EXCELLENCE IN MODERN TECH', desc: 'Discover the core principles of transformation that are helping global leaders scale their operations while maintaining elite performance standards.', image: '/Logo_Performa_Puncak.png', id: 1 };
          return (
            <div className="relative rounded-3xl overflow-hidden bg-[#0A3042] text-white min-h-[400px] flex items-center p-10 lg:p-16 mb-12 shadow-lg">
              {topNews.image && topNews.image !== '/Logo_Performa_Puncak.png' && (
                 <img src={topNews.image} alt={topNews.title} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
              )}
              {/* Background pattern/image mock */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%200L40%2020L20%2040L0%2020L20%200Z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')]"></div>
              
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block bg-[#E5832E] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">{topNews.tag}</span>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-6">
                  {topNews.title}
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-xl">
                  {topNews.desc}
                </p>
                <Link href={`/admin-cms/${topNews.id}?title=${encodeURIComponent(topNews.title || '')}&tag=${encodeURIComponent(topNews.tag || '')}&desc=${encodeURIComponent(topNews.desc || '')}&image=${encodeURIComponent(topNews.image || '')}`} className="inline-block bg-[#E5832E] hover:bg-[#D47225] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
                  Buka Detail
                </Link>
              </div>
            </div>
          );
        })()}

        {/* Filters and Add Article Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#0B2545] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
              ALL POSTS
            </button>
            <button className="bg-[#FAF7F2] text-[#0B2545] hover:bg-[#F0EBE1] border border-[#F0EBE1] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
              CASE STUDIES
            </button>
            <button className="bg-[#FAF7F2] text-[#0B2545] hover:bg-[#F0EBE1] border border-[#F0EBE1] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
              TRAINING UPDATES
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={() => {
                setModalData({ judul: '', caption: '', tag: '', image: '' });
                setIsModalOpen(true);
              }}
              className="border-2 border-[#E5832E] text-[#E5832E] hover:bg-[#FFF4EB] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0 self-end lg:self-auto mb-2 sm:mb-0"
            >
              Tambah Berita
            </button>
            <div className="relative w-full sm:w-64">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..." 
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 bg-[#F9FAFC] rounded-full text-xs focus:outline-none focus:border-[#0B2545]"
              />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
          {paginatedArticles.length > 0 ? paginatedArticles.map((article) => (
            <div key={article.id} className="flex flex-col group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-5 bg-[#0B2545] aspect-video relative flex items-center justify-center border border-neutral-100 shadow-sm group-hover:shadow-md transition-all">
                {/* Delete Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
                      setArticles(articles.filter(a => a.id !== article.id));
                    }
                  }}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20"
                  title="Hapus Berita"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#E5832E] text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {article.tag}
                  </span>
                </div>
                
                {article.image && article.image !== '/Logo_Performa_Puncak.png' ? (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover absolute inset-0 z-0" />
                ) : (
                  <>
                    {/* Mock abstract tech pattern */}
                    <div className="opacity-20 w-32 h-32 rounded-full border-[10px] border-white/40 blur-sm"></div>
                    <div className="opacity-10 absolute w-full h-full border-[20px] border-white/20 rounded-full scale-150"></div>
                    <h3 className="absolute z-10 text-white font-black text-2xl tracking-widest uppercase opacity-80 mix-blend-overlay">
                      {article.tag}
                    </h3>
                  </>
                )}
              </div>
              
              <div className="flex flex-col flex-1 relative">
                {isSelectingTopNews && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTopNewsId(article.id);
                    }}
                    className="absolute right-0 top-0 transition-transform hover:scale-110 z-10"
                    title="Jadikan Top News"
                  >
                    {topNewsId === article.id ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="transparent"></rect><polyline points="8 12 11 15 16 9"></polyline></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                    )}
                  </button>
                )}
                <span className="text-[10px] font-bold text-[#E5832E] tracking-widest uppercase mb-2">
                  {article.date}
                </span>
                <h3 className="text-sm font-black text-[#0B2545] uppercase tracking-tight leading-tight mb-3 group-hover:text-[#E5832E] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6 flex-1">
                  {article.desc}
                </p>
                <div>
                  <Link href={`/admin-cms/${article.id}?title=${encodeURIComponent(article.title || '')}&tag=${encodeURIComponent(article.tag || '')}&desc=${encodeURIComponent(article.desc || '')}&image=${encodeURIComponent(article.image || '')}`} className="bg-[#E5832E] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-[#D47225] inline-block">
                    BUKA DETAIL
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-neutral-400 font-medium">
              Tidak ada berita yang sesuai dengan pencarian Anda.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-16">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-400 hover:text-[#0B2545] hover:border-[#0B2545]'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${currentPage === page ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-neutral-100'}`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-400 hover:text-[#0B2545] hover:border-[#0B2545]'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}

      </main>

      {/* Public Footer Mock */}
      <footer className="bg-[#0B2545] text-white py-16 px-8 lg:px-16 shrink-0 border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6">
                <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-sm tracking-wide">Performa Puncak Group</span>
            </div>
            <p className="text-[10px] text-white/70 leading-relaxed mb-6 max-w-xs">
              Greenland at Tidar Blok C-10,<br/>
              Malang, East Java, Indonesia
            </p>
            <div className="space-y-3 text-[10px] text-white/70">
              <div className="flex items-center gap-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +62 813 3535-8585
              </div>
              <div className="flex items-center gap-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                performapuncak@gmail.com
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/50 mb-6">COMPANY</h4>
            <ul className="space-y-4 text-xs">
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Our Services</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Business Pillars</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/50 mb-6">RESOURCES</h4>
            <ul className="space-y-4 text-xs">
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">LMS Portal</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Blog & News</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Gallery</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Schedule</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/50 mb-6">LEGAL</h4>
            <ul className="space-y-4 text-xs">
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#E5832E] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/50">
          <p>© 2023 PT. Performa Puncak Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></button>
            <button className="hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
            <button className="hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></button>
          </div>
        </div>
      </footer>
      
      {/* Add Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 flex justify-center items-center shrink-0">
              <h3 className="font-bold text-[#0B2545] text-sm text-center">Isi Informasi Cover Berita</h3>
            </div>
            
            {/* Modal Body */}
            <div className="px-8 pb-8 overflow-y-auto space-y-4">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#0B2545]">Judul Berita</label>
                <input 
                  type="text" 
                  value={modalData.judul}
                  onChange={(e) => setModalData({...modalData, judul: e.target.value})}
                  placeholder="Isi judul berita"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-[#0B2545] outline-none transition-colors focus:border-[#0B2545]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#0B2545]">Caption</label>
                <input 
                  type="text" 
                  value={modalData.caption}
                  onChange={(e) => setModalData({...modalData, caption: e.target.value})}
                  placeholder="Isi caption singkat"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-[#0B2545] outline-none transition-colors focus:border-[#0B2545]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#0B2545]">Tag</label>
                <input 
                  type="text" 
                  value={modalData.tag}
                  onChange={(e) => setModalData({...modalData, tag: e.target.value})}
                  placeholder="Isi tag"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-[#0B2545] outline-none transition-colors focus:border-[#0B2545]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#0B2545]">Unggah Gambar/Foto untuk Cover</label>
                <div 
                  className="w-full h-32 border-2 border-dashed border-[#0B2545] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors relative overflow-hidden group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {modalData.image ? (
                    <img src={modalData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#0B2545] flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    const newArticle = {
                      id: Date.now(),
                      tag: modalData.tag || 'NEWS',
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
                      title: modalData.judul || 'UNTITLED ARTICLE',
                      desc: modalData.caption || 'No description provided.',
                      image: modalData.image || '/Logo_Performa_Puncak.png'
                    };
                    setArticles([newArticle, ...articles]);
                    setIsModalOpen(false);
                  }}
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white text-xs font-bold py-2.5 rounded-md transition-colors"
                >
                  Simpan
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-500 text-xs font-bold py-2.5 rounded-md transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
