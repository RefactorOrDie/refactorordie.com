import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";

export function CounterObservable1() {
  const count = useMemo(() => new BehaviorSubject(1), []);

  return (
    <>
      <button onClick={() => count.next(count.value - 1)}>-</button>
      <span style={{ margin: "1em" }}>{count.value}</span>
      <button onClick={() => count.next(count.value + 1)}>+</button>
    </>
  );
}
