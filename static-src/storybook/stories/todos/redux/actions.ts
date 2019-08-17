import { ADD_TODO, DELETE_TODO, TodoActionTypes, TOGGLE_TODO, CHANGE_TODO_LABEL } from "./types";

export const addTodo = (): TodoActionTypes => ({
  type: ADD_TODO,
});

export const updateLabel = (label: string): TodoActionTypes => ({
  type: CHANGE_TODO_LABEL,
  label,
});

export const deleteTodo = (todo_id: string): TodoActionTypes => ({
  type: DELETE_TODO,
  todo_id
});

export const toggleTodo = (todo_id: string): TodoActionTypes => ({
  type: TOGGLE_TODO,
  todo_id
});
