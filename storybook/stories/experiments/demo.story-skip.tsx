import React from "react";
import { storiesOf } from "@storybook/react";
import { App as App1 } from "./step01";
import { App as App2 } from "./step02/app";

storiesOf("Demo", module)
  // http://localhost:5888/iframe.html?id=demo--index
  .add("Index", () => <App1 />)
  // http://localhost:5888/iframe.html?id=demo--step-1
  .add("Step 1", () => <App1 />)
  // http://localhost:5888/iframe.html?id=demo--step-2
  .add("Step 2", () => <App2 />);
