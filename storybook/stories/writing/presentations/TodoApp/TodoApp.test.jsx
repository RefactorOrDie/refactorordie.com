import createTodoBloc from "./TodoBloc";
import { collectValues } from "./react-observer";

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

  const todoInput = collectValues(bloc.$todoInput);

  bloc.updateNewTodoInput("abc");
  expect(todoInput.latest()).toBe("abc");

  bloc.updateNewTodoInput("");
  expect(todoInput.latest()).toBe("");
});

test("todos / add todo", async () => {
  const bloc = createTodoBloc([]);

  const todos = collectValues(bloc.$todos);
  const todoInput = collectValues(bloc.$todoInput);

  bloc.updateNewTodoInput("new todo");
  bloc.addTodo();

  const updatedTodos = todos.latest();

  expect(updatedTodos).toHaveLength(1);

  const [addedTodo] = updatedTodos;

  expect(addedTodo.title).toBe("new todo");
  expect(addedTodo.done).toBe(false);

  expect(todoInput.latest()).toBe("");
});

test("todos / toggle todo", async () => {
  const bloc = createTodoBloc([{ done: false, id: 1, title: "Todo 1" }]);

  const getTodos = collectValues(bloc.$todos);

  // sanity check existing data
  const originalTodos = getTodos.latest();

  expect(originalTodos).toHaveLength(1);
  const [originalTodo] = originalTodos;
  expect(originalTodo.done).toBe(false);

  bloc.toggleTodo(1);

  const updatedTodos = getTodos.latest();
  expect(updatedTodos).toHaveLength(1);
  const [originalTodo] = updatedTodos;
  expect(originalTodo.done).toBe(true);
});

test("todos / delete todo", async () => {
  const TITLE = "to be deleted";
  const bloc = createTodoBloc([
    ...createMockTodos(),
    { id: 1, done: false, title: TITLE },
    ...createMockTodos()
  ]);

  const todos = collectValues(bloc.$todos);

  // sanity check existing data
  const originalTodos = todos.latest();

  const originalTodosLength = originalTodos.length;
  expect(originalTodos.find(todo => todo.title === TITLE)).toBeDefined();

  bloc.deleteTodo(1);

  const updated = todos.latest();
  expect(updated).toHaveLength(originalTodosLength - 1);
  expect(updated.find(todo => todo.title === TITLE)).toBeUndefined();
});
