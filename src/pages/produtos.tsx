import { useState, useEffect } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import {
  Flex,
  useColorModeValue,
  VStack,
  Input,
  Button,
  Text,
  Box,
  Select,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/sidebar";
import { Product } from "../types/product";

const INITIAL_PRODUCT_STATE: Product = {
  name: "",
  description: "",
  quantity: 0,
  productCode: undefined,
  category: "bebida",
  price: 0,
  userId: "",
};

const Products = () => {
  const toast = useToast();
  const { "caixa-simples-token": token, "caixa-simples-userId": id } =
    parseCookies();
  const [product, setProduct] = useState<Product>(INITIAL_PRODUCT_STATE);
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);
  const authStr = "Bearer ".concat(token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://caixa-simples-backend-de26a6191b1d.herokuapp.com/product/one/${product.productCode}/${id}`,
          {
            headers: {
              Authorization: authStr,
            },
          }
        );
        setSearchedProduct(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast({
          duration: 1000,
          title: `Produto ${product.productCode} não encontrado `,
          isClosable: true,
          status: "error",
        });
        setSearchedProduct(null);
        setProduct({
          ...INITIAL_PRODUCT_STATE,
          productCode: product.productCode,
        });
      }
    };

    if (product.productCode) fetchProduct();
    else setProduct(INITIAL_PRODUCT_STATE);
  }, [product.productCode]);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (searchedProduct) {
        const response = await axios.patch(
          `https://caixa-simples-backend-de26a6191b1d.herokuapp.com/product/${searchedProduct.productCode}/${id}`,
          product,
          {
            headers: {
              Authorization: authStr,
            },
          }
        );
      } else {
        const response = await axios.post(
          `https://caixa-simples-backend-de26a6191b1d.herokuapp.com/product/${id}`,
          { ...product, productCode: undefined, userId: id },
          {
            headers: {
              Authorization: authStr,
            },
          }
        );
      }
      setProduct(INITIAL_PRODUCT_STATE);
      setSearchedProduct(null);
    } catch (error) {
      console.error(error);
    }
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
          alignItems="center"
        >
          <Text fontSize="2xl" alignSelf="start" mb={16}>
            Produtos
          </Text>

          <form onSubmit={handleSubmit}>
            <Flex gap={4}>
              <VStack align="start" spacing={4}>
                <FormControl>
                  <Text>Código</Text>
                  <Input
                    type="text"
                    placeholder="Código"
                    name="productCode"
                    value={product.productCode}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Text>Nome</Text>
                  <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Text>Descrição do Produto</Text>
                  <Input
                    type="text"
                    placeholder="Descrição do Produto"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </VStack>
              <VStack align="start" spacing={4}>
                <FormControl isRequired>
                  <Text>Quantidade</Text>
                  <Input
                    type="number"
                    placeholder="Quantidade"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Text>Preço Unitário</Text>
                  <Input
                    type="number"
                    placeholder="Preço Unitário"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Text>Categoria</Text>
                  <Select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                  >
                    <option value="bebida">Bebida</option>
                    <option value="comida">Comida</option>
                    <option value="doce">Doce</option>
                    <option value="outros">Outros</option>
                  </Select>
                </FormControl>
                <Button
                  alignSelf="center"
                  type="submit"
                  colorScheme="orange"
                  px={8}
                  fontSize="lg"
                >
                  Salvar
                </Button>
              </VStack>
            </Flex>
          </form>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Products;

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
