import '../augmentations.ts';
import { assertEquals } from 'jsr:@std/assert';

const testArrays = [[], [1, 1, 6, 2, 6, 5]];

Deno.test('Array.uniqueByHash() -  unsorted', () => {
	for (const testArray of testArrays) {
		const input = testArray;
		const expected = Array.from(new Set(input));
		assertEquals(input.uniqueByHash(), expected);
	}
});

Deno.test('Array.uniqueByHash() -  unsorted, custom hash', () => {
	assertEquals(
		[1, 1, 2, 3, 2, 3, 4, 4].uniqueByHash((value, index, array) =>
			JSON.stringify({
				value,
				indexModTwo: index % 2,
				length: array.length,
				firstElement: array[0],
			})
		),
		[1, 1, 2, 3, 4, 4]
	);
});
