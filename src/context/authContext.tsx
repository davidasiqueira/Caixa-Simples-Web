import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { SaveUserType } from "../types/lancamento";
import { useToast } from "@chakra-ui/react";

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
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [usuario, setUser] = useState<User | null>(null);
  const toast = useToast();

  const isAuthenticated = !!usuario;

  useEffect(() => {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } =
      parseCookies();

    if (token && id) {
      const authStr = "Bearer ".concat(token);
      axios
        .get('http://localhost:3000/auth/isvalid/' + id, {
          headers: {
            Authorization: authStr,
          },
        })
        .then((response) => {
          if (!response.data.name) {
            destroyCookie(undefined, "caixa-simples-token");
            Router.push("/");
            return;
          }
          setUser({
            userId: id,
            username: response.data.username,
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
          "http://localhost:3000/auth/login",
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

      setUser({
        userId: user.id,
        username: user.name,
        avatar: user.avatar,
      });

      Router.push("/dashboard");
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.log(error);
    }
  }

  async function singUp(user: SaveUserType) {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_CREATE_USER ||
          "http://localhost:3000/users",
        user,
        {}
      );
      await signIn({ username: user.email, password: user.password });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    destroyCookie(undefined, "caixa-simples-token");
    Router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ user: usuario, isAuthenticated, signIn, singUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
