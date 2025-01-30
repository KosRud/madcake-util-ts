import '../augmentations.ts';
import { assertEquals } from 'jsr:@std/assert';
import { sameValueZero } from '../src/util.ts';

const testArrays = [[], [1, 1, 6, 2, 6, 5]];

Deno.test('Array.unique() -  unsorted', () => {
	for (const testArray of testArrays) {
		const input = testArray;
		const expected = Array.from(new Set(input));
		assertEquals(input.unique(), expected);
		assertEquals(input.unique(false), expected);
		assertEquals(input.unique(false, sameValueZero), expected);
	}
});

Deno.test('Array.unique() - sorted', () => {
	for (const testArray of testArrays) {
		const input = testArray.toSorted();
		const expected = Array.from(new Set(input)).sort((a, b) => a - b);
		assertEquals(input.unique(), expected);
		assertEquals(input.unique(false), expected);
		assertEquals(input.unique(false, sameValueZero), expected);
	}
});
