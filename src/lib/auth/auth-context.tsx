"use client";

import * as React from "react";

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  favorites: string[];
}

interface StoredUser extends AuthUser {
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: "required" | "invalidEmail" | "invalidCredentials" | "emailTaken" | "passwordTooShort";
}

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  updateProfile: (data: Partial<Pick<AuthUser, "name" | "avatar" | "bio">>) => void;
  toggleFavorite: (componentName: string) => void;
}

const USERS_KEY = "meu-ui-hub-users";
const SESSION_KEY = "meu-ui-hub-session";

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const readUsers = (): Record<string, StoredUser> => {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredUser>) : {};
  } catch {
    return {};
  }
};

const writeUsers = (users: Record<string, StoredUser>) => {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toPublicUser = (stored: StoredUser): AuthUser => ({
  name: stored.name,
  email: stored.email,
  avatar: stored.avatar,
  bio: stored.bio,
  favorites: stored.favorites ?? [],
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const email = window.localStorage.getItem(SESSION_KEY);
    const stored = email ? readUsers()[email.toLowerCase()] : undefined;

    queueMicrotask(() => {
      if (stored) setUser(toPublicUser(stored));
      setReady(true);
    });
  }, []);

  const login = React.useCallback((email: string, password: string): AuthResult => {
    if (!email || !password) return { success: false, error: "required" };
    if (!isValidEmail(email)) return { success: false, error: "invalidEmail" };

    const users = readUsers();
    const stored = users[email.toLowerCase()];
    if (!stored || stored.password !== password) {
      return { success: false, error: "invalidCredentials" };
    }

    window.localStorage.setItem(SESSION_KEY, stored.email.toLowerCase());
    setUser(toPublicUser(stored));
    return { success: true };
  }, []);

  const register = React.useCallback(
    (name: string, email: string, password: string): AuthResult => {
      if (!name || !email || !password) return { success: false, error: "required" };
      if (!isValidEmail(email)) return { success: false, error: "invalidEmail" };
      if (password.length < 6) return { success: false, error: "passwordTooShort" };

      const users = readUsers();
      const key = email.toLowerCase();
      if (users[key]) return { success: false, error: "emailTaken" };

      const stored: StoredUser = {
        name,
        email,
        password,
        avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(email)}`,
        bio: "",
        favorites: [],
      };
      users[key] = stored;
      writeUsers(users);

      window.localStorage.setItem(SESSION_KEY, key);
      setUser(toPublicUser(stored));
      return { success: true };
    },
    []
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = React.useCallback(
    (data: Partial<Pick<AuthUser, "name" | "avatar" | "bio">>) => {
      setUser((current) => {
        if (!current) return current;

        const users = readUsers();
        const key = current.email.toLowerCase();
        const stored = users[key];
        if (!stored) return current;

        const updated: StoredUser = { ...stored, ...data };
        users[key] = updated;
        writeUsers(users);

        return toPublicUser(updated);
      });
    },
    []
  );

  const toggleFavorite = React.useCallback((componentName: string) => {
    setUser((current) => {
      if (!current) return current;

      const users = readUsers();
      const key = current.email.toLowerCase();
      const stored = users[key];
      if (!stored) return current;

      const favorites = stored.favorites ?? [];
      const updatedFavorites = favorites.includes(componentName)
        ? favorites.filter((item) => item !== componentName)
        : [...favorites, componentName];

      const updated: StoredUser = { ...stored, favorites: updatedFavorites };
      users[key] = updated;
      writeUsers(users);

      return toPublicUser(updated);
    });
  }, []);

  const value = React.useMemo(
    () => ({ user, ready, login, register, logout, updateProfile, toggleFavorite }),
    [user, ready, login, register, logout, updateProfile, toggleFavorite]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
