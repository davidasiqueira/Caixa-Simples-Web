export type LancamentoType = {
  movimento: string;
  valor: number;
  conta: string;
  descricao: string;
  hora: number;
};
export interface ChartConfig {
  series: [
    {
      name: string;
      data: number[];
    }
  ];
  options?: {};
}

export type CardData = {
  accountName: string;
  registro30Dias: ChartConfig;
  cardColor: string;
};

export type SaveUserType = {
  name: string;
  email: string;
  password: string;
  avatar: string
}