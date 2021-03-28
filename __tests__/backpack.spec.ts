import Decimal from 'decimal.js';
import { Backpack } from '../src/backpack';
import { areArraysEqual } from './helpers/areArraysEqual';

describe('Backpack test', () => {
  describe('totalWeight', () => {
    it('returns 0 for empty set', () => {
      const backpack = new Backpack(itemsMock, 12);
      expect(backpack.totalWeight.toNumber()).toEqual(0);
    });

    it('returns proper weight for one item', () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 0, 0, 0, 0];
      expect(backpack.totalWeight.toNumber()).toEqual(2);
    });

    it('returns proper weight for many items', () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 1, 0, 0, 0];
      expect(backpack.totalWeight.toNumber()).toEqual(7);
    });
  });

  describe('totalValue', () => {
    it('returns 0 for empty set', () => {
      const backpack = new Backpack(itemsMock, 12);
      expect(backpack.totalValue.toNumber()).toEqual(0);
    });

    it('returns proper value for one item', () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 0, 0, 0, 0];
      expect(backpack.totalValue.toNumber()).toEqual(6);
    });

    it('returns proper value for many items', () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 1, 0, 0, 0];
      expect(backpack.totalValue.toNumber()).toEqual(11);
    });
  });

  describe('notFullItemIndex', () => {
    it("returns index of item that don't fully fit", () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 0, 1, new Decimal(5).dividedBy(7).toNumber(), 0];
      expect(backpack.notFullItemIndex).toBe(3);
    });

    it('returns -1 when set contains only integers', () => {
      const backpack = new Backpack(itemsMock, 12);
      backpack.set = [1, 0, 1, 1, 0];
      expect(backpack.notFullItemIndex).toBe(-1);
    });
  });

  describe('bestImpossibleOutcome', () => {
    it("returns set with half of an item if it don't fit", () => {
      const backpack = new Backpack(itemsMock, 1);
      const expectedOutput = [0.5, 0, 0, 0, 0];
      const received = backpack.bestImpossibleOutcome();
      console.log(received);
      expect(areArraysEqual(received, expectedOutput)).toBeTruthy();
    });

    it('returns same set if index is out of range', () => {
      const backpack = new Backpack(itemsMock, 10);
      const expectedOutput = [0, 0, 0, 0, 0];
      const received = backpack.bestImpossibleOutcome(4);
      console.log(received);
      expect(areArraysEqual(received, expectedOutput)).toBeTruthy();
    });

    it('returns best set', () => {
      const backpack = new Backpack(itemsMock, 12);
      const expectedOutput = [1, 1, 1, 0.25, 0];
      const received = backpack.bestImpossibleOutcome();
      console.log(received);
      expect(areArraysEqual(received, expectedOutput)).toBeTruthy();
    });
  });
});

const itemsMock = [
  {
    id: 3,
    value: new Decimal(6),
    weight: new Decimal(2),
    valuePerWeightRatio: new Decimal(3),
  },
  {
    id: 1,
    value: new Decimal(5),
    weight: new Decimal(5),
    valuePerWeightRatio: new Decimal(1),
  },
  {
    id: 4,
    value: new Decimal(3),
    weight: new Decimal(4),
    valuePerWeightRatio: new Decimal(0.75),
  },
  {
    id: 0,
    value: new Decimal(2),
    weight: new Decimal(4),
    valuePerWeightRatio: new Decimal(0.5),
  },
  {
    id: 2,
    value: new Decimal(3),
    weight: new Decimal(7),
    valuePerWeightRatio: new Decimal(0.42857142857142855),
  },
];
