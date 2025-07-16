'use client';

import React, { useEffect, useState } from 'react';
import { CV } from '@/models/CV';

interface Experience {
  title: string;
  company: string;
  date: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  date: string;
  description: string[];
}

interface Language {
  language: string;
  level: string | number;
}

export default function CVDisplay() {
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch('/api/cv');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du CV');
        }
        const data = await response.json();
        console.log('Données du CV reçues:', data);
        console.log('Type de données des langues:', typeof data.languages, data.languages);
        setCv(data);
      } catch (err) {
        setError('Impossible de charger le CV');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  if (loading) return <div>Chargement du CV...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!cv) return <div>Aucun CV trouvé</div>;

  return (
    <div className="space-y-8">
      {/* Informations personnelles */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Informations personnelles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Nom</p>
            <p>{cv.personalInfo?.name || 'Non spécifié'}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>{cv.personalInfo?.email || 'Non spécifié'}</p>
          </div>
          <div>
            <p className="font-medium">Téléphone</p>
            <p>{cv.personalInfo?.phone || 'Non spécifié'}</p>
          </div>
          <div>
            <p className="font-medium">Localisation</p>
            <p>{cv.personalInfo?.location || 'Non spécifiée'}</p>
          </div>
        </div>
      </section>

      {/* Expérience professionnelle */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Expérience professionnelle</h2>
        {cv.experience?.length > 0 ? (
          <div className="space-y-6">
            {cv.experience.map((exp: Experience, index: number) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-medium">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} • {exp.date}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {exp.description.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune expérience professionnelle renseignée</p>
        )}
      </section>

      {/* Formation */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Formation</h2>
        {cv.education?.length > 0 ? (
          <div className="space-y-6">
            {cv.education.map((edu: Education, index: number) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-medium">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution} • {edu.date}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {edu.description.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune formation renseignée</p>
        )}
      </section>

      {/* Compétences */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
        {cv.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill: string, index: number) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>Aucune compétence renseignée</p>
        )}
      </section>

      {/* Langues */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Langues</h2>
        {cv.languages?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {cv.languages.map((lang: any, index: number) => (
              <div key={index}>
                <p className="font-medium">{lang.language || lang.name || 'Langue inconnue'}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.min(parseInt(lang.level?.toString() || '0'), 100)}%`, 
                      maxWidth: '100%' 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Niveau: {lang.level} {lang.level > 5 ? '/100' : '/5'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune langue renseignée</p>
        )}
      </section>
    </div>
  );
}
