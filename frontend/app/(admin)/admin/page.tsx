'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPrograms: 0,
    activePrograms: 0
  });

  const [adminName, setAdminName] = React.useState('Super Admin');
  const [recentActivities, setRecentActivities] = React.useState<any[]>([]);
  const [distribution, setDistribution] = React.useState<any[]>([]);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear().toString());
  const [allEnrollments, setAllEnrollments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setAdminName(user.name);
      } catch (e) {
        console.error(e);
      }
    }

    if (!token) return;

    // Fetch users
    fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.users && Array.isArray(data.users)) {
          const active = data.users.filter((u: any) => u.isActive).length;
          setStats(s => ({ ...s, totalUsers: data.users.length, activeUsers: active }));
        }
      })
      .catch(console.error);

    // Fetch programs
    fetch('/api/programs?all=true', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const active = data.filter((p: any) => p.isPublished).length;
          setStats(s => ({ ...s, totalPrograms: data.length, activePrograms: active }));

          const counts: Record<string, number> = {};
          data.forEach((p: any) => {
            const cat = p.category ? p.category.split('||')[0] : 'Uncategorized';
            counts[cat] = (counts[cat] || 0) + 1;
          });
          
          const total = data.length || 1; // avoid div by 0
          const distArray = Object.keys(counts).map(key => ({
             label: key,
             count: counts[key],
             percentage: Math.round((counts[key] / total) * 100)
          })).sort((a, b) => b.count - a.count);
          
          setDistribution(distArray);
        }
      })
      .catch(console.error);

    // Fetch enrollments for recent activity
    fetch('/api/enrollments', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllEnrollments(data);
          const activities = data.slice(0, 6).map((enr: any, idx: number) => {
            const studentName = enr.student?.name || 'Unknown User';
            const initials = studentName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
            
            let status = 'PENDING';
            let statusColor = 'bg-orange-100 text-orange-700';
            
            if (enr.paymentStatus === 'verified') {
               status = 'ACTIVE';
               statusColor = 'bg-green-100 text-green-700';
            } else if (enr.paymentStatus === 'rejected') {
               status = 'REJECTED';
               statusColor = 'bg-red-100 text-red-700';
            }
            
            if (enr.isCompleted) {
               status = 'COMPLETED';
               statusColor = 'bg-neutral-200 text-neutral-700';
            }

            return {
              id: enr.id || idx,
              name: studentName,
              initials,
              course: enr.Program?.title || 'Unknown Program',
              date: new Date(enr.enrolledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              status,
              statusColor
            };
          });
          setRecentActivities(activities);
        }
      })
      .catch(console.error);
  }, []);

  const monthlyData = React.useMemo(() => {
    const counts = new Array(12).fill(0);
    allEnrollments.forEach(enr => {
      if (!enr.enrolledAt) return;
      const date = new Date(enr.enrolledAt);
      if (date.getFullYear().toString() === selectedYear) {
        counts[date.getMonth()]++;
      }
    });
    return counts;
  }, [allEnrollments, selectedYear]);

  const maxMonthVal = Math.max(...monthlyData, 1);
  const totalCurrentYear = monthlyData.reduce((a, b) => a + b, 0);

  const chartPoints = monthlyData.map((val, idx) => {
    const x = (idx / 11) * 800; // Map 0-11 to 0-800
    const y = 180 - ((val / maxMonthVal) * 160); // Map 0-max to 180-20
    return `${x} ${y}`;
  });
  
  const pathData = `M0 180 L ${chartPoints.map((p) => p).join(' L ')}`;
  const areaData = `${pathData} L 800 200 L 0 200 Z`;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h1 className="font-bold text-sm text-[#0B2545]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-[#0B2545]">{adminName}</div>
            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SYSTEM AUTHORITY</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4E3D7] text-[#D47225] flex items-center justify-center font-bold text-sm shrink-0 uppercase">
            {adminName.substring(0, 2)}
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 font-sans">
        <h2 className="text-3xl font-black text-[#0B2545] mb-8 tracking-tight">Selamat Datang, {adminName}!</h2>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#F0EBE1] flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">PENGGUNA</p>
            <p className="text-4xl font-black text-[#0B2545]">{stats.totalUsers}</p>
          </div>
          <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#F0EBE1] flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">PENGGUNA AKTIF</p>
            <p className="text-4xl font-black text-[#0B2545]">{stats.activeUsers}</p>
          </div>
          <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#F0EBE1] flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">TOTAL SEMUA PELATIHAN</p>
            <p className="text-4xl font-black text-[#0B2545]">{stats.totalPrograms}</p>
          </div>
          <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#F0EBE1] flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">PELATIHAN AKTIF</p>
            <p className="text-4xl font-black text-[#0B2545]">{stats.activePrograms}</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-[#0B2545]">Jumlah Pendaftar Pelatihan</h3>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-neutral-100 border-none text-xs font-bold text-neutral-600 rounded-full px-4 py-1.5 focus:outline-none"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            
            <div className="relative h-64 w-full mt-4">
              <div className="absolute right-0 top-0 bg-[#0B2545] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5832E]"></span>
                Total {selectedYear}: {totalCurrentYear}
              </div>
              <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full pt-10">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#737373" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#737373" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <path d={areaData} fill="url(#chartGradient)"/>
                <path d={pathData} fill="none" stroke="#B87B2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-bold text-neutral-400 tracking-widest uppercase pb-2">
                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-[#0B2545] leading-tight mb-6">Program<br/>Distribution</h3>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-8">
                {/* Mocking Donut Chart */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {distribution.length === 0 && (
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F4E3D7" strokeWidth="15"></circle>
                  )}
                  {(() => {
                    let currentOffset = 0;
                    return distribution.map((item, idx) => {
                      const colors = ['#0B2545', '#E5832E', '#F4E3D7', '#4A90E2', '#50E3C2'];
                      const color = colors[idx % colors.length];
                      const dashOffset = 251.2 - (251.2 * item.percentage / 100);
                      const rotation = (currentOffset / 100) * 360;
                      currentOffset += item.percentage;
                      return (
                        <circle 
                          key={idx} cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="15" 
                          strokeDasharray="251.2" strokeDashoffset={dashOffset}
                          transform={`rotate(${rotation} 50 50)`}
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-1">
                  <span className="text-3xl font-black text-[#0B2545] leading-none">{stats.totalPrograms}</span>
                  <span className="text-[7px] font-bold text-neutral-400 tracking-widest mt-1">PROGRAMS</span>
                </div>
              </div>

              <div className="w-full space-y-3">
                {distribution.map((item, idx) => {
                  const colors = ['#0B2545', '#E5832E', '#F4E3D7', '#4A90E2', '#50E3C2'];
                  const color = colors[idx % colors.length];
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs font-bold text-[#0B2545]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                        {item.label}
                      </div>
                      <span>{item.percentage}%</span>
                    </div>
                  );
                })}
                {distribution.length === 0 && (
                   <div className="text-xs font-bold text-neutral-400 text-center">No Programs Found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 flex justify-between items-center border-b border-neutral-100">
            <h3 className="text-lg font-black text-[#0B2545]">Recent Activity</h3>
            <Link href="#" className="text-[10px] font-bold text-[#E5832E] uppercase tracking-widest hover:text-[#D47225]">
              LIHAT SEMUA AKTIVITAS
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <th className="py-4 px-6 font-bold">USER NAME</th>
                  <th className="py-4 px-6 font-bold">PROGRAM NAME</th>
                  <th className="py-4 px-6 font-bold">DATE</th>
                  <th className="py-4 px-6 font-bold text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0">
                          {act.initials}
                        </div>
                        <span className="text-xs font-bold text-[#0B2545]">{act.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-neutral-600">{act.course}</td>
                    <td className="py-4 px-6 text-xs text-neutral-600">{act.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${act.statusColor}`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Footer */}
        <footer className="bg-[#0B2545] text-white rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-12">
          <div>
            <h4 className="font-bold text-base tracking-wide mb-1">Performa Puncak Group</h4>
            <p className="text-[10px] text-white/50">© 2012 PT. Performa Puncak Group. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold tracking-widest text-white/70">
            <Link href="#" className="hover:text-white transition-colors">SUPPORT CENTER</Link>
            <Link href="#" className="hover:text-white transition-colors">API DOCS</Link>
            <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
