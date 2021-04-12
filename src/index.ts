import { loadData } from './loaders/fileLoader';
import { solve } from './solver';
import { generateData } from './helpers/generateData';
import { jsonLoader } from './loaders/JsonLoader';
import { testLoader } from './loaders/testLoader';
import fs from 'fs';
import { resultObject, Set } from './types/types';
import { solver } from './solvers/testingSolver';

// const generatedData = generateData(5000, {
//   weight: { average: 20, standardDeviation: 15 },
//   value: { average: 20, standardDeviation: 12.5 },
// });

// const data = jsonLoader(__dirname + '\\..\\log\\data1616058195288.json');

const FILE_DIRECTORY = '\\..\\data\\';
const FILE_NAME = '2Testy m=1, n=100.txt';

const solvingFunction = solve(solver);
const test = new testLoader(__dirname + FILE_DIRECTORY + FILE_NAME);

let testItems;

while ((testItems = test.getNextItemSet())) {
  fs.writeFileSync(__dirname + '\\..\\temp\\' + FILE_NAME.split('.')[0] + '.items.json', JSON.stringify(testItems), { flag: 'w' });
  let result = solvingFunction(testItems, test.metaData.maxWeight) as resultObject;
  console.log(test.metaData);
  console.log({ value: result.value, weight: result.weight, numberOfExecutions: result.numberOfExecutions });

  fs.writeFileSync(__dirname + '\\..\\temp\\' + FILE_NAME.split('.')[0] + '.bestResult.json', JSON.stringify(result.set) + '\n', { flag: 'w' });
}
