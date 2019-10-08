import React from "react";

function Increment({ by }) {
  const stepBy = by || 1;
  return <button onClick={() => alert("Clicked Increment")}>
    + {stepBy}
  </button>;
}

// Used as
export const FN_COUNTER_EXAMPLE = <Increment by={2} />;
