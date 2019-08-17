import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Todo, TodosService } from './Todos.service';

export interface TodoBloc {
  todos: Observable<Todo[]>;
  newTodoLabel: Observable<string>;
  changeNewTodoLabel(label: string): void;
  saveTodo(): void;
  toggleTodo(todoId: string): void;
  deleteTodo(todoId: string): void;
}

export function createTodoBloc(service: TodosService): TodoBloc {
  const savedState = service.getSave();
  const todos = new BehaviorSubject(savedState.todos);
  const newTodoLabel = new BehaviorSubject(savedState.newTodoLabel);

  // anytime the source todos are updated, let's save to storage
  combineLatest(todos, newTodoLabel)
    // debounce after a half second
    .pipe(debounceTime(500))
    .subscribe(([todos, newTodoLabel]) =>
      service.save({ todos, newTodoLabel })
    );

  return {
    toggleTodo(todoId: string) {
      todos.next(
        todos.value.map(originalTodo => {
          if (originalTodo.id === todoId) {
            // flip todo item
            return {
              ...originalTodo,
              done: !originalTodo.done,
            };
          } else {
            return originalTodo;
          }
        })
      );
    },
    deleteTodo(todoId: string) {
      todos.next(
        todos.value.filter(originalTodo => {
          // filter out todo
          return originalTodo.id !== todoId;
        })
      );
    },
    changeNewTodoLabel(label: string) {
      newTodoLabel.next(label);
    },
    saveTodo() {
      todos.next([
        ...todos.value,
        service.createTodo(newTodoLabel.value),
      ]);
      newTodoLabel.next('');
    },
    newTodoLabel,
    todos,
  };
}
