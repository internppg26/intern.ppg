'use client';

import React, { useState, useMemo, useEffect } from 'react';

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

export default function PublicSchedulePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/schedules/public');
        if (res.ok) {
          const data = await res.json();
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
          setEvents(mappedData);
        } else {
          setError('Gagal memuat jadwal');
        }
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
        setError('Gagal memuat jadwal. Pastikan server berjalan.');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Select Month');
  const [selectedProgram, setSelectedProgram] = useState('Select Program');
  const [visibleCount, setVisibleCount] = useState(3);
  
  const availableTags = [
    'Corporate', 'Government', 'Educational', 
    'Pub Training & In-House', 'Certification', 'Entrepreneurial'
  ];

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
    <div className="flex flex-col bg-white font-sans">
      
      {/* Hero Banner Area */}
      <div className="bg-[#FEEBCD] w-full pt-16 pb-20 px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-black text-[#0B2545] uppercase tracking-tight mb-10 text-center">
          UPCOMING TRAINING & EVENTS SCHEDULE
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-3xl">
          <div className="relative flex-1 w-full shadow-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search training..." 
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 bg-white rounded-full text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
            />
          </div>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-3 border border-neutral-200 bg-white rounded-full text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] transition-colors shadow-sm w-full sm:w-48"
          >
            <option>Select Month</option>
            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select 
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-4 py-3 border border-neutral-200 bg-white rounded-full text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] transition-colors shadow-sm w-full sm:w-48"
          >
            <option>Select Program</option>
            {availableTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="px-8 lg:px-16 py-12 max-w-[1200px] mx-auto w-full">
        
        <div className="mb-10 pb-4">
          <h2 className="text-2xl font-black text-[#2D3648] mb-2">Jadwal Pelatihan & Pembukaan Course</h2>
          <p className="text-sm text-neutral-500">Pantau agenda coaching, pelatihan, dan pembukaan kelas terbaru kami.</p>
        </div>

        {/* Schedule List */}
        {loading && (
          <div className="text-center py-12 text-neutral-500">
            <p>Memuat jadwal...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        )}
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
                        <span className="text-4xl font-black text-[#0B2545] leading-none">{parsed.day}</span>
                        <span className="text-xs font-bold text-neutral-500 mt-1 uppercase tracking-widest">{parsed.monthShort}</span>
                        <span className="text-[10px] text-neutral-400 mt-2">{ev.time} WIB</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center w-full">
                        <div className="mb-2">
                          <span className="inline-block bg-[#F2F4F7] text-[#475467] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                      <div className="flex items-center gap-3 shrink-0 mt-4 sm:mt-0 self-end sm:self-center">
                        <button className="w-9 h-9 flex items-center justify-center border border-neutral-200 rounded-md text-neutral-500 hover:bg-neutral-50 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </button>
                        <a 
                          href={ev.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0B2545] hover:bg-[#15345E] text-white px-6 py-2.5 rounded-md text-sm font-bold transition-colors block text-center"
                        >
                          Lihat Detail
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {groupedEvents.total === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <p>Tidak ada jadwal yang sesuai dengan kriteria pencarian Anda.</p>
            </div>
          )}
        </div>

        {visibleCount < groupedEvents.total && (
          <div className="flex justify-center mb-10">
            <button 
              onClick={() => setVisibleCount(v => v + 3)}
              className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            >
              LOAD MORE EVENTS
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
