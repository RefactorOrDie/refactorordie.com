//@ts-check
import Observer from "observer-react";
import React, { useMemo } from "react";
import { createTodosBloc } from "./TodosBloc";

function TodoApp({}) {
  const app = useMemo(() => createTodosBloc(), []);

  const onNewTitleChange = useMemo(
    () => evt => app.updateNewTodoTitle(evt.target.value),
    []
  );

  return (
    <div className="container">
      <h1>Todos</h1>
      <label htmlFor="hide-complete">Hide Completed Todos&nbsp;</label>
      <Observer
        of={app.hideComplete}
        next={hideComplete => (
          <input
            type="checkbox"
            id="hide-complete"
            name="hide-complete"
            onChange={app.toggleHideComplete}
            checked={hideComplete}
          />
        )}
      />
      <ul className="list-group">
        <Observer
          of={app.todos}
          next={todos =>
            todos.map(todo => (
              <li
                key={todo.id}
                className="list-group-item"
                onClick={() => app.toggleTodoDone(todo.id)}
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none"
                }}
              >
                {todo.label}
                <div
                  className="float-right btn btn-light btn-sm"
                  onClick={() => app.deleteTodo(todo.id)}
                >
                  Delete
                </div>
              </li>
            ))
          }
        />
      </ul>
      <br />
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          app.addNewTodo();
        }}
      >
        <label>New Todo</label>
        <div className="input-group">
          <Observer
            of={app.newTodoTitle}
            next={value => (
              <input
                className="form-control"
                type="text"
                value={value}
                onChange={onNewTitleChange}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default TodoApp;
