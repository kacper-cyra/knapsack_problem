import { Item, GatheredData, Set } from '../types/types';

export function sortGatheredDataById(items: Array<Item>, sets: Array<GatheredData>) {
  const itemsCopy = [...items];
  const sortedItems = items.sort((a, b) => a.id - b.id);
  let result = [];

  for (const gatheredData of sets) {
    const newSet: Set = [];
    const { value, weight, calledFrom, level } = gatheredData;
    sortedItems.map((item, index) => {
      const sameItemIndex = itemsCopy.findIndex((searchedItem) => searchedItem.id === item.id);
      newSet[index] = gatheredData.set[sameItemIndex];
    });
    result.push({ set: newSet, value: value, weight: weight, calledFrom, level });
  }
  return result;
}

export function sortSetById(items: Array<Item>, set: Set) {
  const itemsCopy = [...items];
  const sortedItems = items.sort((a, b) => a.id - b.id);
  let result: Set = [];

  sortedItems.map((item, index) => {
    const sameItemIndex = itemsCopy.findIndex((searchedItem) => searchedItem.id === item.id);
    result[index] = set[sameItemIndex];
  });

  return result;
}
