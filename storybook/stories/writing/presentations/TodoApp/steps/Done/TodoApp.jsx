//@ts-check
import React, { useContext } from "react";
import { changeValue, preventDefaultThen } from "utils";
import { Observer } from "react-observer";
import createTodoBloc from "./TodoBloc";
import { TodoItem } from "./TodoItem";
import { createTodo } from "../helpers";

/** @type {Todo[]} */
const todos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Adding a Todo")
];

export const TodoBloc = React.createContext(createTodoBloc(todos));

export default function AppRoot() {
  return <TodoApp></TodoApp>;
}

function TodoApp() {
  const bloc = useContext(TodoBloc);

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul className="list-group">
        <Observer
          of={bloc.$todos}
          next={todos =>
            todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          }
        />
      </ul>
      <br />
      <form className="form-group" onSubmit={preventDefaultThen(bloc.addTodo)}>
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <Observer
            of={bloc.$todoInput}
            next={value => (
              <input
                id="todo-title"
                type="text"
                className="form-control"
                value={value}
                onChange={changeValue(bloc.updateNewTodoInput)}
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
