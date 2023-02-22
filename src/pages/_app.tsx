import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/authContext";
import { LancamentosProvider } from "../context/lancamentosContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LancamentosProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LancamentosProvider>
    </AuthProvider>
  );
}
