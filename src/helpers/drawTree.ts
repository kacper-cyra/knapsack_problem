import fs from 'fs';
import { ROUND_ACCURACY } from '../globals';
import { GatheredData, VisualRepresentationOptions } from '../types/types';

export class VisualRepresentation {
  readonly result: string;
  readonly valueSeparator: string;
  readonly setSeparator: string;
  readonly maxLevel: number;
  readonly numberOfChars: number;

  constructor(data: Array<GatheredData>, options: VisualRepresentationOptions = {}) {
    this.valueSeparator = options.valueSeparator ?? ', ';
    this.setSeparator = options.setSeparator ?? '      ';
    this.numberOfChars = data[0].set.length * (this.valueSeparator.length + 1) + String(ROUND_ACCURACY / 10).length;
    this.maxLevel = data.map((gatheredData) => gatheredData.level).reduce((sum, level) => (sum = level > sum ? level : sum));
    let lines = Array.from(new Array(this.maxLevel + 1), (value) => new Array());
    let index = 0;

    while (index < data.length) {
      const stringifiedSet = data[index].set.join(this.valueSeparator);
      lines[data[index].level].push(stringifiedSet);
      index++;
    }
    lines = this.fillEmptySpaces(lines);
    const result = this.joinSetsIntoStrings(lines);
    this.result = result.join('\n\n');
  }

  fillEmptySpaces(lines: Array<Array<string>>) {
    const maxNumberOfSetsInLastLevel = Math.pow(2, this.maxLevel);
    const maxRowLength = maxNumberOfSetsInLastLevel * this.numberOfChars + (maxNumberOfSetsInLastLevel + 1) * this.setSeparator.length;

    for (let i = 0; i < lines.length; i++) {
      const numberOfSetsInLevel = Math.pow(2, i);
      const lengthOfFreeSpaceBetweenSets = Math.round(
        (maxRowLength - numberOfSetsInLevel * this.numberOfChars) / (numberOfSetsInLevel + 1),
      );
      const separator = new Array(lengthOfFreeSpaceBetweenSets).fill(' ').join('');

      for (let itemIndex = 0; itemIndex < numberOfSetsInLevel * 2 + 1; itemIndex += 2) {
        lines[i].splice(itemIndex, 0, separator);
      }
    }
    return lines;
  }

  joinSetsIntoStrings(lines: Array<Array<string>>) {
    const result = [];
    for (const level of lines) {
      result.push(level.join(''));
    }
    return result;
  }

  save() {
    fs.writeFileSync(`${__dirname}\\..\\temp\\drawnTree.txt`, this.result);
  }
}
