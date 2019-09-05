import { storiesOf } from "@storybook/react";
import React from "react";
import { AppRedux } from "./redux/AppRedux";
import { App as AppSimple } from "./simple/App";
import { createTodosService } from "./Todos.service";
import { AppView } from "./AppView";

const todosService = createTodosService(localStorage);

storiesOf("Writing / Observable State / Todos", module)
  // .add("Todo App Observer", () => <App todosService={todosService} />)
  .add("Todo App Observer Simple ", () => (
    <AppSimple todosService={todosService} />
  ))
  .add("Todo App Observer (View)", () => (
    <AppView todosService={todosService} />
  ))
  .add("Todo App Redux", () => <AppRedux todosService={todosService} />);
