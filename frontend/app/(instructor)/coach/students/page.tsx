'use client';

import React, { useState, useEffect } from 'react';

export default function MyStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/enrollments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Transform API data to match UI needs
          const formattedStudents = data.map((enr: any) => {
            const studentName = enr.student?.name || 'Unknown User';
            const initials = studentName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
            
            // Calculate progress simply for now
            const progress = enr.progress || 0;
            const moduleProgress = progress === 100 ? 'Completed' : `${progress}%`;
            
            // Calculate last active (just format the updated date for now)
            const lastActive = new Date(enr.updatedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });

            return {
              id: enr.id,
              name: studentName,
              email: enr.student?.email || '',
              course: enr.Program?.title || 'Unknown Course',
              progress,
              moduleProgress,
              lastActive,
              initials,
              avatar: null // no avatar in db currently
            };
          });
          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      }
    };

    fetchStudents();
  }, []);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#0B2545] tracking-tight leading-tight mb-2">
              Students & Progress<br />Tracking
            </h1>
            <p className="text-neutral-500 text-sm max-w-md">
              Monitor performance and engagement across your active classes.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search student name..." 
                className="pl-10 pr-4 py-2.5 bg-neutral-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 min-w-[250px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="px-4 py-2.5 bg-neutral-100 border-none rounded-xl text-sm font-medium text-[#0B2545] focus:outline-none appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230B2545%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-12px)_center]">
              <option>Filter by Class</option>
            </select>
          </div>
        </div>

        {/* Students Table/List */}
        <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-50/50">
            <div className="col-span-4">Student Name</div>
            <div className="col-span-3">Enrolled Course</div>
            <div className="col-span-2">Completion Progress</div>
            <div className="col-span-1">Last Active</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-neutral-100">
            {students
              .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((student) => (
              <div key={student.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-neutral-50/50 transition-colors">
                
                {/* Name & Avatar */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#EAF1F8] flex items-center justify-center shrink-0 border border-neutral-200">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold text-[#0B2545]">{student.initials}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2545]">{student.name}</h4>
                    <p className="text-[11px] text-neutral-500">{student.email}</p>
                  </div>
                </div>

                {/* Course Badge */}
                <div className="col-span-3">
                  <span className="inline-block bg-[#EAF1F8] text-[#0B2545] text-xs font-semibold px-3 py-1.5 rounded-lg leading-tight max-w-[200px]">
                    {student.course}
                  </span>
                </div>

                {/* Progress */}
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-[#0B2545] flex items-center gap-1">
                      {student.progress}%
                      {student.progress === 100 && <svg className="w-3 h-3 text-[#D47225]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
                    </span>
                    <span className={`text-[10px] font-bold ${student.progress === 100 ? 'text-[#D47225]' : 'text-neutral-500'}`}>
                      {student.moduleProgress}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F4E3D7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D47225] rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Last Active */}
                <div className="col-span-1">
                  <span className="text-xs text-neutral-500">{student.lastActive}</span>
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-center">
                  <button className="px-5 py-2 border-2 border-neutral-300 text-neutral-500 hover:border-[#0B2545] hover:text-[#0B2545] rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
                    Hubungi Peserta
                  </button>
                </div>
              </div>
            ))}
            
            {students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
              <div className="py-8 text-center text-sm text-neutral-500">
                Tidak ada data peserta yang cocok dengan "{searchTerm}".
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
