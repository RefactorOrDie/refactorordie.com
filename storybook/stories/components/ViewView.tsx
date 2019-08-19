import { px } from "csx";
import React from "react";
import { style } from "typestyle";
import { flash } from "./flash";
import { useAnimationName } from "./useAnimationName";

export function ViewView({
  label,
  diff,
  children
}: {
  label: string;
  diff: any[];
  children: React.ReactNode;
}) {
  const flashAnimName = useAnimationName(flash("#9E0072", "#9E0072"), diff);

  return (
    <div
      style={{
        animationName: flashAnimName
      }}
      className={style({
        textAlign: "left",
        animationDuration: "2s",
        background: "#F5BBF0",
        border: "4px solid #9E0072",
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
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <svg
          width="99"
          height="33"
          viewBox="0 0 99 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128.503 102.333C113.404 107.534 95.8617 106.455 78.6925 106.49C59.039 106.53 37.0324 110.261 21.4918 102.552C5.75384 94.7447 1.0001 80.4869 0.642042 67.7717C0.322413 56.4214 12.5057 47.26 19.6423 36.8745C26.8526 26.382 28.1513 13.5038 42.5974 6.71705C57.6169 -0.339151 77.7458 0.606279 96.4062 0.810659C116.977 1.03597 138.716 0.414243 155.594 7.95466C173.556 15.9796 188.618 28.6144 189.904 42.5816C191.144 56.0549 173.602 66.5204 162.021 77.7896C152.46 87.0944 143.84 97.051 128.503 102.333Z"
            fill="#233C10"
            fillOpacity="0.1"
          />
        </svg>
      </div>
      <div
        className={style({
          fontSize: px(24),
          color: "#9E0072",
          paddingLeft: px(18),
          paddingRight: px(16),
          paddingBottom: px(4),
          fontFamily: "'Nunito Sans Black', 'Nunito Sans', sans-serif",
          fontWeight: 900
        })}
      >
        {label}
        <span className="float-right">
          <svg
            width="28"
            height="22"
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3752 11C10.3752 11.9283 10.7439 12.8185 11.4003 13.4749C12.0567 14.1313 12.9469 14.5 13.8752 14.5C14.8034 14.5 15.6937 14.1313 16.3501 13.4749C17.0064 12.8185 17.3752 11.9283 17.3752 11C17.3752 10.0717 17.0064 9.1815 16.3501 8.52513C15.6937 7.86875 14.8034 7.5 13.8752 7.5C12.9469 7.5 12.0567 7.86875 11.4003 8.52513C10.7439 9.1815 10.3752 10.0717 10.3752 11ZM27.4439 10.1938C24.4814 3.95313 20.0033 0.8125 14.0002 0.8125C7.99393 0.8125 3.51893 3.95312 0.556431 10.1969C0.437604 10.4485 0.375977 10.7233 0.375977 11.0016C0.375977 11.2798 0.437604 11.5546 0.556431 11.8062C3.51893 18.0469 7.99706 21.1875 14.0002 21.1875C20.0064 21.1875 24.4814 18.0469 27.4439 11.8031C27.6846 11.2969 27.6846 10.7094 27.4439 10.1938ZM13.8752 16.5C10.8377 16.5 8.37518 14.0375 8.37518 11C8.37518 7.9625 10.8377 5.5 13.8752 5.5C16.9127 5.5 19.3752 7.9625 19.3752 11C19.3752 14.0375 16.9127 16.5 13.8752 16.5Z"
              fill="#9E0072"
            />
          </svg>
        </span>
      </div>
      <div
        className={style({
          background: "rgba(255, 255, 255, 0.79)"
        })}
      >
        <div
          style={{
            padding: px(8),
            position: "relative",
            zIndex: 1
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
