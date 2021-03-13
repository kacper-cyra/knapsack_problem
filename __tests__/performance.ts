import Benchmark, { Suite } from 'benchmark';
import { generateData } from '../src/helpers/generateData';
import { solverFactory } from '../src/solver';

const suite = new Benchmark.Suite();
const solve = solverFactory();

const thousandItems = generateData(1000, { value: { average: 50, standardDeviation: 50 }, weight: { average: 50, standardDeviation: 50 } });
const fiveThousandItems = generateData(5000, {
  value: { average: 50, standardDeviation: 50 },
  weight: { average: 50, standardDeviation: 50 },
});

suite
  .add('Solver with 1000 items', function () {
    solve(thousandItems, 250);
  })
  .add('Solver with 5000 items', function () {
    solve(fiveThousandItems, 250);
  })
  .on('cycle', function (event: Benchmark.Event) {
    if (event.target.times) {
      console.log(`${event.target.name} test case time ${event.target.times.elapsed}s`);
      console.log(`${event.target.name} time ${event.target.times.period}s`);
    }
  })
  .run({ async: false });
