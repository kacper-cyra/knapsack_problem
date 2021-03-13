import { loadData } from './loaders/fileLoader';
import { solverFactory } from './solver';
import { generateData } from './helpers/generateData';

const solve = solverFactory();

const generatedData = generateData(5000, {
  weight: { average: 20, standardDeviation: 15 },
  value: { average: 20, standardDeviation: 12.5 },
});

const bestResult = solve(generatedData, 80);
console.log(bestResult);
