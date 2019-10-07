import React, { useMemo, useState } from "react";
import { storiesOf } from "@storybook/react";
import "behavior-state/react";
import { BehaviorSpring } from "behavior-state/spring";
import { combineLatest, Observable } from "rxjs";
import { FlashDot } from "../components/FlashDot";


storiesOf("Behavior Spring", module).add("Test Animation", () => (
  <SpringTest />
));

function SpringTest() {
  const [count, setCount] = useState(1);
  const $left = useMemo(
    () => new BehaviorSpring(0, { stiffness: 100, damping: 10 }),
    []
  );
  const $top = useMemo(
    () => new BehaviorSpring(0, { stiffness: 100, damping: 10 }),
    []
  );
  const $XY = useMemo(() => combineLatest($left, $top), [$left, $top]);

  return (
    <>
      <button
        onClick={() => setCount(1 + count)}
        children="Reconcile"
        style={{ position: "absolute", right: 0, top: 0, zIndex: 1 }}
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#2356aa",
          position: "absolute"
        }}
        onMouseMove={({ shiftKey, clientX, clientY }) => {
          if (!shiftKey) {
            $left.setDestinationAndForget(clientX),
              $top.setDestinationAndForget(clientY);
          }
        }}
        onClick={event => {
          Promise.all([
            $left.setDestination(event.clientX),
            $top.setDestination(event.clientY)
          ]).then(([leftCompleted, topCompleted]) => {
            if (leftCompleted && topCompleted) {
              $left.setDestination(0);
              $top.setDestination(0);
            }
          });
        }}
      >
        <FlashDot
          style={{ position: "absolute", zIndex: 1 }}
          key={Math.random()}
        />
        <$XY.react
          next={([left, top]) => (
            <span
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`
              }}
            >
              😀
            </span>
          )}
        />
      </div>
    </>
  );
}
