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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to AdSight</h1>
          <p className="text-lg text-gray-300">Select your role to view personalized metrics and alerts</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {personaTypes.map((personaType) => {
            const config = personaConfigs[personaType];
            const isSelected = selected === personaType;
            
            return (
              <div
                key={personaType}
                onClick={() => handleSelect(personaType)}
                className={`bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-4 ring-blue-500 border-blue-500'
                    : 'hover:border-gray-600 hover:bg-gray-750'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {getPersonaDisplayName(personaType)}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
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
                    <div className="text-xs font-semibold text-gray-400 mb-1">Key Metrics:</div>
                    <div className="flex flex-wrap gap-1">
                      {[...config.metrics.upper, ...config.metrics.mid, ...config.metrics.bottom].slice(0, 6).map((metric) => (
                        <span key={metric} className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-1">Alert Types:</div>
                    <div className="flex flex-wrap gap-1">
                      {config.triggers.slice(0, 3).map((trigger) => (
                        <span key={trigger.type} className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">
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

