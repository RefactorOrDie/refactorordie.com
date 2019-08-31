import React from "react";
import { Provider, shallowEqual, useDispatch, useSelector } from "react-redux";
import { createStore, Dispatch } from "redux";
import { changeValue, onEnterOrClick, preventDefaultThen } from "../../../../utils";
import { createTodosReducer, TodosState } from "../Store";
import { Todo, TodosService } from "../Todos.service";
import {
  addNewTodo,
  changeNewTodoTitle,
  deleteTodo,
  toggleTodo
} from "./actions";
import { TodoActionTypes } from "./types";

export function AppRedux(props: { todosService: TodosService }) {
  const store = createStore(createTodosReducer(props.todosService));
  return (
    <Provider store={store}>
      <TodosAppView />
    </Provider>
  );
}

function TodosAppView() {
  const dispatch = useDispatch<Dispatch<TodoActionTypes>>();
  const todos = useSelector<TodosState, Todo[]>(
    state => state.todos,
    shallowEqual
  );
  const newTodoLabel = useSelector<TodosState, string>(
    state => state.newTodoLabel,
    shallowEqual
  );

  return (
    <div className="container" style={{ maxWidth: "30em" }}>
      <h1>Todos</h1>
      <ul className="list-group">
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
            className="list-group-item"
            {...onEnterOrClick(() => dispatch(toggleTodo(todo.id)))}
          >
            {todo.label}&nbsp;
            <button
              className="float-right btn btn-light btn-sm"
              {...onEnterOrClick(() => dispatch(deleteTodo(todo.id)))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <br />
      <form
        onSubmit={preventDefaultThen(() => dispatch(addNewTodo()))}
        className="form"
      >
        <label htmlFor="new-todo-label">New Todo</label>
        <div className="input-group">
          <input
            id="new-todo-label"
            type="text"
            className="form-control"
            placeholder="Todo title"
            value={newTodoLabel}
            onChange={changeValue(value => dispatch(changeNewTodoTitle(value)))}
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
