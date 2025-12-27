interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  token?: string | null;
}

export const apiRequest = async (url: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || 'Erreur API');
  }

  return response.json();
};

// Helper pour les requêtes avec authentification
export const authenticatedRequest = async (
  url: string,
  options: Omit<ApiOptions, 'token'> = {}
) => {
  const token = localStorage.getItem('admin_token');
  return apiRequest(url, { ...options, token });
};
