import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Todo, TodosService } from './Todos.service';

export interface TodoState {
  todos: Observable<Todo[]>;
  newTodoTitle: Observable<string>;
  updateTitle(label: string): void;
  addNewTodo(): void;
  toggleTodo(todoId: string): void;
  deleteTodo(todoId: string): void;
}

export function createTodoState(service: TodosService): TodoState {
  const savedState = service.getSave();
  const todos = new BehaviorSubject(savedState.todos);
  const newTodoTitle = new BehaviorSubject(savedState.newTodoLabel);

  // anytime the source todos are updated, let's save to storage
  combineLatest(todos, newTodoTitle)
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
    updateTitle(label: string) {
      newTodoTitle.next(label);
    },
    addNewTodo() {
      todos.next([
        ...todos.value,
        service.createTodo(newTodoTitle.value),
      ]);
      newTodoTitle.next('');
    },
    newTodoTitle,
    todos,
  };
}
