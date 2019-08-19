import React, { useMemo } from "react";
import { style } from "typestyle";
import { px } from "csx";

export function ViewState({
  label,
  value,
  maxLen = 28
}: {
  label: string;
  value: any;
  maxLen?: number;
}) {
  const valueString = useMemo(() => {
    const str = JSON.stringify(value);
    if (str.length < maxLen) {
      return str;
    } else {
      return str.slice(0, maxLen - 3) + "...";
    }
  }, [value]);
  return (
    <div
      className={style({
        background: "#C6D6DF",
        border: "4px solid #252D52",
        borderRadius: px(8),
        boxSizing: "border-box",
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        $nest: {
          "&:not(:first-child)": {
            marginTop: px(8)
          }
        }
      })}
    >
      <div style={{ position: "absolute", right: 0, bottom: 0 }}>
        <svg
          width="98"
          height="66"
          viewBox="0 0 98 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M97.9516 0.138434C113.701 0.50861 126.902 9.10054 140.604 16.2596C156.288 24.4545 176.488 29.4058 183.35 44.7588C190.299 60.3067 183.881 78.6429 175.067 93.3676C167.198 106.512 150.937 111.904 137.82 120.816C124.567 129.82 114.316 144.037 97.9516 145.758C80.9376 147.549 65.5802 138.025 50.8622 129.966C34.6371 121.082 16.8763 112.68 8.82825 96.9594C0.263041 80.2289 -2.69251 59.4309 6.27937 42.8821C14.9339 26.9186 36.3973 22.2782 53.6868 14.2167C67.9624 7.56048 81.9545 -0.237559 97.9516 0.138434Z"
            fill="#27302E"
            fill-opacity="0.1"
          />
        </svg>
      </div>
      <div
        className={style({
          fontSize: px(24),
          paddingLeft: px(18),
          paddingRight: px(16),
          fontFamily: "'Nunito Sans Black', 'Nunito Sans', sans-serif",
          fontWeight: 900,
        })}
      >
        {label}
      </div>
      <div
        className={style({
          fontWeight: 900,
          fontSize: px(13),
          fontFamily:
            "Monaco, Fira Code, Fira Code Retina, Hack, Consolas, monospace",
          background: "rgba(255, 255, 255, 0.79)"
        })}
      >
        <div style={{ padding: px(8), display: "inline-block" }}>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5607 3.27927L10.9393 0.470725C10.658 0.169327 10.2765 2.22883e-06 9.87869 0H1.5C0.671562 0 0 0.719531 0 1.60714V13.3929C0 14.2805 0.671562 15 1.5 15H12.5C13.3284 15 14 14.2805 14 13.3929V4.41569C14 3.98945 13.842 3.58067 13.5607 3.27927V3.27927ZM8.5 1.60714V4.28571H4.5V1.60714H8.5ZM12.3125 13.3929H1.6875C1.63777 13.3929 1.59008 13.3717 1.55492 13.334C1.51975 13.2963 1.5 13.2452 1.5 13.192V1.80804C1.5 1.75476 1.51975 1.70366 1.55492 1.66598C1.59008 1.62831 1.63777 1.60714 1.6875 1.60714H3V5.08929C3 5.53309 3.33578 5.89286 3.75 5.89286H9.25C9.66422 5.89286 10 5.53309 10 5.08929V1.73712L12.4451 4.35686C12.4625 4.37552 12.4763 4.39767 12.4857 4.42204C12.4952 4.44642 12.5 4.47255 12.5 4.49893V13.192C12.5 13.2452 12.4802 13.2963 12.4451 13.334C12.4099 13.3717 12.3622 13.3929 12.3125 13.3929V13.3929ZM7 6.69643C5.48366 6.69643 4.25 8.0182 4.25 9.64286C4.25 11.2675 5.48366 12.5893 7 12.5893C8.51634 12.5893 9.75 11.2675 9.75 9.64286C9.75 8.0182 8.51634 6.69643 7 6.69643ZM7 10.9821C6.31075 10.9821 5.75 10.3813 5.75 9.64286C5.75 8.90437 6.31075 8.30357 7 8.30357C7.68925 8.30357 8.25 8.90437 8.25 9.64286C8.25 10.3813 7.68925 10.9821 7 10.9821Z"
              fill="#252D52"
              fillOpacity="0.4"
            />
          </svg>
          <span style={{ marginLeft: px(8) }}>{valueString}</span>
        </div>
      </div>
    </div>
  );
}
