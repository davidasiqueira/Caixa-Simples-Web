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
import { useContext, useState } from "react";
import { Logo } from "../components/login/Logo";
import { PasswordField } from "../components/login/PasswordField";
import { AuthContext } from "../context/authContext";
import { SaveUserType } from "../types/lancamento";

const IndexPage = () => {
  const gray100 = useColorModeValue("gray.100", "gray.700");
  const white100 = useColorModeValue("whiteAlpha.700", "gray.600");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<SaveUserType>({} as SaveUserType);
  const [fazendoLogin, setFazendoLogin] = useState(false);
  const { singUp } = useContext(AuthContext);

  async function saveUser() {
    setUser(() => ({
      avatar: avatar,
      email: email,
      name: name,
      password: password,
    }));
    singUp(user);
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
              Create a new account
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
                <FormLabel htmlFor="email">Name</FormLabel>
                <Input
                  backgroundColor={white100}
                  placeholder="Your name here"
                  id="name"
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                />
              </FormControl>
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
              <FormControl>
                <FormLabel htmlFor="email">Avatar Url</FormLabel>
                <Input
                  backgroundColor={white100}
                  placeholder="Your avatr url here"
                  id="name"
                  type="text"
                  onChange={(event) => setAvatar(event.target.value)}
                />
              </FormControl>
            </Stack>

            <Button
              alignSelf="center"
              variant="solid"
              colorScheme="blue"
              borderRadius="16px"
              type="button"
              cursor="pointer"
              onClick={saveUser}
            >
              SingUp and login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default IndexPage;
