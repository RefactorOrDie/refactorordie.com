import { Subject, Observable } from "rxjs";

type ProtectedBloc<T> = {
  [P in keyof T]: T[P] extends Subject<infer R> ? Observable<R> : T[P];
};

type BlocInput = {
  [propertyOrAction: string]: ((...args: any[]) => void) | Observable<unknown>;
};

export function protectBloc<T extends BlocInput>(bloc: T): ProtectedBloc<T> {
  const protect = { ...bloc };
  for (const key in bloc) {
    const value = bloc[key];
    if (value instanceof Subject) {
      // @ts-ignore
      protect[key] = value.asObservable();
    }
  }
  // @ts-ignore
  return protect;
}
