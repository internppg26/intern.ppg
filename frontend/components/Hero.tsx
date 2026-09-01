"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const heroImages = [
  '/gallery-1.jpg',
  '/gallery-4.jpg',
  '/gallery-12.jpg',
  '/gallery-8.jpg',
  '/gallery-13.jpg'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      {/* Background Images with smooth transition */}
      {heroImages.map((src, index) => (
        <div 
          key={src}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-brand-dark/60 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Peak Performance
          </h1>
          <p className="text-lg md:text-xl mb-8 text-neutral-light">
            Menggali potensi tersembunyi untuk menghasilkan lompatan produktivitas yang nyata. 
            Kami mendampingi setiap individu dan tim untuk bertransformasi dari yang biasa menjadi luar biasa.
          </p>
          <Link
            href="/programs"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center transition-colors"
          >
            Mulai Belajar <span className="ml-2">&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
