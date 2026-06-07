import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getToken,
  saveToken,
  clearAuth,
  getUser,
  saveUser,
  StoredUser,
} from "@/services/authStorage";

/* =======================
   TYPES
======================= */

type AuthContextType = {
  isAuthenticated: boolean;
  user: StoredUser | null;
  login: (token: string, user: StoredUser) => void;
  logout: () => void;
};

/* =======================
   CONTEXT
======================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readPersistedAuth(): { token: string | null; user: StoredUser | null } {
  return { token: getToken(), user: getUser() };
}

/* =======================
   PROVIDER
======================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ isAuthenticated, user }, setAuth] = useState<{
    isAuthenticated: boolean;
    user: StoredUser | null;
  }>(() => {
    const { token, user } = readPersistedAuth();
    return { isAuthenticated: !!token && !!user, user };
  });

  useEffect(() => {
    const { token, user } = readPersistedAuth();
    setAuth({ isAuthenticated: !!token && !!user, user });
  }, []);

  const login = (token: string, user: StoredUser) => {
    saveToken(token);
    saveUser(user);
    setAuth({ isAuthenticated: true, user });
  };

  const logout = () => {
    clearAuth();
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =======================
   HOOK
======================= */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
