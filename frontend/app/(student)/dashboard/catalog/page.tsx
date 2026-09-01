'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function CourseCatalogPage() {
  const allCourses = [
    { id: 1, title: 'Fundamental UI/UX Design for Modern Products', programName: 'Corporate', programField: 'Design', duration: '4 Weeks', price: 'Rp 1.500.000', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000' },
    { id: 2, title: 'Advanced Fullstack Web Development with React', programName: 'Government', programField: 'Development', duration: '8 Weeks', price: 'Rp 3.250.000', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072' },
    { id: 3, title: 'Digital Marketing 101: Strategy & Execution', programName: 'Corporate', programField: 'Marketing', duration: '5 Weeks', price: 'Rp 1.200.000', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015' },
    { id: 4, title: 'Startup Management & Growth Frameworks', programName: 'Certification', programField: 'Business', duration: '6 Weeks', price: 'Rp 2.100.000', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070' },
    { id: 5, title: 'Introduction to Data Analytics with Python', programName: 'Educational', programField: 'Data', duration: '4 Weeks', price: 'Rp 1.800.000', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070' },
    { id: 6, title: 'Motion Graphics & Animation Mastery', programName: 'Public & In-House', programField: 'Creative', duration: '10 Weeks', price: 'Rp 4.500.000', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070' },
    { id: 7, title: 'Corporate Leadership & Executive Coaching', programName: 'Entrepreneurial', programField: 'Management', duration: '12 Weeks', price: 'Rp 5.000.000', img: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2070' },
    { id: 8, title: 'Public Speaking & Presentation Skills', programName: 'Public', programField: 'Communication', duration: '3 Weeks', price: 'Rp 800.000', img: 'https://images.unsplash.com/photo-1475721028070-281ce13fbb45?auto=format&fit=crop&q=80&w=2070' },
    { id: 9, title: 'Government Policy Analysis & Strategy', programName: 'Government', programField: 'Policy', duration: '8 Weeks', price: 'Rp 3.000.000', img: 'https://images.unsplash.com/photo-1529107336423-f368eb1a9e3e?auto=format&fit=crop&q=80&w=2070' },
    { id: 10, title: 'Financial Modeling for Startups', programName: 'Certification', programField: 'Finance', duration: '6 Weeks', price: 'Rp 2.500.000', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070' },
    { id: 11, title: 'Educational Leadership & Curriculum Design', programName: 'Educational', programField: 'Education', duration: '8 Weeks', price: 'Rp 2.200.000', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070' },
    { id: 12, title: 'Agile Project Management Masterclass', programName: 'In-House', programField: 'Project', duration: '5 Weeks', price: 'Rp 1.900.000', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070' },
  ];

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
            {currentCourses.map((course) => (
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
                    <span className="font-black text-[#D47225] text-lg">{course.price}</span>
                    <Link href={`/dashboard/catalog/${course.id}`} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors">
                      Lihat Detail &gt;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-neutral-200 rounded-2xl mb-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-neutral-300"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h3 className="font-bold text-xl text-[#0B2545] mb-2">Pencarian Tidak Ditemukan</h3>
            <p className="text-neutral-500">Coba gunakan kata kunci lain atau ubah filter pencarian Anda.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-10">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border ${currentPage === 1 ? 'border-neutral-100 text-neutral-300 cursor-not-allowed' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50 shadow-sm'} bg-white transition-colors`}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold shadow-sm transition-colors ${currentPage === page ? 'bg-[#0B2545] text-white' : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50 bg-white'}`}
                >
                  {page}
                </button>
              );
            })}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border ${currentPage === totalPages ? 'border-neutral-100 text-neutral-300 cursor-not-allowed' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50 shadow-sm'} bg-white transition-colors`}
            >
              &gt;
            </button>
          </div>
        )}

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
