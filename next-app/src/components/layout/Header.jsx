"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    if (loginWithRedirect) {
      loginWithRedirect();
    }
  };

  const handleLogout = () => {
    if (logout) {
      logout({ returnTo: window.location.origin });
    }
  };

  if (!mounted) return null;

  return (
    <header className='flex w-full bg-[#1e3a8a] text-blue-50 justify-between px-8 py-4 font-serif'>
      <div className='flex items-center'>
        <Link href='/'>
          <Image
            className='w-[100px] h-[100px]'
            src={'/logo.png'}
            alt='HRF logo'
            width={100}
            height={100}
            priority
          />
        </Link>
      </div>

      <nav className='flex items-center gap-8'>
        <Link href='/' className='hover:text-blue-300'>Home</Link>
        <Link href='/graphs' className='hover:text-blue-300'>Graphs</Link>
        <Link href='/profile' className='hover:text-blue-300'>Profile</Link>
        {isAuthenticated ? (
          <div className='flex items-center gap-4'>
            <span className='text-sm'>{user?.name || user?.email}</span>
            <button 
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors'
              disabled={!logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!loginWithRedirect}
          >
            {loginWithRedirect ? 'Login' : 'Auth0 Unavailable'}
          </button>
        )}
      </nav>
    </header>
  );
}
