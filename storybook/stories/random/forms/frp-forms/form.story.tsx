import { storiesOf } from "@storybook/react";
import React from "react";
import { SourceCode, Story } from "../../../writing/formatting/Demo";
import { Example } from "../../../writing/observable-state/counter/counter.story";
import { FormDemo } from "./FormDemo";

storiesOf("Random / Forms", module)
  .add("Reactive Forms", () => (
    <Story title="useHovering">
      <Example>
        <FormDemo />
      </Example>
      <SourceCode source={require("!shiki-loader!./FormDemo.tsx")} />
    </Story>
  ));
