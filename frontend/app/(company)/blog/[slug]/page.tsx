"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogDetail(props: { params: Promise<{ slug: string }> }) {
  const params = React.use(props.params);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          let parsedDesc = data.content;
          let blocks = [];
          try {
            const parsed = JSON.parse(data.content);
            if (parsed && typeof parsed === 'object') {
              parsedDesc = parsed.desc || '';
              blocks = parsed.blocks || [];
            }
          } catch(e) {}
          setArticle({
            id: data.id,
            title: data.title,
            desc: parsedDesc,
            blocks: blocks,
            tag: (data.category || 'NEWS').toUpperCase(),
            image: data.thumbnail || '/Logo_Performa_Puncak.png',
            date: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
          });
        }
      } catch (e) {
        console.error('Failed to load article');
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen font-sans flex items-center justify-center">
        <p className="text-neutral-500">Memuat berita...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white min-h-screen font-sans flex items-center justify-center">
        <p className="text-neutral-500">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Top Action Bar */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center text-neutral-500 hover:text-brand-dark transition-colors font-medium text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke berita
          </Link>
        </div>
      </div>

      {/* Main Content Article */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#1A365D] text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            {article.tag}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B2545] uppercase leading-tight mb-4 tracking-tighter">
            {article.title}
          </h1>
          <h2 className="text-[#3B82F6] text-sm md:text-base font-bold uppercase tracking-wider leading-relaxed max-w-3xl">
            {article.date}
          </h2>
        </header>

        {/* Hero Image */}
        {article.image && article.image !== '/Logo_Performa_Puncak.png' && (
          <figure className="mb-12 rounded-xl overflow-hidden shadow-sm">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover aspect-video"
            />
          </figure>
        )}

        {/* Article Body */}
        <div className="max-w-none text-neutral-700">
          {article.blocks && article.blocks.length > 0 && article.blocks[0].content !== '' ? (
            article.blocks.map((block: any) => {
              if (block.type === 'text' || block.type === 'empty') return <p key={block.id} className="mb-4 whitespace-pre-wrap text-lg leading-relaxed">{block.content}</p>;
              if (block.type === 'h1') return <h1 key={block.id} className="text-3xl font-black mt-8 mb-4 text-[#0B2545]">{block.content}</h1>;
              if (block.type === 'h2') return <h2 key={block.id} className="text-2xl font-bold mt-6 mb-3 text-[#0B2545]">{block.content}</h2>;
              if (block.type === 'embed_video') return <img key={block.id} src={block.content} alt="embed" className="w-full my-8 rounded-xl shadow-sm border border-neutral-100" />;
              return null;
            })
          ) : (
            <div className="whitespace-pre-wrap text-lg leading-relaxed">{article.desc}</div>
          )}
        </div>
      </article>
      
    </div>
  );
}
