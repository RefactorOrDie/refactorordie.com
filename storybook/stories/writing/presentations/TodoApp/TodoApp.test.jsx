// @ts-check
import createTodoBloc from "./TodoBloc";
import { rememberLatest } from "react-observer/jest";

function createMockTodos() {
  return [
    { id: Math.random(), done: false, title: "Todo 0" },
    { id: Math.random(), done: false, title: "Todo 1" },
    { id: Math.random(), done: false, title: "Todo 2" }
  ];
}

jest.useFakeTimers();

test("todos / update input", async () => {
  const bloc = createTodoBloc([]);

  const latestTodoInput = rememberLatest(bloc.$todoInput);

  bloc.updateNewTodoInput("abc");
  expect(latestTodoInput()).toBe("abc");

  bloc.updateNewTodoInput("");
  expect(latestTodoInput()).toBe("");
});

test("todos / add todo", async () => {
  const bloc = createTodoBloc([]);

  const latestTodos = rememberLatest(bloc.$todos);
  const latestTodoInput = rememberLatest(bloc.$todoInput);

  bloc.updateNewTodoInput("new todo");
  bloc.addTodo();

  const updatedTodos = latestTodos();

  expect(updatedTodos).toHaveLength(1);

  const [addedTodo] = updatedTodos;

  expect(addedTodo.title).toBe("new todo");
  expect(addedTodo.done).toBe(false);

  expect(latestTodoInput()).toBe("");
});

test("todos / toggle todo", async () => {
  const bloc = createTodoBloc([{ done: false, id: 1, title: "Todo 1" }]);

  const latestTodos = rememberLatest(bloc.$todos);

  // sanity check existing data
  const originalTodos = latestTodos();

  expect(originalTodos).toHaveLength(1);
  const [originalTodo] = originalTodos;
  expect(originalTodo.done).toBe(false);

  bloc.toggleTodo(1);

  const updatedTodos = latestTodos();
  expect(updatedTodos).toHaveLength(1);
  const [updatedTodo] = updatedTodos;
  expect(updatedTodo.done).toBe(true);
});

test("todos / delete todo", async () => {
  const TITLE = "to be deleted";
  const bloc = createTodoBloc([
    ...createMockTodos(),
    { id: 1, done: false, title: TITLE },
    ...createMockTodos()
  ]);

  const latestTodos = rememberLatest(bloc.$todos);

  // sanity check existing data
  const originalTodos = latestTodos();

  const originalTodosLength = originalTodos.length;
  expect(originalTodos.find(todo => todo.title === TITLE)).toBeDefined();

  bloc.deleteTodo(1);

  const updated = latestTodos();
  expect(updated).toHaveLength(originalTodosLength - 1);
  expect(updated.find(todo => todo.title === TITLE)).toBeUndefined();
});
