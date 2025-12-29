// ProjectCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { tagColors } from "../config/portfolioData";
import type { Project } from "../types/portfolio";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

export const ProjectCard: React.FC<{
  project: Project;
  onOpen?: (p: Project) => void;
}> = ({ project, onOpen }) => {
  const [showAll, setShowAll] = useState(false);

  // how many tags to show before "+x"
  const VISIBLE_COUNT = 3;

  const FaLink = FaIcons["FaLink" as keyof typeof FaIcons];

  const visibleTags = showAll
    ? project?.tags
    : project?.tags?.slice(0, VISIBLE_COUNT);
  const hiddenCount = (project?.tags?.length ?? 0) - VISIBLE_COUNT;

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="p-4 group rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.image && (
            <div className="w-full flex justify-center mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg border border-[var(--border)] w-full object-cover h-45"
              />
            </div>
          )}
          <h3 className="font-bold text-xl text-[var(--brand)]">
            {project.title}
          </h3>
          {project.isUnderDevelopment && (
            <span className="text-xs text-[var(--muted)] pl-2">Under Development</span>
          )}
          <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{project.description}</p>
          {project.href && (
            <div className="mt-3">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-[var(--brand)] rounded-lg hover:opacity-90 transition"
              >
                {FaLink && <FaLink className="w-4 h-4" />} Live Demo
              </a>
            </div>
          )}

          <div className="mt-3 flex gap-2 flex-wrap">
            {visibleTags?.map((t) => (
              <span
                key={t}
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  tagColors[t] || "bg-gray-100 text-gray-800"
                }`}
              >
                {t}
              </span>
            ))}
            
            {project.techStack?.map((tech) => (
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
