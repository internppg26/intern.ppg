'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  // --- States ---
  const [isOpen, setIsOpen] = useState(false);
  
  // Form States
  const [about, setAbout] = useState('');
  const [price, setPrice] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [instructorRole, setInstructorRole] = useState('');
  const [instructorImage, setInstructorImage] = useState<string | null>(null);

  // Dynamic Lists
  const [learnItems, setLearnItems] = useState<{title: string, desc: string}[]>([]);
  const [chapters, setChapters] = useState<{
    id: number, 
    title: string, 
    isExpanded: boolean, 
    subChapters: string[]
  }[]>([]);

  // History for Undo/Redo
  const [history, setHistory] = useState<any[]>([
    { about: '', price: '', instructorName: '', instructorRole: '', learnItems: [], chapters: [] }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Ref to prevent capturing history on every single keystroke if needed, 
  // but for simplicity we'll just debounce it or save on blur/action.
  // To keep it simple, we'll save state to history whenever an "add" action happens or onBlur of text areas.

  const saveToHistory = (newState: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      applyState(prev);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      applyState(next);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const applyState = (state: any) => {
    setAbout(state.about);
    setPrice(state.price);
    setInstructorName(state.instructorName);
    setInstructorRole(state.instructorRole);
    setLearnItems([...state.learnItems]);
    setChapters(JSON.parse(JSON.stringify(state.chapters))); // deep copy
  };

  // Helper to commit current state to history
  const commitHistory = () => {
    saveToHistory({
      about,
      price,
      instructorName,
      instructorRole,
      learnItems: [...learnItems],
      chapters: JSON.parse(JSON.stringify(chapters))
    });
  };

  // Handlers for dynamic lists
  const handleAddLearnItem = () => {
    setLearnItems([...learnItems, { title: '', desc: '' }]);
    commitHistory();
  };

  const handleLearnChange = (index: number, field: 'title' | 'desc', value: string) => {
    const newItems = [...learnItems];
    newItems[index][field] = value;
    setLearnItems(newItems);
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters, 
      { id: Date.now(), title: '', isExpanded: true, subChapters: [] }
    ]);
    commitHistory();
  };

  const handleChapterTitleChange = (chapterId: number, value: string) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, title: value } : ch));
  };

  const handleAddSubChapter = (chapterId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        return { ...ch, subChapters: [...ch.subChapters, ''], isExpanded: true };
      }
      return ch;
    }));
    commitHistory();
  };

  const handleSubChapterChange = (chapterId: number, subIndex: number, value: string) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const newSubs = [...ch.subChapters];
        newSubs[subIndex] = value;
        return { ...ch, subChapters: newSubs };
      }
      return ch;
    }));
  };

  const toggleChapter = (chapterId: number) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, isExpanded: !ch.isExpanded } : ch));
  };

  // Mock Save Data
  const handleSimpanDetail = () => {
    // If it's already mostly filled, we don't overwrite, just commit history
    // If it's empty, let's auto-fill with the mock data for demonstration
    if (about === '' && learnItems.length === 0 && chapters.length === 0) {
      setAbout('Unlock the complexities of corporate strategy in this intensive masterclass designed for future leaders. Gain insights into competitive positioning, organizational growth, and dynamic market entry strategies. This program combines academic rigor with practical frameworks used by Fortune 500 consulting firms.\n\nParticipants will deep dive into financial modeling, cross-functional leadership, and sustainable business transformation in the digital era.');
      setPrice('4.999.000');
      setInstructorName('Dr. Jane Smith');
      setInstructorRole('Senior Strategy Consultant');
      setInstructorImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150');
      
      setLearnItems([
        { title: 'Framework Design', desc: 'Define and execute competitive business frameworks tailored for global expansion.' },
        { title: 'Market Analysis', desc: 'Analyze complex market data to drive strategic decisions and risk mitigation.' },
        { title: 'Change Management', desc: 'Master organizational change management principles for agile environments.' },
        { title: 'Team Leadership', desc: 'Lead high-performance teams through volatile and uncertain market conditions.' },
      ]);

      setChapters([
        { id: 1, title: 'Foundation and Core Principles', isExpanded: true, subChapters: ['5 Foundation', '6 Core Principles'] },
        { id: 2, title: 'Strategic Implementation', isExpanded: false, subChapters: [] },
        { id: 3, title: 'Organizational Change Management', isExpanded: false, subChapters: [] },
        { id: 4, title: 'Capstone Project & Evaluation', isExpanded: false, subChapters: [] },
      ]);

      setTimeout(commitHistory, 100);
    } else {
      // Just save to db (mock)
      alert("Detail Course berhasil disimpan!");
    }
  };

  // Handle Image Upload Simulation
  const handleImageUpload = () => {
    const prompt = window.confirm("Simulasi: Upload foto profil instruktur? (Klik OK untuk menggunakan foto dummy)");
    if (prompt) {
      setInstructorImage('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150');
      commitHistory();
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Top Bar */}
      <div className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="text-[10px] md:text-xs font-bold text-neutral-500">
          <Link href="/coach/course" className="hover:text-[#D47225] transition-colors">Program &gt; ... &gt;</Link> <span className="text-[#0B2545] font-black ml-1">Course Advanced Negotiation Strategy</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" placeholder="Cari Course" className="pl-4 pr-10 py-1.5 border border-neutral-300 rounded-full text-xs w-48 focus:outline-none focus:border-[#0B2545]" />
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-[#0B2545]">Super Admin</div>
            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SYSTEM AUTHORITY</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm">
            SA
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-[1400px] mx-auto w-full mt-8">
        {/* Hero Section */}
        <div className="bg-[#0B2545] rounded-3xl p-10 flex flex-col lg:flex-row justify-between items-center relative overflow-hidden mb-8 shadow-lg">
          <div className="lg:w-1/2 relative z-10 text-white">
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Advanced<br/>Negotiation<br/>Strategy</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[#964B13] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                PENJUALAN DAN PEMASARAN (SALES AND MARKETING TRAINING)
              </span>
              <span className="bg-[#EAF1F8] text-[#0B2545] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                CORPORATE
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="font-bold">4.8</span>
                <span className="text-white/60">(1.5k Ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className="font-bold">2,450</span>
                <span className="text-white/60">Alumni</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-5/12 mt-8 lg:mt-0 relative z-10">
            <div className="rounded-2xl overflow-hidden border-4 border-[#0B2545] shadow-2xl aspect-video">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Course Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Action icons (Undo / Redo) */}
        <div className="flex gap-4 mb-8 text-[#0B2545]">
          <button 
            onClick={handleUndo} 
            disabled={historyIndex <= 0}
            className={`flex items-center justify-center transition-colors ${historyIndex <= 0 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#D47225] cursor-pointer'}`}
            title="Undo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3l-3 2.7"></path></svg>
          </button>
          <button 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className={`flex items-center justify-center transition-colors ${historyIndex >= history.length - 1 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#D47225] cursor-pointer'}`}
            title="Redo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
          </button>
          <span className="text-xs text-neutral-400 flex items-center ml-2">History: {historyIndex}/{history.length - 1}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content Form */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* ABOUT THIS COURSE */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">ABOUT THIS COURSE</h2>
              </div>
              
              <textarea 
                rows={4}
                className="w-full border border-neutral-300 rounded-lg p-4 text-sm focus:outline-none focus:border-[#0B2545] placeholder:text-neutral-400"
                placeholder="Ketik disini"
                value={about}
                onChange={e => setAbout(e.target.value)}
                onBlur={commitHistory}
              ></textarea>
            </section>

            {/* WHAT YOU WILL LEARN */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">WHAT YOU WILL LEARN</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learnItems.map((item, idx) => (
                  <div key={idx} className="bg-[#FFF8F3] rounded-2xl p-6 border border-[#F4E3D7] relative group">
                    <button 
                      onClick={() => {
                        setLearnItems(learnItems.filter((_, i) => i !== idx));
                        commitHistory();
                      }}
                      className="absolute top-3 right-3 text-[#D47225] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <input 
                      type="text" 
                      placeholder="Ketik Judul" 
                      value={item.title}
                      onChange={e => handleLearnChange(idx, 'title', e.target.value)}
                      onBlur={commitHistory}
                      className="w-full bg-transparent font-bold text-[#0B2545] text-lg mb-2 focus:outline-none placeholder:text-neutral-400 pr-6" 
                    />
                    <textarea 
                      rows={2} 
                      placeholder="Ketik deskripsi" 
                      value={item.desc}
                      onChange={e => handleLearnChange(idx, 'desc', e.target.value)}
                      onBlur={commitHistory}
                      className="w-full bg-transparent text-xs text-neutral-500 focus:outline-none resize-none placeholder:text-neutral-400"
                    ></textarea>
                  </div>
                ))}

                <button 
                  onClick={handleAddLearnItem}
                  className="bg-[#FFF8F3] rounded-2xl p-6 border border-[#F4E3D7] flex flex-col items-center justify-center gap-3 text-[#0B2545] hover:bg-[#F4E3D7] transition-colors min-h-[120px] border-dashed"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  <span className="font-bold text-sm">Tambah Konten</span>
                </button>
              </div>
            </section>

            {/* COURSE TIMELINE & MODULES */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#964B13] rounded-full"></div>
                <h2 className="text-2xl font-black text-[#0B2545] uppercase tracking-tight">COURSE TIMELINE & MODULES</h2>
              </div>
              
              <div className="space-y-3">
                
                {chapters.map((ch, idx) => (
                  <div key={ch.id} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                    <div 
                      className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-50"
                      onClick={() => toggleChapter(ch.id)}
                    >
                      <div className="flex items-center gap-4 w-full mr-4">
                        <span className="text-[#964B13] font-black text-lg w-4 text-center">{idx + 1}</span>
                        <span className="font-bold text-[#0B2545] text-sm whitespace-nowrap">Bab {idx + 1} :</span>
                        <input 
                          type="text" 
                          placeholder="Ketik nama bab" 
                          value={ch.title}
                          onChange={(e) => handleChapterTitleChange(ch.id, e.target.value)}
                          onBlur={commitHistory}
                          onClick={e => e.stopPropagation()}
                          className="w-full bg-transparent font-bold text-[#0B2545] text-sm focus:outline-none placeholder:text-neutral-400" 
                        />
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button 
                          onClick={(e) => handleAddSubChapter(ch.id, e)}
                          className="border border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors text-[9px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                        >
                          + Sub-bab
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="border border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors text-[9px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                        >
                          Materi
                        </button>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${ch.isExpanded ? 'rotate-180' : ''}`}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                    
                    {ch.isExpanded && ch.subChapters.length > 0 && (
                      <div className="border-t border-neutral-100 bg-neutral-50/50 p-4 space-y-2">
                        {ch.subChapters.map((sub, sIdx) => (
                          <div key={sIdx} className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-4 text-sm font-bold text-[#0B2545]">
                            <span className="text-[#964B13] shrink-0">{idx + 1}.{sIdx + 1}</span> 
                            <span className="shrink-0">Sub-bab {sIdx + 1} :</span>
                            <input 
                              type="text"
                              placeholder="Ketik nama sub-bab"
                              value={sub}
                              onChange={(e) => handleSubChapterChange(ch.id, sIdx, e.target.value)}
                              onBlur={commitHistory}
                              className="w-full bg-transparent font-bold text-[#0B2545] focus:outline-none placeholder:text-neutral-400"
                            />
                            <button 
                              onClick={() => {
                                setChapters(chapters.map(c => {
                                  if(c.id === ch.id) {
                                    return {...c, subChapters: c.subChapters.filter((_, i) => i !== sIdx)};
                                  }
                                  return c;
                                }));
                                commitHistory();
                              }}
                              className="text-neutral-400 hover:text-red-500"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button 
                  onClick={handleAddChapter}
                  className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors border border-transparent hover:border-[#13325B]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  Tambah Bab
                </button>
                
              </div>
            </section>

          </div>

          {/* Right Panel: Settings */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
            
            {/* Investment Box */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                {price || about || learnItems.length > 0 ? 'INVESTMENT' : 'HARGA'}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-bold text-[#0B2545]">Rp</span>
                <input 
                  type="text" 
                  placeholder="Ketik harga" 
                  className="w-full text-4xl font-black text-[#0B2545] placeholder:text-neutral-400 bg-transparent focus:outline-none" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  onBlur={commitHistory}
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-[#0B2545]">This Course Includes:</p>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="10 8 16 12 10 16"></polyline></svg>
                  24 Video
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  15 PDF
                </div>
              </div>
            </div>

            {/* Instructor Box */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                INSTRUKTUR
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleImageUpload}
                  className="w-14 h-14 rounded-xl overflow-hidden bg-[#F4E3D7] hover:bg-[#EBD1BF] transition-colors flex items-center justify-center shrink-0 border border-transparent hover:border-[#D47225] relative group"
                  title="Upload Foto"
                >
                  {instructorImage ? (
                    <>
                      <img src={instructorImage} alt="Instructor" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      </div>
                    </>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  )}
                </button>
                <div className="flex-grow">
                  <input 
                    type="text" 
                    placeholder="Ketik Nama Instruktur" 
                    value={instructorName}
                    onChange={e => setInstructorName(e.target.value)}
                    onBlur={commitHistory}
                    className="w-full text-sm font-bold text-[#0B2545] placeholder:text-neutral-400 bg-transparent focus:outline-none mb-1" 
                  />
                  <input 
                    type="text" 
                    placeholder="Ketik Keahlian/Profesi" 
                    value={instructorRole}
                    onChange={e => setInstructorRole(e.target.value)}
                    onBlur={commitHistory}
                    className="w-full text-[10px] font-bold text-[#D47225] uppercase placeholder:text-neutral-400 bg-transparent focus:outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-[#0B2545] text-lg uppercase tracking-tight">BUKA KELAS</span>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-14 h-7 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out ${isOpen ? 'bg-[#00628B]' : 'bg-transparent border-2 border-[#0B2545]'}`}
                >
                  <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-7 bg-white' : 'translate-x-0 bg-[#0B2545]'}`}></div>
                </button>
              </div>

              <button 
                onClick={handleSimpanDetail}
                className="w-full bg-[#0B2545] hover:bg-[#13325B] text-white py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-colors"
              >
                SIMPAN DETAIL COURSE
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
