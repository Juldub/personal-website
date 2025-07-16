'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { Language, CVState } from '@/types/cv';

interface EducationFormProps {
  cv: CVState;
  setCv: React.Dispatch<React.SetStateAction<CVState>>;
}

export function EducationForm({ cv, setCv }: EducationFormProps) {
  const handleAddEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      date: '',
      description: ['']
    };
    setCv(prev => ({ ...prev, education: [...(prev.education || []), newEducation] }));
  };

  const handleRemoveEducation = (index: number) => {
    setCv(prev => {
      const newEducation = [...(prev.education || [])];
      newEducation.splice(index, 1);
      return { ...prev, education: newEducation };
    });
  };

const handleEducationChange = (index: number, field: string, value: string) => {
  setCv(prev => {
    const currentEducation = [...(prev.education || [])];
    currentEducation[index] = {
      ...currentEducation[index],
      [field]: value
    };
    return { ...prev, education: currentEducation };
  });
};

  const handleDescriptionChange = (index: number, descIndex: number, value: string) => {
    setCv(prev => {
      const newEducation = [...(prev.education || [])];
      const newDescription = [...(newEducation[index].description || [])];
      newDescription[descIndex] = value;
      newEducation[index] = {
        ...newEducation[index],
        description: newDescription
      };
      return { ...prev, education: newEducation };
    });
  };

  const handleAddDescription = (index: number) => {
    setCv(prev => {
      const newEducation = [...(prev.education || [])];
      const newDescription = [...(newEducation[index].description || []), ''];
      newEducation[index] = {
        ...newEducation[index],
        description: newDescription
      };
      return { ...prev, education: newEducation };
    });
  };

  const handleRemoveDescription = (index: number, descIndex: number) => {
    setCv(prev => {
      const newEducation = [...(prev.education || [])];
      const newDescription = [...(newEducation[index].description || [])];
      newDescription.splice(descIndex, 1);
      newEducation[index] = {
        ...newEducation[index],
        description: newDescription
      };
      return { ...prev, education: newEducation };
    });
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Formation et éducation</h2>
        <p className="text-sm text-gray-500 mt-1">Ajoutez vos diplômes et formations</p>
      </div>

      {(cv.education || []).map((edu, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Établissement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Nom de l'établissement"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Diplôme <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Diplôme obtenu"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Période <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={edu.date}
                onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="2018 - 2021"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Détails et réalisations
            </label>
            <div className="space-y-3">
              {(edu.description || ['']).map((desc, descIndex) => (
                <div key={descIndex} className="flex items-start space-x-2">
                  <span className="mt-3 text-blue-600">•</span>
                  <div className="flex-1 flex items-center">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                      className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Détail de la formation ou réalisation"
                    />
                    {(edu.description?.length > 1 || descIndex > 0) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDescription(index, descIndex)}
                        className="ml-2 text-red-500 hover:text-red-700 p-2"
                        aria-label="Supprimer ce détail"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddDescription(index)}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un détail
              </button>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="inline-flex items-center text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer cette formation
            </button>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddEducation}
        className="mt-4 inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une formation
      </button>
    </div>
  );
}