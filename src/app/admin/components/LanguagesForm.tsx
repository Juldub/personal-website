import { useState } from 'react';
import { Language, CVState } from '@/types/cv';

interface LanguagesFormProps {
  cv: CVState;
  updateCV: (updatedCV: CVState) => void;
}

export default function LanguagesForm({ cv, updateCV }: LanguagesFormProps) {
  const [languages, setLanguages] = useState<Language[]>(cv.languages);

  const handleAddLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguages([...languages, { language: '', level: '' }]);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setLanguages(newLanguages);
    updateCV({ ...cv, languages: newLanguages });
  };

const handleLanguageChange = (index: number, field: 'language' | 'level', value: string) => {
  const newLanguages = [...languages];
  newLanguages[index][field] = value;
  setLanguages(newLanguages);
  updateCV({ ...cv, languages: newLanguages });
};

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Langues</h2>
      {languages.map((lang: Language, index: number) => (
        <div key={index} className="flex gap-4 mb-4">
          <input
            type="text"
            value={lang.language}
            onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
            placeholder="Langue"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={lang.level}
            onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
            placeholder="Niveau"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => handleRemoveLanguage(index)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      ))}
      <div className="flex gap-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddLanguage(e);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter une langue
        </button>
      </div>
    </div>
  );
}