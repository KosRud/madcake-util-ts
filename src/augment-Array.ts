import { NonEmptyArray } from './Array.ts';

declare global {
	interface Array<T> {
		isNotEmpty(): this is NonEmptyArray<T>;
		/**
		 * Removes the first occurrence of a value in an array, returns its index or -1 if it was not present.
		 * @param value The value to be removed.
		 */
		remove(value: T): void;
	}
}

if (!Array.prototype.isNotEmpty) {
	Array.prototype.isNotEmpty = function <T>(this: T[]) {
		return this.length > 0;
	} as unknown as any;
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
