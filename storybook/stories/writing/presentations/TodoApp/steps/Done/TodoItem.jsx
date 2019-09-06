import React, { useContext } from "react";
import { onEnterOrClick } from "utils";
import { TodoBloc } from "./TodoApp";

/**
 * TodoItem appears within the TodoApp
 * @param {{ todo: Todo }} props
 */
export function TodoItem({ todo }) {
  const bloc = useContext(TodoBloc);

  return (
    <li
      className="list-group-item"
      {...onEnterOrClick(() => {
        bloc.toggleTodo(todo.id);
      })}
    >
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button
        className="btn btn-sm btn-default float-right"
        aria-label={`Delete "${todo.title}"`}
        {...onEnterOrClick(() => {
          bloc.deleteTodo(todo.id);
        })}
      >
        🗑
      </button>
    </li>
  );
}
