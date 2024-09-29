export function useDefer<T>(
	fn: (defer: (fnToDefer: () => void) => void) => T
): T {
	const deferred: (() => void)[] = [];
	try {
		return fn((fnToDefer) => {
			deferred.push(fnToDefer);
		});
	} catch (e) {
		throw e;
	} finally {
		runDeferredQueue(deferred);
	}
}

function runDeferredQueue(deferred: (() => void)[] = []) {
	deferred.reverse();
	deferred.forEach(function (deferredFn) {
		deferredFn();
	});
}
