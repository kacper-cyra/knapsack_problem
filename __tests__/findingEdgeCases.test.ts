import { generateData } from '../src/helpers/generateData';
import { solverFactory } from '../src/solver';

const solve = solverFactory();
describe('Solve', () => {
  for (let i = 0; i < 4000; i++) {
    const weight = { average: 100, standardDeviation: 50 };
    const value = { average: 100, standardDeviation: 50 };
    const generatedData = generateData(15, { weight, value });
    const maxWeight = Math.random() * weight.standardDeviation + weight.average * 8;
    it('Will not throw an error', () => {
      expect(solve(generatedData, maxWeight)).toBeInstanceOf(Object);
    });
  }
});
