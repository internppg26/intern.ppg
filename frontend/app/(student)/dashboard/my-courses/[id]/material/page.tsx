'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudentCourseMaterialPage() {
  const params = useParams();
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [chapters, setChapters] = useState<any[]>([]);
  const [activeSubChapter, setActiveSubChapter] = useState<any>(null);
  const [isOverviewActive, setIsOverviewActive] = useState(true);
  const [overviewBlocks, setOverviewBlocks] = useState<any[]>([]);

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
          if (parsed.chapters && Array.isArray(parsed.chapters)) {
            const mappedChapters = parsed.chapters.map((ch: any) => ({
              ...ch,
              isOpen: ch.isExpanded !== undefined ? ch.isExpanded : true,
              subChapters: (ch.subChapters || []).map((sub: any, sIdx: number) => {
                if (typeof sub === 'string') {
                  return { id: Date.now() + sIdx, title: sub, duration: '10', type: 'material', blocks: [] };
                }
                return { ...sub };
              })
            }));
            setChapters(mappedChapters);
          }
          if (parsed.overviewBlocks && Array.isArray(parsed.overviewBlocks)) {
            setOverviewBlocks(parsed.overviewBlocks);
          }
        } catch(e) {}
      }
    });
  }, [params?.id]);

  const selectOverview = () => {
    setIsOverviewActive(true);
    setActiveSubChapter(null);
  };

  const selectSubChapter = (subCh: any) => {
    setIsOverviewActive(false);
    setActiveSubChapter(subCh);
  };

  const toggleChapter = (idx: number) => {
    const newCh = [...chapters];
    newCh[idx].isOpen = !newCh[idx].isOpen;
    setChapters(newCh);
  };

  const blocksToRender = isOverviewActive ? overviewBlocks : (activeSubChapter?.blocks || []);

  const getEmbedHtml = (content: string) => {
    if (content.includes('youtube.com') || content.includes('youtu.be')) {
      let videoId = '';
      if (content.includes('v=')) videoId = content.split('v=')[1].split('&')[0];
      else if (content.includes('youtu.be/')) videoId = content.split('youtu.be/')[1].split('?')[0];
      if (videoId) {
        return `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-xl shadow-lg"></iframe>`;
      }
    } else if (content.includes('drive.google.com')) {
      let embedUrl = content;
      if (content.includes('/view')) embedUrl = content.replace('/view', '/preview');
      return `<iframe src="${embedUrl}" width="100%" height="500" class="rounded-xl shadow-lg border border-neutral-200" allow="autoplay"></iframe>`;
    }
    // Fallback for direct image links
    if (content.match(/\.(jpeg|jpg|gif|png)$/)) {
      return `<img src="${content}" class="w-full rounded-xl shadow-lg border border-neutral-200" />`;
    }
    return `<div class="p-4 bg-neutral-100 rounded-lg text-sm text-neutral-500 break-all"><a href="${content}" target="_blank" class="text-blue-500 hover:underline">Buka Tautan: ${content}</a></div>`;
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      
      {/* Sidebar - Read Only */}
      <div className="w-[300px] flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col h-full shadow-lg z-10">
        <div className="p-6 border-b border-neutral-200 bg-[#F9FAFC]">
          <Link href={`/dashboard/catalog/${params?.id}`} className="inline-flex items-center text-xs font-bold text-[#E5832E] hover:text-[#D47225] transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
            KEMBALI KE DETAIL
          </Link>
          <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{courseProgramName}</div>
          <h2 className="text-lg font-black text-[#0B2545] leading-tight">{courseTitle}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Overview Button */}
          <button 
            onClick={selectOverview}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
              isOverviewActive 
                ? 'bg-[#0B2545] text-white shadow-md border-transparent' 
                : 'bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              <span className="font-bold text-sm tracking-wide">Overview</span>
            </div>
          </button>

          {chapters.map((ch, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <div 
                className="px-4 py-3 bg-[#F9FAFC] flex items-center justify-between cursor-pointer border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                onClick={() => toggleChapter(idx)}
              >
                <span className="font-black text-[#0B2545] text-sm tracking-wide">Bab {idx + 1}: {ch.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`text-neutral-400 transform transition-transform ${ch.isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
              {ch.isOpen && (
                <div className="p-2 space-y-1 bg-white">
                  {ch.subChapters.map((sub: any, sIdx: number) => {
                    const isActive = activeSubChapter?.id === sub.id && !isOverviewActive;
                    return (
                      <button 
                        key={sIdx}
                        onClick={() => selectSubChapter(sub)}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors border ${
                          isActive
                            ? 'bg-[#EAF1F8] text-[#0B2545] border-[#B8D0E6]' 
                            : 'hover:bg-neutral-50 text-neutral-600 border-transparent'
                        }`}
                      >
                        {sub.type === 'quiz' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-[#E5832E]"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-[#E5832E]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                        <div>
                          <div className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>
                            {idx + 1}.{sIdx + 1} {sub.title}
                          </div>
                          {sub.type !== 'quiz' && (
                            <div className="text-[10px] font-bold text-neutral-400 mt-1 uppercase tracking-widest">{sub.duration} Min</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
        
        {/* Header */}
        <div className="h-20 bg-white border-b border-neutral-200 flex items-center px-8 shadow-sm shrink-0 z-10 justify-between">
          <div>
            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">
              {isOverviewActive ? 'Course Introduction' : 'Materi Pembelajaran'}
            </div>
            <h1 className="text-2xl font-black text-[#0B2545] tracking-tight">
              {isOverviewActive ? 'Overview' : activeSubChapter?.title || ''}
            </h1>
          </div>
        </div>

        {/* Content Render Area */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFC] relative">
          <div className="max-w-4xl mx-auto py-12 px-8">
            
            {!isOverviewActive && activeSubChapter?.type === 'quiz' ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-[#0B2545] mb-4">Quiz: {activeSubChapter.title}</h3>
                <p className="text-neutral-500 mb-6">Fitur pengerjaan quiz akan tersedia di update berikutnya.</p>
              </div>
            ) : blocksToRender.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 border-dashed shadow-sm">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0B2545] mb-2">Belum ada konten</h3>
                <p className="text-neutral-500 text-sm">Materi untuk bagian ini belum tersedia.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-200 min-h-[60vh] p-10 lg:p-14 relative z-10">
                {blocksToRender.map((block: any) => {
                  if (block.type === 'h1') {
                    return <h1 key={block.id} className="text-4xl font-black text-[#0B2545] mb-6 tracking-tight leading-tight">{block.content || ''}</h1>;
                  }
                  if (block.type === 'h2') {
                    return <h2 key={block.id} className="text-2xl font-bold text-[#0B2545] mt-10 mb-4 tracking-tight">{block.content || ''}</h2>;
                  }
                  if (block.type === 'text') {
                    return <p key={block.id} className="text-neutral-700 leading-relaxed mb-6 whitespace-pre-wrap">{block.content || ''}</p>;
                  }
                  if (block.type === 'embed_video') {
                    return (
                      <div key={block.id} className="my-8" dangerouslySetInnerHTML={{ __html: getEmbedHtml(block.content) }} />
                    );
                  }
                  return null;
                })}
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
