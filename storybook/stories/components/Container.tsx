import React, { HTMLAttributes } from "react";
import { px } from "csx";

export function Container({ children, ...props }: React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className="container-fluid" style={{ marginTop: px(8) }} children={children} {...props}/>;
}
