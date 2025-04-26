import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const existingUser = {
            id: '1',
            name: email.split('@')[0],
            email,
          };
          setUser(existingUser);
          localStorage.setItem('user', JSON.stringify(existingUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid login credentials'));
        }
      }, 1000);
    });
  };

  // Mock signup function
  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const newUser = {
            id: Math.random().toString(36).substr(2, 9), // Random id
            name: email.split('@')[0],
            email,
          };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid signup credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
