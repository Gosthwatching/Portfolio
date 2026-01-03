import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    
    // About section
    'about.title': 'À propos',
    'about.downloadCV': 'Télécharger mon CV',
    'about.viewProjects': 'Voir mes projets',
    'about.contactMe': 'Me contacter',
    
    // Projects section
    'projects.title': 'Projets',
    'projects.subtitle': 'Découvrez mes réalisations — cliquez sur "Live Demo" pour lancer le projet',
    
    // Skills section
    'skills.title': 'Compétences',
    'skills.subtitle': 'Technologies, outils et langues que je maîtrise',
    
    // Contact section
    'contact.title': 'Contact',
    'contact.subtitle': 'Une question ? Un projet ? Contactez-moi !',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Message envoyé avec succès !',
    'contact.error': 'Erreur lors de l\'envoi',
    'contact.placeholder.name': 'Votre nom',
    'contact.placeholder.email': 'votre.email@exemple.com',
    'contact.placeholder.message': 'Décrivez votre projet...',
    'contact.downloadCV': 'Télécharger mon CV',
    'contact.downloadCV.button': 'ici',
    
    // Footer
    'footer.template': 'Template réalisé par',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // About section
    'about.title': 'About',
    'about.downloadCV': 'Download my CV',
    'about.viewProjects': 'View my projects',
    'about.contactMe': 'Contact me',
    
    // Projects section
    'projects.title': 'Projects',
    'projects.subtitle': 'Discover my work — click on the button "Live Demo" for more details',
    
    // Skills section
    'skills.title': 'Skills',
    'skills.subtitle': 'Technologies, tools and languages I master',
    
    // Contact section
    'contact.title': 'Contact',
    'contact.subtitle': 'A question? A project? Get in touch!',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message',
    'contact.placeholder.name': 'Your name',
    'contact.placeholder.email': 'your.email@example.com',
    'contact.placeholder.message': 'Describe your project...',
    'contact.downloadCV': 'Download my resume',
    'contact.downloadCV.button': 'here',
    
    // Footer
    'footer.template': 'Template made by',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
