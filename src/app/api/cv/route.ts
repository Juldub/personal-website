import { connectDB } from '@/lib/mongodb';
import CVModel from '@/models/CV';
import { NextResponse } from 'next/server';

// Gestion des requêtes GET
export async function GET() {
  try {
    await connectDB();
    const cv = await CVModel.findOne();
    if (!cv) {
      return NextResponse.json({ message: 'CV not found' }, { status: 404 });
    }
    
    // Convertir le document MongoDB en objet JavaScript simple
    const result = JSON.parse(JSON.stringify(cv));
    
    // Si l'ancien format (name) existe, le convertir en firstName et lastName
    if (result.personalInfo?.name) {
      const nameParts = result.personalInfo.name.split(' ');
      result.personalInfo.firstName = nameParts[0] || '';
      result.personalInfo.lastName = nameParts.slice(1).join(' ') || '';
      delete result.personalInfo.name;
    }
    
    // S'assurer que les langues ont la bonne structure
    result.languages = (result.languages || []).map((lang: any) => ({
      name: lang.name || lang.language || '',
      level: lang.level || ''
    }));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching CV:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Gestion des requêtes POST
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Gérer la conversion de l'ancien format (name) vers le nouveau format (firstName, lastName)
    let firstName = '';
    let lastName = '';
    
    if (data.personalInfo?.name) {
      const nameParts = data.personalInfo.name.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    // Préparer les données personnelles avec des valeurs par défaut
    const personalInfo = {
      firstName: data.personalInfo?.firstName || firstName || '',
      lastName: data.personalInfo?.lastName || lastName || '',
      email: data.personalInfo?.email || '',
      phone: data.personalInfo?.phone || '',
      location: data.personalInfo?.location || ''
    };
    
    // Préparer les données pour la sauvegarde
    const cvData = {
      ...data,
      personalInfo,
      languages: (data.languages || []).map((lang: any) => ({
        name: lang?.name || '',
        level: lang?.level || ''
      })),
      education: Array.isArray(data.education) ? data.education : [],
      experience: Array.isArray(data.experience) ? data.experience : [],
      skills: Array.isArray(data.skills) ? data.skills : []
    };

    await connectDB();
    
    // Mettre à jour ou créer le CV
    const result = await CVModel.findOneAndUpdate(
      {},
      { $set: cvData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error saving CV:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}