// Verificacion de usuarios logeados o no en toda la sesion (template)
import { createContext, useCallback, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { ApiError } from '../services/apiClient';

interface AuthContextValue {
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Centralizes auth state and error handling for the whole app (OP-03).
// Any component can read "isAuthenticated" without knowing about tokens
// or localStorage directly.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(authService.getStoredUsername());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (usernameInput: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = await authService.login(usernameInput, password);
      authService.saveSession(auth);
      setUsername(auth.username);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (usernameInput: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = await authService.register(usernameInput, password);
      authService.saveSession(auth);
      setUsername(auth.username);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo completar el registro.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        isAuthenticated: !!username && !!authService.getStoredToken(),
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
