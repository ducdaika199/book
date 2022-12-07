import React, { createContext, useContext, useState } from 'react';
import { AuthResponse } from '@/types/auth';

interface AuthContextType {
  auth?: AuthResponse;
  updateAuth: (value: AuthResponse) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthResponse>();

  const updateAuth = (value: AuthResponse) => {
    setAuth(value);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
