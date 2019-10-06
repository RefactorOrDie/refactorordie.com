//@ts-check
import React, { useState } from "react";

import { createTodo } from "../helpers";
import { changeValue, TODO, preventDefaultThen } from "../react-helpers";

import { TodoItem } from "./TodoItem";

/** @type {Todo[]} */
const todos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Adding a Todo")
];

export default function AppRoot() {
  return <TodoApp></TodoApp>;
}

function TodoApp() {
  const [value, setValue] = useState("");

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul className="list-group">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <br />
      <form
        className="form-group"
        onSubmit={preventDefaultThen(() => TODO("Add todo"))}
      >
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <input
            id="todo-title"
            type="text"
            className="form-control"
            value={value}
            onChange={changeValue(setValue)}
            placeholder="What do you want to get done?"
          />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}
