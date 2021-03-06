import { Item } from './types/types';
import { loadData } from './loaders/fileLoader';
import { Backpack } from './backpack';
import { solver } from './solver';
import { sortById } from './helpers/sortGatheredDataById';
import { generateData } from './helpers/generateData';
import { drawTree } from './helpers/drawTree';
import fs from 'fs';

const data = loadData('./data/zad2.txt');

export function solve(items: Array<Item>, maxWeight: number) {
  const backpack = new Backpack(items, maxWeight);
  backpack.set = backpack.bestImpossibleOutcome(0);
  Backpack.allSets.push({
    set: backpack.set,
    value: backpack.totalValue,
    weight: backpack.totalWeight,
    calledFrom: -1,
    level: 0,
  });

  if (backpack.notFullItemIndex === -1) {
    Backpack.bestSet = [backpack.set];
    return [Backpack.bestSet, backpack.totalValue];
  } else if (backpack.notFullItemIndex === backpack.numberOfItems - 1) {
    backpack.set[backpack.numberOfItems - 1] = 0;
    Backpack.bestSet = [backpack.set];
    return [Backpack.bestSet, backpack.totalValue];
  }

  solver(new Backpack(items, maxWeight, [...backpack.set]), {
    isTaken: 0,
    index: backpack.notFullItemIndex,
    calledFrom: 0,
    level: 1,
  });
  solver(new Backpack(items, maxWeight, [...backpack.set]), {
    isTaken: 1,
    index: backpack.notFullItemIndex,
    calledFrom: 0,
    level: 1,
  });
  fs.writeFileSync(`${__dirname}\\..\\temp\\drawnTree.txt`, drawTree(sortById(items, Backpack.allSets)));
  return [Backpack.bestSet, Backpack.maxTotalValue];
}

const generatedData = generateData(6, {
  weight: { average: 20, standardDeviation: 15 },
  value: { average: 20, standardDeviation: 12.5 },
});
const bestResult = solve(generatedData, 35);
console.log(bestResult);
