import { ROUND_ACCURACY } from '../globals';
import { GatheredData } from '../types/types';

export function drawTree(data: Array<GatheredData>) {
  const VALUE_SEPARATOR = ', ';
  const SET_SEPARATOR = '      ';
  const maxLevel = data.map((gatheredData) => gatheredData.level).reduce((sum, level) => (sum = level > sum ? level : sum));
  const lines = Array.from(new Array(maxLevel + 1), (value) => new Array());
  let index = 0;

  while (index < data.length) {
    const stringifiedSet = data[index].set.join(VALUE_SEPARATOR);
    lines[data[index].level].push(stringifiedSet);
    index++;
  }
  fillEmptySpaces();
  const result = joinArraysIntoStrings();
  return result.join('\n\n');

  function fillEmptySpaces() {
    const maxNumberOfSetsInLastLevel = Math.pow(2, maxLevel);
    const numberOfChars = data[0].set.length * (VALUE_SEPARATOR.length + 1) + String(ROUND_ACCURACY / 10).length;
    console.log(numberOfChars);
    const maxRowLength = maxNumberOfSetsInLastLevel * numberOfChars + (maxNumberOfSetsInLastLevel + 1) * SET_SEPARATOR.length;

    for (let i = 0; i < lines.length; i++) {
      const numberOfSetsInLevel = Math.pow(2, i);
      const lengthOfFreeSpaceBetweenSets = Math.round((maxRowLength - numberOfSetsInLevel * numberOfChars) / (numberOfSetsInLevel + 1));
      console.log(lengthOfFreeSpaceBetweenSets);
      const separator = new Array(lengthOfFreeSpaceBetweenSets).fill(' ').join('');

      for (let itemIndex = 0; itemIndex < numberOfSetsInLevel * 2 + 1; itemIndex += 2) {
        lines[i].splice(itemIndex, 0, separator);
      }
    }
  }

  function joinArraysIntoStrings() {
    const result = [];
    for (const level of lines) {
      result.push(level.join(''));
    }
    return result;
  }
}
