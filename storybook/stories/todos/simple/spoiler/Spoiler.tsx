import React from "react";
import { Observable } from "rxjs";
import { Observer } from "observer-react";

export function Spoiler({
  isOpen,
  children
}: React.PropsWithChildren<{ isOpen: Observable<boolean> }>) {
  return <Observer of={isOpen} next={isOpen => isOpen && children} />;
}
