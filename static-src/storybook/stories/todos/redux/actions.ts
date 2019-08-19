import { ADD_TODO, DELETE_TODO, TodoActionTypes, TOGGLE_TODO, CHANGE_NEW_TODO_TITLE } from "./types";

export const changeNewTodoTitle = (label: string): TodoActionTypes => ({
  type: CHANGE_NEW_TODO_TITLE,
  label,
});

export const addNewTodo = (): TodoActionTypes => ({
  type: ADD_TODO,
});

export const deleteTodo = (todo_id: string): TodoActionTypes => ({
  type: DELETE_TODO,
  todo_id
});

export const toggleTodo = (todo_id: string): TodoActionTypes => ({
  type: TOGGLE_TODO,
  todo_id
});
