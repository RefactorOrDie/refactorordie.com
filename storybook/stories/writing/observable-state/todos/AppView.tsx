import React, { useMemo } from "react";
import { dual } from "../../../components/dual";
import { ViewObserver } from "../../../components/ViewObserver";
import { ViewObservableState } from "../../../components/ViewState";
import { changeValue, onEnterOrClick, preventDefaultThen } from "../../../utils";
import { createTodoState } from "./TodoState";
import { TodosService } from "./Todos.service";

export function AppView(props: { todosService: TodosService }) {
  const state = useMemo(() => createTodoState(props.todosService), []);

  return dual(
    <div style={{ textAlign: "right" }}>
      <br />
      <br />
      <ViewObservableState
        label="Todos"
        value={state.todos}
        maxLines={12}
        maxLen={36}
      />
      <br />
      <br />
      <ViewObservableState label="New Todo Title" value={state.newTodoTitle} />
    </div>,
    <div className="container" style={{ maxWidth: "30em" }}>
      <h1>Todos</h1>
      <ul className="list-group">
        {/* The Observer element is our own hand crafted component
            which rerenders whenever a new value is inserted
            into the stream. This is great for fine-grained
            control over the render performance */}
        <ViewObserver
          label="Todo List"
          of={state.todos}
          next={todos =>
            todos.map(todo => (
              <li
                key={todo.id}
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
                className="list-group-item"
                {...onEnterOrClick(() => state.toggleTodo(todo.id))}
              >
                {todo.label}&nbsp;
                <button
                  className="float-right btn btn-light btn-sm"
                  {...onEnterOrClick(() => state.deleteTodo(todo.id))}
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
        onSubmit={preventDefaultThen(() => state.addNewTodo())}
        className="form"
      >
        <label htmlFor="new-todo-label">New Todo</label>
        <div className="input-group">
          <ViewObserver
            label="Title Input"
            of={state.newTodoTitle}
            next={value => (
              <>
                <input
                  id="new-todo-label"
                  type="text"
                  className="form-control"
                  placeholder="Todo title"
                  value={value}
                  onChange={changeValue(state.updateTitle)}
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
