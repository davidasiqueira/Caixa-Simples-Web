import { createContext } from "react";

export const AuthContext = createContext({})

export function AuthProvider({children}) {

  const isAuthenticated = false;

  return(
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}