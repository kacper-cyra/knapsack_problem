import { solverFactory } from '../src/solver';
import { items1 } from './items';

const solve = solverFactory();
describe('Solve', () => {
  it('Solves when best result is in left part of heap', () => {
    const maxWeight = 12;

    expect(solve(items1, maxWeight)).toMatchObject([[[1, 1, 1, 0, 0]], 15]);
  });
});
