import { Item } from "./types/types";

function matrixSolver(items: Array<Item>, maxWeight: number) {
  const length = items.length;
  const bestResults: Array<Array<number>> = [[]];

  for (let j = 0; j <= maxWeight; j++) {
    bestResults.push([]);

    for (let i = 0; i <= length; i++) {
      bestResults[j].push(0);
    }
  }

  for (let i = 1; i <= length; i++) {
    for (let w = 0; w <= maxWeight; w++) {
      const { weight, value } = items[i - 1];

      if (weight > w) {
        bestResults[i][w] = bestResults[i - 1][w];
      } else {
        bestResults[i][w] = Math.max(bestResults[i - 1][w], bestResults[i - 1][w - weight] + value);
      }
    }
  }
  return bestResults[length][maxWeight];
}
