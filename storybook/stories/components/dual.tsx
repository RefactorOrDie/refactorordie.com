import { px } from "csx";
import React from "react";
import { classes, style } from "typestyle";

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
/** Table version of Dual */
export function DualT(props: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  ratio?: number;
}) {
  const leftWidth = Math.round((props.ratio || 0.5) * 100);
  return (
    <table
      className={classes(
        style({
          width: "100%",
          tableLayout: 'fixed',
          position: "relative",
          $nest: {
            p: { margin: 0 },
            "pre.shiki": {
              overflow: "auto"
            }
          }
        }),
        props.className
      )}
    >
      <tr>
        <td style={{ overflow: "auto", width: leftWidth * 10 + 'px' }}>
          {props.left}
        </td>
        <td>{props.right}</td>
      </tr>
    </table>
  );
}
