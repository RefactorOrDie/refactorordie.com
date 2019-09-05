import { DependencyList } from "react";
import useReactiveVar, { ReactiveVar } from "./ReactiveVar";

/**
 * `useObservable` creates an `ReactiveVar` using the return of the function provided as the initial value.
 * `useObservable` will recompute the memoized value when one of the `deps` has changed.
 *
 * ```js
 * function Component () {
 *   const changingValue = useObservable("")
 *   return ...
 * }
 * ```
 *
 * ```js
 * function expensiveInitialValue() { ... }
 *
 * function Component () {
 *   const changingValue = useObservable(expensiveInitialValue, [expensiveInitialValue])
 *   return ...
 * }
 * ```
 *
 * @version 0.0.6
 */
export function useObservable<T = unknown>(
  initialValue: T | (() => T),
  deps: DependencyList = []
): ReactiveVar<T> {
  return useReactiveVar(initialValue, deps);
}

export default useObservable;
