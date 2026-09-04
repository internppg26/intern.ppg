'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QuizEditor from './QuizEditor';

type BlockType = 'empty' | 'text' | 'h1' | 'h2' | 'embed_input' | 'embed_video';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export default function CoachCourseMaterialPage() {
  const params = useParams();
  // Sidebar State
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [chapters, setChapters] = useState<any[]>([]);
  const [rawDescription, setRawDescription] = useState<any>({});

  useEffect(() => {
    fetch(`/api/programs/${params?.id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      setCourseTitle(data.title);
      if (data.category) {
        let progName = data.category.split('||')[0].replace(/ Program/gi, '');
        setCourseProgramName(progName);
      }
      if (data.description) {
        try {
          const parsed = JSON.parse(data.description);
          setRawDescription(parsed);
          if (parsed.chapters && Array.isArray(parsed.chapters)) {
            // Map chapters to ensure subChapters are objects and NOT active
            const mappedChapters = parsed.chapters.map((ch: any) => ({
              ...ch,
              isOpen: ch.isExpanded !== undefined ? ch.isExpanded : true,
              subChapters: (ch.subChapters || []).map((sub: any, sIdx: number) => {
                if (typeof sub === 'string') {
                  return { id: Date.now() + sIdx, title: sub, duration: '10', isActive: false, type: 'material', blocks: [] };
                }
                return { ...sub, isActive: false };
              })
            }));
            setChapters(mappedChapters);
          }
          
          if (parsed.overviewBlocks && Array.isArray(parsed.overviewBlocks)) {
            setBlocks(parsed.overviewBlocks);
            setHistory([parsed.overviewBlocks]);
            setHistoryIndex(0);
          } else {
            const demoBlocks: Block[] = [
              { id: '1', type: 'h1', content: 'Course Overview' },
              { id: '2', type: 'text', content: 'Di sini Anda dapat menuliskan ringkasan materi dan tujuan pembelajaran untuk course ini.' }
            ];
            setBlocks(demoBlocks);
            setHistory([demoBlocks]);
            setHistoryIndex(0);
          }
        } catch(e) {}
      }
    });
  }, [params?.id]);

  
  const handleSaveQuiz = async (subId: number, questions: any[], introDesc: string, instructions: string) => {
    try {
      // First, update chapters state
      const updatedChapters = chapters.map(c => ({
        ...c,
        subChapters: c.subChapters.map(s => {
          if (s.id === subId) {
            return { ...s, quizQuestions: questions, quizIntroDesc: introDesc, quizInstructions: instructions };
          }
          return s;
        })
      }));
      setChapters(updatedChapters);

      // Now prepare payload
      const chaptersToSave = updatedChapters.map(ch => ({
        id: ch.id,
        title: ch.title,
        isExpanded: ch.isOpen,
        subChapters: ch.subChapters
      }));
      const newDescription = { 
        ...rawDescription, 
        chapters: chaptersToSave,
        overviewBlocks: isOverviewActive ? blocks : rawDescription.overviewBlocks 
      };
      setRawDescription(newDescription);
      
      const payload = { description: JSON.stringify(newDescription) };
      const res = await fetch(`/api/programs/${params?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) alert("Kuis berhasil disimpan!");
      else alert("Gagal menyimpan kuis. Status: " + res.status + " " + await res.text());
    } catch (e) {
      alert("Error saving: " + e);
    }
  };

  const handleSimpan = async () => {
    try {
      // First, sync current blocks into the currently active sub-chapter
      let currentChapters = [...chapters];
      const activeChIndex = currentChapters.findIndex(c => c.subChapters.some(s => s.isActive));
      if (activeChIndex !== -1) {
        const activeSubIndex = currentChapters[activeChIndex].subChapters.findIndex(s => s.isActive);
        if (activeSubIndex !== -1) {
          currentChapters[activeChIndex].subChapters[activeSubIndex] = {
            ...currentChapters[activeChIndex].subChapters[activeSubIndex],
            blocks: [...blocks]
          };
          setChapters(currentChapters);
        }
      }

      // Map chapters back to the format Detail Course expects (isExpanded, etc)
      const chaptersToSave = currentChapters.map(ch => ({
        id: ch.id,
        title: ch.title,
        isExpanded: ch.isOpen,
        subChapters: ch.subChapters
      }));

      const newDescription = { 
        ...rawDescription, 
        chapters: chaptersToSave,
        overviewBlocks: isOverviewActive ? blocks : rawDescription.overviewBlocks 
      };
      
      // Update local rawDescription so it doesn't get lost
      setRawDescription(newDescription);

      const payload = { description: JSON.stringify(newDescription) };

      const res = await fetch(`/api/programs/${params?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Berhasil menyimpan silabus!");
      } else {
        alert("Gagal menyimpan.");
      }
    } catch (e) {
      alert("Error saving: " + e);
    }
  };

  // Main Content State
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'empty', content: '' }
  ]);
  const [showSlashMenu, setShowSlashMenu] = useState<string | null>(null); // block id where menu is open
  const slashMenuRef = useRef<HTMLDivElement>(null);

  // History for Undo/Redo
  const [history, setHistory] = useState<Block[][]>([[{ id: '1', type: 'empty', content: '' }]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const saveToHistory = (newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newBlocks)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setBlocks(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setBlocks(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Close slash menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBlockChange = (id: string, newContent: string) => {
    if (newContent === '/') {
      setShowSlashMenu(id);
      return;
    }
    
    // If they delete the slash, close menu
    if (showSlashMenu === id && !newContent.includes('/')) {
      setShowSlashMenu(null);
    }

    const newBlocks = blocks.map(b => b.id === id ? { ...b, content: newContent } : b);
    setBlocks(newBlocks);
  };

  const handleBlockKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSlashMenu) {
      e.preventDefault();
      // Add new empty block below
      const index = blocks.findIndex(b => b.id === id);
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, { id: Date.now().toString(), type: 'empty', content: '' });
      setBlocks(newBlocks);
      saveToHistory(newBlocks);
    }
  };

  const handleBlockBlur = () => {
    saveToHistory(blocks);
  };

  const selectBlockType = (id: string, type: BlockType) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, type, content: '' } : b);
    setBlocks(newBlocks);
    setShowSlashMenu(null);
    saveToHistory(newBlocks);
  };

  const handleEmbedSubmit = (id: string) => {
    const newBlocks: Block[] = blocks.map(b => b.id === id ? { ...b, type: 'embed_video' as BlockType } : b);
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  const handleSelectSubChapter = (chapterId: number, subId: number) => {
    setIsOverviewActive(false);
    
    // First, save current blocks into the CURRENTLY active sub-chapter
    let updatedChapters = [...chapters];
    const activeChIndex = updatedChapters.findIndex(c => c.subChapters.some(s => s.isActive));
    if (activeChIndex !== -1) {
      const activeSubIndex = updatedChapters[activeChIndex].subChapters.findIndex(s => s.isActive);
      if (activeSubIndex !== -1) {
        updatedChapters[activeChIndex].subChapters[activeSubIndex] = {
          ...updatedChapters[activeChIndex].subChapters[activeSubIndex],
          blocks: [...blocks]
        };
      }
    }

    // Now, activate the new sub-chapter and load its blocks
    let targetBlocks: Block[] = [{ id: Date.now().toString(), type: 'empty', content: '' }];
    
    updatedChapters = updatedChapters.map(c => ({
      ...c,
      subChapters: c.subChapters.map(s => {
        if (s.id === subId) {
          // If this is the one we're activating, grab its blocks if they exist
          if (s.blocks && s.blocks.length > 0) {
            targetBlocks = s.blocks;
          }
          return { ...s, isActive: true };
        }
        return { ...s, isActive: false };
      })
    }));

    setChapters(updatedChapters);
    setBlocks(targetBlocks);
    setHistory([targetBlocks]);
    setHistoryIndex(0);
  };

  const handleAddSidebarSubBab = (chapterId: number) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const newId = Date.now();
        const nextNumber = ch.subChapters.length + 1;
        return {
          ...ch,
          subChapters: [
            ...ch.subChapters,
            { id: newId, title: `Sub-bab ${nextNumber} : Sub-bab Baru`, duration: '0', isActive: false, type: 'material' as const }
          ]
        };
      }
      return ch;
    }));
  };

  const handleAddQuiz = (chapterId: number) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const newId = Date.now();
        const chapterTitleStr = ch.title.split(': ')[1] || ch.title;
        return {
          ...ch,
          subChapters: [
            { id: newId, title: `Pre-Test : ${chapterTitleStr}`, duration: '15', isActive: false, type: 'quiz' as const },
            ...ch.subChapters
          ]
        };
      }
      return ch;
    }));
  };

  // Quiz Editor State
  const [quizMode, setQuizMode] = useState<'intro' | 'question'>('intro');
  const [quizIntroDesc, setQuizIntroDesc] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: 1,
      blocks: [{ id: 'q1-1', type: 'empty' as BlockType, content: '' }],
      options: [
        { id: 'opt1', text: '', isCorrect: false },
        { id: 'opt2', text: '', isCorrect: false }
      ]
    }
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handleDeleteSidebarSubBab = (chapterId: number, subId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          subChapters: ch.subChapters.filter(s => s.id !== subId)
        };
      }
      return ch;
    }));
  };

  const handleEditSidebarSubBabTitle = (chapterId: number, subId: number, newTitle: string) => {
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          subChapters: ch.subChapters.map(s => s.id === subId ? { ...s, title: newTitle } : s)
        };
      }
      return ch;
    }));
  };

  const handleEditSidebarChapterTitle = (chapterId: number, newTitle: string) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, title: newTitle } : ch));
  };

  const handleToggleChapter = (chapterId: number) => {
    setChapters(chapters.map(ch => ch.id === chapterId ? { ...ch, isOpen: !ch.isOpen } : ch));
  };

  const handleMoveSubChapter = (chapterId: number, subId: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    setChapters(chapters.map(ch => {
      if (ch.id === chapterId) {
        const index = ch.subChapters.findIndex(s => s.id === subId);
        if (index === -1) return ch;
        if (direction === 'up' && index > 0) {
          const newSubs = [...ch.subChapters];
          const temp = newSubs[index];
          newSubs[index] = newSubs[index - 1];
          newSubs[index - 1] = temp;
          return { ...ch, subChapters: newSubs };
        }
        if (direction === 'down' && index < ch.subChapters.length - 1) {
          const newSubs = [...ch.subChapters];
          const temp = newSubs[index];
          newSubs[index] = newSubs[index + 1];
          newSubs[index + 1] = temp;
          return { ...ch, subChapters: newSubs };
        }
      }
      return ch;
    }));
  };

  const handleEditSubBabDuration = (newDuration: string) => {
    setChapters(chapters.map(ch => ({
      ...ch,
      subChapters: ch.subChapters.map(s => s.isActive ? { ...s, duration: newDuration } : s)
    })));
  };

  const [isOverviewActive, setIsOverviewActive] = useState(true);

  const activeSubChapter = chapters.flatMap(c => c.subChapters).find(s => s.isActive);
  const isSubBab1 = activeSubChapter?.id === 11;

  const handleOverviewClick = () => {
    // First, sync current blocks into the currently active sub-chapter if any
    let updatedChapters = [...chapters];
    const activeChIndex = updatedChapters.findIndex(c => c.subChapters.some(s => s.isActive));
    if (activeChIndex !== -1) {
      const activeSubIndex = updatedChapters[activeChIndex].subChapters.findIndex(s => s.isActive);
      if (activeSubIndex !== -1) {
        updatedChapters[activeChIndex].subChapters[activeSubIndex] = {
          ...updatedChapters[activeChIndex].subChapters[activeSubIndex],
          blocks: [...blocks]
        };
      }
    }

    updatedChapters = updatedChapters.map(c => ({
      ...c,
      subChapters: c.subChapters.map(s => ({ ...s, isActive: false }))
    }));
    
    setChapters(updatedChapters);
    setIsOverviewActive(true);
    
    // Overview can have its own static content for now
    const demoBlocks: Block[] = [
      { id: '1', type: 'h1', content: 'Course Overview' },
      { id: '2', type: 'text', content: 'Di sini Anda dapat menuliskan ringkasan materi dan tujuan pembelajaran untuk course ini.' }
    ];
    setBlocks(demoBlocks);
    setHistory([demoBlocks]);
    setHistoryIndex(0);
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-neutral-200">
          <Link href="/coach/course" className="flex items-center gap-2 text-[#D47225] font-bold text-xs uppercase tracking-widest mb-6 hover:text-[#964B13] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            KEMBALI KE LIST COURSE
          </Link>
          <h2 className="font-black text-[#0B2545] uppercase tracking-wide leading-tight">
            {courseTitle}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div 
            onClick={handleOverviewClick}
            className={`border rounded-lg p-4 font-bold text-sm cursor-pointer transition-colors ${isOverviewActive ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'border-neutral-200 text-[#0B2545] hover:bg-neutral-50'}`}
          >
            OVERVIEW
          </div>

          {chapters.map((ch, idx) => (
            <div key={ch.id} className="space-y-2">
              <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-4 flex justify-between items-start cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => handleToggleChapter(ch.id)}>
                <div className="font-black text-[#0B2545] text-[10px] md:text-xs uppercase pr-2 flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={ch.title}
                    onChange={(e) => handleEditSidebarChapterTitle(ch.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-transparent focus:outline-none placeholder:text-neutral-400"
                    placeholder="Nama Bab"
                  />
                </div>
                <div className="flex flex-col gap-1 shrink-0 items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddSidebarSubBab(ch.id); }}
                      className="border border-[#0B2545] text-[#0B2545] text-[8px] font-bold px-2 py-1 rounded-full uppercase hover:bg-[#0B2545] hover:text-white transition-colors"
                    >
                      + SUB-BAB
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddQuiz(ch.id); }}
                      className="border border-[#0B2545] text-[#0B2545] text-[8px] font-bold px-2 py-1 rounded-full uppercase hover:bg-[#0B2545] hover:text-white transition-colors"
                    >
                      + QUIZ
                    </button>
                    <svg className={`w-4 h-4 text-neutral-500 transition-transform ${ch.isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
              
              {ch.isOpen && (
                <div className="space-y-2 ml-4">
                  {ch.subChapters.map((sub, index) => (
                    <div 
                      key={sub.id} 
                      onClick={() => handleSelectSubChapter(ch.id, sub.id)}
                      className={`border rounded-lg p-3 flex justify-between items-center text-xs cursor-pointer transition-colors group ${(!isOverviewActive && sub.isActive) ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-white border-neutral-200 text-[#0B2545] hover:bg-neutral-50'}`}
                    >
                      <input
                        type="text"
                        value={sub.title}
                        onChange={(e) => handleEditSidebarSubBabTitle(ch.id, sub.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={`font-bold w-full bg-transparent focus:outline-none ${(!isOverviewActive && sub.isActive) ? 'text-white' : 'text-[#0B2545]'}`}
                      />
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={sub.isActive ? 'text-white/70' : 'text-neutral-500'}>{sub.duration} min</span>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleMoveSubChapter(ch.id, sub.id, 'up', e)}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'text-neutral-300' : (sub.isActive ? 'hover:bg-[#13325B]' : 'hover:bg-neutral-200')}`}
                            title="Geser ke Atas"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                          </button>
                          <button 
                            onClick={(e) => handleMoveSubChapter(ch.id, sub.id, 'down', e)}
                            disabled={index === ch.subChapters.length - 1}
                            className={`p-1 rounded ${index === ch.subChapters.length - 1 ? 'text-neutral-300' : (sub.isActive ? 'hover:bg-[#13325B]' : 'hover:bg-neutral-200')}`}
                            title="Geser ke Bawah"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </button>
                          <button 
                            onClick={(e) => handleDeleteSidebarSubBab(ch.id, sub.id, e)}
                            className="p-1 rounded hover:text-red-500"
                            title="Hapus Sub-bab"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        
        {/* Top Header */}
        <div className="px-8 py-4 flex items-center justify-between border-b border-neutral-200 shrink-0 bg-white z-10">
          <div className="text-[10px] md:text-xs font-bold text-neutral-500">
            <Link href="/coach/course" className="hover:text-[#D47225]">PROGRAM</Link> &gt; <span className="text-[#0B2545] font-black">Course {courseTitle}</span>
          </div>
          <div className="flex items-center gap-4">

            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-[#0B2545]">Super Admin</div>
              <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SYSTEM AUTHORITY</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm shrink-0">
              SA
            </div>
          </div>
        </div>

        {activeSubChapter?.type === 'quiz' ? (
          <div className="flex-1 overflow-hidden flex flex-col pt-8">
            <div className="max-w-4xl mx-auto w-full mb-8 px-12 shrink-0">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0B2545] uppercase tracking-widest">
                <span className="bg-[#0B2545] text-white px-3 py-1 rounded-full">BAB 1</span>
              </div>
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-black text-[#0B2545] uppercase tracking-tight break-words">
                  {activeSubChapter.title}
                </h1>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase">BATAS WAKTU MENGERJAKAN</span>
                  </div>
                  <div className="flex items-center border border-neutral-300 rounded divide-x divide-neutral-300 overflow-hidden shrink-0 bg-white">
                    <input 
                      type="text" 
                      value={activeSubChapter.duration} 
                      onChange={(e) => handleEditSubBabDuration(e.target.value)}
                      className="w-12 text-center py-2 text-sm font-bold text-[#0B2545] focus:outline-none" 
                    />
                    <span className="px-4 py-2 text-xs font-bold text-[#0B2545] bg-neutral-50">MENIT</span>
                  </div>
                  <button className="bg-[#0B2545] hover:bg-[#13325B] text-white px-6 py-2 rounded text-xs font-bold transition-colors shrink-0">
                    SIMPAN
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full flex flex-col px-12 pb-12 items-center">
              <div className="w-full max-w-4xl">
                <QuizEditor key={activeSubChapter.id} duration={activeSubChapter.duration} initialQuestions={activeSubChapter.quizQuestions} initialIntroDesc={activeSubChapter.quizIntroDesc} initialInstructions={activeSubChapter.quizInstructions} onSave={(questions, introDesc, instructions) => handleSaveQuiz(activeSubChapter.id, questions, introDesc, instructions)} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-12">
              <div className="max-w-4xl mx-auto">
                
                {/* Header Title Editor */}
                <div className="flex justify-between items-start mb-8 gap-8">
                  <div className="flex-1 min-w-0">
                    {!isOverviewActive && (
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0B2545] uppercase tracking-widest">
                        <span className="bg-[#0B2545] text-white px-3 py-1 rounded-full">BAB 1</span>
                        <span>&mdash; INTRODUCTION</span>
                      </div>
                    )}
                    <h1 className="text-4xl font-black text-[#0B2545] uppercase tracking-tight break-words">
                      {isOverviewActive ? 'OVERVIEW' : (activeSubChapter ? activeSubChapter.title : 'SUB-BAB 2 : 6 CORE PRINCIPLES')}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {isSubBab1 && !isOverviewActive && (
                      <span className="text-xs text-neutral-500 max-w-[200px] text-right">Waktu perkiraan untuk menyelesaikan materi ini (bukan batas waktu)</span>
                    )}
                    {!isOverviewActive && (
                      <div className="flex items-center border border-neutral-300 rounded divide-x divide-neutral-300 overflow-hidden shrink-0">
                        <input 
                          type="text" 
                          value={activeSubChapter?.duration || ''} 
                          onChange={(e) => handleEditSubBabDuration(e.target.value)}
                          className="w-12 text-center py-2 text-sm font-bold text-[#0B2545] focus:outline-none" 
                        />
                        <span className="px-4 py-2 text-xs font-bold text-[#0B2545] bg-neutral-50">MENIT</span>
                      </div>
                    )}
                    <button onClick={handleSimpan} className="bg-[#0B2545] hover:bg-[#13325B] text-white px-6 py-2 rounded text-xs font-bold transition-colors shrink-0">
                      SIMPAN
                    </button>
                  </div>
                </div>

                {/* Undo/Redo Actions */}
                <div className="flex gap-4 mb-6 text-[#0B2545]">
                  <button 
                    onClick={handleUndo} 
                    disabled={historyIndex <= 0}
                    className={`flex items-center justify-center transition-colors ${historyIndex <= 0 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#D47225] cursor-pointer'}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3l-3 2.7"></path></svg>
                  </button>
                  <button 
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    className={`flex items-center justify-center transition-colors ${historyIndex >= history.length - 1 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#D47225] cursor-pointer'}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
                  </button>
                </div>

                {/* Editor Canvas */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-10 min-h-[500px]">
                  
                  {blocks.map((block) => (
                    <div key={block.id} className="relative mb-4 group">
                      
                      {/* Empty / Text Block */}
                      {(block.type === 'empty' || block.type === 'text') && (
                        <div className="relative flex">
                          <textarea
                            value={block.content}
                            onChange={(e) => {
                              e.target.style.height = 'auto';
                              e.target.style.height = e.target.scrollHeight + 'px';
                              handleBlockChange(block.id, e.target.value);
                            }}
                            onKeyDown={(e) => handleBlockKeyDown(block.id, e)}
                            onBlur={handleBlockBlur}
                            placeholder={block.type === 'empty' ? "Ketik '/' untuk menambahkan teks, heading, atau embed media..." : ""}
                            className="w-full text-neutral-600 text-[15px] focus:outline-none placeholder:text-neutral-300 py-1 resize-none overflow-hidden bg-transparent"
                            rows={1}
                            style={{ minHeight: '32px' }}
                          />
                          
                          {/* Slash Menu */}
                          {showSlashMenu === block.id && (
                            <div ref={slashMenuRef} className="absolute top-10 left-0 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50">
                              <div className="p-3 bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-400 tracking-wider">BASIC BLOCKS</div>
                              <div className="p-2 space-y-1">
                                <button onClick={() => selectBlockType(block.id, 'text')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="14" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-[#0B2545]">Text</div>
                                    <div className="text-[10px] text-neutral-500">Tulis narasi, deskripsi atau instruksi</div>
                                  </div>
                                </button>
                                <button onClick={() => selectBlockType(block.id, 'h1')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white font-black text-[#0B2545]">H1</div>
                                  <div>
                                    <div className="text-sm font-bold text-[#0B2545]">Heading 1</div>
                                    <div className="text-[10px] text-neutral-500">Judul</div>
                                  </div>
                                </button>
                                <button onClick={() => selectBlockType(block.id, 'h2')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white font-black text-[#0B2545]">H2</div>
                                  <div>
                                    <div className="text-sm font-bold text-[#0B2545]">Heading 2</div>
                                    <div className="text-[10px] text-neutral-500">Sub-judul</div>
                                  </div>
                                </button>
                              </div>
                              <div className="p-3 bg-neutral-50 border-y border-neutral-100 text-[10px] font-bold text-neutral-400 tracking-wider">INTEGRATIONS</div>
                              <div className="p-2">
                                <button onClick={() => selectBlockType(block.id, 'embed_input')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                                      Google Drive Embed
                                      <span className="bg-[#EAF1F8] text-[#0B2545] text-[8px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Video, PDF, Image</span>
                                    </div>
                                    <div className="text-[10px] text-neutral-500">Sematkan dokumen langsung dari drive</div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Heading 1 Block */}
                      {block.type === 'h1' && (
                        <textarea
                          value={block.content}
                          onChange={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                            handleBlockChange(block.id, e.target.value);
                          }}
                          onKeyDown={(e) => handleBlockKeyDown(block.id, e)}
                          onBlur={handleBlockBlur}
                          placeholder="Heading 1"
                          className="w-full text-3xl font-black text-[#0B2545] focus:outline-none placeholder:text-neutral-300 py-2 resize-none overflow-hidden bg-transparent leading-tight"
                          autoFocus
                          rows={1}
                        />
                      )}

                      {/* Heading 2 Block */}
                      {block.type === 'h2' && (
                        <textarea
                          value={block.content}
                          onChange={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                            handleBlockChange(block.id, e.target.value);
                          }}
                          onKeyDown={(e) => handleBlockKeyDown(block.id, e)}
                          onBlur={handleBlockBlur}
                          placeholder="Heading 2"
                          className="w-full text-xl font-bold text-[#0B2545] focus:outline-none placeholder:text-neutral-300 py-1 mt-2 resize-none overflow-hidden bg-transparent leading-tight"
                          autoFocus
                          rows={1}
                        />
                      )}

                      {/* Embed Input Block */}
                      {block.type === 'embed_input' && (
                        <div className="my-4">
                          <div className="flex items-center gap-4 border border-[#0B2545] rounded-xl p-2 bg-white">
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center shrink-0 ml-2">
                               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
                            </div>
                            <input 
                              type="text" 
                              value={block.content}
                              onChange={(e) => handleBlockChange(block.id, e.target.value)}
                              placeholder="Letakkan/tempel tautan disini"
                              className="w-full text-sm focus:outline-none"
                              autoFocus
                            />
                            <button 
                              onClick={() => handleEmbedSubmit(block.id)}
                              className="bg-[#0B2545] hover:bg-[#13325B] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shrink-0"
                            >
                              Embed
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-2 px-2">Pastikan file di google drive Anda dapat dilihat siapa saja yang memiliki tautannya.</p>
                        </div>
                      )}

                      {/* Embedded Video Block */}
                      {block.type === 'embed_video' && (
                        <div className="my-6">
                          <button 
                            onClick={() => selectBlockType(block.id, 'embed_input')}
                            className="mb-3 border border-neutral-300 hover:border-[#0B2545] text-neutral-600 hover:text-[#0B2545] px-4 py-1.5 rounded-full text-xs font-bold transition-colors"
                          >
                            Ganti Link
                          </button>
                          <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 relative group cursor-pointer border border-neutral-200">
                            {(() => {
                              const url = block.content;
                              let embedUrl = url;
                              
                              if (url.includes('youtube.com/watch?v=')) {
                                embedUrl = url.replace('watch?v=', 'embed/');
                                // Handle extra params
                                if (embedUrl.includes('&')) embedUrl = embedUrl.split('&')[0];
                              } else if (url.includes('youtu.be/')) {
                                embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
                              } else if (url.includes('drive.google.com/file/d/')) {
                                embedUrl = url.replace('/view', '/preview');
                              }

                              if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
                                return <img src={url} alt="Embed" className="w-full h-full object-contain bg-neutral-100" />;
                              }
                              
                              if (url.match(/\.(mp4|webm|ogg)$/i)) {
                                return <video controls src={url} className="w-full h-full object-contain bg-black" />;
                              }

                              return (
                                <iframe 
                                  src={embedUrl} 
                                  className="w-full h-full" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                                />
                              );
                            })()}
                          </div>
                        </div>
                      )}

                    </div>
                  ))}

                </div>

              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="p-8 border-t border-neutral-200 flex justify-between items-center bg-white shrink-0 z-10 max-w-4xl mx-auto w-full">
              <button className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3.5 rounded font-bold text-sm transition-colors flex items-center gap-2">
                &lt; SEBELUMNYA
              </button>
              
              {isSubBab1 && (
                <button className="bg-[#00628B] hover:bg-[#004e6e] text-white px-8 py-3.5 rounded font-bold text-sm transition-colors">
                  SIMPAN DRAF
                </button>
              )}

              <button className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3.5 rounded font-bold text-sm transition-colors flex items-center gap-2">
                {isSubBab1 ? 'SELANJUTNYA >' : 'TAMBAH SUB-BAB +'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
