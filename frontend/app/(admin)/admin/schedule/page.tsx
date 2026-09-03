'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ScheduleEvent {
  id: number;
  title: string;
  desc: string;
  tag: string;
  link: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
}

export default function AdminSchedulePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/schedules', {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        const data = await res.json();
        // map backend keys to frontend keys
        const mappedData = data.map((item: any) => {
          let desc = item.notes || '';
          let location = 'Online';
          if (desc.includes('\n\nLokasi: ')) {
            const parts = desc.split('\n\nLokasi: ');
            desc = parts[0];
            location = parts[1];
          }
          return {
            ...item,
            desc,
            location,
            tag: item.type || 'Corporate',
            time: item.startTime || '00:00'
          };
        });
        
        // Filter out Instructor/LMS events for this page
        const publicTags = ['Corporate', 'Government', 'Educational', 'Pub Training & In-House', 'Certification', 'Entrepreneurial'];
        const comprofEvents = mappedData.filter((ev: any) => publicTags.includes(ev.tag));
        
        setEvents(comprofEvents);
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Select Month');
  const [selectedProgram, setSelectedProgram] = useState('Select Program');
  const [visibleCount, setVisibleCount] = useState(3);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tag: 'Corporate',
    link: '',
    date: '',
    time: '',
    location: 'Online'
  });

  const availableTags = [
    'Corporate', 'Government', 'Educational', 
    'Pub Training & In-House', 'Certification', 'Entrepreneurial'
  ];

  const handleOpenModal = (eventToEdit?: ScheduleEvent) => {
    if (eventToEdit) {
      setEditingId(eventToEdit.id);
      setFormData({
        title: eventToEdit.title,
        desc: eventToEdit.desc,
        tag: eventToEdit.tag,
        link: eventToEdit.link,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        desc: '',
        tag: 'Corporate',
        link: '',
        date: '',
        time: '',
        location: 'Online'
      });
    }
    setIsModalOpen(true);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/schedules/${editingId}` : '/api/schedules';
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = {
        title: formData.title,
        type: formData.tag, // map frontend tag to backend type
        notes: `${formData.desc}${formData.location ? `\n\nLokasi: ${formData.location}` : ''}`, // append location to notes
        link: formData.link,
        date: formData.date,
        startTime: formData.time // map frontend time to backend startTime
      };
      
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        await fetchSchedules();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menyimpan jadwal');
      }
    } catch (error) {
      console.error('Save schedule error:', error);
      alert('Gagal menyimpan jadwal. Pastikan server backend berjalan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
    
    try {
      const res = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (res.ok) {
        await fetchSchedules();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menghapus jadwal');
      }
    } catch (error) {
      console.error('Delete schedule error:', error);
      alert('Gagal menghapus jadwal. Pastikan server backend berjalan.');
    }
  };

  const parseDate = (dateStr: string) => {
    if (!dateStr) return { day: '00', monthShort: '---', monthFull: 'Unknown', year: '0000' };
    const dateObj = new Date(dateStr);
    const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGS', 'SEP', 'OKT', 'NOV', 'DES'];
    const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return {
      day: String(dateObj.getDate()).padStart(2, '0'),
      monthShort: monthsShort[dateObj.getMonth()],
      monthFull: monthsFull[dateObj.getMonth()],
      year: dateObj.getFullYear()
    };
  };

  // Filter and Group events by Month Year
  const groupedEvents = useMemo(() => {
    const filtered = events.filter(ev => {
      const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ev.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProgram = selectedProgram === 'Select Program' || ev.tag === selectedProgram;
      
      const parsed = parseDate(ev.date);
      const matchesMonth = selectedMonth === 'Select Month' || parsed.monthFull === selectedMonth;
      
      return matchesSearch && matchesProgram && matchesMonth;
    });

    // Sort events by date first
    const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Apply visibleCount
    const paginated = sorted.slice(0, visibleCount);
    
    const groups: { [key: string]: ScheduleEvent[] } = {};
    paginated.forEach(ev => {
      const parsed = parseDate(ev.date);
      const groupKey = `${parsed.monthFull} ${parsed.year}`;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ev);
    });
    return {
      groups,
      total: sorted.length
    };
  }, [events, searchQuery, selectedProgram, selectedMonth, visibleCount]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white font-sans relative">
      
      {/* Public Header Mock */}
      <header className="px-8 py-5 flex items-center justify-between shrink-0 relative bg-white border-b border-neutral-100">
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
          <Link href="/admin/schedule" className="text-[#E5832E] border-b-2 border-[#E5832E] pb-1">Schedule</Link>
          <Link href="/admin/cms" className="hover:text-[#E5832E] transition-colors">Blog</Link>
          <Link href="#" className="hover:text-[#E5832E] transition-colors">Gallery</Link>
        </nav>
        
      </header>

      {/* Hero Banner Area */}
      <div className="bg-[#FEEBCD] w-full pt-16 pb-20 px-8 flex flex-col items-center justify-center border-b border-[#F5D8B8]">
        <h1 className="text-4xl lg:text-5xl font-black text-[#0B2545] uppercase tracking-tight mb-10 text-center">
          UPCOMING TRAINING & EVENTS SCHEDULE
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-3xl">
          <div className="relative flex-1 w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search training..." 
              className="w-full pl-10 pr-4 py-3 border border-neutral-300/50 bg-white/60 rounded-full text-sm focus:outline-none focus:border-[#0B2545] focus:bg-white transition-colors"
            />
          </div>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-3 border border-neutral-300/50 bg-white/60 rounded-full text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] focus:bg-white transition-colors w-full sm:w-48"
          >
            <option>Select Month</option>
            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select 
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-4 py-3 border border-neutral-300/50 bg-white/60 rounded-full text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] focus:bg-white transition-colors w-full sm:w-48"
          >
            <option>Select Program</option>
            {availableTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="flex-1 px-8 lg:px-16 py-12 max-w-[1200px] mx-auto w-full">
        
        <div className="flex justify-between items-end mb-10 border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-[#2D3648] mb-2">Jadwal Pelatihan & Pembukaan Course</h2>
            <p className="text-sm text-neutral-500">Pantau agenda coaching, pelatihan, dan pembukaan kelas terbaru kami.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#0B2545] hover:bg-[#15345E] text-white px-6 py-2.5 rounded-md text-xs font-bold transition-colors"
          >
            Tambah Acara
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-12 mb-16">
          {Object.entries(groupedEvents.groups).map(([groupKey, groupEventsList]) => (
            <div key={groupKey}>
              <h3 className="text-lg font-bold text-[#2D3648] mb-6 flex items-center">
                {groupKey}
                <div className="h-px bg-neutral-200 flex-1 ml-4"></div>
              </h3>
              
              <div className="space-y-4">
                {groupEventsList.map((ev: ScheduleEvent) => {
                  const parsed = parseDate(ev.date);
                  return (
                    <div key={ev.id} className="flex flex-col sm:flex-row bg-white border border-neutral-200 rounded-xl p-5 gap-6 shadow-sm hover:shadow-md transition-shadow items-center sm:items-stretch">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center sm:border-r border-neutral-100 sm:pr-6 min-w-[100px] shrink-0">
                        <span className="text-3xl font-black text-[#0B2545] leading-none">{parsed.day}</span>
                        <span className="text-[10px] font-bold text-neutral-500 mt-1 uppercase tracking-widest">{parsed.monthShort}</span>
                        <span className="text-[10px] text-neutral-400 mt-2">{ev.time} WIB</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center w-full">
                        <div className="mb-2">
                          <span className="inline-block bg-[#F2F4F7] text-[#475467] text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            {ev.tag}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#2D3648] mb-1">{ev.title}</h4>
                        <div className="flex items-center text-[11px] text-neutral-500 mb-2 gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          {ev.location}
                        </div>
                        <p className="text-xs text-neutral-500">{ev.desc}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-3 sm:border-l sm:border-neutral-100 sm:pl-6 shrink-0 mt-4 sm:mt-0 self-end sm:self-center">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F4F7] text-[#475467] hover:bg-neutral-200 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </button>
                        <button 
                          onClick={() => handleOpenModal(ev)}
                          className="bg-[#0B2545] hover:bg-[#15345E] text-white px-5 py-2 rounded-md text-xs font-bold transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(ev.id)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Hapus Jadwal"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {visibleCount < groupedEvents.total && (
          <div className="flex justify-center mb-20">
            <button 
              onClick={() => setVisibleCount(v => v + 3)}
              className="border border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            >
              LOAD MORE EVENTS
            </button>
          </div>
        )}
      </main>

      {/* Footer Mock */}
      <footer className="bg-[#0B2545] text-white py-16 px-8 lg:px-16 shrink-0 border-t border-neutral-800 mt-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6">
                <img src="/Logo_Performa_Puncak.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-sm tracking-wide">Performa Puncak Group</span>
            </div>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed max-w-sm">
              Greenland at Tidar Blok C-19,<br/>
              Malang, East Java, Indonesia
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <p className="flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> +62 813 3535-8585</p>
              <p className="flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> performapuncak@gmail.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] text-neutral-300 uppercase tracking-widest mb-6">COMPANY</h4>
            <ul className="space-y-4 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Business Pillars</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] text-neutral-300 uppercase tracking-widest mb-6">RESOURCES</h4>
            <ul className="space-y-4 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">LMS Portal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/admin/schedule" className="hover:text-white transition-colors">Schedule</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] text-neutral-300 uppercase tracking-widest mb-6">LEGAL</h4>
            <ul className="space-y-4 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0B2545]/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 shrink-0">
              <h2 className="text-lg font-bold text-[#0B2545]">Tambah/Edit Jadwal Kegiatan</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-[#0B2545]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Nama Kegiatan</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Contoh: Sesi Coaching Leadership / Pembukaan Course..."
                  className="w-full border border-neutral-300 rounded p-2.5 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Deskripsi Kegiatan</label>
                <textarea 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  placeholder="Tuliskan deskripsi singkat mengenai kegiatan ini..."
                  className="w-full border border-neutral-300 rounded p-2.5 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E] min-h-[80px]"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Tag Program</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, tag: t})}
                      className={`px-3 py-1.5 rounded text-[10px] border transition-colors ${formData.tag === t ? 'bg-[#E0F2FE] border-[#38BDF8] text-[#0369A1] font-bold' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Link Course/Pelatihan</label>
                <input 
                  type="text" 
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="Contoh: https://jasdjsbubauydv/lobufaesfh"
                  className="w-full border border-neutral-300 rounded p-2.5 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E]"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Tanggal Pelaksanaan</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full border border-neutral-300 rounded p-2.5 pl-9 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E]"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Jam Pelaksanaan</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full border border-neutral-300 rounded p-2.5 pl-9 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E]"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-[#0B2545] mb-2 uppercase">Lokasi (Opsional)</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Online / Nama Gedung"
                  className="w-full border border-neutral-300 rounded p-2.5 text-xs text-neutral-700 focus:outline-none focus:border-[#E5832E]"
                />
              </div>

            </div>
            
            <div className="p-6 border-t border-neutral-100 flex justify-end gap-4 shrink-0 bg-neutral-50 rounded-b-xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-6 py-2.5 rounded text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Menyimpan...' : 'Simpan Jadwal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
