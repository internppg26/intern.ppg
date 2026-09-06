'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';


const StudentQuiz = ({ chapterId, subChapter, onComplete }: { chapterId: any, subChapter: any, onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = React.useState((subChapter.duration || 15) * 60);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const questions = subChapter.quizQuestions || [];
  const introDesc = subChapter.quizIntroDesc || 'Sesi ini dirancang untuk mengukur pemahaman Anda mengenai materi ini.';
  const instructions = subChapter.quizInstructions || 'Terdapat beberapa pertanyaan pilihan ganda.';

  React.useEffect(() => {
    if (!quizStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit
          setSubmitted(true);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  return () => clearInterval(timer);
  }, [quizStarted, submitted, onComplete]);

  // When auto-submitted by timer, calculate score
  React.useEffect(() => {
    if (submitted) {
      let correct = 0;
      questions.forEach((q: any, idx: number) => {
        const selectedId = answers[idx];
        const selectedOpt = q.options.find((o: any) => o.id === selectedId);
        if (selectedOpt && selectedOpt.isCorrect) correct++;
      });
      setScore(Math.round((correct / questions.length) * 100));
    }
  }, [submitted, answers, questions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [activeIndex]: optId });
  };

  const handleNext = () => {
    if (activeIndex < questions.length - 1) setActiveIndex(activeIndex + 1);
  };
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) onComplete();
  };

  if (!questions || questions.length === 0) {
    return <div className="text-neutral-500 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">Kuis ini belum memiliki soal.</div>;
  }

  if (!quizStarted) {
    return (
      <div className="bg-white p-5 sm:p-10 lg:p-14 rounded-3xl shadow-sm border border-neutral-200">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] mb-4 sm:mb-6">Selamat Datang di Sesi {subChapter.title}</h2>
        <p className="text-neutral-600 mb-6 sm:mb-10 text-base sm:text-lg leading-relaxed">{introDesc}</p>

        <div className="border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-neutral-50/50 mb-8 sm:mb-12">
          <div className="flex items-center gap-3 font-bold text-[#D47225] mb-4 sm:mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Petunjuk Pengerjaan:
          </div>
          <ul className="text-neutral-600 space-y-3 list-disc list-outside ml-5 text-sm sm:text-base">
            <li>{instructions}</li>
            <li>Waktu pengerjaan: {subChapter.duration} menit.</li>
            <li>Klik tombol "Mulai Quiz" untuk memulai pengerjaan.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-neutral-100 pt-6 sm:pt-8 gap-4">
          <div className="flex gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D47225]/10 flex items-center justify-center text-[#D47225]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Durasi</div>
                <div className="font-bold text-[#0B2545]">{subChapter.duration} Menit</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D47225]/10 flex items-center justify-center text-[#D47225]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Jumlah Soal</div>
                <div className="font-bold text-[#0B2545]">{questions.length} Soal</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setQuizStarted(true)}
            className="w-full sm:w-auto bg-[#003855] hover:bg-[#00273c] text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            MULAI QUIZ <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    );
  }

  const q = questions[activeIndex];
  const progressPercent = ((activeIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white p-5 sm:p-10 lg:p-14 rounded-3xl shadow-sm border border-neutral-200">
      
      {/* Progress Bar & Header */}
      <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-12">
        <div className="text-xs sm:text-sm font-bold text-[#0B2545] shrink-0 uppercase tracking-widest">
          SOAL {activeIndex + 1}/{questions.length}
        </div>
        <div className="font-bold text-red-500 bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full tabular-nums shrink-0 flex items-center gap-1.5 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {formatTime(timeLeft)}
        </div>
        <div className="h-2 bg-neutral-100 rounded-full flex-1 overflow-hidden">
          <div className="h-full bg-[#003855] transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
      
      {submitted && (
        <div className={`p-5 sm:p-6 rounded-2xl mb-8 sm:mb-12 border-2 ${score >= 70 ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-red-50/50 border-red-200 text-red-800'}`}>
          <h4 className="font-black text-xl sm:text-2xl mb-2 text-center">Nilai Anda: {score}</h4>
          <p className="text-center font-medium text-sm sm:text-base">{score >= 70 ? '🎉 Selamat! Anda lulus kuis ini.' : 'Maaf, Anda belum lulus kuis ini. Tetap semangat!'}</p>
        </div>
      )}

      <div className="min-h-[300px] sm:min-h-[400px]">
        {/* Question text */}
        <div className="mb-6 sm:mb-10">
          {q.blocks.map((b: any) => (
            <p key={b.id} className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0B2545] leading-relaxed mb-4 sm:mb-6">{b.content}</p>
          ))}
        </div>

        {/* Options */}
        <div className="space-y-3 sm:space-y-4">
          {q.options.map((opt: any) => {
            const isSelected = answers[activeIndex] === opt.id;
            let optionStyle = 'border-neutral-200 hover:border-[#0B2545] text-neutral-700';
            
            if (submitted) {
              if (opt.isCorrect) optionStyle = 'border-green-500 bg-green-50 text-green-700 font-bold shadow-[0_0_0_1px_rgba(34,197,94,1)]';
              else if (isSelected && !opt.isCorrect) optionStyle = 'border-red-500 bg-red-50 text-red-700 shadow-[0_0_0_1px_rgba(239,68,68,1)]';
              else optionStyle = 'border-neutral-200 opacity-50';
            } else if (isSelected) {
              optionStyle = 'border-[#0B2545] bg-[#0B2545] text-white shadow-[0_0_0_1px_rgba(11,37,69,1)]';
            }

            return (
              <button 
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={submitted}
                className={`w-full text-left px-4 sm:px-8 py-4 sm:py-5 rounded-full border-2 transition-all flex items-center gap-3 sm:gap-5 ${optionStyle}`}
              >
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected || (submitted && opt.isCorrect) ? 'border-current' : 'border-neutral-300'}`}>
                  {(isSelected || (submitted && opt.isCorrect)) && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-current"></div>}
                </div>
                <span className="text-sm sm:text-lg leading-snug">{opt.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-neutral-100 pt-6 sm:pt-8 mt-8 sm:mt-12 gap-3">
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="border-2 border-[#0B2545] text-[#0B2545] font-bold py-3 sm:py-4 px-5 sm:px-8 rounded-full hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg> SEBELUMNYA
        </button>

        {!submitted ? (
          activeIndex === questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              SUBMIT
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-3 sm:py-4 px-5 sm:px-8 rounded-full transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              SELANJUTNYA <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          )
        ) : (
          activeIndex < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-3 sm:py-4 px-5 sm:px-8 rounded-full transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              SELANJUTNYA <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          ) : (
            <div className="text-xs sm:text-sm font-bold text-green-600 bg-green-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full">KUIS SELESAI</div>
          )
        )}
      </div>
    </div>
  );
};

export default function StudentCourseMaterialPage() {
  const params = useParams();
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseProgramName, setCourseProgramName] = useState('PROGRAM');
  const [chapters, setChapters] = useState<any[]>([]);
  const [activeSubChapter, setActiveSubChapter] = useState<any>(null);
  const [isOverviewActive, setIsOverviewActive] = useState(true);
  const [overviewBlocks, setOverviewBlocks] = useState<any[]>([]);

  const [enrollment, setEnrollment] = useState<any>(null);
  const [completedSubs, setCompletedSubs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseDuration, setCourseDuration] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/enrollments', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const enr = data.find(e => e.programId === parseInt(params?.id as string));
          if (enr) {
            setEnrollment(enr);
            const stored = localStorage.getItem(`completed_subs_${enr.id}`);
            if (stored) {
              try { setCompletedSubs(JSON.parse(stored)); } catch(e) {}
            }
          }
        }
      });
  }, [params?.id]);

  useEffect(() => {
    fetch(`/api/programs/${params?.id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      setCourseTitle(data.title);
      if (data.duration) setCourseDuration(parseInt(data.duration));
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

  const markAsCompleted = async () => {
    if (!enrollment || !activeSubChapter) return;
    const subId = activeSubChapter.id.toString();
    if (completedSubs.includes(subId)) return;
    
    setIsSubmitting(true);
    const newCompleted = [...completedSubs, subId];
    setCompletedSubs(newCompleted);
    localStorage.setItem(`completed_subs_${enrollment.id}`, JSON.stringify(newCompleted));

    let totalSubs = 0;
    chapters.forEach(ch => {
      if (Array.isArray(ch.subChapters)) {
        totalSubs += ch.subChapters.length;
      }
    });
    
    let newProgress = 0;
    if (totalSubs > 0) {
      newProgress = Math.round((newCompleted.length / totalSubs) * 100);
    }
    
    const newStatus = newProgress === 100 ? 'completed' : 'active';
    const isCompleted = newProgress === 100;
    const completedAt = isCompleted ? new Date().toISOString() : null;

    try {
      await fetch(`/api/enrollments/${enrollment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          progress: newProgress,
          status: newStatus,
          isCompleted,
          completedAt
        })
      });
    } catch(e) {}
    setIsSubmitting(false);
  };

  const blocksToRender = isOverviewActive ? overviewBlocks : (activeSubChapter?.blocks || []);

  
  const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);

  const isExpired = React.useMemo(() => {
    if (!enrollment || !enrollment.createdAt || !courseDuration) return false;
    const enrollDate = new Date(enrollment.createdAt).getTime();
    const expiryDate = enrollDate + (courseDuration * 24 * 60 * 60 * 1000);
    return Date.now() > expiryDate;
  }, [enrollment, courseDuration]);

  if (isExpired) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-neutral-200 max-w-lg text-center">
          <div className="w-20 h-20 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h2 className="text-2xl font-black text-[#0B2545] mb-4">Akses Pelatihan Berakhir</h2>
          <p className="text-neutral-600 mb-8">
            Batas waktu pengerjaan pelatihan ini ({courseDuration} hari) telah berakhir sejak tanggal pendaftaran Anda. Anda tidak dapat lagi mengakses materi ini.
          </p>
          <Link href="/dashboard/my-courses" className="inline-block bg-[#0B2545] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0B2545]/90 transition-colors">
            Kembali ke Pelatihan Saya
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden relative">

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden absolute top-4 left-0 z-50 bg-[#E5832E] hover:bg-[#D47225] text-white p-2 rounded-r-md shadow-md transition-colors"
        onClick={() => setIsSidebarOpen(true)}
        style={{ display: isSidebarOpen ? 'none' : undefined }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 17 18 12 13 7"></polyline><line x1="6" y1="17" x2="6" y2="7"></line></svg>
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Read Only */}
      <div className={`w-[300px] flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col h-full shadow-lg z-40 absolute md:relative transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-[300px] md:left-0'}`}>
        <div className="p-6 border-b border-neutral-200 bg-[#F9FAFC]">
          <Link href="/dashboard/my-courses" className="inline-flex items-center text-xs font-bold text-[#E5832E] hover:text-[#D47225] transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
            KEMBALI KE PELATIHAN SAYA
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
                      const globalIndex = allSubChapters.findIndex(s => s.id === sub.id);
                      const isUnlocked = globalIndex === 0 || completedSubs.includes(allSubChapters[globalIndex - 1]?.id.toString());
                    const isActive = activeSubChapter?.id === sub.id && !isOverviewActive;
                    return (
                      <button 
                        key={sIdx}
                        onClick={() => { if (isUnlocked) selectSubChapter(sub); }}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors border ${
                          isActive
                            ? 'bg-[#EAF1F8] text-[#0B2545] border-[#B8D0E6]' 
                            : 'hover:bg-neutral-50 text-neutral-600 border-transparent'
                          } 
                        }`}
                      >
                        {completedSubs.includes(sub.id?.toString()) ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        ) : sub.type === 'quiz' ? (
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
        <div className="h-16 sm:h-20 bg-white border-b border-neutral-200 flex items-center px-4 sm:px-8 shadow-sm shrink-0 z-10 justify-between">
          <div>
            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5 sm:mb-1">
              {isOverviewActive ? 'Course Introduction' : 'Materi Pembelajaran'}
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-[#0B2545] tracking-tight">
              {isOverviewActive ? 'Overview' : activeSubChapter?.title || ''}
            </h1>
          </div>
        </div>

        {/* Content Render Area */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFC] relative">
          <div className="max-w-4xl mx-auto py-6 sm:py-12 px-3 sm:px-8">
            
            {!isOverviewActive && activeSubChapter?.type === 'quiz' ? (
              <div>
                <StudentQuiz 
                  chapterId={chapters.find((c:any) => c.subChapters.some((s:any) => s.id === activeSubChapter.id))?.id} 
                  subChapter={activeSubChapter} 
                  onComplete={() => markAsCompleted()} 
                />
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

                {/* Mark as Completed Button */}
                {!isOverviewActive && activeSubChapter && (
                  <div className="mt-12 pt-8 border-t border-neutral-200">
                    {completedSubs.includes(activeSubChapter.id?.toString()) ? (
                      <div className="flex items-center gap-3 text-green-600 font-bold bg-green-50 p-4 rounded-xl border border-green-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Selesai dipelajari
                      </div>
                    ) : (
                      <button 
                        onClick={markAsCompleted}
                        disabled={isSubmitting}
                        className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                          isSubmitting ? 'bg-neutral-400 cursor-not-allowed' : 'bg-[#D47225] hover:bg-[#b05e1e]'
                        }`}
                      >
                        {isSubmitting ? 'Memproses...' : 'Tandai Selesai'}
                        {!isSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
