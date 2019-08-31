import { storiesOf } from "@storybook/react";
import React from "react";
import { SourceCode, Story } from "../../../writing/formatting/Demo";
import { Example } from "../../../writing/observable-state/counter/counter.story";
import { HoveringDemo } from "./HoveringDemo";

storiesOf("Random / ReactNYC", module)
  .add("Hovering with Hooks", () => (
    <Story title="useHovering">
      <Example>
        <HoveringDemo />
      </Example>
      <SourceCode source={require("!shiki-loader!./HoveringDemo.tsx")} />
      <SourceCode source={require("!shiki-loader!./useHovering.ts")} />
    </Story>
  ));
