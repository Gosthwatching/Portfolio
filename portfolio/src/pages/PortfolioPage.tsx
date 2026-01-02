// PortfolioPage.tsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/shared/Footer";
import { About } from "../components/About";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const PortfolioContent: React.FC = () => {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes, experiencesRes, educationRes] = await Promise.all([
        axios.get(`${API_URL}/profile`),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/skills`),
        axios.get(`${API_URL}/experiences`),
        axios.get(`${API_URL}/education`),
      ]);
      
      // Le backend retourne un objet, pas un tableau
      if (profileRes.data) {
        setProfile(profileRes.data);
      }
      
      const projectsData = projectsRes.data.map((p: any, index: number) => {
        const links = [];
        if (p.github) links.push({ label: 'GitHub', url: p.github, icon: 'FaGithub' });
        if (p.live) links.push({ label: 'Live Demo', url: p.live, icon: 'FaExternalLinkAlt' });
        
        // Normalize image URL: if backend returns a relative /uploads path,
        // prefix it with the API URL so the browser requests the file from the backend.
        const rawImage = p.imageUrl || '';
        const normalizedImage = rawImage && rawImage.startsWith('/uploads') ? `${API_URL}${rawImage}` : rawImage;

        return {
          id: p._id || `proj-${index}`,
          title: p.title || '',
          description:
            (language === 'fr' && (p.description_fr || p.description)) ||
            (language === 'en' && (p.description_en || p.description)) ||
            p.description || '',
          image: normalizedImage || '',
          href: p.live || p.link || '', // Use live as main href, fallback to link
          tags: p.tags || [],
          links: links,
          longDescription:
            (language === 'fr' && (p.longDescription_fr || p.longDescription || p.description_fr || p.description)) ||
            (language === 'en' && (p.longDescription_en || p.longDescription || p.description_en || p.description)) ||
            p.longDescription || p.description || '',
          techStack: p.techStack || [],
        };
      });
      setProjects(projectsData);
      
      const categories = skillsRes.data.reduce((acc: any, skill: any) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          name: skill.name,
          icon: skill.icon || skill.name.toLowerCase().replace(/\s+/g, ''),
          description:
            (language === 'fr' && (skill.description_fr || skill.description)) ||
            (language === 'en' && (skill.description_en || skill.description)) ||
            skill.description || '',
        });
        return acc;
      }, {});
      
      const skillGroups = Object.entries(categories).map(([title, skills]) => ({
        title,
        skills: skills as any[],
      }));
      setSkills(skillGroups);
      
      setExperiences(experiencesRes.data || []);
      setEducation(educationRes.data || []);
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  const personal = profile ? {
    name: `${profile.firstName} ${profile.lastName}`,
    title: profile.title,
    headline: profile.headline,
    avatar: profile.avatar && profile.avatar.startsWith('/uploads') ? `${API_URL}${profile.avatar}` : (profile.avatar || ''),
    summary: language === 'fr' ? (profile.bio_fr || profile.bio) : (profile.bio_en || profile.bio),
    contact: {
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      website: profile.website,
      socials: [
        profile.linkedin && { label: "LinkedIn", url: profile.linkedin, icon: "SiLinkedin" },
        profile.github && { label: "GitHub", url: profile.github, icon: "SiGithub" },
      ].filter(Boolean),
    },
  } : null;

  return (
    <>
      <ScrollProgressBar />
      <Header
        links={[
          { href: "#about", label: t('nav.about') },
          { href: "#projects", label: t('nav.projects') },
          { href: "#skills", label: t('nav.skills') },
          { href: "#experiences", label: language === 'fr' ? 'Expériences' : 'Experience' },
          { href: "#education", label: language === 'fr' ? 'Formation' : 'Education' },
          { href: "#contact", label: t('nav.contact') },
        ]}
      />

      <main className="max-w-6xl 2xl:max-w-9xl mx-auto px-6 py-10">
        <section
          id="about"
          className="pt-40 pb-8"
        >
          {personal && <About personal={personal} />}
        </section>

        <section id="projects" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">
            {t('projects.title')}
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('projects.subtitle')}
          </p>
          <ProjectsGrid projects={projects} />
        </section>

        <section id="skills" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">{t('skills.title')}</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('skills.subtitle')}
          </p>
          <SkillsList skills={skills} />
        </section>

        {experiences && experiences.length > 0 && (
          <section id="experiences" className="py-8">
            <h2 className="text-2xl font-semibold text-[var(--brand)]">
              {language === 'fr' ? 'Expériences professionnelles' : 'Professional Experience'}
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
              {language === 'fr' ? 'Mon parcours professionnel' : 'My professional journey'}
            </p>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div 
                  key={exp._id} 
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">{exp.position}</h3>
                      {exp.company && (
                        <p className="text-sm text-[var(--brand)] font-medium">{exp.company}</p>
                      )}
                      {exp.location && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                      {new Date(exp.startDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.current ? (language === 'fr' ? 'Présent' : 'Present') : new Date(exp.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  {(language === 'fr' && exp.description_fr) ? (
                    <p className="text-sm text-[var(--text)] leading-relaxed">{exp.description_fr}</p>
                  ) : (language === 'en' && exp.description_en) ? (
                    <p className="text-sm text-[var(--text)] leading-relaxed">{exp.description_en}</p>
                  ) : (
                    exp.description && <p className="text-sm text-[var(--text)] leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section id="education" className="py-8">
            <h2 className="text-2xl font-semibold text-[var(--brand)]">
              {language === 'fr' ? 'Formation' : 'Education'}
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
              {language === 'fr' ? 'Mon parcours académique' : 'My academic background'}
            </p>
            <div className="space-y-4">
              {education.map((ed) => (
                <div 
                  key={ed._id} 
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">{ed.degree}</h3>
                      {ed.school && (
                        <p className="text-sm text-[var(--brand)] font-medium">{ed.school}</p>
                      )}
                      {ed.location && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{ed.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                      {new Date(ed.startDate).getFullYear()}
                      {' - '}
                      {ed.current ? (language === 'fr' ? 'En cours' : 'Current') : new Date(ed.endDate).getFullYear()}
                    </div>
                  </div>
                  {(language === 'fr' && ed.description_fr) ? (
                    <p className="text-sm text-[var(--text)] mt-3 leading-relaxed">{ed.description_fr}</p>
                  ) : (language === 'en' && ed.description_en) ? (
                    <p className="text-sm text-[var(--text)] mt-3 leading-relaxed">{ed.description_en}</p>
                  ) : (
                    ed.description && <p className="text-sm text-[var(--text)] mt-3 leading-relaxed">{ed.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">
            {t('contact.title')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('contact.subtitle')}
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <ContactForm />
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-center items-center">
              <div className="text-sm font-medium mb-2">{t('contact.downloadCV')}</div>
              {profile?.cvUrl ? (
                <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" download>
                  <span className="block px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {language === 'fr' ? 'ici' : 'here'}
                  </span>
                </a>
              ) : (
                <span className="block px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 text-gray-400 cursor-not-allowed">
                  {language === 'fr' ? 'CV non disponible' : 'CV not available'}
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

const PortfolioPage: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default PortfolioPage;
