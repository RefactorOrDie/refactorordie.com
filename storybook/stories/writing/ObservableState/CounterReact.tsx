import React, { useState } from "react";

export function CounterReact() {
  const [counter, setCounter] = useState(1);

  return (
    <>
      <button
        className="btn"
        title="Subtract 1"
        onClick={() => setCounter(counter - 1)}
      >
        -
      </button>
      <div className="btn">{counter}</div>
      <button
        className="btn"
        title="Add 1"
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
    </>
  );
}
