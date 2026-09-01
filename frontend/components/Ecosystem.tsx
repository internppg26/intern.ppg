"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const ecosystems = [
  {
    title: 'Academy',
    description: 'Pusat pengembangan kompetensi strategis yang berdedikasi untuk memaksimalkan aset terpenting organisasi, yaitu Manusia.',
    services: 'Consulting, Training, Certification, Assessment.',
    link: '#',
    linkText: 'Learn More',
    icon: '/Icon_Academy.png',
    frontLogo: '/Logo_Academy.png'
  },
  {
    title: 'Creative',
    description: 'Agensi manajemen acara dan komunikasi kreatif yang berfokus pada penciptaan momen yang bermakna dan inovatif.',
    services: 'Events, Activation, Production, Virtual.',
    link: '#',
    linkText: 'Learn More',
    icon: '/Icon_Creative.png',
    frontLogo: '/Logo_Creative.png'
  },
  {
    title: 'Digital',
    description: 'Integrator teknologi yang membantu bisnis melakukan akselerasi digital melalui pengembangan perangkat lunak sistem.',
    services: 'Software, IoT, ERP/CRM, Security.',
    link: '#',
    linkText: 'Learn More',
    icon: '/Icon_Digital.png',
    frontLogo: '/Logo_Digital.png'
  },
  {
    title: 'Repub',
    description: 'Pusat riset strategis dan publikasi profesional yang menjembatani data mendalam dengan penyebaran informasi berpengaruh.',
    services: 'Research, Publishing, IP Management, Publicity.',
    link: '#',
    linkText: 'Learn More',
    icon: '/Icon_Repub.png',
    frontLogo: '/Logo_Repub.png'
  }
];

export default function Ecosystem() {
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    setFlippedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="bg-bg-beige py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark italic inline-block">
            Ekosistem
            <div className="h-[4px] w-16 bg-[#E5832E] mt-2"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystems.map((item, index) => (
            <div 
              key={index} 
              className="group h-[450px] [perspective:1000px] cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedIndices.includes(index) ? '[transform:rotateY(180deg)]' : ''} shadow-sm hover:shadow-xl rounded-2xl`}>
                
                {/* Front Face (Logo) */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-neutral-light overflow-hidden [backface-visibility:hidden]">
                  <img src={item.frontLogo} alt={`${item.title} Logo`} className="w-full h-full object-cover" />
                </div>

                {/* Back Face (Information) */}
                <div className="absolute inset-0 w-full h-full bg-white p-8 rounded-2xl border border-neutral-light flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="w-10 h-10 mb-4 shrink-0">
                    <img src={item.icon} alt={`Icon ${item.title}`} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2 italic">{item.title}</h3>
                  <p className="text-neutral-gray text-sm font-medium mb-4 italic leading-relaxed text-justify overflow-y-auto">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto mb-6 shrink-0">
                    <p className="text-[#E5832E] text-xs font-semibold mb-1">Layanan:</p>
                    <p className="text-brand-dark text-xs font-bold italic">{item.services}</p>
                  </div>

                  <Link 
                    href={item.link} 
                    className="w-full bg-[#E5832E] hover:bg-[#D47225] text-white font-bold py-3 px-4 rounded-lg text-sm italic text-center transition-colors shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.linkText}
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
