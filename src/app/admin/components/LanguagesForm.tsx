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
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Langues</h2>
        <p className="text-sm text-gray-500 mt-1">Indiquez les langues que vous parlez et votre niveau</p>
      </div>

      <div className="space-y-4">
        {languages.map((lang: Language, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Langue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lang.name || ''}
                  onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                  placeholder="Ex: Anglais, Espagnol..."
                  className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Niveau <span className="text-red-500">*</span>
                </label>
                <select
                  value={lang.level || ''}
                  onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                  required
                  className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="Débutant">Débutant (A1-A2)</option>
                  <option value="Intermédiaire">Intermédiaire (B1-B2)</option>
                  <option value="Courant">Courant (C1-C2)</option>
                  <option value="Bilingue">Bilingue / Natif</option>
                </select>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveLanguage(index)}
                className="inline-flex items-center text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer cette langue
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleAddLanguage(e);
        }}
        className="mt-4 inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une langue
      </button>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Conseil</h3>
        <p className="text-xs text-blue-700">
          Utilisez les niveaux CECR (A1 à C2) pour plus de clarté. Par exemple: "Anglais (C1)" ou "Espagnol (B2)".
        </p>
      </div>
    </div>
  );
}