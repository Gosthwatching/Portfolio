// ProjectCard.tsx

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { tagColors } from "../config/portfolioData";

import * as FaIcons from "react-icons/fa";

export const ProjectCard: React.FC<{
  project: any;
  onVoirPlus?: () => void;
}> = ({ project, onVoirPlus }) => {
  const [showAll, setShowAll] = useState(false);
  const { language, t } = useLanguage();

  // how many tags to show before "+x"
  const VISIBLE_COUNT = 3;

  const FaLink = FaIcons["FaLink" as keyof typeof FaIcons];

  const visibleTags = showAll
    ? project?.tags
    : project?.tags?.slice(0, VISIBLE_COUNT);
  const hiddenCount = (project?.tags?.length ?? 0) - VISIBLE_COUNT;

  // Correction : on utilise imageUrl si image n'existe pas (compatibilité backend)
  const imageSrc = project.image || project.imageUrl;

  // Correction : affichage robuste de la description selon la langue
  let desc = project[`description_${language}`];
  if (!desc) desc = project.description;

  // DEBUG TEMPORAIRE : Affiche la langue et les descriptions reçues
  // console.log('LANG:', language, 'desc_fr:', project.description_fr, 'desc_en:', project.description_en, 'desc:', project.description);

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="p-4 group rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {imageSrc && (
            <div className="w-full flex justify-center items-center mb-4 min-h-[180px]">
              <img
                src={imageSrc}
                alt={project.title}
                className="rounded-lg border border-[var(--border)] object-cover max-h-44 max-w-full mx-auto"
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              />
            </div>
          )}
          <div style={{ minHeight: '70px' }}>
            <h3 className="font-bold text-xl text-[var(--brand)]">{project.title}</h3>
            {project.isUnderDevelopment && (
              <span className="text-xs text-[var(--muted)] pl-2">Under Development</span>
            )}
            {desc && (
              <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{desc}</p>
            )}
          </div>
          {(project.href || project.live) && (
            <div className="mt-3 flex gap-2">
              <a
                href={project.href || project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-[var(--brand)] rounded-lg hover:opacity-90 transition"
              >
                {FaLink && <FaLink className="w-4 h-4" />} Live Demo
              </a>
              {onVoirPlus && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVoirPlus();
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-[var(--brand)] rounded-lg hover:opacity-90 transition"
                  style={{ minWidth: 80 }}
                >
                  {t('project.seeMore')}
                </button>
              )}
            </div>
          )}
          <div className="mt-3 flex gap-2 flex-wrap">
            {visibleTags?.map((t: string) => (
              <span
                key={t}
                className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[t] || "bg-gray-100 text-gray-800"}`}
              >
                {t}
              </span>
            ))}
            {project.techStack?.map((tech: string) => (
              <span
                key={tech}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                {tech}
              </span>
            ))}
            {!showAll && hiddenCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(true);
                }}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                +{hiddenCount}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
