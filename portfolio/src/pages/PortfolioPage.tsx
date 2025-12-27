// PortfolioPage.tsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/shared/Footer";
import { About } from "../components/About";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import CLIResume from "../components/CLIResume";
import axios from "axios";

const API_URL = "http://localhost:4000/api";

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        axios.get(`${API_URL}/profile`),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/skills`),
      ]);
      
      if (profileRes.data.length > 0) {
        setProfile(profileRes.data[0]);
      }
      
      // Map projects - add missing fields expected by template
      const mappedProjects = projectsRes.data.map((p: any, index: number) => ({
        id: p._id || `proj-${index}`,
        title: p.title || '',
        description: p.description || '',
        image: p.imageUrl || '', // MongoDB uses imageUrl, template expects image
        href: p.link || '', // MongoDB uses link, template expects href
        tags: p.tags || [], // MongoDB might not have tags
        github: p.github || '',
        live: p.live || '',
        longDescription: p.longDescription || p.description || '',
        techStack: p.techStack || [],
      }));
      setProjects(mappedProjects);
      
      // Map skills - group by category for template
      const skillsByCategory = skillsRes.data.reduce((acc: any, skill: any) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          name: skill.name,
          level: skill.level || 'intermediate',
          icon: skill.icon || skill.name.toLowerCase().replace(/\s+/g, ''),
        });
        return acc;
      }, {});
      
      // Convert to array of skill groups for template
      const skillGroups = Object.entries(skillsByCategory).map(([title, skills]) => ({
        title,
        skills: skills as any[],
      }));
      setSkills(skillGroups);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const personal = profile ? {
    name: `${profile.firstName} ${profile.lastName}`,
    title: profile.title,
    headline: profile.headline,
    avatar: profile.avatar,
    summary: profile.summary || profile.bio,
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
    <ThemeProvider>
      <ScrollProgressBar />
      <Header
        links={[
          { href: "#about", label: "About" },
          { href: "#projects", label: "Projects" },
          { href: "#skills", label: "Skills" },
          { href: "#contact", label: "Contact" },
        ]}
        onTryCLI={() => setShowCLI(true)}
      />
      {/* CLI panel (docked / overlay) */}
      <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

      <main className="max-w-6xl 2xl:max-w-9xl mx-auto px-6 py-10">
        <section
          id="about"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-40 pb-8"
        >
          {personal && <About personal={personal} />}
        </section>

        <section id="projects" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">
            Projects
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            Selected work — click a card for details.
          </p>
          <ProjectsGrid projects={projects} onOpen={setSelected} />
        </section>

        <section id="skills" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Skills</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tools and technologies I use regularly.
          </p>
          <SkillsList skills={skills} isBar={true} />
        </section>

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">
            Contact
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tell me about your project, or just say hi.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <ContactForm />
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-4">
              <div>
                <div className="font-semibold">Let's collaborate</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  I'm available for freelance and contract work. My inbox is
                  open.
                </div>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Quick contact</div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Email: satyasubudhi089@gmail.com
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Location: Remote
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-sm font-medium">Resume</div>
                <a
                  href="/"
                  className="block mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />

      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ThemeProvider>
  );
};

export default PortfolioPage;
