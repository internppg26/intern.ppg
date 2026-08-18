"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

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
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Using the real logo asset */}
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/Logo_Performa_Puncak.png" alt="Logo Performa Puncak Group" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold text-brand-dark">Performa Puncak Group</span>
        </div>

        {/* Navigation Links */}
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

        {/* Action Button */}
        <div>
          <Link
            href="/register"
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center"
          >
            Mulai LMS <span className="ml-2">&gt;</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
