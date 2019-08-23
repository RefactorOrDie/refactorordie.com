import { Observer } from "observer-react";
import React from "react";
import { onEnterOrClick } from "../../../utils";
import { useTodoItemBloc } from "./TodoItemBlocProvider";

export function TodoItem() {
  const itemBloc = useTodoItemBloc();

  return (
    <>
      {/* The Observer element is our own hand crafted component
            which rerenders whenever a new value is inserted
            into the stream. This is great for fine-grained
            control over the render performance */}
      <Observer
        of={itemBloc.done}
        next={done => (
          <li
            style={{ textDecoration: done ? "line-through" : "none" }}
            className="list-group-item"
            {...onEnterOrClick(() => itemBloc.toggleDone())}
          >
            <Observer of={itemBloc.title} next={title => title} />
            &nbsp;
            <button
              className="float-right btn btn-light btn-sm"
              {...onEnterOrClick(() => itemBloc.remove())}
            >
              Delete
            </button>
          </li>
        )}
      />
    </>
  );
}
