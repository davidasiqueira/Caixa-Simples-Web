import { createContext, useState } from "react";

type LancamentoType = {
  movimento: string;
  valor: number;
  conta: string;
  descricao: string;
  hora: number;
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
  return (
    <LancamentosContext.Provider
      value={{ addLancamento, lancamentosSync, lancamentos }}
    >
      {children}
    </LancamentosContext.Provider>
  );
}
