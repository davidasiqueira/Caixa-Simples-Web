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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "../components/lancamentos/radioButton";
import { CheckIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";

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
        flexDirection={["column", "column", "column", "row", "row"]}
        justifyContent="space-between"
        rowGap={4}
      >
        <Box
          width={["100%", "100%", "100%", "66%", "66%"]}
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
          <Flex width="400px" height="300px" margin="auto">
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
                cursor="pointer"
                ml="8px"
                variant="filled"
                placeholder="Conta"
                width="120px"
              >
                <option value="cash">Cash</option>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão</option>
              </Select>
            </Flex>
            <Flex flexDir="column" ml="10px" mt="auto" mb="auto" rowGap="20px">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input size="lg" placeholder="Enter amount" />
              </InputGroup>
              <InputGroup mt="">
                <InputLeftElement
                  pointerEvents="none"
                  children={<EditIcon color="gray.300" />}
                />
                <Input size="lg" type="text" placeholder="Descrição" />
              </InputGroup>

              <Button bg="#4EAB02">lançar</Button>
            </Flex>
          </Flex>
        </Box>
        <Box
          width={["100%", "100%", "100%", "32.5%", "32.5%"]}
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
          <TableContainer mt='20px' height='calc(100vh - 170px)' overflowY='auto'>
            <Table variant="simple" size='sm' >
              <Thead>
                <Tr>
                  <Th>Tipo</Th>
                  <Th>Valor</Th>
                  <Th isNumeric>conta</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr> <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Pix</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cartão</Td>
                </Tr>
                <Tr>
                  <Td>Entrada</Td>
                  <Td>R$ 25,90</Td>
                  <Td>Cash</Td>
                </Tr>
                
              </Tbody>
            </Table>
          </TableContainer>
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
