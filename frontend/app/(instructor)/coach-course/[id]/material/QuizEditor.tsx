import React, { useState, useRef, useEffect } from 'react';

type BlockType = 'empty' | 'text' | 'h1' | 'h2' | 'embed_input' | 'embed_video';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  blocks: Block[];
  options: Option[];
}

interface QuizEditorProps {
  duration: string;
  initialQuestions?: Question[];
  initialIntroDesc?: string;
  initialInstructions?: string;
  onSave?: (questions: Question[], introDesc: string, instructions: string) => void;
}

export default function QuizEditor({ duration, initialQuestions, initialIntroDesc, initialInstructions, onSave }: QuizEditorProps) {
  const [quizMode, setQuizMode] = useState<'intro' | 'question'>('intro');
  const [quizIntroDesc, setQuizIntroDesc] = useState(initialIntroDesc || '');
  const [quizInstructions, setQuizInstructions] = useState(initialInstructions || '');
  
  const [questions, setQuestions] = useState<Question[]>(initialQuestions || [
    {
      id: 1,
      blocks: [{ id: '1', type: 'empty', content: '' }],
      options: [
        { id: 'opt1', text: '', isCorrect: false },
        { id: 'opt2', text: '', isCorrect: false }
      ]
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Slash menu for questions
  const [showSlashMenu, setShowSlashMenu] = useState<string | null>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        blocks: [{ id: Date.now().toString(), type: 'empty', content: '' }],
        options: [
          { id: `opt-${Date.now()}-1`, text: '', isCorrect: false },
          { id: `opt-${Date.now()}-2`, text: '', isCorrect: false }
        ]
      }
    ]);
    setActiveIndex(questions.length);
    setQuizMode('question');
  };

  const handleBlockChange = (blockId: string, newContent: string) => {
    if (newContent === '/') {
      setShowSlashMenu(blockId);
      return;
    }
    if (showSlashMenu === blockId && !newContent.includes('/')) {
      setShowSlashMenu(null);
    }

    setQuestions(questions.map((q, idx) => {
      if (idx === activeIndex) {
        return {
          ...q,
          blocks: q.blocks.map(b => b.id === blockId ? { ...b, content: newContent } : b)
        };
      }
      return q;
    }));
  };

  const handleBlockKeyDown = (blockId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSlashMenu) {
      e.preventDefault();
      setQuestions(questions.map((q, idx) => {
        if (idx === activeIndex) {
          const index = q.blocks.findIndex(b => b.id === blockId);
          const newBlocks = [...q.blocks];
          newBlocks.splice(index + 1, 0, { id: Date.now().toString(), type: 'empty', content: '' });
          return { ...q, blocks: newBlocks };
        }
        return q;
      }));
    }
  };

  const selectBlockType = (blockId: string, type: BlockType) => {
    setQuestions(questions.map((q, idx) => {
      if (idx === activeIndex) {
        return {
          ...q,
          blocks: q.blocks.map(b => b.id === blockId ? { ...b, type, content: '' } : b)
        };
      }
      return q;
    }));
    setShowSlashMenu(null);
  };

  const handleEmbedSubmit = (blockId: string) => {
    setQuestions(questions.map((q, idx) => {
      if (idx === activeIndex) {
        return {
          ...q,
          blocks: q.blocks.map(b => b.id === blockId ? { ...b, type: 'embed_video' } : b)
        };
      }
      return q;
    }));
  };

  const renderBlocks = () => {
    const activeBlocks = questions[activeIndex].blocks;
    return activeBlocks.map(block => (
      <div key={block.id} className="relative mb-4 group">
        {(block.type === 'empty' || block.type === 'text') && (
          <div className="relative">
            <input
              type="text"
              value={block.content}
              onChange={(e) => handleBlockChange(block.id, e.target.value)}
              onKeyDown={(e) => handleBlockKeyDown(block.id, e)}
              placeholder={block.type === 'empty' ? "Ketik '/' untuk menambahkan teks atau embed media" : ""}
              className="w-full text-neutral-600 text-[15px] focus:outline-none placeholder:text-neutral-300 py-1"
            />
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
                      </div>
                      <div className="text-[10px] text-neutral-500">Sematkan dokumen langsung dari drive</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {block.type === 'embed_input' && (
          <div className="my-4">
            <div className="flex items-center gap-4 border border-[#0B2545] rounded-xl p-2 bg-white">
              <input 
                type="text" 
                value={block.content}
                onChange={(e) => handleBlockChange(block.id, e.target.value)}
                placeholder="Letakkan/tempel tautan disini"
                className="w-full text-sm focus:outline-none pl-2"
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

        {block.type === 'embed_video' && (
          <div className="my-6 border rounded-lg overflow-hidden border-neutral-800 bg-neutral-900">
             <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="Embedded Content" className="w-full h-auto opacity-70" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full relative w-full">
      
      {/* Horizontal Question Indicators */}
      {quizMode === 'question' && (
        <div className="flex flex-wrap gap-2 mb-4 justify-start bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm w-fit">
          {questions.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${activeIndex === idx ? 'bg-[#E39352] border-[#E39352] text-white shadow-sm' : 'bg-white border-neutral-300 text-[#0B2545] hover:border-[#0B2545]'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Editor Canvas Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-10 min-h-[500px] flex gap-8">
        
        <div className="flex-1">
          {/* Undo/Redo */}
          <div className="flex gap-4 mb-6 text-[#0B2545]">
            <button className="flex items-center justify-center transition-colors hover:text-[#D47225]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3l-3 2.7"></path></svg>
            </button>
            <button className="flex items-center justify-center transition-colors text-neutral-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
            </button>
          </div>

          {quizMode === 'intro' ? (
            <div>
              <h2 className="text-2xl font-black text-[#0B2545] mb-4">Selamat Datang di Sesi Pre-Test</h2>
              <input 
                type="text" 
                value={quizIntroDesc}
                onChange={(e) => setQuizIntroDesc(e.target.value)}
                placeholder="Isi disini untuk kata pengantar atau deskripsi singkat tentang tes/kuis ini..."
                className="w-full text-neutral-600 focus:outline-none mb-8 placeholder:text-neutral-300"
              />
              <div className="border border-neutral-200 rounded-xl p-6 bg-neutral-50/50 mb-8">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B2545] mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Petunjuk Pengerjaan:
                </div>
                <input type="text" value={quizInstructions} onChange={(e) => setQuizInstructions(e.target.value)} placeholder="cth: Terdapat 10 pertanyaan pilihan ganda." className="w-full bg-transparent focus:outline-none text-sm text-neutral-500 placeholder:text-neutral-400" />
              </div>
              <div className="border-t border-neutral-200 pt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4E3D7] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D47225" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">DURASI</div>
                  <div className="text-sm font-black text-[#0B2545]">00:{duration.padStart(2, '0')}:00</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="text-xs font-bold text-[#0B2545]">SOAL {activeIndex + 1} DARI {questions.length}</div>
                {questions.length > 1 && (
                  <button 
                    onClick={() => {
                      const newQuestions = questions.filter((_, idx) => idx !== activeIndex);
                      setQuestions(newQuestions);
                      if (activeIndex >= newQuestions.length) {
                        setActiveIndex(newQuestions.length - 1);
                      }
                    }}
                    className="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs font-bold"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    Hapus Soal
                  </button>
                )}
              </div>
              
              {renderBlocks()}

              {/* Opsi Jawaban */}
              <div className="mt-12">
                <h3 className="font-bold text-sm text-[#0B2545] mb-4">Opsi Jawaban</h3>
                <div className="space-y-3">
                  {questions[activeIndex].options.map((opt, oIdx) => (
                    <div key={opt.id} className={`flex items-center gap-3 border ${opt.isCorrect ? 'border-green-500 bg-green-50' : 'border-neutral-200'} rounded-full px-4 py-2 hover:border-[#0B2545] transition-colors`}>
                      <button 
                        onClick={() => {
                          setQuestions(questions.map((q, qIdx) => {
                            if (qIdx === activeIndex) {
                              return { ...q, options: q.options.filter(o => o.id !== opt.id) };
                            }
                            return q;
                          }));
                        }}
                        className="text-red-500 hover:text-red-600"
                        title="Hapus opsi"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                      <button 
                        onClick={() => {
                          setQuestions(questions.map((q, qIdx) => {
                            if (qIdx === activeIndex) {
                              // If it's single choice, we might want to uncheck others. But let's allow multiple correct answers for flexibility, or just toggle this one.
                              return {
                                ...q,
                                options: q.options.map(o => o.id === opt.id ? { ...o, isCorrect: !o.isCorrect } : { ...o, isCorrect: false }) // Single choice logic
                              };
                            }
                            return q;
                          }));
                        }}
                        className={`${opt.isCorrect ? 'text-green-500' : 'text-neutral-400 hover:text-[#0B2545]'} mr-2`}
                        title="Tandai sebagai jawaban benar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={opt.isCorrect ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11 14 15 10" style={{display: opt.isCorrect ? 'none' : 'block'}}></polyline></svg>
                      </button>
                      <input 
                        type="text" 
                        placeholder="Ketik Opsi Jawaban" 
                        className="flex-1 focus:outline-none text-sm bg-transparent"
                        value={opt.text}
                        onChange={(e) => {
                          const newText = e.target.value;
                          setQuestions(questions.map((q, qIdx) => {
                            if (qIdx === activeIndex) {
                              return {
                                ...q,
                                options: q.options.map(o => o.id === opt.id ? { ...o, text: newText } : o)
                              };
                            }
                            return q;
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setQuestions(questions.map((q, idx) => {
                      if (idx === activeIndex) {
                        return { ...q, options: [...q.options, { id: `opt-${Date.now()}`, text: '', isCorrect: false }] };
                      }
                      return q;
                    }));
                  }}
                  className="w-full bg-[#DFF4F9] text-[#0B2545] font-bold text-sm py-3 rounded-full mt-4 hover:bg-[#c9ebf3] transition-colors"
                >
                  Tambah Opsi Jawaban
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Fixed Navigation relative to the container */}
      <div className="mt-8 border-t border-neutral-200 pt-6 flex justify-between items-center w-full">
        <button 
          onClick={() => {
            if (quizMode === 'question') {
              if (activeIndex > 0) setActiveIndex(activeIndex - 1);
              else setQuizMode('intro');
            }
          }}
          className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3.5 rounded font-bold text-sm transition-colors flex items-center gap-2"
        >
          &lt; SEBELUMNYA
        </button>
        
        <button 
          onClick={() => {
            if (onSave) {
              onSave(questions, quizIntroDesc, quizInstructions);
            }
          }}
          className="bg-[#00628B] hover:bg-[#004e6e] text-white px-8 py-3.5 rounded font-bold text-sm transition-colors"
        >
          SIMPAN DRAF
        </button>

        <button 
          onClick={() => {
            if (quizMode === 'intro') {
              setQuizMode('question');
            } else {
              handleAddQuestion();
            }
          }}
          className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-neutral-50 px-8 py-3.5 rounded font-bold text-sm transition-colors flex items-center gap-2"
        >
          {quizMode === 'intro' ? 'SELANJUTNYA >' : 'TAMBAH SOAL +'}
        </button>
      </div>

    </div>
  );
}
