import { Item, Set } from "./types/types";

export class Backpack {
  public set: Set;
  public maxWeight: number;
  public readonly items: Array<Item>;
  public readonly numberOfItems: number;
  static maxTotalValue = 0;
  static bestSet: Array<Set>;

  constructor(items: Array<Item>, maxWeight: number, set: Set = []) {
    this.set = set.length ? set : new Array(items.length).fill(0);
    this.items = items;
    this.maxWeight = maxWeight;
    this.numberOfItems = items.length;
  }

  get totalValue(): number {
    return this.items.map(item => item.value).reduce((sum, value, index) => (sum += value * this.set[index]));
  }

  get totalWeight(): number {
    return this.items.map(item => item.weight).reduce((sum, value, index) => (sum += value * this.set[index]));
  }

  get notFullItemIndex(): number {
    return this.set.findIndex(val => val > 0 && val < 1);
  }

  bestImpossibleOutcome(maxWeight: number): Set {
    const ROUND_ACCURACY = 1000;
    const set = this.set;
    let leftWeight = maxWeight;
    let index = 0;

    while (leftWeight) {
      const weight = this.items[index].weight;

      if (weight < maxWeight) {
        if (weight <= leftWeight) {
          set[index] = 1;
          leftWeight -= weight;
        } else {
          set[index] = Math.round((leftWeight / weight) * ROUND_ACCURACY) / ROUND_ACCURACY;
          leftWeight = 0;
        }
      }

      index++;
    }

    return set;
  }

  removeOverWeight(index: number, direction: number) {
    let i = 0;
    while (this.totalWeight > this.maxWeight) {
      this.set[index + i * direction] = 0;
      i++;
    }
  }

  tryToFitItems(index: number, direction: number) {
    let leftWeight = this.maxWeight - this.totalWeight;

    while (leftWeight > 0 && index >= 0 && index < this.numberOfItems) {
      const howMuchFitInside = leftWeight / this.items[index].weight;
      leftWeight -= this.items[index].weight * howMuchFitInside;
      this.set[index] = howMuchFitInside > 1 ? 1 : howMuchFitInside;
      index += direction;
    }
  }
}
