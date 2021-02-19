import { Item, change } from "./types/types";
import { loadData } from "./loaders/fileLoader";
import { Backpack } from "./backpack";
import { findBestSet } from "./bestSet/bestSet";

const data = loadData("./data/zad1.txt");

export function solver(items: Array<Item>, maxWeight: number) {
  const backpack = new Backpack(items, maxWeight);
  backpack.set = backpack.bestImpossibleOutcome(maxWeight);

  Backpack.bestSet = [];
  findBestSet(backpack, { value: 0, index: backpack.notFullItemIndex });
  findBestSet(backpack, { value: 1, index: backpack.notFullItemIndex });
  return [Backpack.bestSet, Backpack.maxTotalValue];
}

//console.log(data);
//change name
const bestResult = solver(data, 12);
console.log(bestResult);
