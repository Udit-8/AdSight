'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if persona is already selected
    const savedPersona = localStorage.getItem('selectedPersona');
    if (savedPersona) {
      router.push('/dashboard');
    } else {
      router.push('/dashboard'); // Dashboard will show persona selector if no persona
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  );
}
