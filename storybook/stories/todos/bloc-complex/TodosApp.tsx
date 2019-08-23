import { Observer } from "observer-react";
import React from "react";
import { changeValue, preventDefaultThen } from "../../utils";
import { useTodosBloc } from "./TodosBlocProvider";
import { TodoItem } from "./TodoItem/TodoItem";
import { TodoItemBlocCreator } from "./TodoItem/TodoItemBlocProvider";

export function TodosApp() {
  const todos = useTodosBloc();

  return (
    <div className="container" style={{ maxWidth: "30em" }}>
      <h1>Todos</h1>
      <ul className="list-group">
        {/* The Observer element is our own hand crafted component
            which rerenders whenever a new value is inserted
            into the stream. This is great for fine-grained
            control over the render performance */}
        <Observer
          of={todos.todoIds}
          next={todos =>
            todos.map(id => (
              <TodoItemBlocCreator todoId={id} key={id}>
                <TodoItem />
              </TodoItemBlocCreator>
            ))
          }
        />
      </ul>
      <br />
      <form
        onSubmit={preventDefaultThen(() => todos.addTodo())}
        className="form"
      >
        <label htmlFor="new-todo-label">New Todo</label>
        <div className="input-group">
          <Observer
            of={todos.newTodoTitle}
            next={value => (
              <>
                <input
                  id="new-todo-label"
                  type="text"
                  className="form-control"
                  placeholder="Todo title"
                  value={value}
                  onChange={changeValue(todos.updateTitle)}
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
