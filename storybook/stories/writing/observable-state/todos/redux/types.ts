export const CHANGE_NEW_TODO_TITLE = "CHANGE_NEW_TODO_TITLE";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export interface ChangeNewTodoTitleAction {
  type: typeof CHANGE_NEW_TODO_TITLE;
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
  | ChangeNewTodoTitleAction
  | DeleteTodoAction
  | ToggleTodoAction;
