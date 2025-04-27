import { connectDB } from '@/lib/mongodb';
import CVModel from '@/models/CV';
import { NextResponse } from 'next/server';

// Gestion des requêtes GET
export async function GET() {
  try {
    await connectDB();
    const cv = await CVModel.findOne();
    if (!cv) {
      return NextResponse.json(null);
    }
    
    // Convertir le format des langues
    const cvData = {
      ...cv.toObject(),
      languages: cv.languages.map((lang: { name: string; level: string }) => ({
        language: lang.name,
        level: lang.level
      }))
    };

    return NextResponse.json(cvData);
  } catch (error: unknown) {
    console.error('Error fetching CV:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Gestion des requêtes POST
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convertir le format des langues
    const cvData = {
      ...data,
      languages: data.languages.map((lang: { language: string; level: string }) => ({
        name: lang.language,
        level: lang.level
      }))
    };

    await connectDB();
    
    // Vérifier si un CV existe déjà
    const existingCV = await CVModel.findOne();
    
    if (existingCV) {
      // Mettre à jour le CV existant
      const updatedCV = await CVModel.findOneAndUpdate(
        { _id: existingCV._id },
        { $set: cvData },
        { new: true, runValidators: true }
      );
      if (!updatedCV) {
        throw new Error('Failed to update CV');
      }
      return NextResponse.json(updatedCV);
    } else {
      // Créer un nouveau CV
      const newCV = new CVModel(cvData);
      await newCV.save();
      return NextResponse.json(newCV);
    }
  } catch (error: unknown) {
    console.error('Error saving CV:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}