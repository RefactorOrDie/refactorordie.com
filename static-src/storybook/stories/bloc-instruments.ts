import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export type Bloc = {
  // inputs and outputs only
  [property: string]: Observable<any> | ((...args: any[]) => void);
};

type Report = {
  fn(name: string, args: any[]): void;
  next(name: string, value: any): void;
};

export function createReporter(name: string): Report {
  const log = console.log.bind(console, `[Report ${name}]`)
  return {
    fn(name, args) {
      log('fn', name, args)
    },
    next(name, value) {
      log('next', name, value)
    }
  }
}

export function instrument(report: Report): <T extends Bloc>(b: T) => T {
  return bloc => {
    const updatedBloc = bloc;

    for (const key in updatedBloc) {
      const propertyValue = updatedBloc[key];
      if (propertyValue instanceof Observable) {
        // @ts-ignore tough call
        updatedBloc[key] = propertyValue.pipe(
          tap(val => report.next(key, val))
        );
      } else if (typeof propertyValue === "function") {
        const newFn = function(originalFn: any, ...args: any[]) {
          report.fn(key, args)
          return originalFn(...args)
        }.bind(updatedBloc, propertyValue)
        // @ts-ignore tough call
        updatedBloc[key] = newFn
      }
    }

    return updatedBloc;
  };
}
