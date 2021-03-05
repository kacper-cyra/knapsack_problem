import { Item } from '../types/types';

interface generatorOptions {
  wageOptions: { average: number; standardDeviation: number };
  valueOptions: { average: number; standardDeviation: number };
  roundDigits?: number;
}

export function generateData(numberOfItems: number, options: generatorOptions): Array<Item> {
  const { wageOptions, valueOptions, roundDigits } = options;
  const roundValue = roundDigits ? Math.pow(10, roundDigits) : 1;
  const result = [];
  let index = 0;

  while (index < numberOfItems) {
    const weight = Math.round((wageOptions.average + (Math.random() * 2 - 1) * wageOptions.standardDeviation) * roundValue) / roundValue;
    const value = Math.round((valueOptions.average + (Math.random() * 2 - 1) * valueOptions.standardDeviation) * roundValue) / roundValue;

    result.push({ id: index, weight, value, valuePerWeightRatio: value / weight });
    index++;
  }

  return result;
}
