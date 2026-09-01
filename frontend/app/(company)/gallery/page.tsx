"use client";
import React, { useState } from 'react';

const galleryData = [
  { id: 1, src: '/gallery-1.jpg', alt: 'Training Session', className: 'md:col-span-2 md:row-span-2', category: 'In-House Training' },
  { id: 2, src: '/gallery-2.jpg', alt: 'Outbound Activity', className: 'md:col-span-1 md:row-span-1', category: 'Outbound' },
  { id: 3, src: '/gallery-3.jpg', alt: 'Smart Service Seminar', className: 'md:col-span-1 md:row-span-1', category: 'Public Seminars' },
  { id: 4, src: '/gallery-4.jpg', alt: 'Group Thumbs Up', className: 'md:col-span-2 md:row-span-1', category: 'Corporate Events' },
  { id: 5, src: '/gallery-5.jpg', alt: 'Speaker Session', className: 'md:col-span-2 md:row-span-2', category: 'Public Seminars' },
  { id: 6, src: '/gallery-6.jpg', alt: 'Projector Presentation', className: 'md:col-span-1 md:row-span-1', category: 'In-House Training' },
  { id: 7, src: '/gallery-7.jpg', alt: 'Award Winners', className: 'md:col-span-1 md:row-span-1', category: 'Corporate Events' },
  { id: 8, src: '/gallery-8.jpg', alt: 'Ice Breaking', className: 'md:col-span-2 md:row-span-1', category: 'Outbound' },
  { id: 9, src: '/gallery-9.jpg', alt: 'Stretching Activity', className: 'md:col-span-4 md:row-span-2', category: 'Outbound' },
  { id: 10, src: '/gallery-10.jpg', alt: 'Audience Listening', className: 'md:col-span-1 md:row-span-1', category: 'Public Seminars' },
  { id: 11, src: '/gallery-11.jpg', alt: 'Group Photo Banner', className: 'md:col-span-1 md:row-span-1', category: 'Corporate Events' },
  { id: 12, src: '/gallery-12.jpg', alt: 'Rafting Group', className: 'md:col-span-2 md:row-span-2', category: 'Outbound' },
  { id: 13, src: '/gallery-13.jpg', alt: 'Outdoor Briefing', className: 'md:col-span-2 md:row-span-1', category: 'Outbound' },
];

const filters = ['All', 'In-House Training', 'Public Seminars', 'Outbound', 'Corporate Events'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredData = activeFilter === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === activeFilter);

  const displayedData = filteredData.slice(0, visibleCount);

  // Reset visible count when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(8);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#FFF4E0] py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4 uppercase">
            Gallery & Documentation
          </h1>
          <p className="text-neutral-gray max-w-2xl mx-auto">
            Exploring our journey in human capital transformation through visual documentation of workshops, seminars, and corporate excellence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-colors border ${
                  activeFilter === filter 
                    ? 'bg-[#E5832E] text-white border-[#E5832E]' 
                    : 'border-neutral-300 text-neutral-500 hover:border-[#E5832E] hover:text-[#E5832E]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {displayedData.map((img) => (
              <div 
                key={img.id} 
                className={`bg-neutral-200 rounded-xl overflow-hidden shadow-sm relative group ${img.className}`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Category Tag Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#D47225] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredData.length && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-8 py-3 rounded-full border-2 border-brand-dark text-brand-dark font-bold hover:bg-brand-dark hover:text-white transition-colors"
              >
                Load More Photos
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
