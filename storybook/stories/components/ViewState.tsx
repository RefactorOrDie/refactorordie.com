import { px, em } from "csx";
import React, { useMemo } from "react";
import { style } from "typestyle";
import { useAnimationName } from "./useAnimationName";
import { flash } from "./flash";
import { Observable } from "rxjs";
import { Observer } from "observer-react";

export function ViewObservableState({
  label,
  value,
  maxLen,
  maxLines
}: {
  label: string;
  value: Observable<any>;
  maxLen?: number;
  maxLines?: number;
}) {
  return (
    <Observer
      of={value}
      next={value => (
        <ViewState
          label={label}
          value={value}
          maxLen={maxLen}
          maxLines={maxLines}
        />
      )}
    />
  );
}

export function ViewState({
  label,
  value,
  maxLen = 28,
  maxLines = 1
}: {
  label: string;
  value: any;
  maxLen?: number;
  maxLines?: number;
}) {
  const valueString = useMemo(() => {
    const str = JSON.stringify(value);
    const max = maxLen * maxLines;
    if (str.length < max) {
      return str.replace(/\},\{/g, "},\n{");
    } else {
      return str.slice(0, max - 3) + "...";
    }
  }, [value]);

  const flashAnimName = useAnimationName(flash("#252D52"), [valueString]);

  return (
    <div
      style={{
        animationName: flashAnimName
      }}
      className={style({
        textAlign: "left",
        animationDuration: "2s",
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
          paddingBottom: px(4),
          fontFamily: "'Nunito Sans Black', 'Nunito Sans', sans-serif",
          fontWeight: 900
        })}
      >
        {label}
        <div className="float-right" style={{ marginLeft: px(8) }}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.1213 6.12131L21.8787 0.878687C21.3161 0.316077 20.553 4.16048e-06 19.7574 0H3C1.34312 0 0 1.34312 0 3V25C0 26.6569 1.34312 28 3 28H25C26.6569 28 28 26.6569 28 25V8.24263C28 7.44698 27.6839 6.68392 27.1213 6.12131ZM17 3V8H9V3H17ZM24.625 25H3.375C3.27554 25 3.18016 24.9605 3.10983 24.8902C3.03951 24.8198 3 24.7245 3 24.625V3.375C3 3.27554 3.03951 3.18016 3.10983 3.10984C3.18016 3.03951 3.27554 3 3.375 3H6V9.5C6 10.3284 6.67156 11 7.5 11H18.5C19.3284 11 20 10.3284 20 9.5V3.24263L24.8902 8.13281C24.925 8.16764 24.9526 8.20898 24.9715 8.25448C24.9903 8.29998 25 8.34875 25 8.398V24.625C25 24.7245 24.9605 24.8198 24.8902 24.8902C24.8198 24.9605 24.7245 25 24.625 25ZM14 12.5C10.9673 12.5 8.5 14.9673 8.5 18C8.5 21.0327 10.9673 23.5 14 23.5C17.0327 23.5 19.5 21.0327 19.5 18C19.5 14.9673 17.0327 12.5 14 12.5ZM14 20.5C12.6215 20.5 11.5 19.3785 11.5 18C11.5 16.6215 12.6215 15.5 14 15.5C15.3785 15.5 16.5 16.6215 16.5 18C16.5 19.3785 15.3785 20.5 14 20.5Z"
              fill="#252D52"
              fill-opacity="0.4"
            />
          </svg>
        </div>
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
          <div
            style={{
              padding: px(8),
              maxWidth: em(maxLen),
              wordBreak: "break-word"
            }}
          >
            {valueString}
          </div>
        </div>
      </div>
    </div>
  );
}
