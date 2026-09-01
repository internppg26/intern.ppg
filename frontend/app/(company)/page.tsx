import React from 'react';
import Hero from '@/components/Hero';
import Ecosystem from '@/components/Ecosystem';
import Services from '@/components/Services';
import Programs from '@/components/Programs';
import News from '@/components/News';

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <Ecosystem />
      <Services />
      <Programs />
      <News />
    </div>
  );
}