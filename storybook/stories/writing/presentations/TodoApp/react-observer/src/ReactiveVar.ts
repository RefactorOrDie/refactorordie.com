import { DependencyList, useEffect, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export class ReactiveVar<T> extends BehaviorSubject<T> {}

export function useReactiveVar<T = unknown>(
  initialValue: T | (() => T),
  deps: DependencyList = []
): ReactiveVar<T> {
  const obs = useMemo(
    () =>
      new ReactiveVar(
        initialValue instanceof Function ? initialValue() : initialValue
      ),
    deps
  );

  useEffect(() => {
    return () => obs.unsubscribe();
  }, deps);

  return obs;
}

export default useReactiveVar;
