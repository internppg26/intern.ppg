'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return <div>Loading...</div>;

  const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    instructor: 'Instruktur',
    student: 'Siswa',
    public: 'Publik',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg"></div>
            <h1 className="text-2xl font-bold text-neutral-dark">Dashboard PPG</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Halo, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Role: {roleLabels[user.role] || user.role}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Program Pelatihan</h3>
            <p className="text-gray-600">Lihat daftar program, daftar kelas, akses materi.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
              Lihat Program
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-success mb-4">Modul & Ujian</h3>
            <p className="text-gray-600">Pelajari modul, kerjakan ujian, pantau progress.</p>
            <button className="mt-4 bg-success text-white px-4 py-2 rounded hover:bg-success-dark">
              Akses Materi
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-secondary mb-4">Sertifikat</h3>
            <p className="text-gray-600">Unduh sertifikat kelulusan, lihat riwayat.</p>
            <button className="mt-4 bg-secondary text-neutral-dark px-4 py-2 rounded hover:bg-secondary-dark">
              Lihat Sertifikat
            </button>
          </div>
        </div>
        {user.role === 'admin' && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Admin Panel</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-neutral-dark text-white p-4 rounded-xl hover:bg-neutral-gray">Kelola Program</button>
              <button className="bg-neutral-dark text-white p-4 rounded-xl hover:bg-neutral-gray">Kelola Modul</button>
              <button className="bg-neutral-dark text-white p-4 rounded-xl hover:bg-neutral-gray">Kelola Artikel</button>
              <button className="bg-neutral-dark text-white p-4 rounded-xl hover:bg-neutral-gray">Kelola File</button>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-12 py-6 text-center text-gray-500 border-t">
        <p>Dashboard LMS PPG - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}