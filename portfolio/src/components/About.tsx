import { motion } from "framer-motion";
import type { Personal } from "../types/portfolio";

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Texte à gauche */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand)] mb-4">
          {personal.name}
        </h1>
        <p className="text-xl text-[var(--text)] mb-6 font-medium">
          {personal.title}
        </p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--muted)]">
          <p className="text-base leading-relaxed">
            {personal.summary || personal.headline || "Développeur passionné par la création d'applications web modernes et performantes."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--brand)] text-white font-medium hover:opacity-90 transition"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[var(--brand)] text-[var(--brand)] font-medium hover:bg-[var(--brand)] hover:text-white transition"
          >
            Me contacter
          </a>
        </div>

        {/* Coordonnées */}
        {personal.contact && (
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <div className="space-y-2 text-sm text-[var(--muted)]">
              {personal.contact.email && (
                <div>
                  <span className="font-semibold text-[var(--text)]">Email : </span>
                  <a href={`mailto:${personal.contact.email}`} className="hover:text-[var(--brand)]">
                    {personal.contact.email}
                  </a>
                </div>
              )}
              {personal.contact.location && (
                <div>
                  <span className="font-semibold text-[var(--text)]">Localisation : </span>
                  {personal.contact.location}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Photo à droite */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--brand)]">
            {personal.avatar ? (
              <img
                src={personal.avatar}
                alt={personal.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">
                  {personal.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          {/* Déco */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--brand)] rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl"></div>
        </div>
      </motion.div>
    </div>
  );
};
