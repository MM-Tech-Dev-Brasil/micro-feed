import { useState } from 'react';
import { useApi } from './useApi';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
  };
  message?: string;
}

interface DecodedJWT {
  sub?: string;
  username?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function useAuth() {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function decodeJWT(token: string): DecodedJWT | null {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;
      return JSON.parse(
        atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      );
    } catch (err) {
      console.error('Erro ao decodificar JWT:', err);
      return null;
    }
  }

  async function loginUser(username: string, password: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const payload: LoginPayload = { username, password };
      const { data, status } = await api.post<LoginResponse>("/auth/login", payload);

      if (status !== 200) {
        setError(data.message || "Login failed");
        return false;
      }
      const token = data.data.access_token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function currentUser(): DecodedJWT | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = decodeJWT(token);
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      logout(); 
      return null;
    }

    return decoded;
  }

  function logout() {
    localStorage.removeItem('token');
    document.cookie = "token=; path=/; max-age=0"; 
    window.location.reload();
  }

  return { loginUser, loading, error, currentUser, logout };
}
