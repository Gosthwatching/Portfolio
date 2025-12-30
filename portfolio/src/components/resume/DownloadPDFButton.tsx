import React, { useState, useEffect } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:4000';

interface DownloadPDFButtonProps {
  name?: string;
  className?: string;
  variant?: 'button' | 'link';
}

export const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  className = '',
  variant = 'button',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`);
        if (response.data?.cvUrl) {
          setCvUrl(`${SERVER_URL}${response.data.cvUrl}`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleDownload = () => {
    if (!cvUrl) {
      alert('Aucun CV disponible. Veuillez uploader un CV dans le dashboard.');
      return;
    }
    setIsLoading(true);
    // Ouvrir le CV dans un nouvel onglet pour téléchargement
    window.open(cvUrl, '_blank');
    setTimeout(() => setIsLoading(false), 500);
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleDownload}
        disabled={isLoading || !cvUrl}
        className={`block px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? 'Téléchargement...' : 'Download PDF'}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading || !cvUrl}
      aria-label="Télécharger le CV en PDF"
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <FaFileDownload className={isLoading ? 'animate-bounce' : ''} />
      <span>{isLoading ? 'Téléchargement...' : 'Télécharger PDF'}</span>
    </button>
  );
};
