'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PersonaSelector from '@/components/PersonaSelector';
import { PersonaType } from '@/types';

export default function Home() {
  const router = useRouter();
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if persona is already selected
    const savedPersona = localStorage.getItem('selectedPersona');
    if (savedPersona) {
      // If persona exists, go to dashboard
      router.push('/dashboard');
    } else {
      // If no persona, show persona selector
      setShowPersonaSelector(true);
      setLoading(false);
    }
  }, [router]);

  const handlePersonaSelect = (personaType: PersonaType) => {
    localStorage.setItem('selectedPersona', personaType);
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (showPersonaSelector) {
    return <PersonaSelector onSelect={handlePersonaSelect} />;
  }

  return null;
}
