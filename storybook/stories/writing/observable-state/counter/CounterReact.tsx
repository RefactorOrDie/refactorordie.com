import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(1);

  return (
    <>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span style={{ margin: "1em" }}>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
