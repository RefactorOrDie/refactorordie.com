import React from "react";
import { storiesOf } from "@storybook/react";
import { App as App1 } from "./step01";

storiesOf("Demo", module)
  .add("Step 1", () => <App1/>)
