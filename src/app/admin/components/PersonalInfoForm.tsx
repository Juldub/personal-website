'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { Language, CVState } from '@/types/cv';

interface PersonalInfoFormProps {
  cv: CVState;
  setCv: React.Dispatch<React.SetStateAction<CVState>>;
}

export function PersonalInfoForm({ cv, setCv }: PersonalInfoFormProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-600 pb-2">Informations personnelles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input
            type="text"
            value={cv.personalInfo.name}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={cv.personalInfo.email}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            value={cv.personalInfo.phone}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
          <input
            type="text"
            value={cv.personalInfo.location}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: e.target.value } }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}