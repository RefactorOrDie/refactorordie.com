// @ts-check
import createTodoBloc from "./TodoBloc";
import { spyOnBloc } from "react-observer/jest";
import { createTodo } from "../helpers";

function createMockTodos() {
  return [
    createTodo("Todo 0"),
    createTodo("Todo 1"),
    createTodo("Todo 2"),
  ];
}

jest.useFakeTimers();

test("todos / update input", async () => {
  const bloc = spyOnBloc(createTodoBloc([]));

  bloc.updateNewTodoInput("abc");

  expect(bloc.$todoInput.latestValue).toBe("abc");
  expect(bloc.$todoInput.nextValue).resolves.toBe("");

  bloc.updateNewTodoInput("");
});

test("todos / add todo", async () => {
  const bloc = spyOnBloc(createTodoBloc([]));

  bloc.updateNewTodoInput("new todo");
  bloc.addTodo();

  const updatedTodos = bloc.$todos.latestValue;

  expect(updatedTodos).toHaveLength(1);

  const [addedTodo] = updatedTodos;

  expect(addedTodo.title).toBe("new todo");
  expect(addedTodo.done).toBe(false);

  expect(bloc.$todoInput.latestValue).toBe("");
});

test("todos / toggle todo", async () => {
  const bloc = spyOnBloc(createTodoBloc([{ done: false, id: 1, title: "Todo 1" }]));

  // sanity check existing data
  const originalTodos = bloc.$todos.latestValue;

  expect(originalTodos).toHaveLength(1);
  const [originalTodo] = originalTodos;
  expect(originalTodo.done).toBe(false);

  bloc.toggleTodo(1);

  expect(bloc.$todos.latestValue).toHaveLength(1);
  const [updatedTodo] = bloc.$todos.latestValue;
  expect(updatedTodo.done).toBe(true);
});

test("todos / delete todo", async () => {
  const TITLE = "to be deleted";
  const bloc = spyOnBloc(createTodoBloc([
    ...createMockTodos(),
    { id: 1, done: false, title: TITLE },
    ...createMockTodos()
  ]));

  // sanity check existing data
  const originalTodos = bloc.$todos.latestValue;

  const originalTodosLength = originalTodos.length;
  expect(originalTodos.find(todo => todo.title === TITLE)).toBeDefined();

  bloc.deleteTodo(1);

  const updated = bloc.$todos.latestValue;
  expect(updated).toHaveLength(originalTodosLength - 1);
  expect(updated.find(todo => todo.title === TITLE)).toBeUndefined();
});
