// src/components/Resume.tsx
import React, { useState, useEffect } from "react";
import { IoIosMail } from "react-icons/io";
import { LuMapPinHouse } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { IoPhonePortrait } from "react-icons/io5";
import * as SiIcons from "react-icons/si";
import axios from "axios";
import type { DateRange } from "../../types/portfolio";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:4000";

export const Resume: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes, experiencesRes, educationRes, certificationsRes] = await Promise.all([
        axios.get(`${API_URL}/profile`),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/skills`),
        axios.get(`${API_URL}/experiences`),
        axios.get(`${API_URL}/education`),
        axios.get(`${API_URL}/certifications`),
      ]);
      
      if (profileRes.data) {
        setProfile(profileRes.data);
      }
      
      setProjects(projectsRes.data || []);
      
      // Group skills by category
      const skillsByCategory = (skillsRes.data || []).reduce((acc: any, skill: any) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          name: skill.name,
          years: skill.years,
        });
        return acc;
      }, {});
      
      const skillGroups = Object.entries(skillsByCategory).map(([title, skills]) => ({
        title,
        skills: skills as any[],
      }));
      setSkills(skillGroups);
      
      setExperiences(experiencesRes.data || []);
      setEducation(educationRes.data || []);
      setCertifications(certificationsRes.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const personal = profile ? {
    name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
    title: profile.title,
    headline: profile.headline,
    summary: profile.bio || profile.summary,
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
  } : {
    name: "Your Name",
    title: "",
    headline: "",
    summary: "",
    contact: {},
  };

  const contact = personal.contact ?? {};

  function formatDate(date?: string | DateRange | any): string {
    if (!date) return "";
    if (typeof date === "string") return date;

    const start = date.start ?? date.startDate ?? "";
    const end = date.end ?? date.endDate ?? "";
    const isCurrent = date.present ?? date.current ?? false;
    
    if (isCurrent) return `${start} — Présent`;
    if (end) return `${start} — ${end}`;
    return start;
  }

  return (
    <article
      className={`max-w-none print:prose-lg print:mx-6 ${className}`}
      aria-label="Printable resume"
      id="resume-print-area"
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {personal.name}
          </h1>
          {personal.title && (
            <p className="text-sm text-[var(--muted)] mt-1">{personal.title}</p>
          )}
          {personal.headline && (
            <div className="text-sm text-[var(--muted)] mt-1">
              {personal.headline}
            </div>
          )}
        </div>

        <div className="text-sm text-right space-y-1">
          {contact.email && (
            <div className="flex items-center justify-end gap-2">
              <IoIosMail size={16} />
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
            </div>
          )}

          {contact.phone && (
            <div className="flex items-center justify-end gap-2">
              <IoPhonePortrait size={16} />
              <span>{contact.phone}</span>
            </div>
          )}

          {contact.website && (
            <div className="flex items-center justify-end gap-2">
              <TbWorldWww size={16} />
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {new URL(contact.website).hostname || contact.website}
              </a>
            </div>
          )}

          {contact.location && (
            <div className="flex items-center justify-end gap-2">
              <LuMapPinHouse size={16} />
              <span>{contact.location}</span>
            </div>
          )}

          {contact.socials && contact.socials.length > 0 && (
            <div className="flex items-center justify-end gap-3 flex-wrap">
              {contact.socials.map((s) => {
                const Icon = SiIcons[s.icon as keyof typeof SiIcons];
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative group"
                  >
                    {Icon ? (
                      <Icon
                        key={s.label}
                        size={s.size || 16}
                        className={`cursor-pointer text-[var(--text)] hover:text-[var(--brand)] transition`}
                        onClick={() => window.open(s.url, "_blank")}
                      />
                    ) : (
                      s.label
                    )}

                    {/* Tooltip */}
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                        px-2 py-1 text-xs rounded-md
                        bg-[var(--surface)] text-[var(--text)]
                        border border-[var(--border)]
                        opacity-0 group-hover:opacity-100
                        transition duration-200 pointer-events-none
                        whitespace-nowrap z-10"
                    >
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section>
          <h2 className="text-base font-semibold mt-4">À propos</h2>
          <p className="text-sm text-[var(--text)]">{personal.summary}</p>
        </section>
      )}

      {/* Skills (groups) */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Compétences</h2>
          <div className="space-y-3">
            {skills.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <div className="text-sm font-medium mb-1">{group.title}</div>
                )}
                <ul className="flex flex-wrap gap-2 text-sm">
                  {group.skills.map((s: any) => (
                    <li
                      key={s.name}
                      className="px-2 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                    >
                      {s.name}
                      {s.years ? (
                        <span className="ml-2 text-xs text-[var(--muted)]">
                          · {s.years}y
                        </span>
                      ) : null}
                      {s.level ? (
                        <span className="ml-1 text-xs text-[var(--muted)]">
                          · {s.level}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Expérience</h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={exp._id ?? `${exp.position}-${idx}`} className="text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <div className="font-medium">
                      {exp.position}
                      {exp.company ? (
                        <span className="text-[var(--muted)]">
                          {" "}
                          — {exp.company}
                        </span>
                      ) : null}
                    </div>
                    {exp.location && (
                      <div className="text-xs text-[var(--muted)]">
                        {exp.location}
                      </div>
                    )}
                  </div>
                  <div className="text-[var(--muted)] mt-2 sm:mt-0">
                    {formatDate({ startDate: exp.startDate, endDate: exp.endDate, current: exp.current })}
                  </div>
                </div>

                {exp.description && (
                  <p className="mt-2 text-[var(--text)]">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Projets</h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p._id ?? p.title} className="text-sm">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {p.title}
                  </div>
                </div>
                {p.description && (
                  <div className="mt-1 text-[var(--text)]">{p.description}</div>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {p.tags.map((t: string) => (
                      <span
                        key={t}
                        className="text-xs font-semibold px-2 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Formation</h2>
          <div className="space-y-2 text-sm">
            {education.map((ed) => (
              <div
                key={ed._id ?? ed.degree}
                className="flex justify-between"
              >
                <div>
                  {ed.degree ? <strong>{ed.degree}</strong> : null}
                  {ed.school ? <span className="ml-2">{ed.school}</span> : null}
                </div>
                <div className="text-[var(--muted)]">
                  {formatDate({ startDate: ed.startDate, endDate: ed.endDate })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Certifications</h2>
          <ul className="text-sm list-disc list-inside">
            {certifications.map((c) => (
              <li key={c._id ?? c.name}>
                <span className="font-medium">
                  {c.name}
                  {(c.issuer || c.link) && (
                    <span className="text-[var(--muted)]">
                      {c.issuer && (
                        <>
                          {" — "}
                          {c.link ? (
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-sm"
                            >
                              {c.issuer}
                            </a>
                          ) : (
                            <span>{c.issuer}</span>
                          )}
                        </>
                      )}

                      {/* If there's a URL but no issuer, just show "Link" */}
                      {!c.issuer && c.link && (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Lien
                        </a>
                      )}
                    </span>
                  )}
                </span>
                {c.date && (
                  <span className="text-xs text-[var(--muted)] ml-3">
                    {c.date}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer: small print / download */}
      <footer className="mt-6 text-xs text-[var(--muted)]">
        <div className="flex items-center justify-between">
          <div>
            © {new Date().getFullYear()} {personal.name}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={profile?.cv ? `${SERVER_URL}${profile.cv}` : "/resume.pdf"}
              className="inline-flex items-center gap-2 text-sm underline"
              download
            >
              <FaFileDownload className="w-4 h-4" /> Télécharger PDF
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
};
