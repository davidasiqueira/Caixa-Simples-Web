import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}
