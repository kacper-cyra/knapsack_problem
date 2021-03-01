import { Backpack } from "../src/backpack";
describe("totalWeight", () => {
  it("returns 0 for empty set", () => {
    const backpack = new Backpack(itemsMock, 12);
    expect(backpack.totalWeight).toEqual(0);
  });

  it("returns proper weight for one item", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 0, 0, 0, 0];
    expect(backpack.totalWeight).toBe(2);
  });

  it("returns proper weight for many items", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 1, 0, 0, 0];
    expect(backpack.totalWeight).toBe(7);
  });
});

describe("totalValue", () => {
  it("returns 0 for empty set", () => {
    const backpack = new Backpack(itemsMock, 12);
    expect(backpack.totalValue).toEqual(0);
  });

  it("returns proper value for one item", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 0, 0, 0, 0];
    expect(backpack.totalValue).toBe(6);
  });

  it("returns proper value for many items", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 1, 0, 0, 0];
    expect(backpack.totalValue).toBe(11);
  });
});

describe("notFullItemIndex", () => {
  it("returns index of item that don't fully fit", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 0, 1, 5 / 7, 0];
    expect(backpack.notFullItemIndex).toBe(3);
  });

  it("returns -1 when set contains only integers", () => {
    const backpack = new Backpack(itemsMock, 12);
    backpack.set = [1, 0, 1, 1, 0];
    expect(backpack.notFullItemIndex).toBe(-1);
  });
});

describe("bestImpossibleOutcome", () => {
  it("returns set with half of an item if it don't fit", () => {
    const backpack = new Backpack(itemsMock, 1);
    expect(backpack.bestImpossibleOutcome(0)).toMatchObject([0.5, 0, 0, 0, 0]);
  });

  it("returns same set if index is out of range", () => {
    const backpack = new Backpack(itemsMock, 10);
    expect(backpack.bestImpossibleOutcome(5)).toMatchObject([0, 0, 0, 0, 0]);
  });

  it("returns best set", () => {
    const backpack = new Backpack(itemsMock, 12);
    expect(backpack.bestImpossibleOutcome(0)).toMatchObject([1, 1, 1, 1 / 4, 0]);
  });

  it("modify set starting from given index", () => {
    const backpack = new Backpack(itemsMock, 12);
    expect(backpack.bestImpossibleOutcome(1)).toMatchObject([0, 1, 1, 3 / 4, 0]);
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
