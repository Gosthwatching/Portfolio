import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen scroll-smooth">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
