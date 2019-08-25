import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";
import { Observer } from "observer-react";

export function CounterObservable2() {
  const counter = useMemo(() => new BehaviorSubject(1), []);

  return (
    <>
      <button onClick={() => counter.next(counter.value - 1)}>-</button>

      {/* This <Observer/> component will rerender when
          `counter` has a next value. */}
      <Observer
        of={counter}
        next={counterValue => <span style={{ margin: "1em" }}>{counterValue}</span>}
      />

      {/* Since we've isolated the part of our UI that
          should update when `counter` is given a next value,
          this button will no longer be reconciled for changes */}
      <button onClick={() => counter.next(counter.value + 1)}>+</button>
    </>
  );
}
