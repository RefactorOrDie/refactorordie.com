import { storiesOf } from "@storybook/react";
import React from "react";
import { CounterObservable1 } from "./CounterObservable1";
import { CounterObservable2 } from "./CounterObservable2";
import { CounterReact } from "./CounterReact";
import { Demo } from "../formatting/Demo";
import { em } from "csx";
import { dual } from "../../components/dual";
import { CounterReactClass } from "./CounterReactClass";
import { Container } from "../../components/Container";

const CounterReact$ = require("!shiki-loader!./CounterReact.tsx");
const CounterObservable1$ = require("!shiki-loader!./CounterObservable1.tsx");
const CounterObservable2$ = require("!shiki-loader!./CounterObservable2.tsx");
const CounterReactClass$ = require("!shiki-loader!./CounterReactClass.tsx");

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
        Surrounding the counter display with an <code>{"<Observer .../>"}</code>
        &nbsp; component will ensure that whenever <code>counter</code> has a
        next value, that the{" "}
        <code style={{ whiteSpace: "nowrap" }}>{"next={value => ...}"}</code>{" "}
        render function will be executed.
      </Notes>
    </Demo>
  ))
  .add("Counter React (Hooks vs Class)", () =>
    dual(
      <Demo
        title="Counter using React Class"
        source={CounterReactClass$}
        hideLinks
      >
        <Example>
          <CounterReactClass />
        </Example>
      </Demo>,
      <>
        <Demo title="Counter using Hooks" source={CounterReact$}>
          <Example>
            <CounterReact />
          </Example>
        </Demo>
        <Container>
          <Notes>
            Ignoring the performance implications of new functions for{" "}
            <code>onClick</code> handlers; Hooks have already made our simple
            components vastly easier to manage and reason about. As we'll see,
            using the <code>{"<Observer .../>"}</code> component will feel
            cleaner in a similar way.
          </Notes>
        </Container>
      </>
    )
  );

function Example(props: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white p-2 mt-1 mb-1 d-inline-block"
      children={props.children}
    />
  );
}

function Notes(props: { children: React.ReactNode }) {
  return <p style={{ maxWidth: em(36) }} children={props.children} />;
}
