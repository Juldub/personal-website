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
    <div>
      <h2 className="text-xl font-semibold mb-4">Formation</h2>
      {(cv.education || []).map((edu, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Établissement</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diplôme</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                value={edu.date}
                onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            {(edu.description || []).map((desc, descIndex) => (
              <div key={descIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                  className="w-full p-2 border rounded mr-2"
                />
                <button
                  onClick={() => handleRemoveDescription(index, descIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddDescription(index)}
              className="text-blue-500 hover:text-blue-700"
            >
              Ajouter une description
            </button>
          </div>
          <button
            onClick={() => handleRemoveEducation(index)}
            className="text-red-500 hover:text-red-700"
          >
            Supprimer cette formation
          </button>
        </div>
      ))}
      <div className="mt-4">
        <button
          onClick={handleAddEducation}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter une formation
        </button>
      </div>
    </div>
  );
}