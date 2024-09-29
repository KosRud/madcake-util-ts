export type NonEmptyArray<T> = {
	/**
	 * Removes the last element from an array and returns it.
	 */
	pop(): T;
	/**
	 * Removes the first element from an array and returns it.
	 */
	shift(): T;
} & [T, ...T[]];

declare global {
	interface Array<T> {
		/**
		 * Determines whether the specified callback function returns true for any element of an array.
		 * @param predicate A function that accepts up to three arguments. The some method calls
		 * the predicate function for each element in the array until the predicate returns a value
		 * which is coercible to the Boolean value true, or until the end of the array.
		 * @param thisArg An object to which the this keyword can refer in the predicate function.
		 * If thisArg is omitted, undefined is used as the this value.
		 */
		some(
			predicate: (value: T, index: number, array: T[]) => unknown,
			thisArg?: any
		): this is NonEmptyArray<T>;
		isNotEmpty(): this is NonEmptyArray<T>;
	}
}

if (!Array.prototype.isNotEmpty) {
	Array.prototype.isNotEmpty = function <T>(this: T[]) {
		return this.length > 0;
	} as unknown as any;
}
