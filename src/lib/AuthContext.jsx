import { createContext, useContext, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigateToLogin = useCallback(() => {
    // No backend configured — login is not required for this standalone app.
  }, []);

  const value = {
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    navigateToLogin,
    user: null,
    isAuthenticated: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
