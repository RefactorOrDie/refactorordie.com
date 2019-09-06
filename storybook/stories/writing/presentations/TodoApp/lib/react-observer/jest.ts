import { Observable, Subscribable } from "rxjs";
import { ProtectedBloc } from "./protectBloc";

interface SpyOnObservable<T> extends Observable<T> {
  readonly latestValue: T;
  readonly nextValue: Promise<T>;
}

const NO_VALUE = Symbol("no value");

type SpyOnBloc<T> = {
  [P in keyof T]: T[P] extends Observable<infer R> ? SpyOnObservable<R> : T[P];
};

export function spyOnBloc<T>(bloc: ProtectedBloc<T>): SpyOnBloc<T> {
  const spyOn = { ...bloc };
  for (const key in bloc) {
    const value = bloc[key];
    if (value instanceof Observable) {
      // @ts-ignore
      spyOn[key] = spyOnObservable(value);
    }
  }
  // @ts-ignore
  return spyOn;
}

export function spyOnObservable<T>(obs: Observable<T>): SpyOnObservable<T> {
  let latestValue: T | typeof NO_VALUE = NO_VALUE;
  let nextResolver!: (value: T) => void;
  let nextPromise: Promise<T> = new Promise(
    resolve => (nextResolver = resolve)
  );

  obs.subscribe({
    next: value => {
      nextResolver(value);
      latestValue = value;
      nextPromise = new Promise(resolve => (nextResolver = resolve));
    }
  });

  Object.defineProperties(obs, {
    latestValue: {
      get() {
        jest.runOnlyPendingTimers();
        if (latestValue === NO_VALUE) {
          throw new Error("no latest value");
        } else {
          return latestValue;
        }
      }
    },
    nextValue: {
      get() {
        return nextPromise;
      }
    }
  });

  // @ts-ignore
  return obs;
}
