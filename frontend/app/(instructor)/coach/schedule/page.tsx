'use client';

import React, { useState, useEffect } from 'react';

type ScheduleEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  type: string;
  link?: string;
  notes?: string;
};

export default function CoachSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Realtime date parsing
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();
  
  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
  const paddingDays = firstDayOfMonth;

  // Mock Events + Dynamic new events
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    // Load from localStorage or inject mock data
    const saved = localStorage.getItem('coach_schedule_events');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse events", e);
      }
    } else {
      const todayStr = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      const initialEvents = [
        { id: '1', title: '1-on-1 Mentoring - Budi Utomo', date: todayStr, startTime: '09:00', endTime: '10:00', type: 'Mentoring', link: 'https://zoom.us/j/12345' },
        { id: '2', title: 'Workshop: Effective Comm.', date: todayStr, startTime: '13:30', endTime: '15:30', type: 'Workshop', notes: 'Batch 14 - Group A' },
        { id: '3', title: 'Curriculum Review', date: tomorrowStr, startTime: '15:00', endTime: '16:30', type: 'Meeting', notes: 'Internal Faculty Meeting' },
      ];
      setEvents(initialEvents);
      localStorage.setItem('coach_schedule_events', JSON.stringify(initialEvents));
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Academic Consulting',
    date: '',
    startTime: '',
    endTime: '',
    link: '',
    notes: ''
  });

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
      alert("Harap lengkapi semua data wajib (Judul, Tanggal, dan Jam)!");
      return;
    }

    let updatedEvents = [];
    if (editingId) {
      updatedEvents = events.map(ev => ev.id === editingId ? { ...formData, id: editingId } : ev);
    } else {
      const newEvent: ScheduleEvent = {
        id: Date.now().toString(),
        ...formData
      };
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);
    localStorage.setItem('coach_schedule_events', JSON.stringify(updatedEvents));
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('coach_schedule_events', JSON.stringify(updatedEvents));
    }
  };

  const openEditModal = (ev: ScheduleEvent) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      type: ev.type,
      date: ev.date,
      startTime: ev.startTime,
      endTime: ev.endTime,
      link: ev.link || '',
      notes: ev.notes || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', type: 'Academic Consulting', date: '', startTime: '', endTime: '', link: '', notes: '' });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Navigate Months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Helper to format Date for upcoming events view
  const formatUpcomingDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getDate()}`;
  };

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
              <h2 className="text-2xl font-bold text-[#0B2545]">{monthNames[month]} {year}</h2>
              <div className="flex items-center gap-2">
                <button onClick={prevMonth} className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button onClick={goToToday} className="px-4 py-1.5 rounded-full bg-neutral-100 text-sm font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
                  Today
                </button>
                <button onClick={nextMonth} className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
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
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const todayStr = new Date().toISOString().split('T')[0];
                const isToday = dateStr === todayStr;
                
                const dayEvents = events.filter(e => e.date === dateStr).sort((a, b) => a.startTime.localeCompare(b.startTime));

                return (
                  <div key={day} className={`h-32 border-l border-t border-neutral-200 p-2 ${isToday ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${isToday ? 'bg-[#0B2545] text-white' : 'text-neutral-700'}`}>
                          {day}
                        </span>
                      </div>
                      <div className="flex-grow space-y-1 overflow-y-auto custom-scrollbar pr-1">
                        {dayEvents.map(ev => {
                          const isWorkshop = ev.type === 'Workshop';
                          return (
                            <div key={ev.id} className={`border-l-2 text-[9px] p-1.5 font-semibold rounded-r truncate ${isWorkshop ? 'bg-[#FFF8F3] border-[#D47225] text-[#D47225]' : 'bg-[#EAF1F8] border-[#0B2545] text-[#0B2545]'}`}>
                              {ev.startTime} - {ev.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Next month padding */}
              {Array.from({ length: 42 - (paddingDays + daysInMonthCount) }).map((_, i) => (
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

              <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {/* Group events by date */}
                {Object.entries(
                  events
                    .filter(e => e.date >= new Date().toISOString().split('T')[0])
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .reduce((acc, curr) => {
                      if (!acc[curr.date]) acc[curr.date] = [];
                      acc[curr.date].push(curr);
                      return acc;
                    }, {} as Record<string, ScheduleEvent[]>)
                ).map(([date, dayEvents]) => (
                  <div key={date} className="mb-6">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
                      {date === new Date().toISOString().split('T')[0] ? 'Today' : 'Upcoming'}, {formatUpcomingDate(date)}
                    </h3>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[4px] before:w-0.5 before:bg-neutral-100">
                      {dayEvents.map(ev => {
                        const isWorkshop = ev.type === 'Workshop';
                        return (
                          <div key={ev.id} className="relative pl-6">
                            <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${isWorkshop ? 'bg-[#D47225]' : 'bg-[#0B2545]'}`}></div>
                            <div className={`border rounded-2xl p-5 ${isWorkshop ? 'bg-[#FFF8F3] border-[#F4E3D7]' : 'bg-white border-neutral-100 shadow-sm'}`}>
                              <div className="flex justify-between items-start mb-1">
                                <div className={`text-[10px] font-bold ${isWorkshop ? 'text-[#D47225]' : 'text-[#D47225]'}`}>
                                  {ev.startTime} - {ev.endTime}
                                </div>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => openEditModal(ev)} className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#0B2545] transition-colors" title="Edit Session">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                  </button>
                                  <button onClick={() => handleDelete(ev.id)} className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete Session">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                  </button>
                                </div>
                              </div>
                              <h4 className="font-bold text-[#0B2545] text-sm mb-1 leading-tight">{ev.title}</h4>
                              <p className="text-[10px] text-neutral-500 mb-4">{ev.type}</p>
                              {!isWorkshop && (
                                <button className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-2 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line></svg>
                                  Join Meet
                                </button>
                              )}
                              {isWorkshop && (
                                <button className="w-full bg-white text-neutral-500 py-2 rounded-full text-xs font-bold" disabled>
                                  Belum Dimulai
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {events.length === 0 && (
                  <p className="text-neutral-500 text-sm text-center py-4">No upcoming events found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black text-[#0B2545]">Create New Schedule / Session</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-[#0B2545] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              <form onSubmit={handleSaveSchedule} className="space-y-6">
                
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Session Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Advanced Corporate Strategy Workshop" 
                    className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Session Type</label>
                    <div className="relative">
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none appearance-none transition-shadow"
                      >
                        <option value="Academic Consulting">Academic Consulting</option>
                        <option value="Mentoring">Mentoring</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meeting">Meeting</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Time Start</label>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B2545] mb-2">Time End</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none transition-shadow" 
                    />
                  </div>
                </div>

                {/* Additional UI elements */}
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Select Participant / Client</label>
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input type="text" placeholder="Search by name or email..." className="w-full bg-[#FFF8F3] border-none rounded-xl pl-10 pr-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Meeting Link / Location</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </span>
                    <input 
                      type="text" 
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      placeholder="Zoom link or physical office address" 
                      className="w-full bg-[#FFF8F3] border-none rounded-xl pl-10 pr-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-2">Additional Notes</label>
                  <textarea 
                    rows={3} 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Enter session objectives or prerequisites..." 
                    className="w-full bg-[#FFF8F3] border-none rounded-xl px-4 py-3 text-[#0B2545] text-sm focus:ring-2 focus:ring-[#D47225] outline-none placeholder:text-neutral-400 transition-shadow resize-none"
                  ></textarea>
                </div>

                <div className="px-8 py-5 border-t border-neutral-100 bg-white flex justify-center gap-4 mt-auto">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 rounded-full border-2 border-[#0B2545] text-[#0B2545] font-bold text-sm hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-full bg-[#D47225] hover:bg-[#B55D1A] text-white font-bold text-sm transition-colors shadow-lg shadow-[#D47225]/20">
                    Save Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
