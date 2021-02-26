import { Item } from "./types/types";
import { loadData } from "./loaders/fileLoader";
import { Backpack } from "./backpack";
import { findBestSet } from "./bestSet/bestSet";
import { sortById } from "./helpers/sortGatheredDatasById";

const data = loadData("./data/zad2.txt");

export function solver(items: Array<Item>, maxWeight: number) {
  const backpack = new Backpack(items, maxWeight);
  backpack.set = backpack.bestImpossibleOutcome(0);
  Backpack.allSets.push({ set: backpack.set, value: backpack.totalValue, weight: backpack.totalWeight });

  findBestSet(new Backpack(items, maxWeight, [...backpack.set]), { isTaken: 0, index: backpack.notFullItemIndex });
  findBestSet(new Backpack(items, maxWeight, [...backpack.set]), { isTaken: 1, index: backpack.notFullItemIndex });
  console.log(sortById(items, Backpack.allSets));
  return [Backpack.bestSet, Backpack.maxTotalValue];
}

const bestResult = solver(data, 10);
console.log(bestResult);
