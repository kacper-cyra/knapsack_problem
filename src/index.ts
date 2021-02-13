import { item } from "./types/types";
import { loadData } from "./loaders/fileLoader";
import { readValue } from "./getValue";

const data = loadData("./data/data.txt");

export function solver(items: Array<item>, maxWeight: number, continuous: boolean = false): Array<number> {
  const result: Array<number> = [];
  let leftWeight = maxWeight;
  let maxResultValue;

  for (const item of items) {
    if (item.weight < maxWeight) {
      if (item.weight <= leftWeight) {
        console.log(item.weight, leftWeight);
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

//console.log(data);
//change name
const bestResult = solver(data, 15, true);
//console.log(bestResult);
const value = readValue(data, bestResult);
