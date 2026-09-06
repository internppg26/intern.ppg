"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to determine if a link is active
  const getLinkClass = (path: string) => {
    // For Home, must match exactly
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
    
    if (isActive) {
      return "text-primary border-b-2 border-primary font-medium pb-1 transition-colors";
    }
    return "text-neutral-dark hover:text-primary font-medium pb-1 transition-colors";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Using the real logo asset */}
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/Logo_Performa_Puncak.png" alt="Logo Performa Puncak Group" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold text-brand-dark hidden sm:block">Performa Puncak Group</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className={getLinkClass('/')}>
            Home
          </Link>
          <Link href="/about" className={getLinkClass('/about')}>
            About Us
          </Link>
          <Link href="/services" className={getLinkClass('/services')}>
            Services
          </Link>
          <Link href="/programs" className={getLinkClass('/programs')}>
            Program
          </Link>
          <Link href="/schedule" className={getLinkClass('/schedule')}>
            Schedule
          </Link>
          <Link href="/blog" className={getLinkClass('/blog')}>
            Blog
          </Link>
          <Link href="/gallery" className={getLinkClass('/gallery')}>
            Gallery
          </Link>
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="bg-primary text-white px-4 py-2 sm:px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center"
          >
            Mulai LMS <span className="hidden sm:inline ml-2">&gt;</span>
          </Link>
          <button 
            className="md:hidden text-brand-dark p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col space-y-4 shadow-lg absolute w-full left-0">
          <Link href="/" className={getLinkClass('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className={getLinkClass('/about')} onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link href="/services" className={getLinkClass('/services')} onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link href="/programs" className={getLinkClass('/programs')} onClick={() => setIsMenuOpen(false)}>Program</Link>
          <Link href="/schedule" className={getLinkClass('/schedule')} onClick={() => setIsMenuOpen(false)}>Schedule</Link>
          <Link href="/blog" className={getLinkClass('/blog')} onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link href="/gallery" className={getLinkClass('/gallery')} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        </div>
      )}
    </nav>
  );
}
