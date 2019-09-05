import React from "react";
import Observer, { useObservable } from "./observer-react";

function createTodo(label = "Untitled Todo", isDone = false) {
  return {
    id: Math.random(),
    label,
    isDone
  };
}

function TodoApp({}) {
  const todos = useObservable(() => [
    createTodo("Render the todo list", true),
    createTodo("Toggle todos as done"),
    createTodo("Create new Todos"),
    createTodo("Delete todos")
  ]);

  const newTodoTitle = useObservable(() => "");

  function toggleTodoDone(id) {
    const updatedTodos = todos.value.map(todo => {
      if (todo.id === id) {
        // toggle
        return { ...todo, isDone: !todo.isDone };
      } else {
        // todo is unmodified
        return todo;
      }
    });

    todos.next(updatedTodos);
  }

  function deleteTodo(id) {
    const keepTodos = todos.value.filter(todo => {
      // should keep other todos
      return todo.id !== id;
    });

    todos.next(keepTodos);
  }

  function addNewTodo() {
    todos.next([...todos.value, createTodo(newTodoTitle.value)]);
    newTodoTitle.next("");
  }

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul className="list-group">
        <Observer
          of={todos}
          next={todos =>
            todos.map(todo => (
              <li
                key={todo.id}
                className="list-group-item"
                onClick={() => toggleTodoDone(todo.id)}
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none"
                }}
              >
                {todo.label}
                <div
                  className="float-right btn btn-light btn-sm"
                  onClick={() => deleteTodo(todo.id)}
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
          addNewTodo();
        }}
      >
        <label>New Todo</label>
        <div className="input-group">
          <Observer
            of={newTodoTitle}
            next={value => (
              <input
                className="form-control"
                type="text"
                value={value}
                onChange={evt => newTodoTitle.next(evt.target.value)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default TodoApp;
