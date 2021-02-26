import { Item, Set, GatheredData } from "./types/types";

export class Backpack {
  public set: Set;
  public maxWeight: number;
  public readonly items: Array<Item>;
  public readonly numberOfItems: number;
  static maxTotalValue = 0;
  static bestSet: Array<Set> = [];
  static allSets: Array<GatheredData> = [];

  constructor(items: Array<Item>, maxWeight: number, set: Set = []) {
    this.set = set.length ? set : new Array(items.length).fill(0);
    this.items = items;
    this.maxWeight = maxWeight;
    this.numberOfItems = items.length;
  }

  get totalValue(): number {
    return Math.round(this.items.map(item => item.value).reduce((sum, value, index) => (sum += value * this.set[index]), 0) * 100) / 100;
  }

  get totalWeight(): number {
    return Math.round(this.items.map(item => item.weight).reduce((sum, value, index) => (sum += value * this.set[index]), 0) * 100) / 100;
  }

  get notFullItemIndex(): number {
    return this.set.findIndex(val => val > 0 && val < 1);
  }

  bestImpossibleOutcome(index: number): Set {
    const { set, maxWeight } = this;
    const ROUND_ACCURACY = 1000;
    let leftWeight = maxWeight - this.totalWeight;

    if (index >= this.numberOfItems) return set;

    while (leftWeight > 0 && index < this.numberOfItems) {
      const weight = this.items[index].weight;

      if (weight <= leftWeight) {
        set[index] = 1;
        leftWeight -= weight;
      } else {
        set[index] = Math.round((leftWeight / weight) * ROUND_ACCURACY) / ROUND_ACCURACY;
        leftWeight = 0;
      }

      index++;
    }
    return set;
  }

  static insertBestSet(set: Set, totalValue: number) {
    Backpack.maxTotalValue = totalValue;
    Backpack.bestSet = Backpack.maxTotalValue === totalValue ? [set, ...Backpack.bestSet] : [set];
  }
}
