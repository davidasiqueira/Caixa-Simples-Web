import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
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
import { LancamentosContext } from "../context/lancamentosContext";

type FilterType = {
  initialDate: number;
  finalDate: number;
};

const Lancamentos = () => {
  const { user } = useContext(AuthContext);
  const { getLancamentos } = useContext(LancamentosContext);
  const [lancamentos, setLancamentos] = useState<LancamentoType[]>([]);
  const [initialDate, setInitialDate] = useState<string>();
  const [finalDate, setFinalDate] = useState<string>();
  const [filter, setFilter] = useState<FilterType>({finalDate: 0 , initialDate: 0});

  useEffect(() => {
    async function load() {
      if (!(lancamentos.length >= 1)) {
        const lancamentos = await getLancamentos(
          new Date().setHours(0, 0, 1, 0),
          99999999999999
        );
        if (!lancamentos) {
        } else if (!Array.isArray(lancamentos)) {
        } else {
          setLancamentos(lancamentos);
        }
      }
    }
    load();
  }, []);

  async function updateFilter() {
    const initialDateArr = initialDate.split('-').map(date => Number(date))
    const finalDateArr = finalDate.split('-').map(date => Number(date))
    setFilter({
      finalDate:  new Date(finalDateArr[0],finalDateArr[1]-1,finalDateArr[2]).getTime() ,
      initialDate: new Date(initialDateArr[0],initialDateArr[1]-1,initialDateArr[2]).getTime() ,
    });
  }

  useEffect(() => {
    console.log(filter)
    async function load() {
      const lancamentos = await getLancamentos(
        filter.initialDate,
        filter.finalDate
      );
      if (!lancamentos) {
      } else if (!Array.isArray(lancamentos)) {
      } else {
        setLancamentos(lancamentos);
      }
    }
    load();
  }, [filter]);

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
              onChange={(event) => setInitialDate(event.target.value)}
            />
            <Text>Até</Text>
            <Input
              width="20%"
              variant="filled"
              placeholder="Select Date and Time"
              size="md"
              type="date"
              borderRadius="18px"
              onChange={(event) => setFinalDate(event.target.value)}
            />
            <IconButton
              alignSelf="center"
              borderRadius="18px"
              height="40px"
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
              onClick={updateFilter}
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
