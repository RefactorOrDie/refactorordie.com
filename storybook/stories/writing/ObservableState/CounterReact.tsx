import React, { useState } from "react";

export function CounterReact() {
  const [counter, setCounter] = useState(1);

  return (
    <>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <span className="m-3">{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
}
