import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    title: 'Strategic Human Capital Development in the Digital Age',
    date: '10 Aug 2024',
    category: 'Human Capital',
    tag: 'HR',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'The Impact of IoT on Organizational Efficiency',
    date: '5 Aug 2024',
    category: 'Technology',
    tag: 'IoT',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Mastering Creative Leadership: Workshop Insights',
    date: '1 Aug 2024',
    category: 'Leadership',
    tag: 'Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  }
];

export default function News() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-light hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full bg-neutral-light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-neutral-gray text-xs mb-3">{article.date}</p>
                <h3 className="text-lg font-bold text-brand-dark mb-4 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex space-x-2">
                  <span className="bg-bg-beige text-brand-dark text-xs px-3 py-1 rounded-full border border-neutral-200">
                    {article.category}
                  </span>
                  <span className="bg-bg-beige text-brand-dark text-xs px-3 py-1 rounded-full border border-neutral-200">
                    {article.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="text-primary font-medium hover:text-primary-dark">
            Lihat Semua &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
