import { useState, useEffect } from 'react';
import { Language, CVState } from '@/types/cv';

interface LanguagesFormProps {
  cv: CVState;
  updateCV: (updatedCV: CVState) => void;
}

export default function LanguagesForm({ cv, updateCV }: LanguagesFormProps) {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    console.log('CV languages received:', cv.languages);
    if (cv.languages && Array.isArray(cv.languages)) {
      const langs = cv.languages.map(lang => ({
        name: lang.name || '',
        level: lang.level || ''
      }));
      console.log('Languages after mapping:', langs);
      setLanguages(langs);
    }
  }, [cv.languages]);

  const handleAddLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguages([...languages, { name: '', level: '' }]);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setLanguages(newLanguages);
    updateCV({ ...cv, languages: newLanguages });
  };

  const handleLanguageChange = (index: number, field: 'name' | 'level', value: string) => {
    const newLanguages = [...languages];
    newLanguages[index][field] = value;
    setLanguages(newLanguages);
    updateCV({ ...cv, languages: newLanguages });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-600 pb-2">Langues</h2>
      {languages.map((lang: Language, index: number) => (
        <div key={index} className="flex gap-4 mb-6">
          <input
            type="text"
            value={lang.name || ''}
            onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
            placeholder="Langue"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            value={lang.level || ''}
            onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
            placeholder="Niveau"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={() => handleRemoveLanguage(index)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Supprimer
          </button>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddLanguage(e);
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Ajouter une langue
        </button>
      </div>
    </div>
  );
}