import { storiesOf } from "@storybook/react";
import "behavior-state/react";
import React from "react";
import { Story } from "../writing/formatting/Demo";
import { createECSState } from "./ecs-common/state";
import { ECSView } from "./ecs-common/view";
import { data } from "./ecs-common/data";

storiesOf("Storyscript / Architecture", module).add(
  "Entity Component System",
  () => {
    const state = createECSState(data);
    return (
      <Story title="Entity Component System">
        <ECSView state={state} />
      </Story>
    );
  }
);
