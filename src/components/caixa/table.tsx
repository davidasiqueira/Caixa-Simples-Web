import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LancamentoType } from "../../types/lancamento";

interface Props {
  lancamentos: LancamentoType[];
}

const CaixaTable = ({ lancamentos }: Props) => {
  return (
    <TableContainer mt="20px" height="calc(100vh - 170px)" overflowY="auto">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Tipo</Th>
            <Th>Valor</Th>
            <Th isNumeric>conta</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lancamentos.map((lancamento) => {
            return (
              <Tr>
                <Td>
                  <Badge
                    variant="solid"
                    p="3px 7px"
                    borderRadius="9999px"
                    colorScheme={
                      lancamento.movimento == "Entrada" ? "green" : "red"
                    }
                  >
                    {lancamento.movimento}
                  </Badge>
                </Td>
                <Td>R${lancamento.value}</Td>
                <Td>
                  <Badge
                    variant="solid"
                    p="3px 7px"
                    borderRadius="9999px"
                    colorScheme={
                      lancamento.account == "Cash"
                        ? "green"
                        : lancamento.account == "Pix"
                        ? "blue"
                        : "purple"
                    }
                  >
                    {lancamento.account}
                  </Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CaixaTable;
