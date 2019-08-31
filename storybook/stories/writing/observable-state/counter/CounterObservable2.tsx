import React, { useMemo } from "react";
import { BehaviorSubject } from "rxjs";
import { Observer } from "observer-react";

export function CounterObservable() {
  // useMemo to create the BehaviorSubject once
  const count = useMemo(() => new BehaviorSubject(1), []);

  return (
    <>
      <button onClick={() => count.next(count.value - 1)}>-</button>

      <Observer
        of={count}
        // `next` rerenders count display when `count` has a next value.
        next={countValue => <span style={{ margin: "1em" }}>{countValue}</span>}
      />

      <button onClick={() => count.next(count.value + 1)}>+</button>
    </>
  );
}
