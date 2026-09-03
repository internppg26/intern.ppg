'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  username?: string;
  initials?: string;
  email: string;
  role: string;
  status?: string;
  isActive?: boolean;
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: '',
    status: ''
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in as an admin to view users.");
        return;
      }
      
      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        // Map backend format to frontend format
        const mapped = data.users.map((u: any) => ({
          ...u,
          id: u.id.toString(),
          initials: u.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'U',
          role: u.role.charAt(0).toUpperCase() + u.role.slice(1),
          status: u.isActive ? 'Active' : 'Inactive',
        }));
        setUsers(mapped);
      } else {
        const err = await res.json();
        console.error('API Error:', err);
        alert(`Failed to fetch users: ${err.error}. Are you logged in as admin?`);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
      alert('Network error while fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username || user.name.replace(/\s+/g, '') + '123',
      password: '', // Empty on edit
      role: user.role,
      status: user.status || 'Active'
    });
    setModalMode('edit');
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      role: '',
      status: ''
    });
    setModalMode('add');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedUser(null);
  };

  const isFormValid = formData.name && formData.email && formData.role && formData.status && (modalMode === 'edit' || formData.password);

  const handleSave = async () => {
    if (!isFormValid) return;
    
    try {
      const token = localStorage.getItem('token');
      if (modalMode === 'add') {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || 'Failed to add user');
          return;
        }
      } else if (modalMode === 'edit' && selectedUser) {
        const res = await fetch(`/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || 'Failed to update user');
          return;
        }
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save user', error);
      alert('An error occurred while saving.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          fetchUsers();
        } else {
          const err = await res.json();
          alert(err.error || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  // Filter and Pagination Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'Status' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h1 className="font-bold text-sm text-[#0B2545]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 ml-8 border-l border-neutral-200 pl-8">
            <div className="text-right">
              <div className="text-xs font-bold text-[#0B2545]">
                {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || '{}').name || 'User'}
              </div>
              <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || '{}').role || 'SYSTEM AUTHORITY'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FCE5D3] flex items-center justify-center text-sm font-bold text-[#E5832E]">
              {typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('user') || '{}').name || 'U').substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 font-sans">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-[#0B2545] mb-4 tracking-tight">User Management</h2>
            <p className="text-neutral-600 leading-relaxed text-sm">
              Manage all registered users and their permission levels. Efficiently oversee roles across the entire LMS ecosystem.
            </p>
          </div>
          <button 
            onClick={handleAddClick}
            className="bg-[#E5832E] hover:bg-[#D47225] text-white px-8 py-3 rounded-full text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Add New User
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto flex-1">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email..." 
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-[#0B2545] shadow-sm"
              />
            </div>
            <select 
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="border border-neutral-200 bg-white rounded-full px-6 py-3 text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] shadow-sm appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-1rem)_center]">
              <option>All Roles</option>
              <option>Student</option>
              <option>Admin</option>
              <option>Instructor</option>
            </select>
            <select 
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="border border-neutral-200 bg-white rounded-full px-6 py-3 text-sm text-neutral-600 focus:outline-none focus:border-[#0B2545] shadow-sm appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-1rem)_center]">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="bg-[#0B2545] rounded-xl px-8 py-4 flex flex-col justify-center text-white shrink-0 w-full sm:w-auto shadow-md">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#5A879D] mb-1">TOTAL USERS</span>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[#00E5FF]">{users.length}</span>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FAF7F2] text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-200">
                  <th className="py-5 px-8">FULL NAME</th>
                  <th className="py-5 px-8">USERNAME</th>
                  <th className="py-5 px-8">EMAIL</th>
                  <th className="py-5 px-8">ROLE</th>
                  <th className="py-5 px-8">STATUS</th>
                  <th className="py-5 px-8 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500">Loading users...</td>
                  </tr>
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500">No users found.</td>
                  </tr>
                ) : paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#EAF1F8] flex items-center justify-center text-sm font-bold text-[#0B2545] shrink-0">
                          {user.initials}
                        </div>
                        <span className="block text-sm font-bold text-[#0B2545]">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-sm text-neutral-600 font-medium">
                      {user.username ? user.username : <span className="text-neutral-400 italic">Not set</span>}
                    </td>
                    <td className="py-5 px-8 text-sm text-neutral-600">{user.email}</td>
                    <td className="py-5 px-8">
                      <span className="inline-block px-3 py-1 bg-[#EAF1F8] text-[#0B2545] rounded-full text-[10px] font-bold tracking-wider">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <div className={`flex items-center gap-2 text-sm font-bold ${user.status === 'Active' ? 'text-[#008A5E]' : user.status === 'Pending' ? 'text-amber-500' : 'text-neutral-500'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#008A5E]' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-neutral-500'}`}></span>
                        {user.status}
                      </div>
                    </td>
                    <td className="py-5 px-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="p-2 text-neutral-400 hover:text-[#0B2545] hover:bg-neutral-100 rounded-full transition-colors inline-flex"
                          title="Edit User"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors inline-flex"
                          title="Delete User"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-[#FAF7F2] p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-neutral-200">
            <span className="text-xs font-bold text-neutral-500">
              Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-2 ${currentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:text-[#0B2545]'}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentPage === page 
                      ? 'bg-[#0B2545] text-white' 
                      : 'text-[#0B2545] hover:bg-neutral-200'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-2 ${currentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-[#0B2545] hover:text-[#13325B]'}`}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <footer className="bg-[#0B2545] text-white rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
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

      {/* Add / Edit User Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-[#0B2545] px-8 py-5 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-white">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h3>
              <button onClick={handleCloseModal} className="text-white/60 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-8 pb-10 space-y-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="ex:Gio Lio"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    disabled={modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student'}
                    className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] text-[#0B2545] outline-none transition-colors ${modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="ex:gio.l@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    disabled={modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student'}
                    className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] text-[#0B2545] outline-none transition-colors ${modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">Username</label>
                  <input 
                    type="text" 
                    placeholder="ex:GioLio321"
                    value={formData.username}
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    disabled={modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student'}
                    className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] text-[#0B2545] outline-none transition-colors ${modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">
                    Password {modalMode === 'edit' && <span className="font-normal text-xs">(Leave blank to keep current)</span>}
                  </label>
                  <input 
                    type={modalMode === 'edit' ? 'text' : 'password'} 
                    placeholder={modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' ? 'Cannot edit student password' : 'ex:LioGio123'}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    disabled={modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student'}
                    className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] text-[#0B2545] outline-none transition-colors ${modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {modalMode === 'edit' && selectedUser?.role.toLowerCase() === 'student' && (
                    <p className="text-[10px] text-red-500 font-bold">Admins cannot change student passwords.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">Assign Role</label>
                  <div className="relative">
                    <select 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] ${!formData.role ? 'text-neutral-400' : 'text-[#0B2545]'} outline-none transition-colors appearance-none pr-10`}
                    >
                      <option value="" disabled hidden>Pilih Role</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Student">Student</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-neutral-600">Status</label>
                  <div className="relative">
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className={`w-full bg-[#F4F5F7] border border-transparent focus:bg-white focus:border-neutral-300 rounded-xl px-5 py-3.5 text-[15px] ${!formData.status ? 'text-neutral-400' : 'text-[#0B2545]'} outline-none transition-colors appearance-none pr-10`}
                    >
                      <option value="" disabled hidden>Pilih Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF9F2] border border-[#F4E3D7] rounded-xl p-5 flex items-start gap-4">
                <div className="text-[#E5832E] shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  Modifying user roles may affect their access to specific course modules and administrative tools.
                </p>
              </div>
            </div>

            <div className="bg-[#F4F5F7] px-8 py-6 flex justify-center sm:justify-end gap-4 shrink-0 border-t border-neutral-100">
              <button onClick={handleCloseModal} className="px-8 py-3 rounded-full border border-neutral-300 text-[#0B2545] font-bold text-[15px] hover:bg-neutral-200 transition-colors bg-white shadow-sm">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!isFormValid}
                className={`px-8 py-3 rounded-full font-bold text-[15px] shadow-sm transition-colors ${
                  isFormValid 
                    ? 'bg-[#E5832E] hover:bg-[#D47225] text-white' 
                    : 'bg-[#FEEBCD] text-white cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
