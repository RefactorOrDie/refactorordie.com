import React, { createContext, useContext } from "react";
import { TodoBloc } from "./TodoBloc";

const TodoBlocCtx = createContext<TodoBloc>((undefined as unknown) as TodoBloc);

export function useTodoBloc(): TodoBloc {
  return useContext(TodoBlocCtx);
}

export function provideTodoBloc(
  value: TodoBloc,
  node: React.ReactNode
): React.ReactNode {
  return <TodoBlocCtx.Provider value={value}>{node}</TodoBlocCtx.Provider>;
}
