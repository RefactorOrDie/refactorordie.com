/**
 * Observable State presentation for React NYC
 */
import React from "react";
import { Notes, Slide } from "spectacle";

/** Section 0. Intro slides */
export const Intro = [
  <Slide
    state="intro-0"
    key="Introduction"
    bgImage="https://images.unsplash.com/photo-1570212049797-abc6e855dd3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  >
    <h1>Observable State</h1>
    <small>Cole Lawrence</small>
    <Notes>
      My name is Cole Lawrence, and I'm a product engineer and software designer
      based here in New York City. Thank you all for coming out and listening to
      my talk on state management.
      <br />
      <b>To start, just a little bit of background about myself,</b>I have
      worked with React on and off ever since it gained support in TypeScript
      1.6 in 2015 (four years ago) in several different contexts for different
      clients. TypeScript is my language of choice so most of my software
      designs are made with TypeScript in mind. That said, these tools are just
      as compatible in EcmaScript and you won't see any TypeScript in this
      presentation.
    </Notes>
  </Slide>
];
