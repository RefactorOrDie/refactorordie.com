import { storiesOf } from "@storybook/react";
import "behavior-state/react";
import React from "react";
import { Story } from "../writing/formatting/Demo";
import { createECSState, systemData } from "./ecs-common/state";
import { ECSView } from "./ecs-common/view";

storiesOf("Storyscript / Architecture", module).add(
  "Entity Component System",
  () => {
    const state = createECSState({
      allComponents: [
        { id: 0, label: "UID" },
        { id: 1, label: "ChildOf" },
        { id: 2, label: "ParentIndex" },
        { id: 3, label: "SiblingIndex" }
      ],
      allSystems: [
        systemData(0, "uid_indexing", {
          viewComponentIds: [0],
          viewMutUniqueIds: [0]
        }),
        systemData(1, "tree_indexing", {
          viewComponentIds: [1],
          viewMutComponentIds: [2, 3]
        })
      ],
      allUniques: [
        {
          id: 0,
          label: "UIDLookup"
        }
      ]
    });
    return (
      <Story title="Entity Component System">
        <ECSView state={state} />
      </Story>
    );
  }
);
