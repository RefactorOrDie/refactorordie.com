//@ts-check
import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { changeValue, preventDefaultThen, TODO } from "../../../utils";

function createTodo(title = "Untitled Todo", done = false) {
  return {
    id: Math.random(),
    title,
    done
  };
}

const todos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Adding a Todo"),
];

export default function AppRoot() {
  return <TodoApp></TodoApp>
}

function TodoApp() {
  const [todoInput, setTodoInput] = useState("");

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
        onSubmit={preventDefaultThen(() => {
          TODO(`Add todo for "${todoInput}"`)
          setTodoInput("")
        })}
      >
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <input
            id="todo-title"
            type="text"
            className="form-control"
            value={todoInput}
            onChange={changeValue(setTodoInput)}
            placeholder="What do you want to get done?"
          />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}
