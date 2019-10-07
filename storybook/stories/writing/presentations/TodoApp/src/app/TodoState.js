//@ts-check
import { Behavior, BehaviorArray } from "behavior-state";

/**
 * @param {Todo[]} initialTodos
 */
export default function createTodoState(initialTodos = []) {
  const $todos = new BehaviorArray(initialTodos);
  const $todoInput = new Behavior("");

  return {
    $todos,
    $todoInput,
    toggleTodo(id) {
      $todos.nextUpdateItemsWhere(
        todo => todo.id === id,
        todo => ({ ...todo, done: !todo.done })
      );
    },
    deleteTodo(id) {
      $todos.nextRemoveItemsWhere(todo => todo.id === id);
    },
    addTodo() {
      if ($todoInput.value) {
        $todos.nextPushItem({
          id: Math.random(),
          done: false,
          title: $todoInput.value
        });
        $todoInput.next("");
      }
    },
    updateNewTodoInput(value) {
      $todoInput.next(value);
    }
  };
}
