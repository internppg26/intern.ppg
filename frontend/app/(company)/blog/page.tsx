"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'navigating-exponential-growth',
    tag: 'STRATEGY',
    date: 'OCT 12, 2024',
    title: 'NAVIGATING EXPONENTIAL GROWTH FOR TECH STARTUPS',
    description: 'The landscape for early-stage companies is shifting. We explore how to maintain culture during rapid expansion phases.',
    linkText: 'READ MORE'
  },
  {
    slug: 'upcoming-executive-leadership',
    tag: 'EDUCATION',
    date: 'OCT 08, 2024',
    title: 'UPCOMING EXECUTIVE LEADERSHIP WORKSHOP',
    description: 'Join our network of elite professionals for a three-day intensive on disruptive leadership in the digital era.',
    linkText: 'REGISTER NOW'
  },
  {
    slug: 'building-sustainable-tech',
    tag: 'INSIGHTS',
    date: 'SEP 28, 2024',
    title: 'BUILDING SUSTAINABLE TECH ECOSYSTEMS',
    description: 'Sustainability is no longer optional. How modern corporations are integrating ESG into their core tech stack.',
    linkText: 'READ MORE'
  },
  {
    slug: 'future-of-hybrid-collaboration',
    tag: 'WORK',
    date: 'SEP 15, 2024',
    title: 'THE FUTURE OF HYBRID COLLABORATION',
    description: 'New tools and methodologies for keeping distributed teams engaged and productive in 2025.',
    linkText: 'READ MORE'
  },
  {
    slug: 'q3-platform-maintenance',
    tag: 'UPDATES',
    date: 'SEP 02, 2024',
    title: 'Q3 PLATFORM MAINTENANCE SCHEDULE',
    description: 'Essential updates on our LMS infrastructure and planned downtime for performance optimization.',
    linkText: 'VIEW DETAILS'
  },
  {
    slug: 'top-10-productivity-tools',
    tag: 'RESOURCES',
    date: 'AUG 22, 2024',
    title: 'TOP 10 PRODUCTIVITY TOOLS FOR LEADERS',
    description: 'Our curated list of software that top-tier executives use to streamline their daily workflows.',
    linkText: 'READ MORE'
  }
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const postsPerPage = 2;
  
  // Filter posts based on search query
  const filteredPosts = blogPosts.filter((post) => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reset to page 1 when search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-8">
          Blog, News & <span className="text-[#E5832E]">Insights</span>
        </h1>

        {/* Featured Article */}
        <div className="relative bg-brand-dark rounded-3xl overflow-hidden mb-16 shadow-xl">
          {/* Subtle gradient overlay to simulate image background */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/20 z-0"></div>
          {/* We can use a pattern or just the solid color with gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          
          <div className="relative z-10 p-10 md:p-16 md:w-2/3 lg:w-1/2">
            <span className="inline-block px-3 py-1 bg-[#E5832E] text-white text-[10px] font-bold rounded uppercase tracking-widest mb-6">
              Featured Article
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase">
              How Strategic Consulting Drives Operational Excellence In Modern Tech
            </h2>
            <p className="text-neutral-300 mb-8 leading-relaxed">
              Discover the core principles of transformation that are helping global leaders scale their operations while maintaining elite performance standards.
            </p>
            <Link href="/blog/strategic-consulting-operational-excellence" className="inline-block px-8 py-3 bg-[#E5832E] hover:bg-[#D47225] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-md">
              Read Full Article
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-brand-dark text-white text-xs font-bold rounded-full uppercase tracking-wider">
              All Posts
            </button>
            <button className="px-6 py-2 bg-[#FFF4E0] text-brand-dark hover:bg-brand-dark hover:text-white transition-colors text-xs font-bold rounded-full uppercase tracking-wider">
              Case Studies
            </button>
            <button className="px-6 py-2 bg-[#FFF4E0] text-brand-dark hover:bg-brand-dark hover:text-white transition-colors text-xs font-bold rounded-full uppercase tracking-wider">
              Training Updates
            </button>
          </div>
          
          <div className="relative w-full md:w-72">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={index} className="flex flex-col group cursor-pointer border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
                {/* Image Placeholder */}
                <div className="relative aspect-[16/9] bg-neutral-800 overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <h3 className="text-white/30 text-3xl font-black uppercase tracking-widest">{post.tag}</h3>
                  </div>
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-[#E5832E] text-white text-[10px] font-bold rounded uppercase tracking-widest z-10">
                    {post.tag}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[#E5832E] text-[10px] font-bold tracking-widest mb-2 uppercase">{post.date}</span>
                  <h3 className="text-lg font-bold text-brand-dark mb-3 uppercase leading-tight group-hover:text-[#E5832E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6 flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-[#E5832E] text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                      {post.linkText} <span className="text-lg leading-none">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500 mb-16">
            <p className="text-lg">No articles found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >&lt;</button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                currentPage === i + 1 
                  ? 'bg-brand-dark text-white' 
                  : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >&gt;</button>
        </div>

      </div>

      {/* Newsletter Section */}
      <section className="bg-[#FFF4E0] py-20 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
            Stay Ahead Of The Curve
          </h2>
          <p className="text-neutral-600 mb-8">
            Subscribe to our newsletter for exclusive industry insights, workshop announcements, and executive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Email address" 
              className="px-6 py-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#E5832E] w-full sm:w-96 shadow-sm"
            />
            <button className="px-8 py-4 bg-[#E5832E] hover:bg-[#D47225] text-white font-bold rounded-full uppercase tracking-wider transition-colors shadow-md whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
