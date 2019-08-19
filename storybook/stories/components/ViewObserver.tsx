import { Observer } from "observer-react";
import React from "react";
import { Observable } from "rxjs";
import { ViewView } from "./ViewView";

export function ViewObserver<T>({
  label,
  of,
  next
}: {
  label: string;
  of: Observable<T>;
  next: (nextValue: T) => React.ReactNode;
}) {
  // lol
  let a = 0;
  return (
    <Observer
      of={of}
      next={nextValue => (
        <ViewView label={label} diff={[(a += 1)]}>
          {next(nextValue)}
        </ViewView>
      )}
    />
  );
}
