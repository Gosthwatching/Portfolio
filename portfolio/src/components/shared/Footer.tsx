import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="text-sm text-[var(--muted)] border-t border-[var(--border)] py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-6">
        {/* Credit to original template creator */}
        <div>
          {t('footer.template')}{" "}
          <a 
            href="https://github.com/satya00089/portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-[var(--text)] hover:text-[var(--brand)] underline transition-colors"
          >
            Satya Subudhi
          </a>
        </div>
      </div>
    </footer>
  );
};
