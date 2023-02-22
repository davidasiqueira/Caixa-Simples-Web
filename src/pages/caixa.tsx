import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import CaixaTable from "../components/caixa/table";
import CaixaForm from "../components/caixa/form";
import { LancamentoType } from "../types/lancamento";



const Caixa = () => {
  const { user } = useContext(AuthContext);
  const [ lancamentos, setLancamento ] = useState<LancamentoType[]>([]);

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
          <CaixaForm setLancamento={setLancamento} />
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
          <CaixaTable lancamentos={lancamentos} />
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Caixa;

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
