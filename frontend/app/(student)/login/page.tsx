'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      
      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('demo_password', password);
      
      const role = data.user.role?.toLowerCase() || 'student';
      
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'instructor' || role === 'coach') {
        router.push('/coach');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 pb-20 font-sans">
      
      {/* Top Logo */}
      <div className="mb-10 text-center">
        <div className="w-24 h-24 mx-auto relative mb-2">
          <img src="/Logo_Performa_Puncak.png" alt="Logo" className="object-contain w-full h-full" />
        </div>
      </div>

      <div className="w-full max-w-md px-6">
        
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-neutral-600 flex items-center hover:text-brand-dark transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-[32px] font-black text-[#0B2545] mb-8 tracking-tight">WELCOME!</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
              <span 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center text-sm text-neutral-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mr-2 border-neutral-300 rounded text-[#0B2545] focus:ring-[#0B2545]" />
              Remember me
            </label>
            <Link href="#" className="text-sm text-neutral-600 underline hover:text-brand-dark">
              Forgot Password?
            </Link>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004b66] hover:bg-[#00364d] text-white p-3 rounded text-sm font-bold tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? 'LOADING...' : 'LOG IN'}
            </button>
          </div>
        </form>

        <div className="my-8 flex items-center justify-center">
          <div className="border-t border-neutral-200 flex-grow"></div>
          <span className="px-4 text-xs text-neutral-400 font-bold">OR</span>
          <div className="border-t border-neutral-200 flex-grow"></div>
        </div>

        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-brand-dark p-3 rounded text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-3">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          SIGN IN WITH GOOGLE
        </button>

        <div className="mt-12 text-center text-sm">
          <span className="text-neutral-600">Don't have an account? </span>
          <Link href="/register" className="text-[#E5832E] hover:text-[#D47225] font-bold">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}