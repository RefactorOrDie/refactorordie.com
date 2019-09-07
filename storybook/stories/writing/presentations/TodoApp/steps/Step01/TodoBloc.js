//@ts-check
import { Behavior, protectBloc } from "bloc-utils";
import { TODO } from "../react-helpers";

/**
 * @param {Todo[]} initialTodos
 */
export default function createTodoBloc(initialTodos = []) {
  const $todos = new Behavior(initialTodos);
  const $todoInput = new Behavior("");

  return protectBloc({
    $todos,
    $todoInput,
    toggleTodo(id) {
      TODO("toggle todo");
    },
    deleteTodo(id) {
      TODO("delete todo");
    },
    addTodo() {
      TODO("add todo");
    },
    updateNewTodoInput(value) {
      TODO("update todo title");
    }
  });
}
