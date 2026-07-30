import { apiFetch } from './apiClient';
import type { AuthResponse } from '../types';

export const authService = {
  async register(username: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { username, password },
      auth: false,
    });
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { username, password },
      auth: false,
    });
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  saveSession(auth: AuthResponse): void {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('username', auth.username);
  },

  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },
};
