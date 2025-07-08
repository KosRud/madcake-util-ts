/// <reference path="./augment-Array.d.ts" />

import { sameValueZero } from '../main/util';

function uniqueUnsorted<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
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
    if (result.length != 0 && comparator(result[result.length - 1], value)) {
      continue;
    }
    result.push(value);
  }
  return result;
}

if (!Array.prototype.unique) {
  Array.prototype.unique = function <T>(isSorted?: boolean, comparator?: (a: T, b: T) => boolean) {
    const comparatorGuaranteed = comparator ?? sameValueZero;

    if (!isSorted) {
      return uniqueUnsorted(this, comparatorGuaranteed);
    }

    return uniqueSorted(this, comparatorGuaranteed);
  };
}

if (!Array.prototype.uniqueByHash) {
  Array.prototype.uniqueByHash = function <T, H>(
    getHash?: (value: T, index: number, array: T[]) => H,
  ) {
    if (!getHash) {
      return this.unique();
    }

    const seenHashes = new Set();
    const result: Array<any> = [];
    for (const [index, value] of this.entries()) {
      const hash = getHash(value, index, this);
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
