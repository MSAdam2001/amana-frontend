'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ userId: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('amana_token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:3000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('amana_token');
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-6">
          Welcome back
        </h1>
        <div className="bg-white border border-teal-800/10 rounded-sm p-6">
          <p className="font-body text-teal-800">
            <span className="text-teal-900 font-medium">User ID:</span> {user?.userId}
          </p>
          <p className="font-body text-teal-800 mt-2">
            <span className="text-teal-900 font-medium">Role:</span> {user?.role}
          </p>
        </div>
      </div>
    </main>
  );
}