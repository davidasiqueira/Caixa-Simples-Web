export type LancamentoType = {
  movimento: string;
  valor: number;
  conta: string;
  descricao: string;
  hora: number;
};
export interface ChartConfig {
  series: [{
    name: string
    data: number[]
  }]
  options?: {}
}