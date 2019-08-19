import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { dual } from "../components/dual";
import { ViewState } from "../components/ViewState";
import { changeValue } from "../utils";
import { style,cssRaw } from "typestyle";

storiesOf("Todos Notes", module).add("User Name Input", () => (
  <UserNameInputDemo />
));

function UserNameInputDemo() {
  // Here, we can use `useState` to create a managed value
  // for our "User Name" input.
  const [name, setName] = useState("");
  return dual(
    <input
      className="form-control"
      value={name}
      onChange={changeValue(setName)}
      placeholder="Input User Name..."
    />,
    <ViewState label="User Name" value={name} />
  );
}
