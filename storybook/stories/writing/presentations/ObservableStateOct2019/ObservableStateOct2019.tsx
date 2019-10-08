/**
 * Observable State presentation for React NYC
 */

import { em } from "csx";
import React, { useLayoutEffect } from "react";
import { Notes, Slide } from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import { cssRule, style } from "typestyle";
import { Dual } from "../../../components/dual";
import { SourceCode } from "../../formatting/Demo";
import { Counter } from "../../observable-state/counter/CounterReact";
import { AppRedux } from "../../observable-state/todos/redux/AppRedux";
import { createTodosService } from "../../observable-state/todos/Todos.service";
import { Intro } from "./00-Intro";
import { Ingredients } from "./02-Ingredients";
import { Reset } from "./Reset";
import { ToCDeck } from "./TableOfContentsDeck";
import { Overview } from "./01-Overview";
import TodoApp from "./TodoApp";

const theme = createTheme(
  {
    primary: "#030a13",
    secondary: "#f2f2f2",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const todosService = createTodosService(localStorage);

export function ObservableStateOct2019() {
  useLayoutEffect(() => {
    cssRule("::selection", {
      background: "yellow",
      color: "black"
    });
  });

  return (
    <ToCDeck
      theme={theme}
      transition={["fade"]}
      controls={false}
      showFullscreenControl={false}
      progress="none"
    >
      {...Intro}
      {...Overview}
      {/* <Slide
        key="Ingredients"
        bgImage="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1230&q=80"
      >
        <h1
          style={{
            backgroundColor: "rgba(0,50,0,0.5)",
            padding: "1rem 2rem",
            display: "inline-block"
          }}
        >
          Ingredients for great state management
        </h1>
      </Slide> */}
      {/* {...Ingredients} */}
      <Slide state="section-examples" key="Example Todo app" >
        <Reset>
          <TodoApp/>
        </Reset>
        <Notes>I want to look at the following app which takes these concepts just a little bit further</Notes>
      </Slide>

      {/* <Slide>
        <h1>Counter</h1>
        <Dual
          right={
            <SourceCode
              fontSize="1rem"
              source={require("!shiki-loader!../../observable-state/counter/CounterReact.tsx")}
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
        <Reset>
          <AppRedux todosService={todosService} />
        </Reset>
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide>
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide>
        Let's start with a very basic TodoApp
        <Notes>Let's start with a very basic TodoApp</Notes>
      </Slide>

      <Slide className={style({ textAlign: "left" })}></Slide> */}
    </ToCDeck>
  );
}
