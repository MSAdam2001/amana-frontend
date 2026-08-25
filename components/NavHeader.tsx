 
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('amana_token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem('amana_token');
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--color-sand-100)',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: 'var(--color-teal-900)',
          textDecoration: 'none',
        }}
      >
        Amana
      </Link>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/search" style={{ color: 'var(--color-teal-900)', textDecoration: 'none' }}>
          Find an artisan
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" style={{ color: 'var(--color-teal-900)', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid var(--color-terracotta-600)',
                color: 'var(--color-terracotta-600)',
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              backgroundColor: 'var(--color-terracotta-600)',
              color: 'white',
              padding: '0.4rem 0.9rem',
              textDecoration: 'none',
              fontWeight: 600,
              borderRadius: '2px',
            }}
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}