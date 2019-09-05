/**
 * Observable State presentation for React NYC
 */

import React, { useLayoutEffect } from "react";
import { Deck, Slide, Notes } from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import { cssRule, style, classes } from "typestyle";
import { SourceCode } from "../formatting/Demo";
import { DinosaurWall } from "./DinosaurWall";
import { dual, Dual } from "../../components/dual";
import { percent, em } from "csx";
import { TodosApp } from "../observable-state/todos/bloc-complex/TodosApp";
import { createTodosService } from "../observable-state/todos/Todos.service";
import { AppRedux } from "../observable-state/todos/redux/AppRedux";
import { Counter } from "../observable-state/counter/CounterReact";

const theme = createTheme(
  {
    primary: "black",
    secondary: "#f2f2f2",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const containStyles = style({
  maxHeight: 700,
  maxWidth: percent(100),
  overflow: "auto"
});

const todosService = createTodosService(localStorage);

export function ObservableStatePresentationSept2019() {
  useLayoutEffect(() => {
    cssRule("::selection", {
      background: "yellow",
      color: "black"
    });
  });

  return (
    <Deck
      theme={theme}
      transition={["fade"]}
      progress="none"
      transitionDuration={400}
    >
      <Slide>
        <h1>Observable State</h1>
        <small>Cole Lawrence</small>
        <Notes>
          Hello, my name is Cole Lawrence, and I'm here to talk about a state
          management pattern that I don't see much in React today.
        </Notes>
      </Slide>

      <Slide>
        <h1>Counter</h1>
        <Dual
          right={
            <SourceCode
              fontSize="1.5rem"
              source={require("!shiki-loader!../observable-state/counter/CounterReact.tsx")}
            />
          }
          left={
            <Reset className={style({ marginTop: em(6) })}>
              <Counter />
            </Reset>
          }
          ratio={0.2}
        />
        <Notes>I want to start off with a simple counter</Notes>
      </Slide>

      <Slide>
        <Reset>
          <AppRedux todosService={todosService} />
        </Reset>
        <Notes>Let's start with a basic TodoApp</Notes>
      </Slide>

      <Slide>
        <AppRedux todosService={todosService} />
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide>
        {/* <TodosApp></TodosApp> */}
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide>
        Let's start with a very basic TodoApp
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide className={style({ textAlign: "left" })}>
        <table>
          <tbody>
            <tr>
              <td style={{ position: "relative" }}>
                <div className={containStyles}>
                  <DinosaurWall />
                </div>
              </td>
              <td style={{ position: "relative" }}>
                <div className={containStyles}>
                  <SourceCode
                    source={require("!shiki-loader!./DinosaurWall.tsx")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Slide>

      <Slide className={style({ textAlign: "left" })}></Slide>
    </Deck>
  );
}

function Reset({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classes(
        className,
        style({
          background: "#f7f7f7",
          color: "black",
          padding: ".5em"
        })
      )}
    >
      {children}
    </div>
  );
}
