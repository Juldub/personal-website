export interface Language {
  language: string;
  level: string;
}

export interface CVState {
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
  languages: Language[];
}