import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { Todo, TodosRepo } from "../TodosRepo";

export type TodoItemBloc = {
  title: Observable<string>;
  done: Observable<boolean>;
  toggleDone(): void;
  remove(): void;
};

export async function createTodoItemBloc(
  todosRepo: TodosRepo,
  todoId: string
): Promise<TodoItemBloc> {
  const todoMaybe = await todosRepo.getTodo(todoId);
  if (todoMaybe == null) {
    throw new Error(`Unknown todo with id ${todoId}`);
  }
  const { id } = todoMaybe;
  const title = new BehaviorSubject(todoMaybe.label);
  const done = new BehaviorSubject(todoMaybe.done);
  const updateTodoData = (update: Todo | null) => {
    if (update == null)
      return console.error("it looks like this Todo might have been deleted", {
        todo: id
      });

    title.next(update.label);
    done.next(update.done);
  };

  todosRepo.getTodo(todoId).then(updateTodoData);
  todosRepo.events.updated
    .pipe(filter(todo => todo.id === id))
    .subscribe(updateTodoData);

  return {
    title: title.pipe(distinctUntilChanged()),
    done: done.pipe(distinctUntilChanged()),
    toggleDone() {
      done.next(!done.value);
      todosRepo.updateTodo(id, { done: !done.value });
    },
    remove() {
      todosRepo.deleteTodo(id);
    }
  };
}
