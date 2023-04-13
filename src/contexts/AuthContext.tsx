import React, { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../firebase";
import { Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export const UserStateContext = createContext<UserContextState>({} as UserContextState);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  function logOut(): Promise<void> {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
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
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
