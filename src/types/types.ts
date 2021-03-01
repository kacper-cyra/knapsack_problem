export type Item = {
  id: number;
  weight: number;
  value: number;
  valuePerWeightRatio: number;
};

export type Set = Array<number>;

export type Change = {
  index: number;
  isTaken: 1 | 0;
};

export type Options = {
  returnAllSets: boolean;
  visualize: boolean;
  performance: boolean;
};

export type GatheredData = { set: Set; value: number; weight: number };
