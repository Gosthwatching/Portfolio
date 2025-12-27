import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { ScrollProgressBar } from './shared/ScrollProgressBar';
import axios from 'axios';

interface Profile {
  firstName: string;
  lastName: string;
  title: string;
  headline?: string;
  summary?: string;
  bio?: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/profile');
      if (response.data.length > 0) {
        setProfile(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : 'Yarno Chedemail';
  const nameChars = fullName.split('');

  return (
    <>
      <ScrollProgressBar />
      <Header
        links={[
          { href: "#about", label: "About" },
          { href: "#projects", label: "Projects" },
          { href: "#skills", label: "Skills" },
          { href: "#contact", label: "Contact" },
        ]}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-40 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--brand)]">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mt-4 text-lg max-w-prose text-[var(--text)]">
              {profile?.headline || 'Full Stack Developer'}
            </p>

            <div className="mt-6 text-md max-w-none text-[var(--muted)]">
              <p>
                {profile?.bio || profile?.summary || "Étudiant en développement Web, passionné par les technologies modernes et l'innovation."}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand)] text-white font-medium hover:opacity-90 transition"
              >
                See projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--border)]/30 transition"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                {profile?.avatar ? (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={profile.avatar}
                    alt="profile"
                  />
                ) : (
                  profile?.firstName?.[0] || 'Y'
                )}
              </div>

              <div>
                <div className="font-semibold text-[var(--text)]">{fullName}</div>
                <div className="text-sm text-[var(--muted)]">{profile?.title || 'Étudiant'}</div>
              </div>

              {profile?.location && (
                <div className="text-sm text-[var(--muted)]">📍 {profile.location}</div>
              )}

              {(profile?.github || profile?.linkedin) && (
                <div className="flex gap-3 mt-2">
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--brand)] transition"
                    >
                      GitHub
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--brand)] transition"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </section>

        <section id="projects" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Projects</h2>
          <p className="mb-6 text-sm text-[var(--muted)] mt-1">
            Selected work — <a href="/projects" className="underline">view all</a>
          </p>
        </section>

        <section id="skills" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Skills</h2>
          <p className="mb-6 text-sm text-[var(--muted)] mt-1">
            Technologies I use — <a href="/skills" className="underline">view all</a>
          </p>
        </section>

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Contact</h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Get in touch — <a href="/contact" className="underline">contact form</a>
          </p>
          {profile?.email && (
            <div className="mt-4 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-sm text-[var(--muted)]">Email: {profile.email}</div>
              {profile?.phone && (
                <div className="text-sm text-[var(--muted)]">Phone: {profile.phone}</div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;