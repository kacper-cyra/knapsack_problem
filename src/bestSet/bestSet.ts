import { Backpack } from "../backpack";
import { change } from "../types/types";

export function findBestSet(backpack: Backpack, { value, index }: change) {
  backpack.set[index] = value;
  const direction = value === 0 ? 1 : -1;

  index += direction;

  if (value === 1 && index > 0 && index < backpack.numberOfItems) {
    backpack.removeOverWeight(index, direction);
  }

  backpack.tryToFitItems(index, direction);

  if (backpack.notFullItemIndex === -1) {
    if (Backpack.maxTotalValue <= backpack.totalValue) {
      Backpack.maxTotalValue = backpack.totalValue;
      Backpack.bestSet = Backpack.maxTotalValue === backpack.totalValue ? [backpack.set, ...Backpack.bestSet] : [backpack.set];
    }
  } else if (Backpack.maxTotalValue <= backpack.totalValue) {
    findBestSet(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), { value: 0, index: backpack.notFullItemIndex });
    findBestSet(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), { value: 1, index: backpack.notFullItemIndex });
  }
}

//export function findBestSetStrategy(options = { returnAllSets: false, visualize: false, performance: false }) {
//
//}
