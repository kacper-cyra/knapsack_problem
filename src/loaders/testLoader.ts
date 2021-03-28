import Decimal from 'decimal.js';
import fs from 'fs';
import { Backpack } from '../backpack';
import { Item, testMetaData } from '../types/types';

export class testLoader {
  metaData: testMetaData;
  backpacks: Array<Backpack>;
  private fileLine: number;
  private filePath: string;

  constructor(filePath: string) {
    const fileLines = this.separateToLines(fs.readFileSync(filePath).toString());
    this.metaData = this.getMetaData(fileLines);
    this.fileLine = 3;
    this.filePath = filePath;
    this.backpacks = [];
  }

  private getMetaData(file: Array<string>): testMetaData {
    return {
      numberOfTests: Number(file[0]),
      numberOfItems: Number(file[1]),
      maxWeight: Number(file[2]),
      fileLength: file.length,
    };
  }

  private separateToLines(file: String) {
    return file.split('\n');
  }

  private generateBackpacks(fileLines: Array<string>) {
    let index = 3;
    const backpackList: Array<Backpack> = [];

    while (index < fileLines.length) {
      const items: Array<Item> = [];
      for (let dataRow = index; dataRow <= index + this.metaData.numberOfItems * 2; dataRow += 2) {
        items.push(this.createItem(new Decimal(fileLines[dataRow]), new Decimal(fileLines[dataRow + 1]), items.length));
      }
      backpackList.push(new Backpack(items, this.metaData.maxWeight));
    }

    this.backpacks = backpackList;
  }

  private createItem(value: Decimal, weight: Decimal, id: number): Item {
    return {
      id,
      value,
      weight,
      valuePerWeightRatio: new Decimal(value.dividedBy(weight)),
    };
  }

  public getNextItemSet() {
    const fileLines = this.separateToLines(fs.readFileSync(this.filePath).toString());
    let index = this.fileLine;
    const topIndex = this.fileLine + this.metaData.numberOfItems * 2;
    if (topIndex >= this.metaData.fileLength) return null;
    const items: Array<Item> = [];

    for (index; index < topIndex; index += 2) {
      items.push(this.createItem(new Decimal(Number(fileLines[index])), new Decimal(Number(fileLines[index + 1])), items.length));
    }

    this.fileLine = index;
    return items.sort((a, b) => {
      return b.valuePerWeightRatio.toNumber() - a.valuePerWeightRatio.toNumber();
    });
  }
}
