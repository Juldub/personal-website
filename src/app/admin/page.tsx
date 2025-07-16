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
      firstName: '',
      lastName: '',
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
                firstName: '',
                lastName: '',
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
          
          const personalInfo = data.personalInfo || {};
          let firstName = '';
          let lastName = '';
          
          if (personalInfo.name) {
            const nameParts = personalInfo.name.split(' ');
            firstName = nameParts[0] || '';
            lastName = nameParts.slice(1).join(' ') || '';
          }
          
          // S'assurer que les langues ont la bonne structure
          const languages = Array.isArray(data.languages) 
            ? data.languages.map((lang: any) => ({
                name: lang.name || lang.language || '',
                level: lang.level || ''
              }))
            : [];
            
          const convertedCV: CVState = {
            ...data,
            personalInfo: {
              firstName: personalInfo.firstName || firstName || '',
              lastName: personalInfo.lastName || lastName || '',
              email: personalInfo.email || '',
              phone: personalInfo.phone || '',
              location: personalInfo.location || ''
            },
            languages
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
      // Préparer les données à sauvegarder
      const cvToSave = {
        ...cv,
        personalInfo: {
          firstName: cv.personalInfo.firstName || '',
          lastName: cv.personalInfo.lastName || '',
          email: cv.personalInfo.email || '',
          phone: cv.personalInfo.phone || '',
          location: cv.personalInfo.location || ''
        },
        languages: (cv.languages || []).map(lang => ({
          name: lang?.name || '',
          level: lang?.level || ''
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
        throw new Error('Erreur lors de la sauvegarde');
      }

      const result = await response.json();
      setCv(result);
      // setNotification('CV mis à jour avec succès');
      
      // Cacher la notification après 3 secondes
      // setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du CV:', error);
      // setNotification('Erreur lors de la sauvegarde du CV');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administration du CV</h1>
          <a
            href="/cv"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Voir le CV
          </a>
        </div>
        <p className="text-blue-700">Modifiez et mettez à jour les informations de votre CV</p>
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