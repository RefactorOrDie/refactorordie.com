import React, { createContext, useContext } from "react";

const A = createContext("default");

export function ContextExample2() {
  return <>
    <ShowA />
    <br />
    <A.Provider value="Hello ReactNYC">
      <ShowA />
      <br />
      <A.Provider value="Nested">
        <ShowA />
      </A.Provider>
      <br />
      <ShowA />
    </A.Provider>
  </>;
}

function ShowA() {
  const value = useContext(A);
  return <div>A = {value}</div>;
}
