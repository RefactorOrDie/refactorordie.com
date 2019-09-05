import React from "react";
import { style, classes } from "typestyle";
import { px } from "csx";

export function dual(left: JSX.Element, right: JSX.Element, ratio = 0.5) {
  const leftWidth = Math.round(ratio * 12);
  return (
    <div
      className={
        "container-fluid " +
        style({
          $nest: {
            ".row>*": {
              marginTop: px(8)
            }
          }
        })
      }
    >
      <div className="row">
        <div className={"col-sm-" + leftWidth}>{left}</div>
        <div className={"col-sm-" + (12 - leftWidth)}>{right}</div>
      </div>
    </div>
  );
}

export function Dual(props: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  ratio?: number;
}) {
  const leftWidth = Math.round((props.ratio || 0.5) * 12);
  return (
    <div
      className={classes(
        "container-fluid",
        style({
          $nest: {
            ".row>*": {
              marginTop: px(8)
            }
          }
        }),
        props.className
      )}
    >
      <div className="row">
        <div className={"col-sm-" + leftWidth}>{props.left}</div>
        <div className={"col-sm-" + (12 - leftWidth)}>{props.right}</div>
      </div>
    </div>
  );
}
