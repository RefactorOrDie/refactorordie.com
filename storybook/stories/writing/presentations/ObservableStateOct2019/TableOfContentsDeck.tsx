/**
 * Observable State presentation for React NYC
 */

import { BehaviorArray } from "behavior-state";
import React, { useMemo } from "react";
import { Deck, DeckProps } from "spectacle";
import { style } from "typestyle";

export function ToCDeck(props: { children: React.ReactNode } & DeckProps) {
  const $tableOfContents = useMemo(
    () => new BehaviorArray(ToCFromSlides(props.children)),
    [props.children]
  );
  const showTableOfContents = !/export|presenter|hide-table|hide-toc/.test(
    location.hash
  );

  return (
    <table style={{ position: "absolute", width: "100%", height: "100%" }}>
      <tr>
        {showTableOfContents && (
          <td
            style={{ width: "20%", fontSize: "1rem", padding: "8px", borderRight: '3px solid #222' }}
            className={style({
              opacity: 0.65,
              $nest: {
                "&:hover": {
                  opacity: 1
                }
              }
            })}
          >
            <$tableOfContents.react
              next={sections =>
                sections.map(section => (
                  <div key={section.sectionTitle || "un"}>
                    {section.sectionTitle && (
                      <div
                        style={{
                          marginTop: "1rem",
                          color: section.active ? "yellow" : "unset"
                        }}
                      >
                        <b>{section.sectionTitle}</b>
                      </div>
                    )}
                    {section.items.map(t => (
                      <div
                        style={{
                          color: t.active ? "yellow" : "unset",
                          transition: "color .4s easeout",
                          marginLeft: section.sectionTitle ? "1rem" : "0rem"
                        }}
                      >
                        {t.title}
                      </div>
                    ))}
                  </div>
                ))
              }
            />
          </td>
        )}
        <td style={{ position: "relative", height: "100%" }}>
          <Deck
            {...props}
            onStateChange={(_, nextState) => {
              $tableOfContents.nextUpdateItems(section => ({
                ...section,
                active: section.state === nextState,
                items: section.items.map(item => ({
                  ...item,
                  active: item.state === nextState
                }))
              }));
            }}
            // progress="none"
            // transitionDuration={300}
          >
            {props.children}
          </Deck>
        </td>
      </tr>
    </table>
  );
}

function ToCFromSlides(chilen: React.ReactNode) {
  const sections: ({
    sectionTitle?: string;
    state?: string;
    active?: boolean;
    items: {
      state: string;
      title: string;
      active?: boolean;
    }[];
  })[] = [{ items: [] }];

  const pushSection = (title: string, state: string) =>
    sections.push({ sectionTitle: title, state, items: [] });
  const pushSlide = (props: { title: string; state: string }) =>
    sections[sections.length - 1].items.push(props);

  function addToList(el: any) {
    if (el.props) {
      if (el.props.state && el.key) {
        if (el.props.state.indexOf("section") === 0) {
          pushSection(el.key, el.props.state);
        } else {
          pushSlide({
            title: el.key,
            state: el.props.state
          });
        }
      }
    }
    if (el instanceof Array) {
      for (const chel of el) {
        addToList(chel);
      }
    } else if (el.props && el.props.children) {
      addToList(el.props.children);
    }
  }
  addToList(chilen);

  return sections;
}
