import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Router from "next/router";
import { useContext, useState } from "react";
import { Logo } from "../components/login/Logo";
import { PasswordField } from "../components/login/PasswordField";
import { AuthContext } from "../context/authContext";

const IndexPage = () => {
  const gray100 = useColorModeValue("gray.100", "gray.700");
  const white100 = useColorModeValue("whiteAlpha.700", "gray.600");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fazendoLogin, setFazendoLogin] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    //fazer try catch
    setFazendoLogin(true);
    await signIn(data);
  }

  async function updateUser() {
    handleSignIn({ username: email, password: password });
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
          backgroundColor={gray100}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  backgroundColor={white100}
                  placeholder="email@email.com"
                  id="email"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <PasswordField
                onChange={(event) => setPassword(event.target.value)}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Button
                mt="8px"
                variant="solid"
                type="button"
                cursor="pointer"
                borderRadius="16px"
                width="110px"
                onClick={() => {Router.push('/singup')}}
              >
                Sing up
              </Button>
              <Button
                width="110px"
                isLoading={fazendoLogin}
                variant="solid"
                colorScheme="blue"
                borderRadius="16px"
                type="button"
                cursor="pointer"
                onClick={updateUser}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default IndexPage;
