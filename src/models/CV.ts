import mongoose, { Schema, Document } from 'mongoose';

export interface CV extends Document {
  personalInfo: {
    firstName: string;
    lastName: string;
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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    location: { type: String, default: '' }
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

export default mongoose.models.CV || mongoose.model<CV>('CV', cvSchema);