import React from "react";
import { classes, style } from "typestyle";

/** Reset the styles of this slide */
export function Reset({
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
          fontSize: "18px",
          padding: ".5em"
        })
      )}
    >
      {children}
    </div>
  );
}
