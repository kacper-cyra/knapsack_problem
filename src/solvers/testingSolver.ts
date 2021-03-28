import Decimal from 'decimal.js';
import { Backpack } from '../backpack';
import { ROUND_ACCURACY } from '../globals';
import { Change } from '../types/types';

export function testingSolver(backpack: Backpack, { isTaken, index, calledFrom, level, setIndex }: Change, options?: {}): void {
  if (isTaken === 1) backpack.set.fill(0);
  backpack.set[index] = backpack.items[index].weight.mul(isTaken).greaterThan(backpack.maxWeight)
    ? new Decimal(backpack.maxWeight).dividedBy(backpack.items[index].weight).toNumber()
    : isTaken;
  index = isTaken === 0 ? index + 1 : index;
  if (index < backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(isTaken === 0 ? index + 1 : 0);

  // Backpack.allSets.push({
  //   set: backpack.set,
  //   value: backpack.totalValue,
  //   weight: backpack.totalWeight,
  //   calledFrom,
  //   level,
  // });

  if (backpack.notFullItemIndex === -1) {
    if (new Decimal(Backpack.maxTotalValue).lessThanOrEqualTo(backpack.totalValue)) {
      Backpack.insertBestSet(backpack.set, backpack.totalValue.toNumber(), backpack.totalWeight.toNumber());
    }
  } else if (Backpack.maxTotalValue < backpack.totalValue.toNumber()) {
    const calledFrom = Backpack.allSets.length - 1;
    testingSolver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 0,
      index: backpack.notFullItemIndex,
      calledFrom: calledFrom,
      level: level + 1,
      setIndex: [...setIndex],
    });
    testingSolver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 1,
      index: backpack.notFullItemIndex,
      calledFrom: calledFrom,
      level: level + 1,
      setIndex: [...setIndex],
    });
  }
}
