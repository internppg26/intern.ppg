'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function CourseCatalogPage() {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrollmentsMap, setEnrollmentsMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      fetch('/api/programs', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(r => r.json()),
      fetch('/api/enrollments', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(r => r.json()).catch(() => [])
    ])
    .then(([programsData, enrollmentsData]) => {
      const mapped = programsData.map((p: any) => {
        let progName = 'Program';
        let progField = 'Course';
        if (p.category && p.category.includes('||')) {
          const parts = p.category.split('||');
          progName = parts[0].replace(/ Program/gi, '');
          progField = parts[1];
        } else if (p.category) {
          progName = p.category.replace(/ Program/gi, '');
        }

        let parsedPrice = 'Rp 0';
        try {
          if (p.description) {
            const desc = JSON.parse(p.description);
            if (desc.price) parsedPrice = `Rp ${desc.price}`;
          }
        } catch(e) {}

        return {
          id: p.id,
          title: p.title,
          programName: progName,
          programField: progField,
          duration: p.duration ? `${p.duration} Days` : 'Flexible',
          price: parsedPrice,
          img: p.thumbnail !== '/Logo_Performa_Puncak.png' ? p.thumbnail : 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000'
        };
      });
      setAllCourses(mapped);

      if (Array.isArray(enrollmentsData)) {
        const eMap: Record<string, any> = {};
        enrollmentsData.forEach((e: any) => {
          eMap[e.programId] = e;
        });
        setEnrollmentsMap(eMap);
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  const categories = ['Corporate', 'Government', 'Educational', 'Certification', 'Entrepreneurial', 'Public & In-House'];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter courses
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? course.programName === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [allCourses, searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="text-xs text-neutral-500 font-medium mb-4 flex items-center gap-2">
            LMS <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg> <span className="text-[#0B2545] font-bold">Katalog Pelatihan</span>
          </div>
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight mb-2 uppercase">EKSPLOR SEMUA PROGRAM PELATIHAN</h1>
          <p className="text-neutral-600 text-sm">Temukan dan daftar di program pelatihan terbaru kami untuk meningkatkan kompetensi Anda.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Cari program pelatihan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-[#0B2545] transition-colors" 
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-12px)_center] min-w-[200px]"
            >
              <option value="">Filter by Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat} Program</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {currentCourses.map((course) => {
              const enrollment = enrollmentsMap[course.id];
              const isVerified = enrollment && enrollment.paymentStatus === 'verified';
              const isPending = enrollment && enrollment.paymentStatus === 'pending';

              return (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative aspect-video">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#0B2545] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                      {course.programName}
                    </span>
                    <span className="bg-[#D47225] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                      {course.programField}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-[#0B2545] text-lg mb-4 leading-tight flex-grow">{course.title}</h3>
                  <div className="flex items-center text-neutral-500 text-sm mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    {!(isVerified || isPending) ? (
                      <span className="font-black text-[#D47225] text-lg">{course.price}</span>
                    ) : (
                      <span></span>
                    )}
                    {isVerified ? (
                      <Link href={`/dashboard/my-courses/${course.id}/material`} className="bg-[#0B2545] hover:bg-[#13325B] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-md ml-auto">
                        Buka Course &gt;
                      </Link>
                    ) : isPending ? (
                      <Link href={`/dashboard/payment/${course.id}/status`} className="bg-orange-100 text-orange-600 px-5 py-2 rounded-lg text-xs font-bold transition-colors text-center shadow-sm ml-auto">
                        Menunggu Verifikasi
                      </Link>
                    ) : (
                      <Link href={`/dashboard/catalog/${course.id}`} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-md">
                        Detail Course &gt;
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-neutral-200 rounded-2xl mb-12">
            <h3 className="text-xl font-bold text-[#0B2545] mb-2">Tidak ada hasil</h3>
            <p className="text-neutral-500">Silakan ubah kata kunci atau filter pencarian Anda.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-neutral-200 text-[#0B2545] hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                    currentPage === page 
                      ? 'bg-[#0B2545] text-white' 
                      : 'border border-neutral-200 text-[#0B2545] hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-neutral-200 text-[#0B2545] hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; 2024 Corporate Training LMS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0B2545]">Syarat Layanan</Link>
            <Link href="#" className="hover:text-[#0B2545]">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0B2545]">Pusat Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
