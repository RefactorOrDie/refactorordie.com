import React, { createContext, useContext } from 'react'

const A = createContext("default");

export function ContextExample() {
  return <>
    <ShowA/>
    <br/>
    <A.Provider value="Hello ReactNYC">
      <ShowA/>
    </A.Provider>
  </>
}

function ShowA() {
  const value = useContext(A)
  return <div>
    A: {value}
  </div>
}
