export const isModule = true; // empty export does not survive tree-shaking

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
      getHash?: (value: T, index: number, array: T[]) => H,
    ): T[];
  }
}
