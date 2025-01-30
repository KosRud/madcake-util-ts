import { sameValueZero } from './util.ts';

declare global {
	interface Array<T> {
		isNotEmpty(): boolean;
		/**
		 * Removes the first occurrence of a value in an array, returns its index or -1 if it was not present.
		 * @param value The value to be removed.
		 */
		remove(value: T): number;
		/**
		 * Returns a new array containing only the unique elements.
		 * @param comparator A function that takes two elements and returns `true` if they are considered equal, and `false` otherwise. SameValueZero comparison is used if comparator is not provided.
		 * @param isSorted Speed up the operation by assuming the array is sorted. False by default.
		 * @returns A new array containing only unique elements.
		 */
		unique(isSorted?: boolean, comparator?: (a: T, b: T) => boolean): T[];
		/**
		 * Returns a new array containing only the unique elements. Uniqueness is determined by comparing hash values of items.
		 * @param getHash A function that produces hash of an array item. If not provided, the item itself is used instead.
		 * @returns A new array containing only unique elements.
		 */
		uniqueByHash<H extends number | string>(
			getHash?: (value: T, index: number, array: T[]) => H
		): T[];
	}
}

function uniqueUnsorted<T>(
	array: T[],
	comparator: (a: T, b: T) => boolean
): T[] {
	const result: T[] = [];
	for (const value of array) {
		if (result.some((existingValue) => comparator(existingValue, value))) {
			continue;
		}
		result.push(value);
	}
	return result;
}

function uniqueSorted<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
	const result: T[] = [];
	for (const value of array) {
		if (
			result.length != 0 &&
			comparator(result[result.length - 1], value)
		) {
			continue;
		}
		result.push(value);
	}
	return result;
}

if (!Array.prototype.unique) {
	Array.prototype.unique = function <T>(
		isSorted?: boolean,
		comparator?: (a: T, b: T) => boolean
	) {
		const comparatorGuaranteed = comparator ?? sameValueZero;

		if (!isSorted) {
			return uniqueUnsorted(this, comparatorGuaranteed);
		}

		return uniqueSorted(this, comparatorGuaranteed);
	};
}

if (!Array.prototype.uniqueByHash) {
	Array.prototype.uniqueByHash = function <T, H>(
		getHash?: (value: T, index: number, array: T[]) => H
	) {
		const defaultHash = (value: T, _index: number, _array: T[]) => value;
		const getHashGuaranteed = getHash ?? defaultHash;

		const seenHashes = new Set();
		const result = [];
		for (const [index, value] of this.entries()) {
			const hash = getHashGuaranteed(value, index, this);
			if (seenHashes.has(hash)) {
				continue;
			}
			seenHashes.add(hash);
			result.push(value);
		}
		return result;
	};
}

if (!Array.prototype.isNotEmpty) {
	Array.prototype.isNotEmpty = function <T>(this: T[]) {
		return this.length > 0;
	};
}

if (!Array.prototype.remove) {
	Array.prototype.remove = function <T>(value: T) {
		const me = this as Array<T>;
		const index = me.findIndex((x: T) => x == value);
		if (index != -1) {
			me.splice(index, 1);
		}
		return index;
	};
}
