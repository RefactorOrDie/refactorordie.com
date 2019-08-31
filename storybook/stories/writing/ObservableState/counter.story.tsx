import { storiesOf } from "@storybook/react";
import React from "react";
import { CounterObservable1 } from "./CounterObservable1";
import { CounterObservable } from "./CounterObservable2";
import { Counter } from "./CounterReact";
import { Counter as CounterCompareToObservable } from "./CounterReactCompareToObservable";
import { Demo } from "../formatting/Demo";
import { em } from "csx";
import { dual } from "../../components/dual";
import { CounterClass } from "./CounterReactClass";
import { Container } from "../../components/Container";

const CounterReact$ = require("!shiki-loader!./CounterReact.tsx");
const CounterCompareToObservable$ = require("!shiki-loader!./CounterReactCompareToObservable.tsx");
const CounterObservable1$ = require("!shiki-loader!./CounterObservable1.tsx");
const CounterObservable2$ = require("!shiki-loader!./CounterObservable2.tsx");
const CounterReactClass$ = require("!shiki-loader!./CounterReactClass.tsx");

storiesOf("Writing / ObservableState", module)
  .add("Counter (Hooks)", () => (
    <Demo title="Counter" source={CounterReact$}>
      <Example>
        <Counter />
      </Example>
    </Demo>
  ))
  .add("Counter (Observable v1)", () => (
    <>
      <Demo title="Counter (Observable v1)" source={CounterObservable1$}>
        <Example>
          <CounterObservable1 />
        </Example>
        <Notes>
          Notice that this does <em>not</em> work, because adding the next value
          to the observable does not trigger a re-render. This is expected, and
          as we'll see in the next step, is a valuable property for managing
          performance.
        </Notes>
      </Demo>
    </>
  ))
  .add("Counter (Observable v2)", () => (
    <Demo title="Counter (Observable)" source={CounterObservable2$}>
      <Example>
        <CounterObservable />
      </Example>
      <Notes>
        Surrounding the count display with an <code>{"<Observer .../>"}</code>
        &nbsp; component will ensure that whenever <code>count</code> has a next
        value, that the{" "}
        <code style={{ whiteSpace: "nowrap" }}>{"next={value => ...}"}</code>{" "}
        render function will be executed.
      </Notes>
    </Demo>
  ))
  .add("Counter (Hooks vs Observable)", () =>
    dual(
      <Demo title="Counter" source={CounterCompareToObservable$} hideLinks>
        <Example>
          <CounterCompareToObservable />
        </Example>
      </Demo>,
      <Demo title="Counter (Observable)" source={CounterObservable2$}>
        <Example>
          <CounterObservable />
        </Example>
      </Demo>
    )
  )
  .add("Counter (Hooks vs Class)", () =>
    dual(
      <Demo
        title="Counter using React Class"
        source={CounterReactClass$}
        hideLinks
      >
        <Example>
          <CounterClass />
        </Example>
      </Demo>,
      <>
        <Demo title="Counter using Hooks" source={CounterReact$}>
          <Example>
            <Counter />
          </Example>
        </Demo>
        <PostDemoNotes>
          Ignoring the performance implications of new functions for{" "}
          <code>onClick</code> handlers; Hooks have already made our simple
          counter example vastly easier to manage and reason about. As we'll
          see, using the <code>{"<Observer .../>"}</code> component will look
          very similar with the added benefit of fine-grained control over
          rendering performance.
        </PostDemoNotes>
      </>
    )
  );

export function Example(props: { children: React.ReactNode }) {
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

function PostDemoNotes(props: { children: React.ReactNode }) {
  return (
    <Container>
      <p style={{ maxWidth: em(36) }} children={props.children} />
    </Container>
  );
}
