import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

type User = {
  userId: number;
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

  useEffect(() => {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } = parseCookies();
    let numberId = Number(id);

    if (token && id) {
      const authStr = "Bearer ".concat(token);
      axios
        .get(process.env.NEXT_PUBLIC_ISVALID_API_URL + id, {
          headers: {
            Authorization: authStr,
          },
        }).then((response) => {
          if(!response){
            destroyCookie(undefined, "caixa-simples-token");
            Router.push("/");
            return;
          }
          setUser({
            userId: numberId,
            username: response.data.username,
            avatar: response.data.avatar,
          });
        }).catch((err) => {
          console.log(err)
        });
    }
  }, []);

  async function signIn({ username, password }: Credentials) {
    try {
      const {
        data: { access_token, user },
      } = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_API_URL,
        {
          username,
          password,
        },
        {}
      );

      setCookie(undefined, "caixa-simples-token", access_token, {
        maxAge: 300, // 5 minutes
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
