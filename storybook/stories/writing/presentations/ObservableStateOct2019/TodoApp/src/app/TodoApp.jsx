//@ts-check
import "behavior-state/react";
import React, { useContext } from "react";
import { createTodo } from "../helpers";
import { changeValue, preventDefaultThen } from "../react-helpers";
import { TodoItem } from "./TodoItem";
import createTodoState from "./TodoState";

/** @type {Todo[]} */
const todos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Performant lists", true),
  createTodo("Adding a Todo")
];

export const TodoState = React.createContext(createTodoState(todos));

export default function AppRoot() {
  return <TodoApp></TodoApp>;
}

function TodoApp() {
  const state = useContext(TodoState);

  return (
    <div className="container">
      <h1>
        Todos <small style={{ fontSize: 16 }}>APP</small>
      </h1>
      <ul className="list-group">
        <state.$todos.react
          nextItem={todo => <TodoItem key={todo.id} todo={todo} />}
        />
      </ul>
      <br />
      <form className="form-group" onSubmit={preventDefaultThen(state.addTodo)}>
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <state.$todoInput.react
            next={value => (
              <input
                id="todo-title"
                type="text"
                className="form-control"
                value={value}
                onChange={changeValue(state.updateNewTodoInput)}
                placeholder="What do you want to get done?"
              />
            )}
          />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}
