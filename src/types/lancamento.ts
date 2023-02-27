export type LancamentoType = {
  movimento: string;
  value: number;
  account: string;
  description: string;
  date: number;
  _id?: string;
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
  avatar: string;
};
