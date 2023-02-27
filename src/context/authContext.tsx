import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { SaveUserType } from "../types/lancamento";

type User = {
  userId: string;
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
  singUp: (user: SaveUserType) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } =
      parseCookies();

    if (token && id) {
      const authStr = "Bearer ".concat(token);
      axios
        .get(
          process.env.NEXT_PUBLIC_ISVALID_API_URL 
          // || "https://caixa-simples-api.herokuapp.com/auth/isvalid?userId=" 
          + id,
          {
            headers: {
              Authorization: authStr,
            },
          }
        )
        .then((response) => {
          if (!response.data.name) {
            destroyCookie(undefined, "caixa-simples-token");
            Router.push("/");
            return;
          }
          setUser({
            userId: id,
            username: response.data.name,
            avatar: response.data.avatar,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  async function signIn({ username, password }: Credentials) {
    try {
      const {
        data: { access_token, user },
      } = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_API_URL ||
          "https://caixa-simples-api.herokuapp.com/auth/login",
        {
          username,
          password,
        },
        {}
      );

      setCookie(undefined, "caixa-simples-token", access_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      setCookie(undefined, "caixa-simples-userId", user.id, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      setUser(user);

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function singUp(user: SaveUserType) {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_CREATE_USER ||
          "https://caixa-simples-api.herokuapp.com/users",
        user,
        {}
      );
      await signIn({ username: user.email, password: user.password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, singUp }}>
      {children}
    </AuthContext.Provider>
  );
}
