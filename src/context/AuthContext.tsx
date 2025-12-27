import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
