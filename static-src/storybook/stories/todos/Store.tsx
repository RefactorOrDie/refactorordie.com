import { TodosService, Todo } from "./Todos.service";
import {
  TodoActionTypes,
  TOGGLE_TODO,
  DELETE_TODO,
  ADD_TODO,
  CHANGE_NEW_TODO_TITLE
} from "./redux/types";

/** Root State */
export type TodosState = {
  newTodoLabel: string;
  todos: Todo[];
};

const initialState: TodosState = {
  newTodoLabel: "",
  todos: []
};

export function createTodosReducer(todosService: TodosService) {
  return (state = initialState, action: TodoActionTypes): TodosState => {
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
          newTodoLabel: "",
          todos: [...state.todos, todosService.createTodo(state.newTodoLabel)]
        };
      case CHANGE_NEW_TODO_TITLE:
        return {
          ...state,
          newTodoLabel: action.label
        };
      default:
        const _exhaust: never = action;
        return state;
    }
  };
}
