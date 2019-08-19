import React from "react";
import { style } from "typestyle";
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
