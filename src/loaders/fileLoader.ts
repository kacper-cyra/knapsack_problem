import Decimal from 'decimal.js';
import { readFileSync } from 'fs';
import { Item } from '../types/types';

// Each line in the file needs to be made of two numbers separated with a comma
// First number is value second one is weight

export function loadData(fileName: string): Array<Item> {
  return mapData(readFile(fileName)).sort((a, b) => {
    return b.valuePerWeightRatio.minus(a.valuePerWeightRatio).toNumber();
  });
}

function mapData(fileLine: Array<string>): Item[] {
  return fileLine.map((item, index) => {
    const weightValuePair = item.replace('\r', '').split(',');
    return {
      id: index,
      value: new Decimal(weightValuePair[0]),
      weight: new Decimal(weightValuePair[1]),
      valuePerWeightRatio: new Decimal(weightValuePair[0]).dividedBy(weightValuePair[1]),
    };
  });
}

function readFile(fileName: string): Array<string> {
  return readFileSync(fileName).toString().split('\n');
}
