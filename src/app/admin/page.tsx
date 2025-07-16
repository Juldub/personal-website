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
      alert('Erreur lors de la sauvegarde : ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration du CV</h1>
          <p className="text-blue-700">Modifiez et mettez à jour les informations de votre CV</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Contenu du CV</h2>
              <p className="text-gray-600">Remplissez les différentes sections pour mettre à jour votre CV</p>
            </div>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <PersonalInfoForm cv={cv} setCv={setCv} />
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <ExperienceForm cv={cv} setCv={setCv} />
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <EducationForm cv={cv} setCv={setCv} />
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <SkillsForm cv={cv} setCv={setCv} />
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <LanguagesForm cv={cv} updateCV={setCv} />
            </section>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base shadow-md hover:shadow-lg"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}