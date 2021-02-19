import { readFileSync } from "fs";
import { item } from "../types/types";

export function loadData(fileName: string): Array<item> {
  return mapData(readFile(fileName)).sort((a, b) => {
    return b.valuePerWeightRatio - a.valuePerWeightRatio;
  });
}

function mapData(fileLine: Array<string>) {
  return fileLine.map((item, index) => {
    const weightValuePair = item.replace("\r", "").split(",");
    return {
      id: index,
      weight: parseInt(weightValuePair[0]),
      value: parseInt(weightValuePair[1]),
      valuePerWeightRatio: parseInt(weightValuePair[1]) / parseInt(weightValuePair[0]),
    };
  });
}

function readFile(fileName: string): Array<string> {
  return readFileSync(fileName).toString().split("\n");
}
