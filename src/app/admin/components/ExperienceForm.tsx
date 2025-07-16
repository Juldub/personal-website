'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { Language, CVState } from '@/types/cv';

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
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Expérience professionnelle</h2>
        <p className="text-sm text-gray-500 mt-1">Ajoutez et modifiez vos expériences professionnelles</p>
      </div>

      {(cv.experience || []).map((exp: CVState['experience'][0], index: number) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Poste <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={exp.title || ''}
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Développeur Full Stack"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={exp.company || ''}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Nom de l'entreprise"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Période <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={exp.date || ''}
                onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Jan 2020 - Présent"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Description des missions
            </label>
            <div className="space-y-3">
              {(exp.description || ['']).map((desc: string, descIndex: number) => (
                <div key={descIndex} className="flex items-start space-x-2">
                  <span className="mt-3 text-blue-600">•</span>
                  <div className="flex-1 flex items-center">
                    <input
                      type="text"
                      value={desc || ''}
                      onChange={(e) => {
                        const newDescription = [...(exp.description || [])];
                        newDescription[descIndex] = e.target.value;
                        handleExperienceChange(index, 'description', newDescription);
                      }}
                      className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Description de la mission ou responsabilité"
                    />
                    {(exp.description?.length > 1 || descIndex > 0) && (
                      <button
                        type="button"
                        onClick={() => {
                          const newDescription = [...(exp.description || [])];
                          newDescription.splice(descIndex, 1);
                          handleExperienceChange(index, 'description', newDescription);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 p-2"
                        aria-label="Supprimer cette description"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newDescription = [...(exp.description || []), ''];
                  handleExperienceChange(index, 'description', newDescription);
                }}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un point
              </button>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="inline-flex items-center text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer cette expérience
            </button>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddExperience}
        className="mt-4 inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une expérience
      </button>
    </div>
  );
}