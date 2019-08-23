import React from "react";
import { TodosApp } from "./TodosApp";
import { TodosBlocCreator } from "./TodosBlocProvider";
import { TodosRepoCreator } from "./TodosRepoProvider";

export function AppRoot(_props: {}) {
  return (
    <TodosRepoCreator storage={localStorage}>
      <TodosBlocCreator>
        <TodosApp />
      </TodosBlocCreator>
    </TodosRepoCreator>
  );
}
