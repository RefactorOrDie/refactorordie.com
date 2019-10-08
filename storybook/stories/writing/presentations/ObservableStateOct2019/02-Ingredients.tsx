/**
 * Observable State presentation for React NYC
 */
import React from "react";
import { Notes, Slide, List, ListItem } from "spectacle";

/** Section 2. Ingredients slides */
export const Ingredients = [
  <Slide state="section-ing-1" key="💎 The Secret Sauce" bgImage="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1230&q=80">
    <h1>UI and State</h1>
    <small>Cole Lawrence</small>
    <Notes>
      Hello, my name is Cole Lawrence, and I'm going to talk about state
      management.
    </Notes>
  </Slide>,
  <Slide state="ing-2" key="Application State">
    <h1>Application</h1>
    <List>
      <ListItem>Services</ListItem>
      <ListItem>
        Application
      </ListItem>
      <ListItem>View</ListItem>
    </List>
    <Notes>
      Hello, my name is Cole Lawrence, and I'm going to talk about state
      management.
    </Notes>
  </Slide>,
  <Slide state="ing-3" key="View State">
    <h1>View</h1>
    <small>Everything from currency</small>
    <Notes>
      Hello, my name is Cole Lawrence, and I'm going to talk about state
      management.
    </Notes>
  </Slide>
];
