import { solver } from '../src/index';
import { items1 } from './items';

describe('Solver', () => {
  it('Solves when best result is in left part of heap', () => {
    const maxWeight = 12;

    expect(solver(items1, maxWeight)).toMatchObject([[[1, 1, 1, 0, 0]], 15]);
  });
});
