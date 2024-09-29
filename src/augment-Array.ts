import { NonEmptyArray } from './Array.ts';

declare global {
	interface Array<T> {
		isNotEmpty(): this is NonEmptyArray<T>;
	}
}

if (!Array.prototype.isNotEmpty) {
	Array.prototype.isNotEmpty = function <T>(this: T[]) {
		return this.length > 0;
	} as unknown as any;
}
