import { DependencyList, useEffect, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export class Behavior<T> extends BehaviorSubject<T> {}

/**
 * `useBehavior` creates a `Behavior` using the return of the function provided as the initial value.
 * `useBehavior` will recompute the memoized value when one of the `deps` has changed.
 *
 * ```js
 * function Component () {
  *   const changingValue = useBehavior("")
  *   return ...
  * }
  * ```
  *
  * ```js
  * function expensiveInitialValue() { ... }
  *
  * function Component () {
  *   const changingValue = useBehavior(expensiveInitialValue, [expensiveInitialValue])
  *   return ...
  * }
  * ```
  *
  * @version 0.0.6
  */
export function useBehavior<T = unknown>(
  initialValue: T | (() => T),
  deps: DependencyList = []
): Behavior<T> {
  const obs = useMemo(
    () =>
      new Behavior(
        initialValue instanceof Function ? initialValue() : initialValue
      ),
    deps
  );

  useEffect(() => {
    return () => obs.unsubscribe();
  }, deps);

  return obs;
}

export default useBehavior;
