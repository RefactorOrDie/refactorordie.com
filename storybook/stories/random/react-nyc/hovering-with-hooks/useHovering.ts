import { useState, useMemo } from "react";

export function useHovering() {
  const [hovering, setHovering] = useState(false);
  const eventListeners = useMemo(
    () => ({
      onMouseEnter() {
        setHovering(true);
      },
      onMouseLeave() {
        setHovering(false);
      }
    }),
    []
  );

  // for JavaScript, just remove "as ..."
  return [hovering, eventListeners] as [boolean, typeof eventListeners];
}
