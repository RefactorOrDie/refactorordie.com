import React, { useState } from "react";

export function CounterReact() {
  const [counter, setCounter] = useState(1);

  return (
    <>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <span style={{ margin: "1em" }}>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
}
