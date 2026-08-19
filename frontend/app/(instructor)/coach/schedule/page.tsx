'use client';

import React, { useState } from 'react';

export default function CoachSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calendar Mock Data (Oct 2023)
  // 1st is Sunday. 31 days.
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const paddingDays = 0; // Oct 2023 starts on Sunday (index 0)

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar / Search */}
      <div className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-full max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" placeholder="Search sessions, students, or reports..." className="w-full pl-12 pr-4 py-2.5 bg-neutral-100/80 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 transition-all" />
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#0B2545] tracking-tight">My Schedule</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D47225] hover:bg-[#B55D1A] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#D47225]/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Sesi Baru
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Calendar Section */}
          <div className="xl:w-2/3 bg-white rounded-[2rem] p-8 border border-neutral-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0B2545]">October 2023</h2>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="px-4 py-1.5 rounded-full bg-neutral-100 text-sm font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
                  Today
                </button>
                <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-r border-neutral-200 rounded-lg overflow-hidden">
              {/* Days Header */}
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest p-4 text-center border-l border-t border-neutral-200 bg-neutral-50">
                  {day}
                </div>
              ))}
              
              {/* Padding */}
              {Array.from({ length: paddingDays }).map((_, i) => (
                <div key={`pad-${i}`} className="h-28 border-l border-t border-neutral-200 bg-neutral-50/50"></div>
              ))}

              {/* Days */}
              {daysInMonth.map(day => {
                const isToday = day === 24;
                const hasEvent1 = day === 3;
                const hasEvent2 = day === 6;
                const hasEvent3 = day === 24;
                const hasEvent4 = day === 25;

                return (
                  <div key={day} className={`h-32 border-l border-t border-neutral-200 p-2 ${isToday ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${isToday ? 'bg-[#0B2545] text-white' : 'text-neutral-700'}`}>
                          {day}
                        </span>
                      </div>
                      <div className="flex-grow space-y-1 overflow-y-auto custom-scrollbar pr-1">
                        {hasEvent1 && (
                          <div className="bg-[#EAF1F8] border-l-2 border-[#0B2545] text-[#0B2545] text-[10px] p-1.5 font-semibold rounded-r truncate">
                            09:00 - 1-on-1 Ment...
                          </div>
                        )}
                        {hasEvent2 && (
                          <div className="bg-[#FFF8F3] border-l-2 border-[#D47225] text-[#D47225] text-[10px] p-1.5 font-semibold rounded-r truncate">
                            14:00 - Workshop
                          </div>
                        )}
                        {hasEvent3 && (
                          <>
                            <div className="bg-[#EAF1F8] border-l-2 border-[#0B2545] text-[#0B2545] text-[10px] p-1.5 font-semibold rounded-r truncate">
                              09:00 - 1-on-1 Ment...
                            </div>
                            <div className="bg-[#FFF8F3] border-l-2 border-[#D47225] text-[#D47225] text-[10px] p-1.5 font-semibold rounded-r truncate">
                              13:30 - Workshop
                            </div>
                          </>
                        )}
                        {hasEvent4 && (
                          <div className="bg-neutral-100 border-l-2 border-neutral-400 text-neutral-600 text-[10px] p-1.5 font-semibold rounded-r truncate">
                            15:00 - Curriculum...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Next month padding */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`next-${i}`} className="h-32 border-l border-t border-neutral-200 bg-neutral-50/50 p-2">
                  <span className="text-neutral-300 text-sm font-bold p-1">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Section */}
          <div className="xl:w-1/3">
            <div className="bg-white rounded-[2rem] p-8 border border-neutral-200 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-[#0B2545]">Upcoming</h2>
                <button className="text-xs font-bold text-[#0B2545] hover:text-[#D47225]">View All</button>
              </div>

              {/* Today */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Today, Oct 24</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[4px] before:w-0.5 before:bg-neutral-100">
                  
                  {/* Event 1 */}
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-[#0B2545] ring-4 ring-white"></div>
                    <div className="bg-white border border-neutral-100 shadow-sm rounded-2xl p-5 hover:border-neutral-200 transition-colors">
                      <div className="text-[10px] font-bold text-[#D47225] mb-1">09:00 - 10:00</div>
                      <h4 className="font-bold text-[#0B2545] text-sm mb-1 leading-tight">1-on-1 Mentoring - Budi Utomo</h4>
                      <p className="text-[10px] text-neutral-500 mb-4">Leadership Development Program</p>
                      <button className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-2 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line></svg>
                        Join Meet
                      </button>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-[#D47225] ring-4 ring-white"></div>
                    <div className="bg-[#FFF8F3] border border-[#F4E3D7] rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-[#D47225] mb-1">13:30 - 15:30</div>
                      <h4 className="font-bold text-[#0B2545] text-sm mb-1 leading-tight">Workshop: Effective Comm.</h4>
                      <p className="text-[10px] text-neutral-500 mb-4">Batch 14 - Group A</p>
                      <button className="w-full bg-white text-neutral-500 py-2 rounded-full text-xs font-bold" disabled>
                        Belum Dimulai
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tomorrow */}
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 mt-8">Tomorrow, Oct 25</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[4px] before:w-0.5 before:bg-neutral-100">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-300 ring-4 ring-white"></div>
                    <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-neutral-500 mb-1">15:00 - 16:30</div>
                      <h4 className="font-bold text-[#0B2545] text-sm mb-1 leading-tight">Curriculum Review</h4>
                      <p className="text-[10px] text-neutral-500">Internal Faculty Meeting</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal / Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black text-[#0B2545]">Create New Schedule / Session</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-[#0B2545] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              <form className="space-y-6">
                
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Session Title</label>
                  <input type="text" placeholder="e.g. Advanced Corporate Strategy Workshop" className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Session Type</label>
                    <div className="relative">
                      <select className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none appearance-none transition-shadow">
                        <option>Academic Consulting</option>
                        <option>Mentoring</option>
                        <option>Workshop</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Date</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Time Start</label>
                    <input type="time" className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Time End</label>
                    <input type="time" className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Select Participant / Client</label>
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input type="text" placeholder="Search by name or email..." className="w-full bg-[#FFF8F3] border-none rounded-xl pl-10 pr-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" />
                  </div>
                  {/* Selected badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-[#0B2545] text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      John Doe
                      <button className="hover:text-neutral-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </span>
                    <span className="bg-[#0B2545] text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      Sarah Smith
                      <button className="hover:text-neutral-300"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Meeting Link / Location</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </span>
                    <input type="text" placeholder="Zoom link or physical office address" className="w-full bg-[#FFF8F3] border-none rounded-xl pl-10 pr-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Additional Notes</label>
                  <textarea rows={3} placeholder="Enter session objectives or prerequisites..." className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow resize-none"></textarea>
                </div>
                
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-neutral-100 bg-white flex justify-center gap-4 mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 rounded-full border-2 border-[#0B2545] text-[#0B2545] font-bold text-sm hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-8 py-3 rounded-full bg-[#D47225] hover:bg-[#B55D1A] text-white font-bold text-sm transition-colors shadow-lg shadow-[#D47225]/20">
                Save Schedule
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
