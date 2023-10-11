import {
  Box,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/sidebar";

const Stock = () => {
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
          <Container maxW="container.xl" py={5}>
            <Text fontSize="2xl" alignSelf='start' mb={6}>
              Estoque
            </Text>
            <Flex columnGap={4}>
            <Box >
              <Input
                type="text"
                id="searchbar"
                placeholder="Buscar"
                focusBorderColor="blue.500"
              />
            </Box>

            <Select placeholder="Selecionar categoria" maxW='200px'>
              <option value="comida">Comida</option>
              <option value="bebida">Bebida</option>
              <option value="doce">Doce</option>
            </Select>
            </Flex>

            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>#ID</Th>
                  <Th>Categoria</Th>
                  <Th>Nome</Th>
                  <Th>Valor</Th>
                  <Th>Descrição</Th>
                  <Th>Quantidade</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Bebida</Td>
                  <Td>Cafe</Td>
                  <Td>R$ 3,90</Td>
                  <Td>essa é uma descrição</Td>
                  <Td>8</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Doce</Td>
                  <Td>Torta</Td>
                  <Td>R$ 7,90</Td>
                  <Td>essa é uma descrição</Td>
                  <Td>4</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Comida</Td>
                  <Td>arroz</Td>
                  <Td>R$ 17,90</Td>
                  <Td>essa é uma descrição</Td>
                  <Td>5</Td>
                </Tr>
              </Tbody>
            </Table>
          </Container>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Stock;
