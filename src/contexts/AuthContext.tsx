import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  isVip: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('pronosports_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('pronosports_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulation d'une API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'admin@pronosports.fr' && password === 'admin123') {
      const userData: User = {
        id: '1',
        email,
        name: 'Admin PronoSports',
        isVip: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      setUser(userData);
      localStorage.setItem('pronosports_user', JSON.stringify(userData));
    } else if (email && password) {
      const userData: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        isVip: false
      };
      setUser(userData);
      localStorage.setItem('pronosports_user', JSON.stringify(userData));
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulation d'une API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      isVip: false
    };
    
    setUser(userData);
    localStorage.setItem('pronosports_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pronosports_user');
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('pronosports_user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};