import { item } from "./types/types";
import { loadData } from "./loaders/loader";
import { readValue } from "./helpers/getValue";

const data = loadData("./data/data.txt");

data.sort((a, b) => {
  return b.valuePerWeightRatio - a.valuePerWeightRatio;
});

function solver(items: Array<item>, maxWeight: number, continuous: boolean = false): Array<number> {
  const result: Array<number> = [];
  let leftWeight = maxWeight;

  for (const item of items) {
    if (item.weight < maxWeight) {
      if (item.weight < leftWeight) {
        result.push(1);
        leftWeight -= item.weight;
      } else if (continuous) {
        result.push(Math.round((leftWeight / item.weight) * 100) / 100);
        return result;
      }
    }
  }

  return result;
}

console.log(data);
//change name
const bestResult = solver(data, 15, true);
console.log(bestResult);
const value = readValue(data, bestResult);
