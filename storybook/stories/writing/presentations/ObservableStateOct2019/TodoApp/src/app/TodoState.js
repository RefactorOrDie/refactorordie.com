//@ts-check
import { Behavior, BehaviorList } from "behavior-state";

/**
 * @param {Todo[]} initialTodos
 */
export default function createTodoState(initialTodos = []) {
  const $todos = new BehaviorList(initialTodos);
  const $todoInput = new Behavior("");

  return {
    $todos: $todos.asObservableList(),
    $todoInput,
    updateNewTodoInput(value) {
      debug("updateNewTodoInput", value);
      $todoInput.next(value);
    },
    toggleTodo(id) {
      debug("toggleTodo", id);
      $todos.nextUpdateItemsWhere(
        todo => todo.id === id,
        todo => ({ ...todo, done: !todo.done })
      );
    },
    deleteTodo(id) {
      debug("deleteTodo", id);
      $todos.nextRemoveItemsWhere(todo => todo.id === id);
    },
    addTodo() {
      if ($todoInput.value) {
        debug("addTodo", $todoInput.value);
        $todos.nextAppendItem({
          id: Math.random(),
          done: false,
          title: $todoInput.value
        });
        $todoInput.next("");
      }
    }
  };
}

const debug = console.log.bind(console, "%cTodoState", "color: dodgerblue");
