import { Backpack } from "../backpack";
import { Change } from "../types/types";

export function findBestSet(backpack: Backpack, { isTaken, index }: Change, options?: {}): void {
  if (isTaken === 1) backpack.set.fill(0);
  backpack.set[index] = backpack.items[index].weight * isTaken > backpack.maxWeight ? backpack.maxWeight / backpack.items[index].weight : isTaken;
  index = isTaken === 0 ? index + 1 : 0;
  if (index < backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(index);

  Backpack.allSets.push({ set: backpack.set, value: backpack.totalValue, weight: backpack.totalWeight });

  if (backpack.notFullItemIndex === -1) {
    if (Backpack.maxTotalValue <= backpack.totalValue) {
      Backpack.insertBestSet(backpack.set, backpack.totalValue);
    }
  } else if (Backpack.maxTotalValue < backpack.totalValue) {
    findBestSet(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), { isTaken: 0, index: backpack.notFullItemIndex });
    findBestSet(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), { isTaken: 1, index: backpack.notFullItemIndex });
  }
}
