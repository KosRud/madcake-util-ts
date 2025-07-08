import '../src/augmentations/augment-Array';
import { describe, it, expect } from 'vitest';
import { sameValueZero } from '../src/main/util.js';

const testArrays = [[], [1, 1, 6, 2, 6, 5]];

describe('Array', function () {
  describe('unique()', function () {
    it('unsorted input', () => {
      for (const testArray of testArrays) {
        const input = testArray;
        const expected = Array.from(new Set(input));
        expect(input.unique()).to.have.members(expected);
        expect(input.unique(false)).to.have.members(expected);
        expect(input.unique(false, sameValueZero)).to.have.members(expected);
      }
    });
    it('sorted input', () => {
      for (const testArray of testArrays) {
        const input = testArray.toSorted();
        const expected = Array.from(new Set(input)).sort((a, b) => a - b);
        expect(input.unique()).to.have.members(expected);
        expect(input.unique(false)).to.have.members(expected);
        expect(input.unique(false, sameValueZero)).to.have.members(expected);
      }
    });
  });
});
