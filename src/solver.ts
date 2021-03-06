import { Backpack } from './backpack';
import { ROUND_ACCURACY } from './globals';
import { Change } from './types/types';

export function solver(backpack: Backpack, { isTaken, index, calledFrom, level }: Change, options?: {}): void {
  if (isTaken === 1) backpack.set.fill(0);
  backpack.set[index] =
    backpack.items[index].weight * isTaken > backpack.maxWeight
      ? Math.round((backpack.maxWeight / backpack.items[index].weight) * ROUND_ACCURACY) / ROUND_ACCURACY
      : isTaken;
  index = isTaken === 0 ? index + 1 : 0;
  if (index < backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(index);

  Backpack.allSets.push({
    set: backpack.set,
    value: backpack.totalValue,
    weight: backpack.totalWeight,
    calledFrom,
    level,
  });

  if (backpack.notFullItemIndex === -1) {
    if (Backpack.maxTotalValue <= backpack.totalValue) {
      Backpack.insertBestSet(backpack.set, backpack.totalValue);
    }
  } else if (Backpack.maxTotalValue < backpack.totalValue) {
    const setIndex = Backpack.allSets.length - 1;
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 0,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 1,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
  }
}
