'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AssessmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  const [assessments, setAssessments] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/exams', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((ex: any) => {
            const studentName = ex.student?.name || 'Unknown';
            const initials = studentName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
            
            const dateObj = new Date(ex.createdAt);
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const needsGrading = ex.score === null || ex.passed === null;

            return {
              id: ex.id,
              name: studentName,
              initials,
              avatar: null,
              cohort: ex.student?.email || 'Student',
              title: ex.Module?.title || 'Unknown Exam',
              module: 'Module Assessment',
              date: dateStr,
              time: timeStr,
              status: needsGrading ? 'NEEDS GRADING' : 'REVIEWED',
              needsGrading
            };
          });
          setAssessments(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      }
    };
    fetchAssessments();
  }, []);

  // Filtering Logic
  const filteredData = assessments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'pending' ? item.status === 'NEEDS GRADING' : item.status === 'REVIEWED';
    return matchesSearch && matchesTab;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (safeCurrentPage < totalPages) setCurrentPage(safeCurrentPage + 1);
  };
  const goToPrevPage = () => {
    if (safeCurrentPage > 1) setCurrentPage(safeCurrentPage - 1);
  };

  // Tab counts
  const pendingCount = assessments.filter(a => a.status === 'NEEDS GRADING').length;

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar / Search */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-full max-w-xl">
          
        </div>
        <div className="flex items-center gap-4 ml-4 border-l border-neutral-200 pl-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
          <div className="max-w-lg">
            <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mb-2">
              Assessments & Grading
            </h1>
            <p className="text-neutral-500 text-sm">
              Review student submissions, provide detailed feedback, and track the overall performance of your cohorts across all active modules.
            </p>
          </div>
          
          <div className="flex bg-neutral-100 p-1.5 rounded-full shrink-0 border border-neutral-200">
            <button 
              onClick={() => { setActiveTab('pending'); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-white text-[#0B2545] shadow-sm' : 'text-neutral-500 hover:text-[#0B2545]'}`}
            >
              Pending Review ({pendingCount})
            </button>
            <button 
              onClick={() => { setActiveTab('completed'); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'completed' ? 'bg-white text-[#0B2545] shadow-sm' : 'text-neutral-500 hover:text-[#0B2545]'}`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by participant name..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-3 bg-neutral-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
            />
          </div>
          
          <select className="px-5 py-3 bg-neutral-100 border-none rounded-full text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center]">
            <option>All Modules</option>
          </select>
          
          <select className="px-5 py-3 bg-neutral-100 border-none rounded-full text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center]">
            <option>Latest Submissions</option>
          </select>

          <button className="bg-[#0B2545] text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#13325B] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            More Filters
          </button>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-50/50">
            <div className="col-span-3">Participant Name</div>
            <div className="col-span-4">Assessment Title</div>
            <div className="col-span-2">Submitted Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-neutral-100">
            {paginatedData.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-neutral-50/50 transition-colors">
                
                {/* Name */}
                <div className="col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold">{item.initials}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2545] text-sm">{item.name}</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{item.cohort}</p>
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-4">
                  <h4 className="font-bold text-[#0B2545] text-sm">{item.title}</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{item.module}</p>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-[#0B2545]">{item.date}</p>
                  <p className={`text-[10px] font-bold mt-0.5 ${item.time.includes('Overdue') ? 'text-red-500' : 'text-neutral-500'}`}>
                    {item.time}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-block px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.status === 'NEEDS GRADING' 
                      ? 'bg-[#FFF8F3] text-[#D47225] border border-[#F4E3D7]' 
                      : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-center">
                  {item.status === 'NEEDS GRADING' ? (
                    <Link href={`/coach/assessments/${item.id}`} className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-5 py-2.5 rounded-full text-[11px] font-bold transition-colors shadow-sm text-center w-full max-w-[120px]">
                      Grade /<br/>Review
                    </Link>
                  ) : (
                    <Link href={`/coach/assessments/${item.id}`} className="border-2 border-neutral-300 text-neutral-500 hover:border-[#0B2545] hover:text-[#0B2545] px-5 py-2.5 rounded-full text-[11px] font-bold transition-colors text-center w-full max-w-[120px]">
                      View<br/>Details
                    </Link>
                  )}
                </div>

              </div>
            ))}
            
            {paginatedData.length === 0 && (
              <div className="py-8 text-center text-sm text-neutral-500">
                Tidak ada data yang ditemukan.
              </div>
            )}
          </div>
        </div>

        {/* Pagination & Bottom Info */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-bold text-[#0B2545]">{paginatedData.length > 0 ? startIndex + 1 : 0} to {startIndex + paginatedData.length}</span> of <span className="font-bold text-[#0B2545]">{filteredData.length}</span> results
          </p>
          <div className="flex gap-2">
            <button 
              onClick={goToPrevPage}
              disabled={safeCurrentPage === 1}
              className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors ${safeCurrentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  pageNum === safeCurrentPage 
                    ? 'bg-[#0B2545] text-white shadow-md' 
                    : 'bg-white text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button 
              onClick={goToNextPage}
              disabled={safeCurrentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-colors ${safeCurrentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
