//@ts-check
import { protectBloc, ReactiveVar } from "observer-react/dist/useObservable";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

function createTodo(label = "Untitled Todo", isDone = false) {
  return {
    id: Math.random(),
    label,
    isDone
  };
}

export function createTodosBloc() {
  const allTodos = new ReactiveVar([
    createTodo("Render the todo list", true),
    createTodo("Toggle todos as done"),
    createTodo("Create new Todos"),
    createTodo("Delete todos")
  ]);

  const newTodoTitle = new ReactiveVar("");

  const hideComplete = new ReactiveVar(false);

  return protectBloc({
    todos: combineLatest(allTodos, hideComplete).pipe(
      map(([allTodos, hideComplete]) => {
        if (hideComplete) {
          return allTodos.filter(todo => !todo.isDone);
        } else {
          return allTodos;
        }
      })
    ),
    newTodoTitle,
    hideComplete,
    toggleHideComplete() {
      hideComplete.next(!hideComplete.value);
    },
    addNewTodo() {
      allTodos.next([...allTodos.value, createTodo(newTodoTitle.value)]);
      newTodoTitle.next("");
    },
    deleteTodo(id) {
      const keepTodos = allTodos.value.filter(todo => {
        // should keep other todos
        return todo.id !== id;
      });

      allTodos.next(keepTodos);
    },
    toggleTodoDone(id) {
      const updatedTodos = allTodos.value.map(todo => {
        if (todo.id === id) {
          // toggle
          return { ...todo, isDone: !todo.isDone };
        } else {
          // todo is unmodified
          return todo;
        }
      });

      allTodos.next(updatedTodos);
    },
    updateNewTodoTitle(newTitle) {
      newTodoTitle.next(newTitle);
    }
  });
}
