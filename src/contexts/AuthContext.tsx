import React, { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../../src/firebase/index";
import { Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
  setIsAuthenticated: (value: boolean) => void;
}

export const UserStateContext = createContext<UserContextState>({} as UserContextState);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signUp = (email: string, password: string): Promise<UserCredential> => createUserWithEmailAndPassword(auth, email, password);
  const logIn = (email: string, password: string): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
  const resetPassword = (email: string): Promise<void> => sendPasswordResetEmail(auth, email);
  const logOut = (): Promise<void> => signOut(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user); // if there is a user , isAuthenticated will be true
    });
    return unsubscribe;
  }, []);

  const values = {
    signUp,
    user,
    logIn,
    resetPassword,
    auth,
    logOut,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={values}>
      <UserStateContext.Provider value={{ isAuthenticated, isLoading: !user, setIsAuthenticated }}>{children}</UserStateContext.Provider>
    </AuthContext.Provider>
  );
}

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
