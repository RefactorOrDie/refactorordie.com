import { useEffect, DependencyList } from "react";

type RouteTriggeredFn = (path: string, prev?: string) => void;

type RouteConfiguration =
  | RouteTriggeredFn
  | {
      enter: RouteTriggeredFn;
      leave: RouteTriggeredFn;
      /** must start with `/` to be triggered */
      [path: string]: RouteConfiguration;
    };

const dloc = document.location;

function dlocHashEmpty() {
  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
  // assumes both mean empty.
  return dloc.hash === "" || dloc.hash === "#";
}

type LeaveListener = (next: string, prev: string) => void;
/** returns leave listener if necessary*/
type EnterListener = (path: string, prev: string) => void | LeaveListener;

function useRouter(routes: () => RouteConfiguration, deps: DependencyList) {
  useEffect(() => {
    const listeners: EnterListener[] = [];
    const leaveListeners: LeaveListener[] = [];
    const currentHash = { val: dlocHashEmpty() ? "/" : dloc.hash };
    const rc = routes();
    if (rc instanceof Function) {
      listeners.push((next, prev) => {
        if (next === "/") {
          rc(next, prev);
        }
      });
    } else {
      if (rc.enter) {
        // add to listeners for enter events
      }
      for (const key in rc) {
        key;
      }
    }
  }, deps);
}
