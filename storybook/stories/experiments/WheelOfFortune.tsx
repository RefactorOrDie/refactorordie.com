import React from "react";
import { cssRaw } from "typestyle";

export const WheelOfFortune = () => (
  <div className="lottery">
    <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1">
      <defs>
        <circle id="path-1" cx="30" cy="30" r="30" />
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Path-2-+-Path-2-Copy-Mask">
          <mask id="mask-2" fill="white">
            <use xlinkHref="#path-1" />
          </mask>
          <use id="Mask" fill="#969696" xlinkHref="#path-1" />
          <polygon
            id="Path-2"
            fill="#D8D8D8"
            mask="url(#mask-2)"
            points="15 -14 46.0464865 -14 15 74 46.0464865 74"
          />
          <polygon
            id="Path-2-Copy"
            fill="#D8D8D8"
            mask="url(#mask-2)"
            transform="translate(30.000000, 30.023243) rotate(-270.000000) translate(-30.000000, -30.023243) "
            points="13.9767567 -13.9767567 46.0232433 -13.9767567 13.9767567 74.0232433 46.0232433 74.0232433"
          />
        </g>
      </g>
    </svg>
  </div>
);

cssRaw(`
.lottery {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
}
.lottery svg {
  -webkit-animation: spin-start 1s, spin .5s 1s 6 linear, spin-stop 3s 4s forwards ease-out;
          animation: spin-start 1s, spin .5s 1s 6 linear, spin-stop 3s 4s forwards ease-out;
  -webkit-transform-origin: center center;
          transform-origin: center center;
}
.lottery:after {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  height: 0;
  width: 0;
  margin-left: -5px;
  border-top: solid 10px black;
  border-left: solid 5px transparent;
  border-right: solid 5px transparent;
  -webkit-animation: arrow .5s 1s 8 linear, arrow-stop .5s 4s 6 forwards ease-out;
          animation: arrow .5s 1s 8 linear, arrow-stop .5s 4s 6 forwards ease-out;
}

@-webkit-keyframes spin-start {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
}

@keyframes spin-start {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes spin-stop {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  90% {
    -webkit-transform: rotate(422deg);
            transform: rotate(422deg);
  }
  100% {
    -webkit-transform: rotate(420deg);
            transform: rotate(420deg);
  }
}
@keyframes spin-stop {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  90% {
    -webkit-transform: rotate(422deg);
            transform: rotate(422deg);
  }
  100% {
    -webkit-transform: rotate(420deg);
            transform: rotate(420deg);
  }
}
@-webkit-keyframes arrow {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  80% {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
  80% {
    -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
  }
}
@keyframes arrow {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  80% {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
  80% {
    -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
  }
}
@-webkit-keyframes arrow-stop {
  0% {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
  50% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes arrow-stop {
  0% {
    -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg);
  }
  50% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
`);
