import React from "react";
import { onEnterOrClick, TODO } from "../../../utils";

export function TodoItem({ todo }) {
  return (
    <li
      className="list-group-item"
      {...onEnterOrClick(() => {
        TODO(`Toggle "${todo.title}"`);
      })}
    >
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button
        className="btn btn-sm btn-default float-right"
        aria-label={`Delete "${todo.title}"`}
        {...onEnterOrClick(() => {
          TODO(`Delete "${todo.title}"`);
        })}
      >
        🗑
      </button>
    </li>
  );
}
