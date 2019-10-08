import { Behavior } from "behavior-state";
import { log, wait } from "../";

export async function run() {
  // initial value = 1
  const count = new Behavior(1);
  await wait(1000);

  count.subscribe(nextValue => {
    log("nextValue: " + nextValue);
  });

  await wait(1000);
  count.next(2);

  await wait(1000);
  count.next(count.value * 5);

  await wait(1000);
  count.next(count.value * 5);
}
