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
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
        <p className="text-sm text-gray-500 mt-1">Vos coordonnées et informations de contact</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={cv.personalInfo.firstName || ''}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, firstName: e.target.value } }))}
            className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Jean"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={cv.personalInfo.lastName || ''}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, lastName: e.target.value } }))}
            className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Dupont"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={cv.personalInfo.email}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))}
            className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="jean.dupont@exemple.com"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={cv.personalInfo.phone}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))}
            className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Localisation
          </label>
          <input
            id="location"
            type="text"
            value={cv.personalInfo.location}
            onChange={(e) => setCv(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: e.target.value } }))}
            className="block w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Paris, France"
          />
        </div>
      </div>
    </div>
  );
}