import React, { useMemo } from "react";
import { createBloc, useBloc } from "../../../../bloc/strict";
import { createTodosBloc, TodosBloc } from "./TodosBloc";
import { useTodosRepo } from "./TodosRepoProvider";

const TodosBlocCtx = createBloc<TodosBloc>();

export const useTodosBloc = () => useBloc(TodosBlocCtx);

export function TodosBlocCreator(props: { children: React.ReactNode }) {
  const service = useTodosRepo();
  const todoBloc = useMemo(() => createTodosBloc(service), []);
  return <TodosBlocCtx.Provider value={todoBloc} children={props.children} />;
}
