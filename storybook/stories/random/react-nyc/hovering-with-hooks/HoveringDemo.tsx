import React from 'react'
import { useHovering } from './useHovering';

export function HoveringDemo() {
  const [hovering, hoverListeners] = useHovering();

  return (
    <div {...hoverListeners}>{hovering ? "is hovering" : "is not hovering"}</div>
  );
}
