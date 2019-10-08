import { storiesOf } from "@storybook/react";
import React from "react";
import { ObservableStateOct2019 } from "./ObservableStateOct2019/ObservableStateOct2019";
import TodoApp from "./ObservableStateOct2019/TodoApp";
import { style } from "typestyle";
import { em } from "csx";

storiesOf("Writing / Observable State / Presentations", module)
  .add("React NYC, Oct 2019", () => (
    <ObservableStateOct2019/>
  ))
  .add("React NYC, Oct 2019 / Todo App", () => (
    <div className={style({ $nest: {
      '.container': {
        maxWidth: em(24),
        paddingTop: em(2),
      }
    }})}>
      <TodoApp/>
    </div>
  ))
