import { useLayoutEffect, useMemo, useState } from "react";
import { keyframes } from "typestyle";
import { KeyFrames } from "typestyle/lib/types";

/**
 * Create an animation name that can be restarted
 * @param keyFrames animation keyframes
 * @param diff restart animation if any of these parameters change
 */
export function useAnimationName(keyFrames: KeyFrames, diff: any[]): string {
  const animNames = useMemo(() => {
    let n = keyFrames["0%"] || keyFrames["from"] || keyFrames["0"] || null;
    if (n == null)
      n = keyFrames["from"] = {
        opacity: 1
      };
    if (n != null && typeof n === "object") {
      n.opacity = 1 - Math.random() * 0.0001;
      const a = keyframes({ ...keyFrames });
      n.opacity = 1 - Math.random() * 0.0001;
      const b = keyframes({ ...keyFrames });
      n.opacity = 1 - Math.random() * 0.0001;
      const c = keyframes({ ...keyFrames });
      return [a, b, c];
    }
    return [];
  }, [keyFrames]);
  const [iter, setIter] = useState(0);

  useLayoutEffect(() => {
    setIter(iter + 1);
  }, diff);

  return animNames[iter % 3];
}
