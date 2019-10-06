//@ts-check
import { Behavior } from "bloc-utils";
import { createTodo } from "../helpers";

/**
 * @param {Todo[]} initialTodos 
 */
export function createTodosBloc(initialTodos) {
  const $todoInput = new Behavior("");
  const $todos = new Behavior(initialTodos);

  return {
    $todos,
    $todoInput,
    addTodo() {
      if ($todoInput.value.length > 0) {
        $todos.next([...$todos.value, createTodo($todoInput.value)]);
        $todoInput.next("");
      }
    },
    deleteTodo(id) {
      $todos.next(
        $todos.value.filter(todo => {
          if (todo.id === id) {
            return false;
          } else {
            // keep
            return true;
          }
        })
      );
    },
    toggleTodo(id) {
      $todos.next(
        $todos.value.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              done: !todo.done
            };
          } else {
            return todo;
          }
        })
      );
    }
  };
}
