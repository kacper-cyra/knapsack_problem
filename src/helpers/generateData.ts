import { Item, GeneratorOptions } from '../types/types';

export function generateData(numberOfItems: number, options: GeneratorOptions): Array<Item> {
  const { weight, value, roundDigits } = options;
  const roundValue = roundDigits ? Math.pow(10, roundDigits) : 1;
  const result = [];
  let index = 0;

  while (index < numberOfItems) {
    const generatedWeight = Math.round((weight.average + (Math.random() * 2 - 1) * weight.standardDeviation) * roundValue) / roundValue;
    const generatedValue = Math.round((value.average + (Math.random() * 2 - 1) * value.standardDeviation) * roundValue) / roundValue;

    result.push({ id: index, weight: generatedWeight, value: generatedValue, valuePerWeightRatio: generatedValue / generatedWeight });
    index++;
  }

  return result;
}
