import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'lesson14-auth';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredSession);

  const login = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore quota / private mode */
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth þarf að vera innan AuthProvider');
  }
  return ctx;
}
