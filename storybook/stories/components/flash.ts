import { KeyFrames } from "typestyle/lib/types";

const defaultActiveColor = "#0174ea";

export const flash = (
  borderColor: string,
  activeColor = defaultActiveColor
): KeyFrames => ({
  "0%": {
    color: activeColor,
    borderColor: activeColor,
    boxShadow: `0 0 10px ${activeColor}`
  },
  "30%": {
    color: "black",
    borderColor,
    boxShadow: `0 0 0px ${borderColor}`
  },
  "100%": {
    borderColor
  }
});
