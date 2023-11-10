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
  TableContainer,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
  Heading,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import axios from "axios";
import { Product } from "../types/product";
import { useEffect, useState } from "react";

interface Props {
  products: Product[];
}

const Stock = ({ products }: Props) => {
  const categories = ["creme", "perfume", "body splash", "outros"];
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [textfilter, setTextFilter] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => filterTags.includes(product.category))
    );
    if (filterTags.length === 0) setFilteredProducts(products);
  }, [filterTags]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(textfilter.toLowerCase())
      )
    );
  }, [textfilter]);

  const removeTag = (tag: string) => {
    setFilterTags(filterTags.filter((t) => t !== tag));
  };

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
          <Heading size="md">Estoque</Heading>
          <Flex align="baseline" columnGap="10px" mb="5px" mt="5px">
            <Input
              borderRadius="full"
              maxWidth="20%"
              type="text"
              placeholder="Filtrar"
              value={textfilter}
              onChange={(e) => setTextFilter(e.target.value)}
            />
            <Select
              textColor="gray.500"
              borderRadius="full"
              maxWidth="20%"
              name="category"
              placeholder="Filtre por categoria"
              value="0"
              onChange={(e) => setFilterTags([...filterTags, e.target.value])}
            >
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </Select>
            {filterTags.map((tag, idx) => (
              <Tag
                size="lg"
                key={idx}
                borderRadius="full"
                variant="solid"
                colorScheme={
                  tag === "perfume"
                    ? "yellow"
                    : tag === "creme"
                    ? "blue"
                    : "pink"
                }
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </Tag>
            ))}
          </Flex>

          <TableContainer overflowY="auto">
            <Table variant="simple" size={["sm", "sm", "sm", "md", "lg"]}>
              <Thead>
                <Tr>
                  <Th>Código</Th>
                  <Th>Categoria</Th>
                  <Th>Nome</Th>
                  <Th>Valor</Th>
                  <Th>Descrição</Th>
                  <Th>Quantidade</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProducts &&
                  filteredProducts.map((product) => (
                    <Tr>
                      <Td>{product.productCode}</Td>
                      <Td>
                        <Badge
                          variant="solid"
                          p="4px 8px"
                          borderRadius="9999px"
                          colorScheme={
                            product.category === "perfume"
                              ? "yellow"
                              : product.category === "creme"
                              ? "blue"
                              : "pink"
                          }
                        >
                          {product.category}
                        </Badge>
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>R${product.price.toFixed(2)}</Td>
                      <Td>{product.description}</Td>
                      <Td>
                        <Badge
                          variant="solid"
                          p="4px 8px"
                          borderRadius="9999px"
                          colorScheme={product.quantity > 10 ? "green" : "red"}
                        >
                          {product.quantity}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Stock;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "caixa-simples-token": token, "caixa-simples-userId": id } =
    parseCookies(ctx);

  if (!token || !id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const authStr = "Bearer ".concat(token);
    const res = await axios.get(
      `https://caixa-simples-backend-de26a6191b1d.herokuapp.com/product/all/${id}`,
      {
        headers: {
          Authorization: authStr,
        },
      }
    );
    return {
      props: {
        products: res.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
