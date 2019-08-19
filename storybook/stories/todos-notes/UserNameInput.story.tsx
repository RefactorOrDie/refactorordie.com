import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { dual } from "../components/dual";
import { ViewState } from "../components/ViewState";
import { changeValue } from "../utils";
import { ViewView } from "../components/ViewView";

storiesOf("Todos Notes", module).add("User Name Input", () => (
  <UserNameInputDemo />
));

function UserNameInputDemo() {
  // Here, we can use `useState` to create a managed value
  // for our "User Name" input.
  const [name, setName] = useState("");
  return dual(
    <ViewView label="Name Input" diff={[name]}>
      <input
        className="form-control"
        value={name}
        onChange={changeValue(setName)}
        placeholder="Input User Name..."
      />
    </ViewView>,
    <ViewState label="User Name" value={name} />
  );
}
