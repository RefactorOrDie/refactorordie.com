import React, { useContext, createContext } from "react";
import { Behavior } from "behavior-state";
import "behavior-state/react";

// State container
const CountState = createContext({
  $num: new Behavior(1)
});

// App
export function Incrementer() {
  const state = useContext(CountState);
  return <>
    <StepBy by={5} />
    <StepBy by={1} />
    <div style={require("./incrementShowStyle")}>
      {/* The special sauce 💎 */}
      <state.$num.react />
    </div>
    <StepBy by={-1} />
    <StepBy by={-5} />
  </>;
}

function StepBy({ by }) {
  const state = useContext(CountState);
  return (
    <button onClick={() => 
      state.$num.next(state.$num.value + by)
    }>
      {by < 0 ? by : "+" + by}{" "}
    </button>
  );
}
