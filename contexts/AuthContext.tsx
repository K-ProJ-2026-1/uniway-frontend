import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type AuthUser = {
  id: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (id: string, password: string) => boolean;
  logout: () => void;
};

export const DEMO_ACCOUNT = {
  id: "uniwaydemo",
  password: "uniway1234",
} as const;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login: (id, password) => {
        const normalizedId = id.trim();

        if (
          normalizedId !== DEMO_ACCOUNT.id ||
          password !== DEMO_ACCOUNT.password
        ) {
          return false;
        }

        setUser({ id: normalizedId });
        return true;
      },
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
