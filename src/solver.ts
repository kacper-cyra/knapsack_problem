import { Backpack } from './backpack';
import { Change, GatheredData, Item, resultObject, Set } from './types/types';
import fs from 'fs';
import { sortSetById } from './helpers/sortById';

export function solve(solver: (backpack: Backpack, { isTaken, index, calledFrom, level, setIndex }: Change) => void) {
  return function (items: Array<Item>, maxWeight: number): resultObject {
    try {
      const backpack = new Backpack(items, maxWeight);
      const startTime: number = Date.now();
      backpack.set = backpack.bestImpossibleOutcome();

      Backpack.allSets.push({
        set: backpack.set,
        value: backpack.totalValue.toNumber(),
        weight: backpack.totalWeight.toNumber(),
        calledFrom: -1,
        level: -1,
        hasOnlyCompleteItems: backpack.notFullItemIndex === -1,
        sequenceValue: backpack.set.reduce((prev, val) => (prev += val)),
      });

      if (backpack.notFullItemIndex === -1) {
        Backpack.bestSet = [backpack.set];
        return { set: sortSetById(backpack.items, Backpack.bestSet[0]), items: backpack.items, value: Backpack.maxTotalValue, numberOfExecutions: 1 };
      } else if (backpack.notFullItemIndex === backpack.numberOfItems - 1) {
        backpack.set[backpack.numberOfItems - 1] = 0;
        Backpack.bestSet = [backpack.set];
        return { set: sortSetById(backpack.items, Backpack.bestSet[0]), items: backpack.items, value: Backpack.maxTotalValue, numberOfExecutions: 1 };
      }
      if (!backpack.isValueHigherThenMaxValue) return nullReturnObject;

      solver(new Backpack(items, maxWeight, [...backpack.set]), {
        isTaken: 0,
        index: backpack.notFullItemIndex,
        calledFrom: 0,
        level: 1,
        setIndex: [],
      });
      solver(new Backpack(items, maxWeight, [...backpack.set]), {
        isTaken: 1,
        index: backpack.notFullItemIndex,
        calledFrom: 0,
        level: 1,
        setIndex: [],
      });
      console.log('Running time: ', Date.now() - startTime);

      writeAllSetsToFile(Backpack.allSets, items);

      return {
        weight: Backpack.maxTotalWeight,
        value: Backpack.maxTotalValue,
        set: sortSetById(backpack.items, Backpack.bestSet[0]),
        items: backpack.items,
        numberOfExecutions: Backpack.allSets.length,
      };
    } catch (err) {
      console.log(err);
      const errorLogging = fs.createWriteStream(`${__dirname}\\..\\log\\${Date.now()}.txt`, { flags: 'a' });
      errorLogging.write('Caught exception: ' + err);
      fs.writeFileSync(`${__dirname}\\..\\log\\data${Date.now()}.json`, JSON.stringify({ items, maxWeight }));
      return nullReturnObject;
    }
  };
}

const nullReturnObject = { items: [], set: [], value: 0, numberOfExecutions: 0 };

async function writeAllSetsToFile(data: Array<GatheredData>, items: Array<Item>) {
  const sets: Set[] = [];
  const res = data.map((val) => {
    const sortedSet = sortSetById(items, [...val.set]);
    sets.push(val.set);
    return {
      value: val.value,
      weight: val.weight,
      sequenceValue: val.sequenceValue,
      hasOnlyCompleteItems: val.hasOnlyCompleteItems,
      set: val.hasOnlyCompleteItems ? sortedSet : [],
    };
  });

  fs.writeFileSync(__dirname + '\\..\\temp\\results.json', JSON.stringify(res), { flag: 'w' });
  fs.writeFileSync(__dirname + '\\..\\temp\\sets.json', JSON.stringify(sets), { flag: 'w' });
}
