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
          const convertedCV: CVState = {
            ...data,
            languages: data.languages.map((lang: { name: string; level: string }) => ({
              language: lang.name,
              level: lang.level
            }))
          };
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
          name: lang.language,  // Utiliser "name" au lieu de "language"
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Gestion du CV</h1>
      <form onSubmit={handleSubmit}>
        <PersonalInfoForm cv={cv} setCv={setCv} />
        <EducationForm cv={cv} setCv={setCv} />
        <ExperienceForm cv={cv} setCv={setCv} />
        <SkillsForm cv={cv} setCv={setCv} />
        <LanguagesForm cv={cv} updateCV={setCv} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-8"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}