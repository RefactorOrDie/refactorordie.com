import React, { useMemo } from "react";
import { createRepo, useRepo } from "../../../../bloc/strict";
import { createTodosRepo, TodosRepo } from "./TodosRepo";

const TodosRepoCtx = createRepo<TodosRepo>();

export const useTodosRepo = () => useRepo(TodosRepoCtx);

export function TodosRepoCreator(props: {
  storage: Storage;
  children: React.ReactNode;
}) {
  const todosRepo = useMemo(() => createTodosRepo(props.storage), []);
  return <TodosRepoCtx.Provider value={todosRepo} children={props.children} />;
}
