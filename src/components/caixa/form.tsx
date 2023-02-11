import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "./radioButton";

const CaixaForm = () => {
  const options = ["Entrada", "Saida"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "operacao",
    defaultValue: "Entrada",
    onChange: console.log,
  });
  const group = getRootProps();

  return (
    <Flex width="400px" height="300px" margin="auto">
      <Flex flexDir="column" mt="auto" mb="auto" p="10px" rowGap="20px">
        <HStack {...group} display="flex" flexDir="column" rowGap="20px">
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
        <Select
          cursor="pointer"
          ml="8px"
          variant="filled"
          placeholder="Conta"
          width="120px"
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
          <Input size="lg" placeholder="Enter amount" />
        </InputGroup>
        <InputGroup mt="">
          <InputLeftElement
            pointerEvents="none"
            children={<EditIcon color="gray.300" />}
          />
          <Input size="lg" type="text" placeholder="Descrição" />
        </InputGroup>

        <Button bg="#4EAB02">lançar</Button>
      </Flex>
    </Flex>
  );
};

export default CaixaForm;
