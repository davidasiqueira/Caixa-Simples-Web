import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import {
  Box,
  Flex,
  useColorModeValue,
  Grid,
  Input,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

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
          alignItems="center"
        >
          <Text fontSize="2xl" alignSelf="start" mb={16}>
            Produtos
          </Text>

          <VStack align="start" spacing={4}>
            <Box>
              <Text>Busca</Text>
              <Input type="text" placeholder="Busca" />
            </Box>

            <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              <Box>
                <Text>Nome</Text>
                <Input type="text" placeholder="Nome" />
              </Box>
              <Box>
                <Text>Descrição do Produto</Text>
                <Input type="text" placeholder="Descrição do Produto" />
              </Box>
              <Box>
                <Text>Quantidade</Text>
                <Input type="text" placeholder="Quantidade" />
              </Box>
              <Box>
                <Text>Preço Unitário</Text>
                <Input type="text" placeholder="Preço Unitário" />
              </Box>
              <Box>
                <Text>Código</Text>
                <Input type="text" placeholder="Código" />
              </Box>
            </Grid>
          </VStack>

          <HStack spacing={4} mt={8}>
            <Button colorScheme="red" px={8} fontSize="lg">
              Deletar
            </Button>
            <Button colorScheme="orange" px={8} fontSize="lg">
              Salvar
            </Button>
          </HStack>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Dashboard;

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
