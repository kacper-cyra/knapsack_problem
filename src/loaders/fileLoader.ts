import { readFileSync } from "fs";
import { Item } from "../types/types";

// Each line in the file needs to be made of two numbers separated with a comma
// First number is value second one is weight

export function loadData(fileName: string): Array<Item> {
  return mapData(readFile(fileName)).sort((a, b) => {
    return b.valuePerWeightRatio - a.valuePerWeightRatio;
  });
}

function mapData(fileLine: Array<string>) {
  return fileLine.map((item, index) => {
    const weightValuePair = item.replace("\r", "").split(",");
    return {
      id: index,
      value: parseInt(weightValuePair[0]),
      weight: parseInt(weightValuePair[1]),
      valuePerWeightRatio: parseInt(weightValuePair[0]) / parseInt(weightValuePair[1]),
    };
  });
}

function readFile(fileName: string): Array<string> {
  return readFileSync(fileName).toString().split("\n");
}
