//@ts-check
import { protectBloc as seal, Behavior } from "bloc-utils";

/**
 * @param {Todo[]} initialTodos
 */
export default function createTodoBloc(initialTodos = []) {
  const $todos = new Behavior(initialTodos);
  const $todoInput = new Behavior("");

  return seal({
    $todos,
    $todoInput,
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
    },
    deleteTodo(id) {
      $todos.next(
        $todos.value.filter(todo => {
          if (todo.id === id) {
            return false;
          } else {
            return true;
          }
        })
      );
    },
    addTodo() {
      if ($todoInput.value) {
        $todos.next([
          ...$todos.value,
          { id: Math.random(), done: false, title: $todoInput.value }
        ]);
        $todoInput.next("");
      }
    },
    updateNewTodoInput(value) {
      $todoInput.next(value);
    }
  });
}
