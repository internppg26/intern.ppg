"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function News() {
  const [articles, setArticles] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          // Take latest 3 for home page
          const mapped = data.slice(0, 3).map((a: any) => {
            return {
              id: a.id,
              title: a.title,
              date: new Date(a.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              category: a.category || 'News',
              image: a.thumbnail || '/Logo_Performa_Puncak.png',
            };
          });
          setArticles(mapped);
        }
      } catch (err) {
        console.error('Failed to load articles');
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="bg-bg-beige py-20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">News & Blog</h2>
            <p className="text-neutral-gray">
              Artikel terbaru seputar industri, wawasan ahli, dan berita kegiatan perusahaan.
            </p>
          </div>
          <Link href="/blog" className="text-primary font-medium hover:text-primary-dark hidden md:block">
            Lihat Semua &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/blog/${article.id}`}>
                <div className="relative h-48 w-full cursor-pointer">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="text-xs text-neutral-gray mb-3">{article.date}</div>
                <Link href={`/blog/${article.id}`}>
                  <h3 className="text-lg font-bold text-brand-dark mb-4 line-clamp-2 cursor-pointer hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium bg-bg-beige text-neutral-gray px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Link href="/blog" className="text-primary font-medium hover:text-primary-dark block text-center mt-8 md:hidden">
            Lihat Semua &gt;
        </Link>
      </div>
    </section>
  );
}
