import { DependencyList, useEffect, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export class Behavior<T> extends BehaviorSubject<T> {}

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
