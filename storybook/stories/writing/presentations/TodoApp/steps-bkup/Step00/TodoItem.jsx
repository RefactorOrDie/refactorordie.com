//@ts-check
import React from "react";
import { onEnterOrClick, TODO } from "../react-helpers";

/**
 * TodoItem appears within the TodoApp
 * @param {{ todo: Todo }} props
 */
export function TodoItem({ todo }) {
  return (
    <li
      className="list-group-item"
      {...onEnterOrClick(() => {
        TODO(`Clicked toggle "${todo.title}"`);
      })}
    >
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button
        className="btn btn-sm btn-default float-right"
        aria-label={`Delete "${todo.title}"`}
        {...onEnterOrClick(() => {
          TODO(`Clicked delete "${todo.title}"`);
        })}
      >
        🗑
      </button>
    </li>
  );
}
