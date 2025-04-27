'use client';

import { useState, useEffect } from 'react';
import { CV } from '@/models/CV';
import { CVState } from '../page';

interface PersonalInfoFormProps {
  cv: CVState;
  setCv: React.Dispatch<React.SetStateAction<CVState>>;
}

export function PersonalInfoForm({ cv, setCv }: PersonalInfoFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={cv.personalInfo.name}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={cv.personalInfo.email}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            value={cv.personalInfo.phone}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Localisation</label>
          <input
            type="text"
            value={cv.personalInfo.location}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: e.target.value } }))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}