import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CaixaTable = () => {

  

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
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>{" "}
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Pix</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cartão</Td>
          </Tr>
          <Tr>
            <Td>Entrada</Td>
            <Td>R$ 25,90</Td>
            <Td>Cash</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CaixaTable;
