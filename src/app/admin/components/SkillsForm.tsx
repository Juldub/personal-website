'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { Language, CVState } from '@/types/cv';

interface SkillsFormProps {
  cv: CVState;
  setCv: React.Dispatch<React.SetStateAction<CVState>>;
}

export function SkillsForm({ cv, setCv }: SkillsFormProps) {
  const handleAddSkill = () => {
    setCv(prev => ({ ...prev, skills: [...(prev.skills || []), ''] }));
  };

  const handleRemoveSkill = (index: number) => {
    setCv(prev => {
      const newSkills = [...(prev.skills || [])];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills };
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    setCv(prev => {
      const newSkills = [...(prev.skills || [])];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Compétences techniques</h2>
        <p className="text-sm text-gray-500 mt-1">Listez vos compétences et domaines d'expertise</p>
      </div>

      <div className="space-y-4">
        {(cv.skills || []).map((skill, index) => (
          <div key={index} className="flex items-center group">
            <div className="flex-1 relative">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-10"
                placeholder="Ex: React, Node.js, UX/UI Design..."
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Supprimer cette compétence"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddSkill}
        className="mt-4 inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une compétence
      </button>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Conseil</h3>
        <p className="text-xs text-blue-700">
          Séparez vos compétences par des virgules pour en ajouter plusieurs à la fois.
          Exemple: "JavaScript, TypeScript, React"
        </p>
      </div>
    </div>
  );
}