function Increment({ by }) {
  const stepBy = by || 1;
  return <button
    onClick={() => alert("Clicked Increment")}
  >
    + {stepBy}
  </button>;
}

// Used as
<Increment by={2} />;
