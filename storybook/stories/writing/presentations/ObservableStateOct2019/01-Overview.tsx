/**
 * Observable State presentation for React NYC
 */
import "behavior-state/react";
import { rem } from "csx";
import React from "react";
import { List, ListItem, Notes, Slide } from "spectacle";
import { style } from "typestyle";
import { $logs, clearLogs, continueWait } from ".";
import { DualT } from "../../../components/dual";
import { SourceCode } from "../../formatting/Demo";
import { run } from "./Overview/01-RxJS";
import { Incrementer } from "./Overview/Behavior-React";
import { ContextExample } from "./Overview/Context";
import { ContextExample2 } from "./Overview/Context2";
import { FN_COUNTER_EXAMPLE } from "./Overview/Fn-Counter-use";
import { Reset } from "./Reset";

const BehaviorSlides = ({ show2 }: { show2?: boolean }) => (
  <>
    <p style={{ opacity: show2 ? 0.9 : 1 }}>
      <em style={{ color: "yellow" }}>State</em> is the particular condition
      that something is in at a specific time.
    </p>
    <p style={{ visibility: show2 ? "visible" : "hidden" }}>
      <SourceCode
        fontSize="1.5rem"
        source={require("!shiki-loader!./Overview/Behavior-Class.jsx")}
      />
      {/* <em style={{ color: "yellow" }}>Behavior</em> is a class we are going to
      use to keep track of a value that changes over time.
      <br />
      <small>
        AKA: <code>BehaviorSubject</code> in RxJS
      </small> */}
    </p>
  </>
);

/** Section 1. Overview */
export const Overview = [
  <Slide state="section-overview-1" key="Background">
    <h1>Definitions</h1>
    <List>
      <ListItem>Functional Components</ListItem>
      <ListItem>Behavior &amp; State</ListItem>
      <ListItem>React.useContext hook</ListItem>
      <ListItem>useContext + <code>behavior-state</code></ListItem>
    </List>
    <Notes>
      Since many of my projects were written for TypeScript teams, it often felt
      like Redux was more in the way when it came to type-checking than it was
      beneficial. So, as a result, I've experimented with many state management
      libraries and often hand rolled my team's state tooling. Over the course
      of many projects and some recent experience with Flutter / Dart, I'd like
      to share some novel state management techniques that leverage the brevity
      of combining Functional Components, useContext, and my own Behavior-State
      library.
      <br />
      To get us started I wanted to do a quick refresher on each of these topics
      and how we can put them together to create a simple counter.
    </Notes>
  </Slide>,
  <Slide state="overview-fn" key="Functional Components">
    {/* <DualT
      left={
        <SourceCode
          fontSize="1.5rem"
          source={require("!shiki-loader!./Overview/Fn-TodoItem.jsx")}
        />
      }
      right={
        <>
          <Reset children={TODO_ITEM_EXAMPLE} />
        </>
      }
      ratio={0.7}
    /> */}
    <h2>&lt;Increment/&gt;</h2>
    <DualT
      left={
        <SourceCode
          fontSize="1.5rem"
          source={require("!shiki-loader!./Overview/Fn-Counter.jsx")}
        />
      }
      right={<Reset children={FN_COUNTER_EXAMPLE} />}
      ratio={0.7}
    />
    <Notes>
      Quickly here, functional components allow us to easily define a component
      using a simple function which returns a React.Element
      <br />
      So, in our example, when we click this increment button, we'll get an alert.
      <br />
      The primary advantage to defining components functionally is that it
      starts to remove a lot of the boilerplate required by plain class based
      React Components.
      <br />
      This ought to look simple, because it is.
    </Notes>
  </Slide>,
  <Slide state="overview-2" key="Behavior &amp; State">
    <BehaviorSlides />
    <Notes>
      In English, "State" is defined as the condition that something is in at a
      specific time.
      <br />
      For us on the front-end, "state" is a set many different values that
      change over time that will determine what is shown to the user.
      <br />
      In order to model values over time, we are going to look at a class from
      my "behavior-state" package.
    </Notes>
  </Slide>,
  <Slide state="overview-2">
    <BehaviorSlides show2 />
    <Notes>
      <em style={{ color: "yellow" }}>Behavior</em> is a class we are going to
      use to keep track of a value that changes over time.
      <br />
      This comes from a package I'm working on called{" "}
      <code>behavior-state</code>
      <br />
      For those familiar with RxJS, <code>Behavior</code> extends the RxJS{" "}
      <code>BehaviorSubject</code> class.
    </Notes>
  </Slide>,
  <Slide state="behavior-example" key="Behavior Example">
    <h3>Behavior Example</h3>
    <StepperBehaviorExample />
    <Notes>So lets walk through this a little bit</Notes>
  </Slide>,
  <Slide state="overview-final-usecontext" key="useContext">
    <DualT
      left={
        <SourceCode
          fontSize="1.5rem"
          source={require("!shiki-loader!./Overview/Context.jsx")}
        />
      }
      right={
        <Reset>
          <ContextExample />
        </Reset>
      }
      ratio={0.5}
    />
    <Notes>
      <i>Talk through how context and providers can override each other</i>
    </Notes>
  </Slide>,
  <Slide state="overview-final-usecontext">
    {/* Version 2 nested */}
    <DualT
      left={
        <SourceCode
          fontSize="1.5rem"
          source={require("!shiki-loader!./Overview/Context2.jsx")}
        />
      }
      right={
        <Reset>
          <ContextExample2 />
        </Reset>
      }
      ratio={0.5}
    />
    <Notes>
      Expanding on the example, as we nest things, we can provide different
      values and override context values as we build out our tree.
    </Notes>
  </Slide>,
  <Slide
    state="overview-putting-things-together"
    key="Putting it all together"
  >
    <div
      className={style({
        textAlign: "left",
        $nest: { p: { margin: 0 } }
      })}
    >
      <DualT
        left={
          <SourceCode
            fontSize="1.5rem"
            source={require("!shiki-loader!./Overview/Behavior-React.jsx")}
          />
        }
        right={<Incrementer />}
        ratio={.7}
      />
    </div>
    <Notes>
      With these few concepts we have everything we need to start managing state
    </Notes>
  </Slide>,
  <Slide state="overview-final-summary" key="Summary">
    <div
      className={style({
        textAlign: "left",
        $nest: { p: { margin: 0 } }
      })}
    >
      {/* <SourceCode
        fontSize="1.5rem"
        source={require("!shiki-loader!./Overview/summary-fn.jsx")}
      /> */}
      <div style={{ fontSize: rem(2) }}>Behavior &amp; State</div>
      <SourceCode
        fontSize="1.5rem"
        source={require("!shiki-loader!./Overview/summary-beh-react.jsx")}
      />

      <div style={{ fontSize: rem(2) }}>
        useContext
      </div>
      <SourceCode
        fontSize="1.5rem"
        source={require("!shiki-loader!./Overview/summary-context.jsx")}
      />
    </div>
    <Notes>
      In summary, we are able to combine these simple primitives to create our state manager.
      <br/>
      We can use behaviors to manage changing values, and their complimentary <code>.react</code> extension to create a component which actually rerenders on change
      <br/>
      This has the benefit of very fine grained control over when and where we need to re-render our virtual dom are.
      <br/>
      We then can use the useContext hook to pass our state manager around in our application.
      <br/>
      <i>emphasizes editor helper compatibility one last time.</i>
    </Notes>
  </Slide>
];

function StepperBehaviorExample() {
  clearLogs();
  run();

  return (
    <DualT
      left={
        <SourceCode
          fontSize="1.5rem"
          source={sourceStepper(
            require("!shiki-loader!./Overview/01-RxJS.jsx")
          )}
        />
      }
      right={
        <div style={{ paddingLeft: rem(3) }}>
          <LogPrinter />
        </div>
      }
      ratio={0.5}
    />
  );
}

function sourceStepper(sourceHTML: string): string {
  clearLogs();
  run();
  const id =
    "_Stepper" +
    Math.random()
      .toString(26)
      .slice(2);

  function highlightNext() {
    const next = document.getElementsByClassName(id).item(0);
    if (next instanceof HTMLElement) {
      next.innerText = "⏳";
      next.parentElement!.dataset.here = "1";
      dimPrevious(next);
    }
  }

  function dimPrevious(next: HTMLElement) {
    for (const prev of Array.from(
      next.parentElement!.parentElement!.children!
    )) {
      // @ts-ignore
      prev.style.opacity = "0.3";
    }
    for (const prev of Array.from(
      next.parentElement!.parentElement!.children!
    )) {
      // @ts-ignore
      prev.style.opacity = "1";
      // @ts-ignore
      if (prev.dataset.here) break;
    }
    for (const prev of Array.from(
      next.parentElement!.parentElement!.children!
    )) {
      // @ts-ignore
      if (prev.innerText === "function") break;
      // @ts-ignore
      prev.style.opacity = "0.5";
    }
  }

  setTimeout(highlightNext, 1000);

  window[id] = function(target) {
    target.innerText = "✅";
    target.className = "";
    delete target.parentElement!.dataset.here;
    continueWait();
    highlightNext();
    dimPrevious(target);
  };
  return sourceHTML.replace(
    /1000/g,
    `<button class="${id}" onClick="${id}(this)" style="padding: 0rem .5rem; border: none; width: 2.2em; background-color: transparent; font-size: .85em;"></button>`
  );
}

function LogPrinter() {
  return (
    <$logs.react
      next={logs => (
        <SourceCode
          fontSize="1.5rem"
          source={logs
            .map(
              line =>
                `<code style="${styleForLogLine(line[0])}">` +
                line[0] +
                "</code>"
            )
            .join("<br/>")}
        />
      )}
    />
  );
}

function styleForLogLine(line: string): string {
  return `font-style: ${line[0] === "w" ? "italic" : "normal"}; opacity: ${
    line[0] === "w" ? "0.5" : "1"
  }; color: ${/^@|next/.test(line) ? "lawngreen" : ""}`;
}
