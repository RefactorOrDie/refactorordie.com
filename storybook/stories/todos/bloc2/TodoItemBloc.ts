import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { Todo, TodosService } from "./TodosService";

export interface TodoItemBloc {
  title: Observable<string>;
  done: Observable<boolean>;
  toggleDone(): void;
  remove(): void;
}

export function createTodoItemBloc(
  todoService: TodosService,
  todoId: string
): TodoItemBloc {
  const id = todoId;
  const title = new BehaviorSubject("");
  const done = new BehaviorSubject(false);
  const updateTodoData = (update: Todo | null) => {
    if (update == null)
      return console.error("it looks like this Todo might have been deleted", {
        todo: id
      });

    title.next(update.label);
    done.next(update.done);
  };

  todoService.getTodo(todoId).then(updateTodoData);
  todoService.events.updated
    .pipe(filter(todo => todo.id === id))
    .subscribe(updateTodoData);

  return {
    title: title.pipe(distinctUntilChanged()),
    done: done.pipe(distinctUntilChanged()),
    toggleDone() {
      done.next(!done.value);
      todoService.updateTodo(id, { done: !done.value });
    },
    remove() {
      todoService.deleteTodo(id);
    }
  };
}
