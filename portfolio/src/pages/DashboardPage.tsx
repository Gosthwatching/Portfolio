import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectsManager from '../components/admin/ProjectsManager';

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experiences' | 'education' | 'messages'>('projects');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'projects', label: 'Projets', icon: '📁' },
    { id: 'skills', label: 'Compétences', icon: '🛠️' },
    { id: 'experiences', label: 'Expériences', icon: '💼' },
    { id: 'education', label: 'Formation', icon: '🎓' },
    { id: 'messages', label: 'Messages', icon: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-500">Gestion du portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Voir le site
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'experiences' && <ExperiencesManager />}
        {activeTab === 'education' && <EducationManager />}
        {activeTab === 'messages' && <MessagesManager />}
      </main>
    </div>
  );
};

// Composants placeholder pour les autres sections
const SkillsManager: React.FC = () => (
  <div className="text-gray-500 text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
    Interface CRUD des compétences à venir...
  </div>
);

const ExperiencesManager: React.FC = () => (
  <div className="text-gray-500 text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
    Interface CRUD des expériences à venir...
  </div>
);

const EducationManager: React.FC = () => (
  <div className="text-gray-500 text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
    Interface CRUD des formations à venir...
  </div>
);

const MessagesManager: React.FC = () => (
  <div className="text-gray-500 text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
    Liste des messages à venir...
  </div>
);

export default DashboardPage;
