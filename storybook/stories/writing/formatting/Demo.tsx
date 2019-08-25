import React from "react";
import { style } from "typestyle";
import { em, px } from "csx";
import { Container } from "../../components/Container";

export function Demo(props: {
  source: string;
  title: string;
  children: React.ReactNode;
}) {
  const href = window.location.href;
  const query = window.location.search;
  const hideCode = query.includes("hide-code");
  const hideDemo = query.includes("hide-demo");
  const hideLinks = query.includes("hide-links");
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
      {!hideCode && (
        <p
          className={style({
            borderRadius: px(4),
            overflow: "auto",
            $nest: {
              pre: {
                padding: em(1)
              }
            }
          })}
          dangerouslySetInnerHTML={{ __html: props.source }}
        />
      )}
    </Container>
  );
}

function storybookLink(href: string): string {
  return href.replace(/^.+?id=/, "./?path=/story/");
}
