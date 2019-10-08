const A = createContext("default");

function ShowA() {
  const a = useContext(A)
  return <div>{a}</div>
}
