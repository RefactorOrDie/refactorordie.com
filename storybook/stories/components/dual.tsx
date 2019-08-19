import React from "react";
import { Container } from "./Container";

export function dual(left: JSX.Element, right: JSX.Element, ratio = .5) {
  const leftWidth = Math.round(ratio * 12);
  return (
    <Container>
      <div className="row">
        <div className={"col-sm-" + leftWidth}>{left}</div>
        <div className={"col-sm-" + (12 - leftWidth)}>{right}</div>
      </div>
    </Container>
  );
}
