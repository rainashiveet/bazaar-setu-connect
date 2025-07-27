import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'vendor' | 'supplier';

interface User {
  id: string;
  mobile: string;
  type: UserType;
  name?: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (mobile: string, otp: string, type: UserType) => Promise<boolean>;
  logout: () => void;
  sendOTP: (mobile: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const sendOTP = async (mobile: string): Promise<boolean> => {
    // Mock OTP sending - in real app, integrate with Twilio/Firebase
    console.log(`Sending OTP to ${mobile}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const login = async (mobile: string, otp: string, type: UserType): Promise<boolean> => {
    // Mock OTP verification - accept "123456" as valid OTP
    if (otp === "123456") {
      const newUser: User = {
        id: `${type}_${mobile}`,
        mobile,
        type,
        verified: true,
        name: type === 'vendor' ? 'राज कुमार' : 'सुनील सप्लायर'
      };
      setUser(newUser);
      localStorage.setItem('bazaarsetu_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bazaarsetu_user');
  };

  // Check for existing session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('bazaarsetu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      sendOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};