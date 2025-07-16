export interface Language {
  name: string;
  level: string;
}

export interface CVState {
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
  languages: Language[];
}