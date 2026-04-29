import React, { createContext, useContext, useState, useEffect } from "react";

interface StoredUser {
  userId: number;
  username: string;
  email: string;
  accessToken: string;
}

interface AuthContextType {
  user: StoredUser | null;
  login: (userData: StoredUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: StoredUser) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Cập nhật state ngay lập tức để Header nhận được
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
