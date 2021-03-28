import Decimal from 'decimal.js';

export type Item = {
  id: number;
  weight: Decimal;
  value: Decimal;
  valuePerWeightRatio: Decimal;
};

export type Set = Array<number>;

export type Change = {
  index: number;
  isTaken: 1 | 0;
  calledFrom: number;
  level: number;
  setIndex: Array<number>;
};

export type Options = {
  returnAllSets: boolean;
  visualize: boolean;
  performance: boolean;
};

export type GatheredData = {
  set: Set;
  value: number;
  weight: number;
  calledFrom: number;
  level: number;
  hasOnlyCompleteItems: boolean;
  sequenceValue: number;
};

export interface GeneratorOptions {
  weight: { average: number; standardDeviation: number };
  value: { average: number; standardDeviation: number };
  roundDigits?: number;
}

export interface VisualRepresentationOptions {
  valueSeparator?: string;
  setSeparator?: string;
}

export interface testMetaData {
  numberOfTests: number;
  numberOfItems: number;
  maxWeight: number;
  fileLength: number;
}

export interface resultObject {
  set: Set;
  items: Array<Item>;
  value: number;
  weight?: number;
  numberOfExecutions: number;
}
