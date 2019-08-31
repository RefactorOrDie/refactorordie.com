import { storiesOf } from "@storybook/react";
import React from "react";
import { AppRoot } from "./AppRoot";


storiesOf("Writing / Observable State / Todos", module)
  .add("Todo App (Complex)", () => <AppRoot/>)
