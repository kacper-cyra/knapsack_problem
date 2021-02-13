import { solver } from "../src/index";
import { loadData } from "../src/loaders/fileLoader";
describe("Solver testing.", () => {
  const input = loadData("./data/data.txt");

  it("Best set of items if three first items fit.", () => {
    const maxWeight = 15;

    expect(solver(input, maxWeight)).toEqual([1, 1, 1]);
  });

  it("Best set of item.", () => {
    const maxWeight = 18;

    expect(solver(input, maxWeight)).toEqual([1, 1, 1, 0, 0, 1]);
  });
});
