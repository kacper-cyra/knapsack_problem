import { Backpack } from './backpack';
import { ROUND_ACCURACY } from './globals';
import { Change, Item } from './types/types';
import fs from 'fs';

export function testingSolver(backpack: Backpack, { isTaken, index, calledFrom, level }: Change, options?: {}): void {
  if (isTaken === 1) backpack.set.fill(0);
  backpack.set[index] =
    backpack.items[index].weight * isTaken > backpack.maxWeight
      ? Math.round((backpack.maxWeight / backpack.items[index].weight) * ROUND_ACCURACY) / ROUND_ACCURACY
      : isTaken;
  index = isTaken === 0 ? index + 1 : index;
  if (index < backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(isTaken === 0 ? index + 1 : 0);

  Backpack.allSets.push({
    set: backpack.set,
    value: backpack.totalValue,
    weight: backpack.totalWeight,
    calledFrom,
    level,
  });

  if (backpack.notFullItemIndex === -1) {
    if (Backpack.maxTotalValue <= backpack.totalValue) {
      Backpack.insertBestSet(backpack.set, backpack.totalValue);
    }
  } else if (Backpack.maxTotalValue < backpack.totalValue) {
    const setIndex = Backpack.allSets.length - 1;
    testingSolver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 0,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
    testingSolver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 1,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
  }
}

export function solverFactory(options = { test: false }) {
  const fun = options.test ? testingSolver : solver;

  return function solve(items: Array<Item>, maxWeight: number) {
    try {
      const startTime: number = Date.now();
      const solver = fun;
      const backpack = new Backpack(items, maxWeight);
      backpack.set = backpack.bestImpossibleOutcome(0);

      if (backpack.notFullItemIndex === -1) {
        Backpack.bestSet = [backpack.set];
        return [Backpack.bestSet, backpack.totalValue];
      } else if (backpack.notFullItemIndex === backpack.numberOfItems - 1) {
        backpack.set[backpack.numberOfItems - 1] = 0;
        Backpack.bestSet = [backpack.set];
        return [Backpack.bestSet, backpack.totalValue];
      }

      solver(new Backpack(items, maxWeight, [...backpack.set]), {
        isTaken: 0,
        index: backpack.notFullItemIndex,
        calledFrom: 0,
        level: 1,
      });
      solver(new Backpack(items, maxWeight, [...backpack.set]), {
        isTaken: 1,
        index: backpack.notFullItemIndex,
        calledFrom: 0,
        level: 1,
      });
      console.log('Running time: ', Date.now() - startTime);
      return [Backpack.bestSet, Backpack.maxTotalValue];
    } catch (err) {
      console.log(err);
      const errorLogging = fs.createWriteStream(`${__dirname}\\..\\log\\${Date.now()}.txt`, { flags: 'a' });
      errorLogging.write('Caught exception: ' + err);
      fs.writeFileSync(`${__dirname}\\..\\log\\data${Date.now()}.json`, JSON.stringify(items));
    }
  };
}

function solver(backpack: Backpack, { isTaken, index, calledFrom, level }: Change, options?: {}): void {
  if (isTaken === 1) backpack.set.fill(0);
  backpack.set[index] =
    backpack.items[index].weight * isTaken > backpack.maxWeight
      ? Math.round((backpack.maxWeight / backpack.items[index].weight) * ROUND_ACCURACY) / ROUND_ACCURACY
      : isTaken;
  index = isTaken === 0 ? index + 1 : index;
  if (index < backpack.numberOfItems) backpack.set = backpack.bestImpossibleOutcome(isTaken === 0 ? index + 1 : 0);

  if (backpack.notFullItemIndex === -1) {
    if (Backpack.maxTotalValue <= backpack.totalValue) {
      Backpack.insertBestSet(backpack.set, backpack.totalValue);
    }
  } else if (Backpack.maxTotalValue < backpack.totalValue) {
    const setIndex = Backpack.allSets.length - 1;
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 0,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
    solver(new Backpack(backpack.items, backpack.maxWeight, [...backpack.set]), {
      isTaken: 1,
      index: backpack.notFullItemIndex,
      calledFrom: setIndex,
      level: level + 1,
    });
  }
}
