import { storiesOf } from "@storybook/react";
import React from "react";
import { ObservableStatePresentationSept2019 } from "./ObservableStatePresentationSept2019";
// @ts-ignore
import TodoApp from "./TodoApp/TodoApp.jsx";
import { style } from "typestyle";
import { em } from "csx";

storiesOf("Writing / Observable State / Presentations", module)
  .add("React NYC, Sept 2019", () => (
    <ObservableStatePresentationSept2019/>
  ))
  .add("React NYC, Sept 2019 / Todo App", () => (
    <div className={style({ $nest: {
      '.container': {
        maxWidth: em(24)
      }
    }})}>
      <TodoApp/>
    </div>
  ))
