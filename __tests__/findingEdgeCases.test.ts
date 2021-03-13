import { generateData } from '../src/helpers/generateData';
import { solverFactory } from '../src/solver';

const solve = solverFactory();
describe('Solve', () => {
  for (let i = 0; i < 1000; i++) {
    const weight = { average: 20, standardDeviation: 15 };
    const value = { average: 20, standardDeviation: 12.5 };
    const generatedData = generateData(40, { weight, value });
    const maxWeight = Math.random() * weight.standardDeviation + weight.average * 7;
    it('Will not throw an error', () => {
      expect(solve(generatedData, maxWeight)).toBeInstanceOf(Array);
    });
  }
});
