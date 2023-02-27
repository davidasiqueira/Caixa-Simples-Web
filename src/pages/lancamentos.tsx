import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import {
  Box,
  Flex,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { LancamentoType } from "../types/lancamento";
import { SearchIcon } from "@chakra-ui/icons";

const tableData1: LancamentoType = {
  account: "Cash",
  description: "teste de descrição longa mas nem tanto",
  movimento: "Entrada",
  date: Date.now(),
  value: 25.5,
};
const tableData2: LancamentoType = {
  account: "Pix",
  description: "teste de descrição longa mas nem tanto",
  movimento: "Saida",
  date: Date.now(),
  value: 1.5,
};
const tableData3: LancamentoType = {
  account: "Cartão",
  description: "teste de descrição longa mas nem tanto",
  movimento: "Saida",
  date: Date.now(),
  value: 250.5,
};

const Lancamentos = () => {
  const { user } = useContext(AuthContext);
  const [lancamentos, setLancamentos] = useState<LancamentoType[]>([
    tableData1,
    tableData2,
    tableData3,
    tableData1,
    tableData2,
    tableData3,
    tableData1,
    tableData2,
    tableData3,
    tableData1,
    tableData2,
    tableData3,
    tableData1,
    tableData2,
    tableData3,
  ]);

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
          width="100%"
          minH="calc(100vh - 82px)"
          maxH="calc(100vh - 82px)"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="8px"
          p="20px"
          display="flex"
          flexDirection="column"
        >
          <Text fontWeight="600">Periodo</Text>
          <Flex align="baseline" columnGap="10px" mb="5px" mt="5px">
            <Input
              width="20%"
              variant="filled"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              borderRadius="18px"
            />
            <Text>Até</Text>
            <Input
              width="20%"
              variant="filled"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              borderRadius="18px"
            />
            <IconButton
              alignSelf='center'
              borderRadius="18px"
              height="40px"
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          </Flex>

          <TableContainer overflowY="auto">
            <Table variant="simple" size={["sm", "sm", "sm", "md", "lg"]}>
              <Thead>
                <Tr>
                  <Th>Movimento</Th>
                  <Th>Valor</Th>
                  <Th>Descrição</Th>
                  <Th>Data</Th>
                  <Th>Conta</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lancamentos.map((data) => {
                  return (
                    <Tr
                      _hover={{
                        backgroundColor: useColorModeValue(
                          "gray.200",
                          "gray.700"
                        ),
                      }}
                    >
                      <Td>
                        <Badge
                          variant="solid"
                          p="4px 8px"
                          borderRadius="9999px"
                          colorScheme={
                            data.movimento == "Entrada" ? "green" : "red"
                          }
                        >
                          {data.movimento}
                        </Badge>
                      </Td>
                      <Td>{data.value}</Td>
                      <Td>{data.description}</Td>
                      <Td>
                        {new Date(data.date).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Td>
                      <Td>
                        <Badge
                          variant="solid"
                          p="4px 8px"
                          borderRadius="9999px"
                          colorScheme={
                            data.account == "Cash"
                              ? "green"
                              : data.account == "Pix"
                              ? "blue"
                              : "purple"
                          }
                        >
                          {data.account}
                        </Badge>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Lancamentos;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "caixa-simples-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
