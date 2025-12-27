import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { to: '/dashboard/skills', label: 'Manage Skills', icon: '🛠️', description: 'Add, edit or delete skills' },
    { to: '/dashboard/projects', label: 'Manage Projects', icon: '💼', description: 'Manage your portfolio projects' },
    { to: '/dashboard/education', label: 'Manage Education', icon: '🎓', description: 'Update your education history' },
    { to: '/dashboard/experiences', label: 'Manage Experiences', icon: '💻', description: 'Manage work experiences' },
    { to: '/dashboard/messages', label: 'View Messages', icon: '📧', description: 'Check contact form messages' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-xl font-bold text-white">
              YC
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--text)]">Admin Dashboard</h1>
              <p className="text-sm text-[var(--muted)]">Manage your portfolio content</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--border)]/30 transition"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Welcome back!</h2>
          <p className="text-[var(--muted)]">Select a section below to manage your content.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.to}
                className="block p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--brand)] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--brand)] transition">
                      {item.label}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">{item.description}</p>
                  </div>
                  <div className="text-[var(--muted)] group-hover:text-[var(--brand)] transition">→</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;