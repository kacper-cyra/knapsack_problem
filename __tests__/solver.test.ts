import { solverFactory } from '../src/solver';

const solve = solverFactory();
describe('Solve', () => {
  it('Solves when best result is in left part of heap', () => {
    const maxWeight = 12;
    const finalSet = solve(items1, maxWeight).set;
    console.log(finalSet);
    expect(finalSet).toMatchObject([0, 1, 0, 1, 1]);
  });
});

export const items1 = [
  { id: 3, value: 6, weight: 2, valuePerWeightRatio: 3 },
  { id: 1, value: 5, weight: 5, valuePerWeightRatio: 1 },
  { id: 4, value: 3, weight: 4, valuePerWeightRatio: 0.75 },
  { id: 0, value: 2, weight: 4, valuePerWeightRatio: 0.5 },
  {
    id: 2,
    value: 3,
    weight: 7,
    valuePerWeightRatio: 0.42857142857142855,
  },
];
