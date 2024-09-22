type EventMap = { Basic?: string[]; Custom?: Record<string, object> };

type EventHandler<T extends Event> = (ev: T) => void;

// deno-lint-ignore no-unused-vars
const symbolSrict = Symbol('strict'); // for branding

interface StrictEvent<T extends string> extends Event {
	symbolSrict: T; // type only, for branding
}

interface StrictCustomEvent<T extends string, K extends object>
	extends CustomEvent<K> {
	symbolSrict: T; // type only, for branding
}

interface StrictEventTarget<T extends EventMap> extends EventTarget {
	addEventListener<K extends NonNullable<T['Basic']>[number]>(
		type: K,
		listener:
			| EventHandler<StrictEvent<K>>
			| { handleEvent: EventHandler<StrictEvent<K>> }
			| null,
		options?: boolean | AddEventListenerOptions
	): void;

	addEventListener<K extends keyof T['Custom']>(
		type: K,
		listener:
			| EventHandler<
					StrictCustomEvent<K & string, NonNullable<T['Custom']>[K]>
			  >
			| { handleEvent: EventHandler<Event> }
			| null,
		options?: boolean | AddEventListenerOptions
	): void;

	dispatchEvent<
		K extends
			| NonNullable<T['Basic']>[number]
			| keyof NonNullable<T['Custom']>
	>(
		event: StrictEvent<K & string>
	): boolean;
}

export function strictEvents<T extends EventMap>() {
	return [EventTarget, Event, CustomEvent] as unknown as [
		new () => StrictEventTarget<T>,
		new <K extends NonNullable<T['Basic']>[number]>(
			type: K
		) => StrictEvent<K>,
		new <K extends keyof T['Custom']>(
			type: K,
			eventInitDict: NonNullable<T['Custom']>[K]
		) => StrictCustomEvent<K & string, NonNullable<T['Custom'][K]>>
	];
}
