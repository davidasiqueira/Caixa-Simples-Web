import axios from "axios";
import { parseCookies } from "nookies";
import { createContext, useState } from "react";

type LancamentoType = {
  movimento: string;
  valor: number;
  conta: string;
  descricao: string;
  hora: number;
  _id?: string;
};

type LancamentosContextType = {
  lancamentos: LancamentoType[];
  getLancamentos: (
    initialDate: number,
    finalDate: number
  ) => Promise<LancamentoType[] | LancamentoType>;
  addLancamento: (lancamento: LancamentoType) => Promise<void>;
};

export const LancamentosContext = createContext({} as LancamentosContextType);

export function LancamentosProvider({ children }) {
  const [lancamentos, setLancamento] = useState<LancamentoType[]>([]);

  async function getLancamentos(
    initialDate: number,
    finalDate: number
  ): Promise<LancamentoType[] | LancamentoType> {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } =
      parseCookies();
    const authStr = "Bearer ".concat(token);
    let response = null;
    await axios
      .get(process.env.NEXT_PUBLIC_GET_ALL + id, {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
        headers: {
          Authorization: authStr,
        },
      })
      .then((response) => {
        if (!response.data) {
          return;
        }
        response = response.data;
      });
    let newResponse: LancamentoType[];
    Promise.all(
      (newResponse = response.map(
        async (lancamento): Promise<LancamentoType> => {
          return {
            conta: lancamento.account,
            descricao: lancamento.description,
            movimento: lancamento.movimento,
            hora: lancamento.date,
            valor: lancamento.value,
            _id: lancamento._id,
          };
        }
      ))
    );
    return newResponse;
  }

  async function aoLancar(
    lancamento: LancamentoType,
    index: number
  ): Promise<void> {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } =
      parseCookies();
    const authStr = "Bearer ".concat(token);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_NEW_LANCAMENTO_URL,
        {
          userId: id,
          value: lancamento.valor,
          account: lancamento.conta,
          description: lancamento.descricao,
          movimento: lancamento.movimento,
          date: lancamento.hora,
        },
        {
          headers: {
            Authorization: authStr,
          },
        }
      );
      lancamentos[index]._id = response.data._id;
    } catch (error) {
      console.log(error);
      return error;
    }
    return;
  }

  async function addLancamento(lancamento: LancamentoType): Promise<void> {
    setLancamento((prevState) => [...prevState, lancamento]);
    aoLancar(lancamento, lancamentos.length - 1);
    return;
  }

  return (
    <LancamentosContext.Provider
      value={{ addLancamento, getLancamentos, lancamentos }}
    >
      {children}
    </LancamentosContext.Provider>
  );
}
