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
  const [account, setAccount] = useState<string>("Cash");
  const [description, setDescription] = useState<string>();

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
              onChange={(event) => setAccount(event.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Pix">Pix</option>
              <option value="Cartao">Cartão</option>
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
