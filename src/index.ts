import { Item } from './types/types';
import { loadData } from './loaders/fileLoader';
import { Backpack } from './backpack';
import { findBestSet } from './bestSet/bestSet';
import { sortById } from './helpers/sortGatheredDatasById';
import { generateData } from './helpers/generateData';

const data = loadData('./data/zad3.txt');

export function solver(items: Array<Item>, maxWeight: number) {
  const backpack = new Backpack(items, maxWeight);
  backpack.set = backpack.bestImpossibleOutcome(0);
  Backpack.allSets.push({
    set: backpack.set,
    value: backpack.totalValue,
    weight: backpack.totalWeight,
  });

  if (backpack.notFullItemIndex === -1) {
    Backpack.bestSet = [backpack.set];
    return [Backpack.bestSet, backpack.totalValue];
  } else if (backpack.notFullItemIndex === backpack.numberOfItems - 1) {
    backpack.set[backpack.numberOfItems - 1] = 0;
    Backpack.bestSet = [backpack.set];
    return [Backpack.bestSet, backpack.totalValue];
  }

  findBestSet(new Backpack(items, maxWeight, [...backpack.set]), {
    isTaken: 0,
    index: backpack.notFullItemIndex,
  });
  findBestSet(new Backpack(items, maxWeight, [...backpack.set]), {
    isTaken: 1,
    index: backpack.notFullItemIndex,
  });
  console.log(sortById(items, Backpack.allSets));
  return [Backpack.bestSet, Backpack.maxTotalValue];
}

const generatedData = generateData(5, {
  wageOptions: { average: 5, standardDeviation: 5 },
  valueOptions: { average: 10, standardDeviation: 5 },
});
const bestResult = solver(generatedData, 15);
console.log(bestResult);
