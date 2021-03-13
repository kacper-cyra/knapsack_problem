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
  calledFrom: number;
  level: number;
};

export type Options = {
  returnAllSets: boolean;
  visualize: boolean;
  performance: boolean;
};

export type GatheredData = { set: Set; value: number; weight: number; calledFrom: number; level: number };

export interface GeneratorOptions {
  weight: { average: number; standardDeviation: number };
  value: { average: number; standardDeviation: number };
  roundDigits?: number;
}

export interface VisualRepresentationOptions {
  valueSeparator?: string;
  setSeparator?: string;
}
