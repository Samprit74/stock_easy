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

/* =======================
   PROVIDER
======================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const login = (token: string, user: StoredUser) => {
    saveToken(token);
    saveUser(user);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    clearAuth();
    setIsAuthenticated(false);
    setUser(null);
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
