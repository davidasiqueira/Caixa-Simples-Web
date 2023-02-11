import { GetServerSideProps } from "next";
import { useContext } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Select,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "../components/lancamentos/radioButton";

const Caixa = () => {
  const { user } = useContext(AuthContext);
  const options = ["Entrada", "Saida"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "operacao",
    defaultValue: "Entrada",
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <SidebarWithHeader>
      <Flex
        width="100%"
        minH="calc(100vh - 82px)"
        display="flex"
        borderRadius="8px"
        flexDirection={["column", "column", "row"]}
        justifyContent="space-between"
        rowGap={4}
      >
        <Box
          width={["100%", "100%", "70%"]}
          minH="calc(100vh - 82px)"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="8px"
          p="20px"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h3" size="md">
            Lançamentos
          </Heading>
          <Flex
            width="400px"
            height="300px"
            margin="auto"
          >
            <Flex flexDir="column" mt="auto" mb="auto" p="10px" rowGap="20px">
              
              <HStack {...group} display="flex" flexDir="column" rowGap="20px">
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack>
              <Select
                ml="8px"
                variant="filled"
                placeholder="Selecione uma conta"
              >
                <option value="cash">Cash</option>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão</option>
              </Select>
            </Flex>
          </Flex>
        </Box>
        <Box
          width={["100%", "100%", "28.5%"]}
          minH="calc(100vh - 82px)"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="8px"
          p="20px"
        >
          <Heading as="h3" size="md">
            Ultimos Lançamentos
          </Heading>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Caixa;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { "caixa-simples-token": token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
