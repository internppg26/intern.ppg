"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [topArticles, setTopArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilterTag, setSelectedFilterTag] = useState("ALL POSTS");
  
  const postsPerPage = 6; // Matching admin page
  
  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((a: any) => ({
            id: a.id,
            slug: a.id.toString(), // or real slug if added
            tag: (a.category || 'NEWS').toUpperCase(),
            date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
            title: a.title,
            description: a.content,
            image: a.thumbnail || '/Logo_Performa_Puncak.png',
            linkText: 'READ MORE',
            isTopNews: a.isTopNews
          }));
          
          setArticles(mapped); // ALL posts in grid
          setTopArticles(mapped.filter((a: any) => a.isTopNews));
        }
      } catch (err) {
        console.error('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const uniqueTags = React.useMemo(() => {
    const tags = articles.map(a => a.tag);
    return Array.from(new Set(tags)).filter(Boolean);
  }, [articles]);

  // Slideshow auto-play
  React.useEffect(() => {
    if (topArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [topArticles.length]);
  
  // Filter posts based on search query and tag
  const filteredPosts = articles.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedFilterTag === 'ALL POSTS' || post.tag === selectedFilterTag;
    return matchesSearch && matchesTag;
  });
  
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

        {/* Featured Article / Slideshow */}
        {(() => {
          const topArticles = articles.filter((a: any) => a.isTopNews);
          
          if (topArticles.length === 0) {
            return (
              <div className="relative rounded-3xl overflow-hidden bg-[#0B2545] text-white min-h-[400px] flex items-center justify-center p-10 lg:p-16 mb-16 shadow-lg border border-neutral-100">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%200L40%2020L20%2040L0%2020L20%200Z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')]"></div>
                <div className="text-center z-10">
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-widest text-white/50">Belum Ada Top News</h2>
                </div>
              </div>
            );
          }

          const currentTopNews = topArticles[currentSlide % topArticles.length];

          return (
            <div className="relative rounded-3xl overflow-hidden bg-[#0B2545] text-white min-h-[400px] flex items-center p-10 lg:p-16 mb-16 shadow-lg group">
              {currentTopNews.image && currentTopNews.image !== '/Logo_Performa_Puncak.png' && (
                 <img src={currentTopNews.image} alt={currentTopNews.title} className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500" />
              )}
              {/* Subtle gradient overlay so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/95 via-[#0B2545]/80 to-[#0B2545]/30 z-0"></div>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%200L40%2020L20%2040L0%2020L20%200Z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')]"></div>
              
              {/* Slideshow Controls */}
              {topArticles.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + topArticles.length) % topArticles.length)}
                    className="absolute left-4 z-20 p-2 bg-black/30 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % topArticles.length)}
                    className="absolute right-4 z-20 p-2 bg-black/30 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {topArticles.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-[#E5832E] w-6' : 'bg-white/50 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="relative z-10 max-w-2xl animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <span className="inline-block bg-[#E5832E] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                  {currentTopNews.tag}
                </span>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-6">
                  {currentTopNews.title}
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-xl line-clamp-3">
                  {currentTopNews.description}
                </p>
                <Link href={`/blog/${currentTopNews.slug}`} className="inline-block bg-[#E5832E] hover:bg-[#D47225] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md">
                  Read Full Article
                </Link>
              </div>
            </div>
          );
        })()}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setSelectedFilterTag('ALL POSTS')}
              className={`px-6 py-2 text-xs font-bold rounded-full uppercase tracking-wider transition-colors ${selectedFilterTag === 'ALL POSTS' ? 'bg-brand-dark text-white' : 'bg-[#FFF4E0] text-brand-dark hover:bg-brand-dark hover:text-white'}`}
            >
              All Posts
            </button>
            {uniqueTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedFilterTag(tag)}
                className={`px-6 py-2 text-xs font-bold rounded-full uppercase tracking-wider transition-colors ${selectedFilterTag === tag ? 'bg-brand-dark text-white' : 'bg-[#FFF4E0] text-brand-dark hover:bg-brand-dark hover:text-white'}`}
              >
                {tag}
              </button>
            ))}
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
                {/* Image Rendering */}
                <div className="relative aspect-[16/9] bg-neutral-800 overflow-hidden">
                  {post.image && post.image !== '/Logo_Performa_Puncak.png' ? (
                     <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <h3 className="text-white/30 text-3xl font-black uppercase tracking-widest">{post.tag}</h3>
                      </div>
                    </>
                  )}
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
