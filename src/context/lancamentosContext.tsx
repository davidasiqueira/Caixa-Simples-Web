import axios from "axios";
import { parseCookies } from "nookies";
import { createContext, SetStateAction, useState } from "react";
import { LancamentoType } from "../types/lancamento";

type LancamentosContextType = {
  lancamentos: LancamentoType[];
  setLancamento: (value: SetStateAction<LancamentoType[]>) => void;
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
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/lancamentos/all/` + id, {
      params: {
        initialDate: initialDate,
        finalDate: finalDate,
      },
      headers: {
        Authorization: authStr,
      },
    });

    return response.data;
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/lancamentos/create`,
        {
          userId: id,
          value: lancamento.value,
          account: lancamento.account,
          description: lancamento.description,
          movimento: lancamento.movimento,
          date: lancamento.date,
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
      value={{ addLancamento, setLancamento, getLancamentos, lancamentos }}
    >
      {children}
    </LancamentosContext.Provider>
  );
}
