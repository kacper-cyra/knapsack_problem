import { Backpack } from "../src/backpack";
describe("totalWeight", () => {
  it("returns 0", () => {
    const backpack = new Backpack(itemsMock, 12);
    expect(backpack.totalWeight).toEqual(0);
  });
});

const itemsMock = [
  {
    id: 3,
    value: 6,
    weight: 2,
    valuePerWeightRatio: 3,
  },
  {
    id: 1,
    value: 5,
    weight: 5,
    valuePerWeightRatio: 1,
  },
  {
    id: 4,
    value: 3,
    weight: 4,
    valuePerWeightRatio: 0.75,
  },
  {
    id: 0,
    value: 2,
    weight: 4,
    valuePerWeightRatio: 0.5,
  },
  {
    id: 2,
    value: 3,
    weight: 7,
    valuePerWeightRatio: 0.42857142857142855,
  },
];
