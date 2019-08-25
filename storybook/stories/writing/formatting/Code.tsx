import React from "react";
import { style } from "typestyle";
import { em, px } from "csx";

export function Code(props: { source: string }) {
  return (
    <p
      className={style({

        borderRadius: px(4),
        overflow: "auto",
        $nest: {
          pre: {
            padding: em(1)
          }
        }
      })}
      dangerouslySetInnerHTML={{ __html: props.source }}
    />
  );
}
