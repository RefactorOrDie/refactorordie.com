import React from "react";
import { flash } from "./flash";
import { useAnimationName } from "./useAnimationName";

export function FlashDot(props: {
  color?: string;
  style?: React.CSSProperties;
}) {
  const anim = useAnimationName(
    {
      "0%": {
        backgroundColor: "yellow"
      },
      "30%": {
        backgroundColor: "lawngreen"
      },
      "100%": {
        backgroundColor: "green"
      }
    },
    []
  );
  return (
    <div
      style={{
        animationDuration: ".5s",
        animationFillMode: "forwards",
        border: "3px solid lawngreen",
        backgroundColor: "yellow",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        ...(props.style || {}),
        animationName: anim
      }}
    />
  );
}
