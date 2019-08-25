import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";
import { Observer } from "observer-react";

export function CounterObservable2() {
  const counter = useMemo(() => new BehaviorSubject(1), []);

  return (
    <>
      <button
        className="btn"
        title="Subtract 1"
        onClick={() => counter.next(counter.value - 1)}
      >
        -
      </button>
      {/* This <Observer/> component will rerender when
          `counter` has a next value. */}
      <Observer
        of={counter}
        next={counterValue => <div className="btn">{counterValue}</div>}
      />

      {/* Since we've isolated the part of our UI that
          should update when `counter` is given a next value,
          this button will no longer be reconciled for changes */}
      <button
        className="btn"
        title="Add 1"
        onClick={() => counter.next(counter.value + 1)}
      >
        +
      </button>
    </>
  );
}
