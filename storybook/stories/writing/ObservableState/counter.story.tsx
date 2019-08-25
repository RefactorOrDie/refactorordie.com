import { storiesOf } from "@storybook/react";
import React from "react";
import { CounterObservable1 } from "./CounterObservable1";
import { CounterObservable2 } from "./CounterObservable2";
import { CounterReact } from "./CounterReact";
import { Demo } from "../formatting/Demo";
import { em } from "csx";

const CounterReact$ = require("!shiki-loader!./CounterReact.tsx");
const CounterObservable1$ = require("!shiki-loader!./CounterObservable1.tsx");
const CounterObservable2$ = require("!shiki-loader!./CounterObservable2.tsx");

console.log(CounterReact$);

storiesOf("Writing / ObservableState", module)
  .add("Counter (React)", () => (
    <Demo title="Counter React" source={CounterReact$}>
      <Example>
        <CounterReact />
      </Example>
    </Demo>
  ))
  .add("Counter (Observable v1)", () => (
    <Demo title="Counter (Observable v1)" source={CounterObservable1$}>
      <Example>
        <CounterObservable1 />
      </Example>
      <Notes>
        Notice that this does <em>not</em> work, because adding the next value
        to the observable does not trigger a re-render. This is expected, and as
        we'll see in the next step, is a valuable property for managing
        performance.
      </Notes>
    </Demo>
  ))
  .add("Counter (Observable v2)", () => (
    <Demo title="Counter (Observable v2)" source={CounterObservable2$}>
      <Example>
        <CounterObservable2 />
      </Example>
      <Notes>
        Surrounding the counter display with an <code>{"<Observer .../>"}</code>&nbsp;
        component will ensure that whenever <code>counter</code> has a next
        value, that the <code style={{ whiteSpace: 'nowrap'}}>{"next={value => ...}"}</code> render function
        will be executed.
      </Notes>
    </Demo>
  ));

function Example(props: { children: React.ReactNode }) {
  return <div className="bg-white p-2 mt-1 mb-1" children={props.children} />;
}

function Notes(props: { children: React.ReactNode }) {
  return <p style={{ maxWidth: em(36) }} children={props.children} />;
}
