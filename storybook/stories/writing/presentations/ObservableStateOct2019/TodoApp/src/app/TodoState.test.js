// @ts-check
import { spyOnState } from "behavior-state/jest";
import { createTodo } from "../helpers";
import createTodoState from "./TodoState";

function createMockTodos() {
  return [createTodo("Todo 0"), createTodo("Todo 1"), createTodo("Todo 2")];
}

jest.useFakeTimers();

test("todos / update input", async () => {
  const state = spyOnState(createTodoState([]));

  state.updateNewTodoInput("abc");

  expect(state.$todoInput.latestValue).toBe("abc");
  expect(state.$todoInput.nextValue).resolves.toBe("");

  state.updateNewTodoInput("");
});

test("todos / add todo", async () => {
  const state = spyOnState(createTodoState([]));

  state.updateNewTodoInput("new todo");
  state.addTodo();

  const updatedTodos = state.$todos.latestValue;

  expect(updatedTodos).toHaveLength(1);

  const [addedTodo] = updatedTodos;

  expect(addedTodo.title).toBe("new todo");
  expect(addedTodo.done).toBe(false);

  expect(state.$todoInput.latestValue).toBe("");
});

test("todos / toggle todo", async () => {
  const state = spyOnState(
    createTodoState([{ done: false, id: 1, title: "Todo 1" }])
  );

  // sanity check existing data
  const originalTodos = state.$todos.latestValue;

  expect(originalTodos).toHaveLength(1);
  const [originalTodo] = originalTodos;
  expect(originalTodo.done).toBe(false);

  state.toggleTodo(1);

  expect(state.$todos.latestValue).toHaveLength(1);
  const [updatedTodo] = state.$todos.latestValue;
  expect(updatedTodo.done).toBe(true);
});

test("todos / delete todo", async () => {
  const TITLE = "to be deleted";
  const state = spyOnState(
    createTodoState([
      ...createMockTodos(),
      { id: 1, done: false, title: TITLE },
      ...createMockTodos()
    ])
  );

  // sanity check existing data
  const originalTodos = state.$todos.latestValue;

  const originalTodosLength = originalTodos.length;
  expect(originalTodos.find(todo => todo.title === TITLE)).toBeDefined();

  state.deleteTodo(1);

  const updated = state.$todos.latestValue;
  expect(updated).toHaveLength(originalTodosLength - 1);
  expect(updated.find(todo => todo.title === TITLE)).toBeUndefined();
});
