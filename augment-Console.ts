declare global {
	interface Console {
		JSON(
			value: any,
			replacer?: (this: any, key: string, value: any) => any,
			space?: string | number
		): void;
	}
}

if (!console.JSON) {
	console.JSON = function (
		value: any,
		replacer?: (this: any, key: string, value: any) => any,
		space?: string | number
	) {
		console.log(JSON.stringify(value, replacer, space ?? 2));
	};
}
