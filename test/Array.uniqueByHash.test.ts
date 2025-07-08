import '../src/augmentations/augment-Array';
import { describe, it, expect } from 'vitest';

const testArrays = [[], [1, 1, 6, 2, 6, 5]];

describe('Array', function () {
  describe('uniqueByHash()', function () {
    it('unsorted input', () => {
      for (const testArray of testArrays) {
        const input = testArray;
        const expected = Array.from(new Set(input));
        expect(input.uniqueByHash()).to.have.members(expected);
      }
    });
    it('sorted input', () => {
      expect(
        [1, 1, 2, 3, 2, 3, 4, 4].uniqueByHash((value, index, array) =>
          JSON.stringify({
            value,
            indexModTwo: index % 2,
            length: array.length,
            firstElement: array[0],
          }),
        ),
      ).to.have.members([1, 1, 2, 3, 4, 4]);
    });
  });
});
