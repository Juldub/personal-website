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
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-600 pb-2">Compétences</h2>
      {(cv.skills || []).map((skill, index) => (
        <div key={index} className="border p-4 rounded mb-4 flex items-center">
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            className="w-full p-2 border rounded mr-4"
          />
          <button
            onClick={() => handleRemoveSkill(index)}
            className="text-red-500 hover:text-red-700"
          >
            Supprimer
          </button>
        </div>
      ))}
      <div className="mt-4">
        <button
          onClick={handleAddSkill}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter une compétence
        </button>
      </div>
    </div>
  );
}