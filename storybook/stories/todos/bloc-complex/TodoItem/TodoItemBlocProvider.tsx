import React, { useMemo, useState } from "react";
import { createBloc, useBloc } from "../../../bloc/strict";
import { createTodoItemBloc, TodoItemBloc } from "./TodoItemBloc";
import { useTodosRepo } from "../TodosRepoProvider";

const TodoItemBlocCtx = createBloc<TodoItemBloc>();

export const useTodoItemBloc = () => useBloc(TodoItemBlocCtx);

export function TodoItemBlocCreator(props: {
  todoId: string;
  children: React.ReactNode;
}) {
  const todosRepo = useTodosRepo();
  const todoItemBloc = usePromise(
    () => createTodoItemBloc(todosRepo, props.todoId),
    [props.todoId]
  );

  return todoItemBloc.state === "complete" ? (
    <TodoItemBlocCtx.Provider
      value={todoItemBloc.value}
      children={props.children}
    />
  ) : (
    <></>
  );
}

export type PromiseHook<T> =
  | { state: "loading" }
  | { state: "complete"; value: T }
  | { state: "error"; err: any };

export function usePromise<T>(
  execute: () => Promise<T>,
  dependencies: any[]
): PromiseHook<T> {
  const [result, setResult] = useState<PromiseHook<T>>({ state: "loading" });
  useMemo(
    () =>
      execute()
        .then(value => setResult({ state: "complete", value }))
        .catch(err => setResult({ state: "error", err })),
    dependencies
  );
  return result;
}
