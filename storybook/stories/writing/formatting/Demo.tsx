import React from "react";
import { style } from "typestyle";
import { em, px } from "csx";
import { Container } from "../../components/Container";

export function Demo(props: {
  source: string;
  title: string;
  hideLinks?: boolean;
  children: React.ReactNode;
}) {
  const href = window.location.href;
  const query = window.location.search;
  const hideCode = query.includes("hide-code");
  const hideDemo = query.includes("hide-demo");
  const hideLinks = props.hideLinks || query.includes("hide-links");
  return (
    <Container>
      <b>{props.title}</b>
      {!hideLinks && (
        <div className="float-right">
          <a target="_blank" href={href}>
            Frame
          </a>
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href={storybookLink(href)}>
            Storybook
          </a>
        </div>
      )}
      <br />
      {!hideDemo && props.children}
      {!hideCode && <SourceCode source={props.source} />}
    </Container>
  );
}

export function Story(props: {
  title: string;
  hideLinks?: boolean;
  children: React.ReactNode;
}) {
  const href = window.location.href;
  const query = window.location.search;
  const hideLinks = props.hideLinks || query.includes("hide-links");
  return (
    <Container>
      <b>{props.title}</b>
      {!hideLinks && (
        <div className="float-right">
          <a target="_blank" href={href}>
            Frame
          </a>
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href={storybookLink(href)}>
            Storybook
          </a>
        </div>
      )}
      <br />
      {props.children}
    </Container>
  );
}

export function SourceCode(props: {
  source: string;
  fontSize?: string | number;
}) {
  const query = window.location.search;
  const hideCode = query.includes("hide-code");
  return hideCode ? null : (
    <p
      className={style({
        borderRadius: px(4),
        fontSize: props.fontSize || undefined,
        textAlign: "left",
        overflow: "auto",
        margin: 0,
        marginBlockStart: 0,
        marginBlockEnd: 0,
        $nest: {
          pre: {
            padding: em(1),
            maxHeight: px(700),
          }
        }
      })}
      dangerouslySetInnerHTML={{ __html: props.source }}
    />
  );
}

function storybookLink(href: string): string {
  return href.replace(/^.+?id=/, "./?path=/story/");
}
