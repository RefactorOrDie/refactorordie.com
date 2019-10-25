import { storiesOf } from "@storybook/react";
import React from "react";
import { ObservableStateOct2019 } from "./ObservableStateOct2019/ObservableStateOct2019";
import TodoApp from "./ObservableStateOct2019/TodoApp";
import { style } from "typestyle";
import { em } from "csx";
import createTodoState from "./ObservableStateOct2019/TodoApp/src/app/TodoState";
import { createTodo } from "./ObservableStateOct2019/TodoApp/src/helpers";
import { TodoState } from "./ObservableStateOct2019/TodoApp/src/app/TodoApp";

const todoAppStyles = style({
  $nest: {
    ".container": {
      maxWidth: em(24),
      paddingTop: em(2)
    }
  }
});

storiesOf("Writing / Observable State / Presentations", module)
  .add("React NYC, Oct 2019", () => <ObservableStateOct2019 />)
  .add("React NYC, Oct 2019 / Todo App", () => (
    <div className={todoAppStyles}>
      <TodoApp />
    </div>
  ))
  .add("React NYC, Oct 2019 / Todo App (10,000 items)", () => {
    const todoState = createTodoState(
      Array(10000)
        .fill(null)
        .map((_, idx) => createTodo("Item " + idx))
    );
    return (
      <div className={todoAppStyles}>
        <TodoState.Provider value={todoState}>
          <TodoApp />
        </TodoState.Provider>
      </div>
    );
  });
