import { item } from "../types/types";

export function readValue(items: Array<item>, itemsTaken: Array<number>): number {
  return itemsTaken.reduce((sum, taken, index) => {
    return (sum += items[index].value * taken);
  });
}
