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
} from "@chakra-ui/react";
import { useState } from "react";
import { RadioCard } from "./radioButton";

interface Props {
  setLancamento: any;
}

const CaixaForm = ({ setLancamento }: Props) => {
  const [valor, setValor] = useState<string>("");
  const [conta, setConta] = useState<string>("cash");
  const [descricao, setDescricao] = useState<string>();

  const options = ["Entrada", "Saida"];
  const [movimento, setMovimento] = useState<string>("Entrada");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "operacao",
    defaultValue: "Entrada",
    onChange: setMovimento,
  });
  const group = getRootProps();

  const updateLancamento = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLancamento({
      movimento,
      valor: Number(valor),
      conta,
      descricao,
      hora: Date.now(),
    });
  };

  return (
    <Box margin="auto">
      <form onSubmit={updateLancamento}>
        <Flex width="400px" height="300px" margin="auto">
          <Flex flexDir="column" mt="auto" mb="auto" p="10px" rowGap="20px">
            <HStack {...group} display="flex" flexDir="column" rowGap="20px">
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
              onChange={(event) => setConta(event.target.value)}
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
              <Input
                required
                size="lg"
                placeholder="Enter amount"
                type="number"
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
                onChange={(event) => setDescricao(event.target.value)}
              />
            </InputGroup>

            <Button type="submit" bg="#4EAB02">
              lançar
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default CaixaForm;
