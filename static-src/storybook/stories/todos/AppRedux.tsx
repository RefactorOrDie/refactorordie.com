import { Observer } from "observer-react";
import React, { useMemo } from "react";
import { changeValue, onEnterOrClick, preventDefaultThen } from "../utils";
import { TodosService, Todo } from "./Todos.service";

import { createStore, Dispatch } from "redux";
import { useDispatch, useStore, useSelector } from "react-redux";
import {
  TodoActionTypes,
  TOGGLE_TODO,
  DELETE_TODO,
  ADD_TODO,
  CHANGE_TODO_LABEL
} from "./redux/types";
import { addTodo, deleteTodo, toggleTodo, updateLabel } from "./redux/actions";

declare const todosService: TodosService;

type TodosState = {
  newTodoLabel: string;
  todos: Todo[];
};

const initialState: TodosState = {
  newTodoLabel: "",
  todos: []
};

function todosReducer(
  state = initialState,
  action: TodoActionTypes
): TodosState {
  switch (action.type) {
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(originalTodo => {
          if (originalTodo.id === action.todo_id) {
            // flip todo item
            return {
              ...originalTodo,
              done: !originalTodo.done
            };
          } else {
            return originalTodo;
          }
        })
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(originalTodo => {
          // filter out todo
          return originalTodo.id !== action.todo_id;
        })
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, todosService.createTodo(state.newTodoLabel)]
      };
    case CHANGE_TODO_LABEL:
      return state;
    default:
      const _exhaust: never = action;
      return _exhaust;
  }
}

const store = createStore(todosReducer);

export function AppRedux(props: { todosService: TodosService }) {
  const dispatch = useDispatch<Dispatch<TodoActionTypes>>();
  const store = useStore<TodosState>();
  const todos = useSelector<TodosState, Todo[]>(state => state.todos);
  const newTodoLabel = useSelector<TodosState, string>(
    state => state.newTodoLabel
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
        onSubmit={preventDefaultThen(() => dispatch(addTodo()))}
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
            onChange={changeValue(value => dispatch(updateLabel(value)))}
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
