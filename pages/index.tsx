import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Logo } from "../components/login/Logo";
import { OAuthButtonGroup } from "../components/login/OAuthButtonGroup";
import { PasswordField } from "../components/login/PasswordField";

const IndexPage = () => {
  const { toggleColorMode } = useColorMode();
  const gray100 = useColorModeValue("gray.100", "gray.700");
  const white100 = useColorModeValue("whiteAlpha.700", "gray.600");
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
            {/* <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Button variant="link" colorScheme="blue">
              Sign up
            </Button>
          </HStack> */}
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
                />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
            <Button variant="primary">Sign in</Button>
            {/* <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup /> */}
          </Stack>
          </Stack>
        </Box>
        {/* <Button onClick={toggleColorMode} backgroundColor="teal">
          Theme
        </Button> */}
      </Stack>
    </Container>
  );
};

export default IndexPage;
