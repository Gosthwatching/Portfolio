import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center text-sm text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} Yarno Chedemail. All rights reserved.</p>
          <p className="mt-2">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
