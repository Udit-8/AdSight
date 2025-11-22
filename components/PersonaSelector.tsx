'use client';

import { useState } from 'react';
import { PersonaType } from '@/types';
import { getPersonaDisplayName, getPersonaDescription, personaConfigs } from '@/lib/personaConfig';

interface PersonaSelectorProps {
  onSelect: (personaType: PersonaType) => void;
}

export default function PersonaSelector({ onSelect }: PersonaSelectorProps) {
  const [selected, setSelected] = useState<PersonaType | null>(null);

  const personaTypes: PersonaType[] = [
    'performance_marketer',
    'account_manager',
    'business_owner',
    'cmo',
  ];

  const handleSelect = (personaType: PersonaType) => {
    setSelected(personaType);
  };

  const handleConfirm = () => {
    if (selected) {
      localStorage.setItem('selectedPersona', selected);
      onSelect(selected);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to AdSight</h1>
          <p className="text-lg text-gray-600">Select your role to view personalized metrics and alerts</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {personaTypes.map((personaType) => {
            const config = personaConfigs[personaType];
            const isSelected = selected === personaType;
            
            return (
              <div
                key={personaType}
                onClick={() => handleSelect(personaType)}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-4 ring-blue-500 border-2 border-blue-500'
                    : 'hover:shadow-lg border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getPersonaDisplayName(personaType)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {getPersonaDescription(personaType)}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-1">Key Metrics:</div>
                    <div className="flex flex-wrap gap-1">
                      {[...config.metrics.upper, ...config.metrics.mid, ...config.metrics.bottom].slice(0, 6).map((metric) => (
                        <span key={metric} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-1">Alert Types:</div>
                    <div className="flex flex-wrap gap-1">
                      {config.triggers.slice(0, 3).map((trigger) => (
                        <span key={trigger.type} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          {trigger.type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
              selected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

