import { Backpack } from '../backpack';
import { Change } from '../types/types';

export function solver(backpack: Backpack, { isTaken, index, calledFrom, level, setIndex }: Change, options?: {}): void {
  let indexOfItemThatDoesNotFit: number;

  if (index < 0 || index >= backpack.numberOfItems) return;
  backpack.changeValueInSet(index, isTaken, setIndex);
  if (index <= backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(index, isTaken, setIndex);
  isTaken ? index-- : index++;
  indexOfItemThatDoesNotFit = backpack.notFullItemIndex;

  if (!backpack.isValueHigherThenMaxValue()) return;

  if (indexOfItemThatDoesNotFit === -1 && backpack.totalWeight.lessThanOrEqualTo(backpack.maxWeight)) {
    Backpack.insertBestSet([...backpack.set], backpack.totalValue.toNumber(), backpack.totalWeight.toNumber());
  } else {
    const solvedSetIndex = Backpack.allSets.length - 1;
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 0,
      index: indexOfItemThatDoesNotFit,
      calledFrom: solvedSetIndex,
      level: level + 1,
      setIndex: [...setIndex],
    });
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 1,
      index: indexOfItemThatDoesNotFit,
      calledFrom: solvedSetIndex,
      level: level + 1,
      setIndex: [...setIndex],
    });
  }
}
