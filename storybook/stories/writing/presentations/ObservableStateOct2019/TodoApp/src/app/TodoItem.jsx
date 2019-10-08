//@ts-check
import React, { useContext } from "react";
import { TodoState } from "./TodoApp";
import { onEnterOrClick } from "../react-helpers";

/**
 * TodoItem appears within the TodoApp
 * @param {{ todo: Todo }} props
 */
export function TodoItem({ todo }) {
  const state = useContext(TodoState);

  return (
    <li
      className="list-group-item"
      {...onEnterOrClick(() => {
        state.toggleTodo(todo.id);
      })}
    >
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button
        className="btn btn-sm btn-default float-right"
        aria-label={`Delete "${todo.title}"`}
        {...onEnterOrClick(() => {
          state.deleteTodo(todo.id);
        })}
      >
        🗑
      </button>
    </li>
  );
}
