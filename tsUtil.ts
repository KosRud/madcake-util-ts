export type Enum = { [key: string]: number };

export type EnumValue<T extends Enum> = T[keyof T];

export type DeepReadonly<T> = T extends { [k in keyof T]: T[k] }
	? { readonly [k in keyof T]: DeepReadonly<T[k]> }
	: T;

export function deepReadonly<T>(value: T) {
	return value as DeepReadonly<T>;
}

export * from './src/Array.ts';
