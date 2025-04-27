'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { CVState } from '../page';

interface ExperienceFormProps {
  cv: CVState;
  setCv: React.Dispatch<React.SetStateAction<CVState>>;
}

export function ExperienceForm({ cv, setCv }: ExperienceFormProps) {
  const handleAddExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      date: '',
      description: ['']
    };
    
    const newCv = { ...cv };
    newCv.experience = [...(cv.experience || []), newExperience];
    setCv(newCv);
  };

  const handleRemoveExperience = (index: number) => {
    const newCv = { ...cv };
    const newExperience = [...(cv.experience || [])];
    newExperience.splice(index, 1);
    newCv.experience = newExperience;
    setCv(newCv);
  };

  const handleExperienceChange = (index: number, field: keyof CVState['experience'][0], value: string | string[]) => {
    const newCv = { ...cv };
    const newExperience = [...(cv.experience || [])];
    
    // Gérer spécifiquement le cas de la description
    if (field === 'description') {
      if (typeof value === 'string') {
        newExperience[index].description = [value];
      } else {
        newExperience[index].description = value;
      }
    } else {
      // Pour les autres champs, on vérifie que la valeur est une chaîne
      if (typeof value === 'string') {
        newExperience[index][field] = value;
      }
    }
    
    newCv.experience = newExperience;
    setCv(newCv);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Expérience</h2>
      {(cv.experience || []).map((exp: CVState['experience'][0], index: number) => (
        <div key={index} className="border p-4 rounded mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                value={exp.title || ''}
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Entreprise</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                value={exp.date || ''}
                onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            {(exp.description || []).map((desc: string, descIndex: number) => (
              <div key={descIndex} className="mb-2">
                <input
                  type="text"
                  value={desc || ''}
                  onChange={(e) => {
                    const newDescription = [...(exp.description || [])];
                    newDescription[descIndex] = e.target.value;
                    handleExperienceChange(index, 'description', newDescription);
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => handleRemoveExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <button
          onClick={handleAddExperience}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter une expérience
        </button>
      </div>
    </div>
  );
}