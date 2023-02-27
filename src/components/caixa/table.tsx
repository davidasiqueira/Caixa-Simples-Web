import {
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
                <Td>{lancamento.movimento}</Td>
                <Td>R${lancamento.value}</Td>
                <Td>{lancamento.account}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CaixaTable;
