/**
 * Observable State presentation for React NYC
 */

import { Behavior } from "bloc-utils";
import React, { useMemo } from "react";
import { Deck, DeckProps } from "spectacle";

export function ToCDeck(props: { children: React.ReactNode } & DeckProps) {
  const $tableOfContents = useMemo(
    () => new Behavior(ToCFromSlides(props.children)),
    [props.children]
  );
  const showTableOfContents = !/export|presenter/.test(location.hash);

  return (
    <table style={{ position: "absolute", width: "100%", height: "100%" }}>
      <tr>
        {showTableOfContents && (
          <td style={{ width: "30%", fontSize: "1.5rem", padding: "8px" }}>
            <$tableOfContents.react
              next={sections =>
                sections.map(section => (
                  <div key={section.sectionTitle || "un"}>
                    {section.sectionTitle && (
                      <div style={{ marginTop: "1rem" }}>
                        <b>{section.sectionTitle}</b>
                      </div>
                    )}
                    {section.items.map(t => (
                      <div
                        style={{
                          color: t.active ? "yellow" : "unset",
                          marginLeft: "1rem",
                          display: "inline-block"
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
              $tableOfContents.next(
                $tableOfContents.value.map(section => ({
                  ...section,
                  items: section.items.map(item => ({
                    ...item,
                    active: item.state === nextState
                  }))
                }))
              );
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
    items: {
      state: string;
      title: string;
      active?: boolean;
    }[];
  })[] = [{ items: [] }];

  const pushSection = (title: string) =>
    sections.push({ sectionTitle: title, items: [] });
  const pushSlide = (props: { title: string; state: string }) =>
    sections[sections.length - 1].items.push(props);

  function addToList(el: any) {
    if (el.props) {
      if (el.props.state && el.key) {
        pushSlide({
          state: el.props.state,
          title: el.key
        });
      } else {
        if (el.key) {
          // Section title
          pushSection(el.key);
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
