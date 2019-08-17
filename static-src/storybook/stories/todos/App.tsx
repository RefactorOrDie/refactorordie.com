import { Observer } from "observer-react";
import React, { useMemo } from "react";
import { changeValue, onEnterOrClick, preventDefaultThen } from "../utils";
import { createTodoBloc } from "./TodoBloc";
import { TodosService } from "./Todos.service";

export function App(props: { todosService: TodosService }) {
  const bloc = useMemo(() => createTodoBloc(props.todosService), []);

  return (
    <div className="container" style={{ maxWidth: "30em" }}>
      <h1>Todos</h1>
      <ul className="list-group">
        {/* The Observer element is our own hand crafted component
            which rerenders whenever a new value is inserted
            into the stream. This is great for fine-grained
            control over the render performance */}
        <Observer
          of={bloc.todos}
          next={todos =>
            todos.map(todo => (
              <li
                key={todo.id}
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
                className="list-group-item"
                {...onEnterOrClick(() => bloc.toggleTodo(todo.id))}
              >
                {todo.label}&nbsp;
                <button
                  className="float-right btn btn-light btn-sm"
                  {...onEnterOrClick(() => bloc.deleteTodo(todo.id))}
                >
                  Delete
                </button>
              </li>
            ))
          }
        />
      </ul>
      <br />
      <form
        onSubmit={preventDefaultThen(() => bloc.saveTodo())}
        className="form"
      >
        <label htmlFor="new-todo-label">New Todo</label>
        <div className="input-group">
          <Observer
            of={bloc.newTodoLabel}
            next={value => (
              <>
                <input
                  id="new-todo-label"
                  type="text"
                  className="form-control"
                  placeholder="Todo title"
                  value={value}
                  onChange={changeValue(bloc.changeNewTodoLabel)}
                />
              </>
            )}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
