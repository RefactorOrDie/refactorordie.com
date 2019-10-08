import { Behavior } from "behavior-state";
const $a = new Behavior("initial value");
$a.next("new value");

// React component
<$a.react
  // on every render
  next={value => "a = " + value}
/>;
