// Configuration de l'API backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  profile: {
    get: `${API_BASE_URL}/profile`,
    update: `${API_BASE_URL}/profile`,
    uploadCV: `${API_BASE_URL}/profile/upload-cv`,
    downloadCV: `${API_BASE_URL}/profile/download-cv`,
  },
  projects: {
    list: `${API_BASE_URL}/projects`,
    create: `${API_BASE_URL}/projects`,
    update: (id: string) => `${API_BASE_URL}/projects/${id}`,
    delete: (id: string) => `${API_BASE_URL}/projects/${id}`,
  },
  skills: {
    list: `${API_BASE_URL}/skills`,
    create: `${API_BASE_URL}/skills`,
    update: (id: string) => `${API_BASE_URL}/skills/${id}`,
    delete: (id: string) => `${API_BASE_URL}/skills/${id}`,
  },
  experiences: {
    list: `${API_BASE_URL}/experiences`,
    create: `${API_BASE_URL}/experiences`,
    update: (id: string) => `${API_BASE_URL}/experiences/${id}`,
    delete: (id: string) => `${API_BASE_URL}/experiences/${id}`,
  },
  education: {
    list: `${API_BASE_URL}/education`,
    create: `${API_BASE_URL}/education`,
    update: (id: string) => `${API_BASE_URL}/education/${id}`,
    delete: (id: string) => `${API_BASE_URL}/education/${id}`,
  },
  messages: {
    list: `${API_BASE_URL}/messages`,
    create: `${API_BASE_URL}/messages`,
    markRead: (id: string) => `${API_BASE_URL}/messages/${id}/read`,
    delete: (id: string) => `${API_BASE_URL}/messages/${id}`,
  },
};
