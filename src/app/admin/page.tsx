'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language, CVState } from '@/types/cv';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';

export default function AdminPage() {
  const router = useRouter();
  const [cv, setCv] = useState<CVState>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: []
  });

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch('/api/cv');
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          if (!data) {
            setCv({
              personalInfo: {
                name: '',
                email: '',
                phone: '',
                location: ''
              },
              education: [],
              experience: [],
              skills: [],
              languages: []
            });
            return;
          }
          
          // Convertir le format des langues
          console.log('Raw languages from API:', data.languages);
          const convertedCV: CVState = {
            ...data,
            languages: data.languages.map((lang: { language?: string; name?: string; level: string }) => ({
              name: lang.language || lang.name || '',
              level: lang.level || ''
            }))
          };
          console.log('Converted languages:', convertedCV.languages);
          setCv(convertedCV);
        }
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    };

    fetchCV();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Convertir le format des langues
    const cvToSave = {
      ...cv,
      languages: cv.languages.map(lang => ({
        language: lang.name,
        level: lang.level
      }))
    };

    const response = await fetch('/api/cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cvToSave),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save CV');
    }

    window.location.reload();
  } catch (error) {
    console.error('Error saving CV:', error);
    alert('Erreur lors de la sauvegarde du CV : ' + (error instanceof Error ? error.message : String(error)));
  }
};

return (
  <div className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold text-gray-800 mb-12">Gestion du CV</h1>
    <form onSubmit={handleSubmit} className="space-y-12">
      <PersonalInfoForm cv={cv} setCv={setCv} />
      <EducationForm cv={cv} setCv={setCv} />
      <ExperienceForm cv={cv} setCv={setCv} />
      <SkillsForm cv={cv} setCv={setCv} />
      <LanguagesForm cv={cv} updateCV={setCv} />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
);

}