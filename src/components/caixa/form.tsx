import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { RadioCard } from "./radioButton";

interface Props {
  setLancamento: any;
}

const CaixaForm = ({ setLancamento }: Props) => {
  const [valor, setValor] = useState<string>("");
  const [account, setAccount] = useState<string>("Cash");
  const [description, setDescription] = useState<string>();
  const [productCode, setProductCode] = useState<string>("");
  const [movimento, setMovimento] = useState<string>("Entrada");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "operacao",
    defaultValue: "Entrada",
    onChange: setMovimento,
  });
  const toast = useToast();

  const { "caixa-simples-token": token, "caixa-simples-userId": id } =
    parseCookies();
  const authStr = "Bearer ".concat(token);
  const options = ["Entrada", "Saida"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/one/${productCode}/${id}`,
          {
            headers: {
              Authorization: authStr,
            },
          }
        );
        setValor(response.data.price.toFixed(2));
        setDescription(response.data.description);
        setMovimento("Entrada");
      } catch (error) {
        console.error(error);
        toast({
          duration: 1000,
          title: `Produto ${productCode} não encontrado `,
          isClosable: true,
          status: "error",
        });
      }
    };

    if (productCode) fetchProduct();
  }, [productCode]);

  const group = getRootProps();

  const updateLancamento = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLancamento({
      movimento,
      value: Number(valor),
      account,
      description,
      date: Date.now(),
    });
  };

  return (
    <Box margin="auto">
      <form onSubmit={updateLancamento}>
        <Flex width="400px" height="300px" margin="auto">
          <Flex flexDir="column" p="10px" rowGap="20px">
            <HStack {...group} display="flex" flexDir="column" rowGap="20px">
              <Input
                type="text"
                ml="8px"
                placeholder="Código"
                width="120px"
                name="productCode"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio} required>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            <Select
              required
              cursor="pointer"
              ml="8px"
              variant="filled"
              width="120px"
              defaultValue="Cash"
              onChange={(event) => setAccount(event.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Pix">Pix</option>
              <option value="Cartao">Cartão</option>
            </Select>
          </Flex>
          <Flex flexDir="column" ml="10px" mt="70px" mb="auto" rowGap="20px">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input
                required
                size="lg"
                placeholder="Digite o valor"
                value={valor}
                onChange={(event) => setValor(event.target.value)}
              />
            </InputGroup>
            <InputGroup mt="">
              <InputLeftElement
                pointerEvents="none"
                children={<EditIcon color="gray.300" />}
              />
              <Input
                required
                size="lg"
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </InputGroup>

            <Button textColor="white" type="submit" bg="#E65013">
              lançar
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default CaixaForm;
