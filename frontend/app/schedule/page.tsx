"use client";
import React, { useState } from 'react';

const scheduleEvents = [
  {
    date: '15',
    month: 'OCTOBER',
    category: 'MANAGEMENT',
    title: 'EXECUTIVE LEADERSHIP WORKSHOP 2024',
    time: '09:00 AM - 04:00 PM (GMT+8)',
    location: 'ConsultCorp HQ, Training Room B'
  },
  {
    date: '18',
    month: 'OCTOBER',
    category: 'TECHNICAL',
    title: 'ADVANCED DATA ANALYTICS WITH PYTHON',
    time: '02:00 PM - 05:00 PM (GMT+8)',
    location: 'Online - Zoom Meeting'
  },
  {
    date: '22',
    month: 'OCTOBER',
    category: 'SOFT SKILLS',
    title: 'EFFECTIVE COMMUNICATION SKILLS',
    time: '10:00 AM - 12:00 PM (GMT+8)',
    location: 'Grand Hall A, Tech Hub City'
  },
  {
    date: '25',
    month: 'OCTOBER',
    category: 'TECHNICAL',
    title: 'CLOUD INFRASTRUCTURE SUMMIT',
    time: 'All Day Event',
    location: 'Convention Center, Hall 4'
  },
  {
    date: '30',
    month: 'OCTOBER',
    category: 'MANAGEMENT',
    title: 'STRATEGIC FINANCIAL PLANNING Q4',
    time: '03:00 PM - 05:30 PM (GMT+8)',
    location: 'Online - MS Teams'
  }
];

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredEvents = scheduleEvents.filter((event) => {
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check month match. event.month is like 'OCTOBER'
    const monthMap: Record<string, string> = {
      '10': 'OCTOBER',
      '11': 'NOVEMBER',
      '12': 'DECEMBER'
    };
    const matchMonth = selectedMonth ? event.month === monthMap[selectedMonth] : true;
    
    const matchCategory = selectedCategory ? event.category.toLowerCase() === selectedCategory.toLowerCase() : true;

    return matchSearch && matchMonth && matchCategory;
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-[#FFF4E0] py-20 text-center relative">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-10 uppercase tracking-tight">
            Upcoming Training & Events Schedule
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
            <div className="relative w-full md:w-1/2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search training..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:border-primary shadow-sm bg-white"
              />
            </div>
            
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full md:w-1/4 px-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:border-primary shadow-sm appearance-none bg-white"
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/4 px-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:border-primary shadow-sm appearance-none bg-white"
            >
              <option value="">Select Category</option>
              <option value="management">Management</option>
              <option value="technical">Technical</option>
              <option value="soft skills">Soft Skills</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6 transition-transform hover:-translate-y-1">
                
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-neutral-100 pr-6">
                  <span className="text-4xl font-black text-[#E5832E]">{event.date}</span>
                  <span className="text-xs font-bold text-brand-dark tracking-wider">{event.month}</span>
                </div>
                
                {/* Content Block */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-[#E8F1F3] text-brand-dark text-xs font-bold rounded uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-3 uppercase">
                    {event.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {event.location}
                    </div>
                  </div>
                </div>
                
                {/* Action Block */}
                <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto pl-4">
                  <button className="w-full md:w-auto px-6 py-3 bg-[#E5832E] hover:bg-[#D47225] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-md">
                    Register / View Detail
                  </button>
                </div>
                
              </div>
            ))
            ) : (
              <div className="text-center py-12 text-neutral-500">
                <p>No training or events found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center pb-12 border-b border-neutral-200">
            <button className="px-8 py-3 rounded-full border-2 border-brand-dark text-brand-dark font-bold hover:bg-brand-dark hover:text-white transition-colors text-sm uppercase tracking-wider">
              Load More Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
