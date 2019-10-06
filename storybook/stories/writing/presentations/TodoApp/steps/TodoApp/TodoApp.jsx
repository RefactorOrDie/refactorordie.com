//@ts-check
import React, { useContext } from "react";
import "bloc-utils/react";

import { createTodo } from "../helpers";
import { changeValue, preventDefaultThen } from "../react-helpers";

import { TodoItem } from "./TodoItem";
import { createTodosBloc } from "./TodoBloc";

/** @type {Todo[]} */
export const initialTodos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Adding a Todo")
];

export default function AppRoot() {
  return <TodoApp></TodoApp>;
}

export const TodoBloc = React.createContext(createTodosBloc(initialTodos));

function TodoApp() {
  const bloc = useContext(TodoBloc);

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul className="list-group">
        <bloc.$todos.react
          next={todos =>
            todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          }
        />
      </ul>
      <br />
      <form
        className="form-group"
        onSubmit={preventDefaultThen(() => bloc.addTodo())}
      >
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <bloc.$todoInput.react
            next={value => (
              <input
                id="todo-title"
                type="text"
                className="form-control"
                value={value}
                onChange={changeValue(value => bloc.$todoInput.next(value))}
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
