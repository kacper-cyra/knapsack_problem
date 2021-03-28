import Decimal from 'decimal.js';
import { TOLERANCE } from './globals';
import { Item, Set, GatheredData } from './types/types';

export class Backpack {
  public set: Set;
  public maxWeight: number;
  public readonly items: Array<Item>;
  public readonly numberOfItems: number;
  static maxTotalValue = 0;
  static maxTotalWeight = 0;
  static bestSet: Array<Set> = [];
  static allSets: Array<GatheredData> = [];

  constructor(items: Array<Item>, maxWeight: number, set: Set = []) {
    this.set = set.length ? set : new Array(items.length).fill(0);
    this.items = items;
    this.maxWeight = maxWeight;
    this.numberOfItems = items.length;
  }

  static weightFromSet(items: Array<Item>, set: Set): Decimal {
    return items
      .map((item) => item.weight)
      .reduce((total, weight, index) => new Decimal(total).add(new Decimal(weight).mul(set[index])), new Decimal(0));
  }

  get totalValue(): Decimal {
    return this.round(
      this.items
        .map((item) => item.value)
        .reduce((total: Decimal, value, index) => new Decimal(total).add(new Decimal(value).mul(this.set[index])), new Decimal(0)),
    );
  }

  get totalWeight(): Decimal {
    return this.round(
      this.items
        .map((item) => item.weight)
        .reduce((total: Decimal, weight, index) => new Decimal(total).add(new Decimal(weight).mul(this.set[index])), new Decimal(0)),
    );
  }

  get notFullItemIndex(): number {
    return this.set.findIndex((val) => val !== 0 && val !== 1);
  }

  bestImpossibleOutcome(index: number = -1, isTaken: number = 0, setIndex: Array<number> = []): Set {
    const { set, maxWeight } = this;
    let leftWeight: Decimal = new Decimal(maxWeight).minus(this.totalWeight);

    const emptyUntilEverythingFits = () => {
      while (leftWeight.lessThanOrEqualTo(0) && index > 0) {
        index--;
        if (setIndex.includes(index)) continue;

        const weight = this.items[index].weight;
        leftWeight = leftWeight.add(weight);

        if (leftWeight.lessThanOrEqualTo(0)) {
          set[index] = 0;
        } else {
          set[index] = this.round(leftWeight.dividedBy(weight)).toNumber();
          leftWeight = new Decimal(1);
        }
      }
    };

    const fillUntilEverythingFits = () => {
      while (leftWeight.greaterThan(0) && index < this.numberOfItems - 1) {
        index++;
        if (setIndex.includes(index)) continue;

        const weight = this.items[index].weight;

        if (weight.lessThanOrEqualTo(leftWeight)) {
          set[index] = 1;
          leftWeight = leftWeight.minus(weight);
        } else {
          set[index] = this.round(leftWeight.dividedBy(weight)).toNumber();
          leftWeight = new Decimal(0);
        }
      }
    };

    if (isTaken === 1) emptyUntilEverythingFits();
    else fillUntilEverythingFits();

    return set;
  }

  static insertBestSet(set: Set, totalValue: number, totalWeight: number) {
    Backpack.maxTotalValue = totalValue;
    Backpack.maxTotalWeight = totalWeight;
    Backpack.bestSet = Backpack.maxTotalValue === totalValue ? [set, ...Backpack.bestSet] : [set];
  }

  changeValueInSet(index: number, isTaken: number, setIndex: Array<number>): void {
    this.set[index] = this.items[index].weight.mul(isTaken).greaterThan(this.maxWeight)
      ? new Decimal(this.maxWeight).dividedBy(this.items[index].weight).toNumber()
      : isTaken;
    setIndex.push(index);
  }

  isValueHigherThenMaxValue(): boolean {
    return this.totalValue.greaterThanOrEqualTo(Backpack.maxTotalValue);
  }

  round(number: Decimal): Decimal {
    return number.minus(number.round()).abs().lessThanOrEqualTo(TOLERANCE) ? number.round() : number;
  }

  fillWithZeroes(setIndex: Array<number>): void {
    this.set = this.set.map((value, index) => {
      return setIndex.includes(index) ? value : 0;
    });
  }
}
