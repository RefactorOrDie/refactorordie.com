import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export function CounterObservable1() {
  const counter = useMemo(() => new BehaviorSubject(1), []);

  return (
    <>
      <button onClick={() => counter.next(counter.value - 1)}>-</button>
      <span style={{ margin: "1em" }}>{counter.value}</span>
      <button onClick={() => counter.next(counter.value + 1)}>+</button>
    </>
  );
}
