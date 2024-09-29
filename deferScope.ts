export function deferScope(
	fn: (defer: (fnToDefer: () => void) => void) => void
) {
	const deferred: (() => void)[] = [];
	let thrown = false,
		err: unknown = null;
	try {
		fn((fnToDefer) => {
			deferred.push(fnToDefer);
		});
	} catch (e) {
		thrown = true;
		err = e;
	} finally {
		deferred.reverse();
		deferred.forEach(function (deferredFn) {
			deferredFn();
		});
		if (thrown) {
			// deno-lint-ignore no-unsafe-finally
			throw err;
		}
	}
}
