import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './App.css';

import ManageSkills from './components/ManageSkills';
import ManageProjects from './components/ManageProjects';
import ManageEducation from './components/ManageEducation';
import ManageExperiences from './components/ManageExperiences';
import ManageMessages from './components/ManageMessages';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/skills" element={<ProtectedRoute><ManageSkills /></ProtectedRoute>} />
              <Route path="/dashboard/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
              <Route path="/dashboard/education" element={<ProtectedRoute><ManageEducation /></ProtectedRoute>} />
              <Route path="/dashboard/experiences" element={<ProtectedRoute><ManageExperiences /></ProtectedRoute>} />
              <Route path="/dashboard/messages" element={<ProtectedRoute><ManageMessages /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

