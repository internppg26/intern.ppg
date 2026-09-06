'use client';

import React, { useState, useEffect } from 'react';

export default function AdminTransactionsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = () => {
    setLoading(true);
    fetch('/api/enrollments', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        // filter out only pending or recently verified
        const transactions = data.filter(e => e.paymentProof);
        setEnrollments(transactions);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleVerify = async (id: number, action: 'verify' | 'reject') => {
    if (!confirm(`Yakin ingin ${action === 'verify' ? 'menerima' : 'menolak'} pembayaran ini?`)) return;
    try {
      const res = await fetch(`/api/enrollments/${id}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        alert("Berhasil diperbarui!");
        fetchTransactions();
      } else {
        alert("Gagal memperbarui");
      }
    } catch (e) {
      alert("Error");
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0B2545]">Verifikasi Pembayaran</h1>
        <p className="text-neutral-500">Daftar transaksi murid yang perlu diverifikasi.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Murid</th>
                <th className="p-4">Program</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Bukti Transfer</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-neutral-500">Loading...</td></tr>
              ) : enrollments.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-neutral-500">Tidak ada transaksi.</td></tr>
              ) : (
                enrollments.map((enr) => (
                  <tr key={enr.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                    <td className="p-4">
                      <div className="font-bold text-[#0B2545]">{enr.student?.name}</div>
                      <div className="text-xs text-neutral-500">{enr.student?.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-neutral-700">{enr.Program?.title}</div>
                    </td>
                    <td className="p-4">
                      {enr.paymentStatus === 'pending' && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">Pending</span>}
                      {enr.paymentStatus === 'verified' && <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">Verified</span>}
                      {enr.paymentStatus === 'rejected' && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">Rejected</span>}
                    </td>
                    <td className="p-4 text-center">
                      {enr.paymentProof ? (
                        <button 
                          onClick={() => setSelectedImage(enr.paymentProof)}
                          className="text-blue-500 hover:underline text-xs font-medium cursor-pointer"
                        >
                          Lihat Gambar
                        </button>
                      ) : (
                        <span className="text-neutral-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      {enr.paymentStatus === 'pending' && (
                        <>
                          <button onClick={() => handleVerify(enr.id, 'verify')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            Terima
                          </button>
                          <button onClick={() => handleVerify(enr.id, 'reject')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            Tolak
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button 
              className="absolute -top-10 right-0 text-white font-bold text-xl hover:text-neutral-300"
              onClick={() => setSelectedImage(null)}
            >
              Tutup &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Bukti Transfer" 
              className="max-w-full max-h-[85vh] object-contain rounded bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}