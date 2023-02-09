import { createContext, useState } from "react";
import axios from "axios";
import { setCookie } from "nookies";
import Router from "next/router";

const AUTH_API_URL = "http://localhost:3030/auth/login";

type User = {
  useId: number;
  avatar: string;
  username: string;
};

type Credentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: Credentials) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ username, password }: Credentials) {
    try {
      const {
        data: { access_token, user },
      } = await axios.post(AUTH_API_URL, {
        username,
        password,
      },{});

      const token = access_token;
      setCookie(undefined, "caixa-simples-token", token, {
        maxAge: 300, // 5 minutes
      });

      setUser(user);

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
