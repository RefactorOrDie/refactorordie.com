import React from "react";
import { style } from "typestyle";
import { Dual } from "../../components/dual";
import { BoxView, ECSState } from "./state";

const tileLayoutClass = style({
  padding: `.2em 1em .2em .2em`,
  display: "inline-block",
  background: "#dbdbdb",
  cursor: "pointer",
  margin: ".5rem"
});

export const ECSView = ({ state }: { state: ECSState }) => (
  <Dual
    left={
      <>
        <h2>Systems</h2>
        <state.$systems.react
          nextItem={system => (
            <Box
              boxView={system}
              onFocus={() => state.focusOnSystem(system.id)}
            />
          )}
        />
        <br />
        <br />
        <br />
        <small>
          <button onClick={state.clearFocus}>clear</button>
        </small>
      </>
    }
    right={
      <>
        <h2>Components</h2>
        <state.$componentStorages.react
          nextItem={component => (
            <Box
              boxView={component}
              onFocus={() => state.focusOnComponentStorage(component.id)}
            />
          )}
        />
        <h2>Unique Values</h2>
        <state.$uniqueStorages.react
          nextItem={unique => (
            <Box
              boxView={unique}
              onFocus={() => state.focusOnUniqueStorage(unique.id)}
            />
          )}
        />
      </>
    }
  />
);

function Box(props: { boxView: BoxView; onFocus: () => void }) {
  return (
    <div
      className={tileLayoutClass}
      style={
        props.boxView.focused
          ? {
              background: `hsl(${props.boxView.focused.hue}, 90%, 50%)`
            }
          : props.boxView.accessDirect
          ? {
              background: `hsl(${props.boxView.accessDirect.hue}, 90%, 75%)`
            }
          : props.boxView.accessSecondary
          ? {
              background: `hsl(${props.boxView.accessSecondary.hue}, 90%, 90%)`
            }
          : undefined
      }
      onMouseEnter={props.onFocus}
    >
      {props.boxView.accessDirect ? (
        <>
          {props.boxView.accessDirect.write
            ? Write28(props.boxView.accessDirect.hue)
            : Read28(props.boxView.accessDirect.hue)}
        </>
      ) : (
        Empty28()
      )}
      <span>&nbsp;&nbsp;{props.boxView.label}</span>
    </div>
  );
}

function Write28(hue: number) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill={`hsl(${hue}, 90%, 60%)`} />
      <path
        d="M9.72 18.4563L11.481 17.9483L22.084 7.21833C22.1676 7.13263 22.2142 7.01747 22.2136 6.89772C22.2131 6.77797 22.1654 6.66325 22.081 6.57833L21.446 5.93633C21.405 5.89417 21.3559 5.8606 21.3018 5.83759C21.2477 5.81458 21.1895 5.80258 21.1306 5.8023C21.0718 5.80203 21.0135 5.81347 20.9591 5.83597C20.9048 5.85846 20.8554 5.89156 20.814 5.93333L10.239 16.6353L9.719 18.4553L9.72 18.4563ZM22.703 4.66433L23.338 5.30733C24.214 6.19433 24.222 7.62533 23.354 8.50333L12.428 19.5613L8.664 20.6453C8.4342 20.7097 8.18826 20.6802 7.98016 20.5634C7.77206 20.4466 7.6188 20.252 7.554 20.0223C7.50578 19.8572 7.50509 19.6818 7.552 19.5163L8.647 15.6763L19.544 4.64733C19.7512 4.43869 19.9979 4.2734 20.2696 4.16109C20.5414 4.04878 20.8328 3.9917 21.1269 3.99319C21.4209 3.99468 21.7117 4.05471 21.9823 4.16976C22.2529 4.28482 22.4979 4.4526 22.703 4.66333V4.66433ZM11.184 5.81733C11.68 5.81733 12.082 6.22433 12.082 6.72633C12.0828 6.845 12.0602 6.96266 12.0155 7.07259C11.9708 7.18251 11.9048 7.28255 11.8214 7.36697C11.738 7.45139 11.6388 7.51854 11.5294 7.56459C11.42 7.61064 11.3027 7.63468 11.184 7.63533H7.592C6.6 7.63533 5.796 8.44933 5.796 9.45233V20.3583C5.796 21.3623 6.6 22.1763 7.592 22.1763H18.368C19.36 22.1763 20.165 21.3623 20.165 20.3583V16.7233C20.165 16.2213 20.567 15.8143 21.063 15.8143C21.559 15.8143 21.961 16.2213 21.961 16.7243V20.3583C21.961 22.3663 20.352 23.9943 18.368 23.9943H7.592C5.608 23.9943 4 22.3663 4 20.3583V9.45233C4 7.44533 5.608 5.81733 7.592 5.81733H11.184V5.81733Z"
        fill={`hsl(${hue}, 90%, 10%)`}
      />
    </svg>
  );
}

function Empty28() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill={`hsla(0, 0%, 0%, 4%)`} />
    </svg>
  );
}

function Read28(hue: number) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill={`hsl(${hue}, 90%, 60%)`} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 16C9.53043 16 10.0391 15.7893 10.4142 15.4143C10.7893 15.0392 11 14.5305 11 14C11 13.4696 10.7893 12.9609 10.4142 12.5858C10.0391 12.2108 9.53043 12 9 12C8.46957 12 7.96086 12.2108 7.58579 12.5858C7.21071 12.9609 7 13.4696 7 14C7 14.5305 7.21071 15.0392 7.58579 15.4143C7.96086 15.7893 8.46957 16 9 16V16ZM12.465 12C12.0675 11.3124 11.4744 10.7587 10.7612 10.4092C10.048 10.0597 9.24693 9.93039 8.45998 10.0376C7.67302 10.1449 6.93577 10.4838 6.34206 11.0113C5.74836 11.5389 5.32504 12.2312 5.126 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4805 3 13.7348 3 14C3 14.2653 3.10536 14.5196 3.29289 14.7071C3.48043 14.8947 3.73478 15 4 15H5.126C5.37173 15.9405 5.95136 16.7594 6.75667 17.3038C7.56198 17.8482 8.53791 18.0809 9.50222 17.9585C10.4665 17.836 11.3533 17.3667 11.997 16.6383C12.6406 15.9099 12.9972 14.9721 13 14H15C14.999 14.9743 15.3537 15.9154 15.9974 16.6468C16.6411 17.3781 17.5295 17.8494 18.496 17.9721C19.4625 18.0949 20.4406 17.8606 21.2467 17.3134C22.0528 16.7662 22.6314 15.9436 22.874 15H24C24.2652 15 24.5196 14.8947 24.7071 14.7071C24.8946 14.5196 25 14.2653 25 14C25 13.7348 24.8946 13.4805 24.7071 13.2929C24.5196 13.1054 24.2652 13 24 13H22.874C22.675 12.2312 22.2516 11.5389 21.6579 11.0113C21.0642 10.4838 20.327 10.1449 19.54 10.0376C18.7531 9.93039 17.952 10.0597 17.2388 10.4092C16.5256 10.7587 15.9325 11.3124 15.535 12H12.465V12ZM17 14C17 14.5305 17.2107 15.0392 17.5858 15.4143C17.9609 15.7893 18.4696 16 19 16C19.5304 16 20.0391 15.7893 20.4142 15.4143C20.7893 15.0392 21 14.5305 21 14C21 13.4696 20.7893 12.9609 20.4142 12.5858C20.0391 12.2108 19.5304 12 19 12C18.4696 12 17.9609 12.2108 17.5858 12.5858C17.2107 12.9609 17 13.4696 17 14Z"
        fill={`hsl(${hue}, 90%, 10%)`}
      />
    </svg>
  );
}
