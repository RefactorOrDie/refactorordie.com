export const CHANGE_TODO_LABEL = "CHANGE_TODO_LABEL";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export interface ChangeTodoLabelAction {
  type: typeof CHANGE_TODO_LABEL;
  label: string;
}

export interface AddTodoAction {
  type: typeof ADD_TODO;
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  todo_id: string;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  todo_id: string;
}

export type TodoActionTypes =
  | AddTodoAction
  | ChangeTodoLabelAction
  | DeleteTodoAction
  | ToggleTodoAction;
