//@ts-check
import { protectBloc, ReactiveVar } from "observer-react/dist/useObservable";

function createTodo(label = "Untitled Todo", isDone = false) {
  return {
    id: Math.random(),
    label,
    isDone
  };
}

export function createTodosBloc() {
  const todos = new ReactiveVar([
    createTodo("Render the todo list", true),
    createTodo("Toggle todos as done"),
    createTodo("Create new Todos"),
    createTodo("Delete todos")
  ]);

  const newTodoTitle = new ReactiveVar("");

  return protectBloc({
    todos,
    newTodoTitle,
    addNewTodo() {
      todos.next([...todos.value, createTodo(newTodoTitle.value)]);
      newTodoTitle.next("");
    },
    deleteTodo(id) {
      const keepTodos = todos.value.filter(todo => {
        // should keep other todos
        return todo.id !== id;
      });

      todos.next(keepTodos);
    },
    toggleTodoDone(id) {
      const updatedTodos = todos.value.map(todo => {
        if (todo.id === id) {
          // toggle
          return { ...todo, isDone: !todo.isDone };
        } else {
          // todo is unmodified
          return todo;
        }
      });

      todos.next(updatedTodos);
    },
    updateNewTodoTitle(newTitle) {
      newTodoTitle.next(newTitle);
    }
  });
}
