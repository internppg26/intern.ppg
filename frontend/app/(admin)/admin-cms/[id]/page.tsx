'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type BlockType = 'empty' | 'text' | 'h1' | 'h2' | 'embed_input' | 'embed_video';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

function AdminCMSDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Header editable state
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/articles/${params.id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.title) {
            setTitle(data.title);
            let parsedDesc = data.content || '';
            let parsedBlocks = [{ id: '1', type: 'empty', content: '' }];
            try {
              const parsed = JSON.parse(data.content);
              if (parsed && typeof parsed === 'object') {
                parsedDesc = parsed.desc || '';
                if (parsed.blocks && parsed.blocks.length > 0) {
                  parsedBlocks = parsed.blocks;
                }
              }
            } catch (e) {}
            
            setDesc(parsedDesc);
            setTag(data.category || 'NEWS');
            setCoverImage(data.thumbnail !== '/Logo_Performa_Puncak.png' ? data.thumbnail : '');
            
            setBlocks(parsedBlocks);
            setHistory([JSON.parse(JSON.stringify(parsedBlocks))]);
          }
        })
        .catch(err => console.error('Failed to load article:', err));
    } else {
      const initialBlocks: Block[] = [{ id: '1', type: 'empty', content: '' }];
      setBlocks(initialBlocks);
      setHistory([JSON.parse(JSON.stringify(initialBlocks))]);
    }
  }, [params.id, searchParams]);

  const [showSlashMenu, setShowSlashMenu] = useState<string | null>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<Block[][]>([]);
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
    if (showSlashMenu === id && !newContent.includes('/')) {
      setShowSlashMenu(null);
    }
    const newBlocks = blocks.map(b => b.id === id ? { ...b, content: newContent } : b);
    setBlocks(newBlocks);
  };

  const handleBlockKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSlashMenu) {
      e.preventDefault();
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

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Only render once initialized to avoid hydration mismatch
  if (blocks.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFC] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin/cms" className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-[#0B2545] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke menu berita
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative">
           
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right flex flex-col justify-center">
              <span className="text-[10px] font-bold text-[#0B2545] leading-none">Super Admin</span>
              <span className="text-[8px] text-neutral-500 leading-none mt-1 uppercase">SYSTEM AUTHORITY</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FCE5D3] text-[#D47225] flex items-center justify-center font-black text-xs">
              SA
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-10 px-4">
          
          {/* Top Info Section */}
          <div className="mb-6 group relative pl-8">
            <div className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5832E" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <div className={`bg-[#0B2545] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4 ${!tag && 'border border-dashed border-neutral-400 bg-transparent text-neutral-400'}`}>
              <input 
                type="text" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
                placeholder="TAG"
                className="bg-transparent border-none focus:outline-none w-24 text-center placeholder:text-white/50" 
              />
            </div>
          </div>

          <div className="mb-4 group relative pl-8">
            <div className="absolute left-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5832E" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <textarea 
              value={title} 
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setTitle(e.target.value);
              }}
              placeholder="JUDUL BERITA"
              className="w-full text-3xl md:text-4xl font-black text-[#0B2545] uppercase tracking-tight break-words bg-transparent resize-none focus:outline-none placeholder:text-neutral-300"
              rows={2}
            />
          </div>

          <div className="mb-8 group relative pl-8">
            <div className="absolute left-0 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5832E" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <textarea 
              value={desc} 
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setDesc(e.target.value);
              }}
              placeholder="Deskripsi Singkat..."
              className="w-full text-xs font-semibold text-[#1F6E8C] uppercase tracking-wide bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-neutral-300"
              rows={2}
            />
          </div>

          <div className="mb-12 group relative pl-8">
            <div className="absolute left-0 top-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => coverInputRef.current?.click()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5832E" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <div className={`w-full aspect-[21/9] rounded-sm overflow-hidden ${coverImage ? 'bg-neutral-200' : 'bg-transparent border-2 border-dashed border-neutral-300'}`}>
              {coverImage ? (
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm font-medium">
                  Klik ikon pensil di sebelah kiri untuk mengunggah gambar cover
                </div>
              )}
            </div>
            <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleCoverUpload} />
          </div>

          {/* Undo/Redo Actions */}
          <div className="flex gap-4 mb-4 text-[#0B2545] pl-8">
            <button 
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              className={`flex items-center justify-center transition-colors ${historyIndex <= 0 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#1F6E8C] cursor-pointer'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3l-3 2.7"></path></svg>
            </button>
            <button 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`flex items-center justify-center transition-colors ${historyIndex >= history.length - 1 ? 'text-neutral-300 cursor-not-allowed' : 'hover:text-[#1F6E8C] cursor-pointer'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
            </button>
          </div>

          {/* Editor Canvas */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-8 min-h-[400px] ml-8">
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
                      className="w-full text-neutral-600 text-[13px] focus:outline-none placeholder:text-neutral-300 py-1 resize-none overflow-hidden bg-transparent leading-relaxed"
                      rows={1}
                      style={{ minHeight: '32px' }}
                    />
                    
                    {/* Slash Menu */}
                    {showSlashMenu === block.id && (
                      <div ref={slashMenuRef} className="absolute top-10 left-0 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50">
                        <div className="p-3 bg-neutral-50 border-b border-neutral-100 text-[9px] font-bold text-neutral-400 tracking-wider">BASIC BLOCKS</div>
                        <div className="p-2 space-y-1">
                          <button onClick={() => selectBlockType(block.id, 'text')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="14" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0B2545]">Text</div>
                              <div className="text-[9px] text-neutral-500">Tulis narasi, deskripsi atau instruksi</div>
                            </div>
                          </button>
                          <button onClick={() => selectBlockType(block.id, 'h1')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white font-black text-[#0B2545] text-xs">H1</div>
                            <div>
                              <div className="text-xs font-bold text-[#0B2545]">Heading 1</div>
                              <div className="text-[9px] text-neutral-500">Judul</div>
                            </div>
                          </button>
                          <button onClick={() => selectBlockType(block.id, 'h2')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white font-black text-[#0B2545] text-xs">H2</div>
                            <div>
                              <div className="text-xs font-bold text-[#0B2545]">Heading 2</div>
                              <div className="text-[9px] text-neutral-500">Sub-judul</div>
                            </div>
                          </button>
                        </div>
                        <div className="p-3 bg-neutral-50 border-y border-neutral-100 text-[9px] font-bold text-neutral-400 tracking-wider">INTEGRATIONS</div>
                        <div className="p-2">
                          <button onClick={() => selectBlockType(block.id, 'embed_input')} className="w-full text-left flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center shrink-0 bg-white">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0B2545] flex items-center gap-2">
                                Google Drive Embed
                                <span className="bg-[#EAF1F8] text-[#0B2545] text-[7px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Video, PDF, Image</span>
                              </div>
                              <div className="text-[9px] text-neutral-500">Sematkan dokumen langsung dari drive</div>
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
                    className="w-full text-[22px] font-black text-[#0B2545] focus:outline-none placeholder:text-neutral-300 py-2 resize-none overflow-hidden bg-transparent leading-tight border-l-2 border-[#1F6E8C] pl-2 -ml-[10px]"
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
                    className="w-full text-[17px] font-bold text-[#0B2545] focus:outline-none placeholder:text-neutral-300 py-1 mt-2 resize-none overflow-hidden bg-transparent leading-tight border-l-2 border-[#1F6E8C] pl-2 -ml-[10px]"
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
                        className="w-full text-xs focus:outline-none"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleEmbedSubmit(block.id)}
                        className="bg-[#0B2545] hover:bg-[#13325B] text-white px-6 py-2 rounded-lg text-xs font-bold transition-colors shrink-0"
                      >
                        Embed
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-2 px-2">Pastikan file di google drive Anda dapat dilihat siapa saja yang memiliki tautannya.</p>
                  </div>
                )}

                {/* Embedded Video Block */}
                {block.type === 'embed_video' && (
                  <div className="my-4">
                    <button 
                      onClick={() => selectBlockType(block.id, 'embed_input')}
                      className="mb-2 border border-neutral-300 hover:border-[#0B2545] text-neutral-600 hover:text-[#0B2545] px-3 py-1 rounded-full text-[10px] font-bold transition-colors bg-white shadow-sm"
                    >
                      Ganti Link
                    </button>
                    <div className="w-full rounded-sm overflow-hidden bg-neutral-200 relative cursor-pointer border border-neutral-200">
                      <img src={block.content} alt="Embed" className="w-full h-auto object-contain max-h-[400px]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center gap-4 ml-8">
            <button 
              onClick={async () => {
                try {
                  const res = await fetch(`/api/articles/${params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: title,
                      content: JSON.stringify({ desc: desc, blocks: blocks }),
                      category: tag.toUpperCase(),
                      thumbnail: coverImage || '/Logo_Performa_Puncak.png'
                    })
                  });
                  if (res.ok) {
                    alert('Berita berhasil disimpan! Perubahan akan terlihat di daftar berita.');
                    router.push('/admin/cms');
                  } else {
                    throw new Error('Failed to update');
                  }
                } catch (err) {
                  alert('Gagal menyimpan berita');
                }
              }}
              className="bg-[#1F6E8C] hover:bg-[#155A73] text-white px-8 py-2.5 rounded text-xs font-bold transition-colors uppercase tracking-widest"
            >
              SIMPAN BERITA
            </button>
            <button className="bg-white text-[#1F6E8C] border border-[#1F6E8C]/30 hover:border-[#1F6E8C] px-8 py-2.5 rounded text-xs font-bold transition-colors uppercase tracking-widest">
              PREVIEW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AdminCMSDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-500">Loading editor...</div>}>
      <AdminCMSDetailContent />
    </Suspense>
  );
}
