/**
 * Observable State presentation for React NYC
 */
import React from "react";
import { Notes, Slide, List, ListItem } from "spectacle";

/** Section 1. Intro slides */
export const Intro = [
  <Slide state="intro-1" key="Hello">
    <h1>Observable State</h1>
    <small>Cole Lawrence</small>
    <Notes>
      Hello, my name is Cole Lawrence, and I'm going to talk about state
      management.
    </Notes>
  </Slide>,
  <Slide state="intro-2" key="What is State?">
    <p><em style={{ color: 'yellow'}}>State</em> is the particular condition that something is in at a specific time.</p>
    <Notes>
      State is defined as the condition that our app is in at a specific time.
    </Notes>
  </Slide>,
  // <Slide state="intro-3" key="Categorizing State">
  //   <List>
  //     <ListItem>Services</ListItem>
  //     <ListItem>
  //       Application
  //     </ListItem>
  //     <ListItem>View</ListItem>
  //   </List>
  //   <Notes>
  //     State is defined as the condition that our app is in at a specific time.
  //   </Notes>
  // </Slide>
];
