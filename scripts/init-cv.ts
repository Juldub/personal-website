import { connectDB } from '../src/lib/mongodb';
import CVModel from '../src/models/CV';

async function initCV() {
  try {
    await connectDB();
    
    const cvData = {
      personalInfo: {
        name: "Julien Dubois",
        email: "julien.dubois@example.com",
        phone: "+33 6 12 34 56 78",
        location: "Paris, France"
      },
      education: [
        {
          institution: "École d'ingénieur en informatique",
          degree: "Diplôme d'ingénieur en informatique",
          date: "2010 - 2015",
          description: [
            "Spécialisation en génie logiciel et systèmes d'information",
            "Projet de fin d'études sur l'optimisation des bases de données NoSQL"
          ]
        },
        {
          institution: "Université Paris-Dauphine",
          degree: "Master en Management et Technologies de l'Information",
          date: "2013 - 2015",
          description: [
            "Double diplôme avec l'école d'ingénieur",
            "Spécialisation en transformation digitale"
          ]
        }
      ],
      experience: [
        {
          title: "Product Manager",
          company: "Startup Tech",
          date: "2020 - Présent",
          description: [
            "Définition de la roadmap produit et priorisation des fonctionnalités",
            "Collaboration avec les équipes techniques pour la mise en œuvre des fonctionnalités",
            "Analyse des données d'utilisation pour améliorer l'expérience utilisateur"
          ]
        },
        {
          title: "Développeur Full Stack",
          company: "Entreprise Web",
          date: "2017 - 2020",
          description: [
            "Développement d'applications web avec React et Node.js",
            "Conception et optimisation des API REST",
            "Mise en place de bonnes pratiques de développement (CI/CD, tests automatisés)"
          ]
        },
        {
          title: "Développeur Frontend",
          company: "Agence Digitale",
          date: "2015 - 2017",
          description: [
            "Développement d'interfaces utilisateur réactives",
            "Optimisation des performances frontend",
            "Collaboration avec les designers pour l'implémentation des maquettes"
          ]
        }
      ],
      skills: [
        "Product Management", "Stratégie Produit", "Roadmapping", "Agile/Scrum",
        "React", "TypeScript", "Node.js", "MongoDB", "AWS", "CI/CD",
        "UX/UI Design", "Data Analysis", "SQL", "NoSQL", "Git"
      ],
      languages: [
        { name: "Français", level: "Natif" },
        { name: "Anglais", level: "Courant (C1)" },
        { name: "Espagnol", level: "Intermédiaire (B1)" }
      ]
    };

    // Supprimer l'ancien CV s'il existe
    await CVModel.deleteMany({});
    
    // Créer un nouveau CV
    const cv = new CVModel(cvData);
    await cv.save();
    
    console.log('CV initialisé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du CV:', error);
    process.exit(1);
  }
}

initCV();
