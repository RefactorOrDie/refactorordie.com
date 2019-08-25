import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export function CounterObservable1() {
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
      <div className="btn">{counter.value}</div>
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
