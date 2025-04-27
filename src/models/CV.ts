import mongoose, { Schema, Document } from 'mongoose';

export interface CV extends Document {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    date: string;
    description: string[];
  }>;
  experience: Array<{
    title: string;
    company: string;
    date: string;
    description: string[];
  }>;
  skills: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}

const cvSchema = new Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String
  },
  education: [{
    institution: String,
    degree: String,
    date: String,
    description: [String]
  }],
  experience: [{
    title: String,
    company: String,
    date: String,
    description: [String]
  }],
  skills: [String],
  languages: [{
    name: String,
    level: String
  }]
});

// Utiliser un pattern de singleton pour éviter de redéfinir le modèle
const CVModel = mongoose.models.CV || mongoose.model('CV', cvSchema);

export default CVModel;