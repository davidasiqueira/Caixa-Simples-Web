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
  lancamentosSync: () => Promise<void>;
  addLancamento: (lancamento: LancamentoType) => Promise<void>;
};

export const LancamentosContext = createContext({} as LancamentosContextType);

export function LancamentosProvider({ children }) {
  const [lancamentos, setLancamento] = useState<LancamentoType[]>([]);

  async function addLancamento(lancamento: LancamentoType) {
    setLancamento((prevState) => [...prevState, lancamento]);
  }

  async function lancamentosSync() {}

  async function getLancamentos(initialDate: number, finalDate: number): Promise<
    LancamentoType[] | LancamentoType | null
  > {
    const { "caixa-simples-token": token, "caixa-simples-userId": id } =
      parseCookies();
    const authStr = "Bearer ".concat(token);
    let response = null;
    await axios
      .get(process.env.NEXT_PUBLIC_GET_ALL + id, {
        params: {
          initialDate: initialDate,
          finalDate:finalDate
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
  //preciso que os ultimos lançamentos do dia sejam puxados do backend assim que a tela
  //de caixa abrir e todas as vezes que a tela for atualizada

  //preciso que toda vez que um lançamento for executado ele seja salvo no backend

  //preciso que as médias de todas as contas
  //e as médias gerais sejam obtidas do backend todas as vezes que o dashboard for carregado

  //preciso poder consultar os lançamentos por periodo do backend

  return (
    <LancamentosContext.Provider
      value={{ addLancamento, lancamentosSync, lancamentos }}
    >
      {children}
    </LancamentosContext.Provider>
  );
}
