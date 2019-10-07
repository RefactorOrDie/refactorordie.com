import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Todo, TodosService } from '../Todos.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface TodoState {
  todos: Observable<Todo[]>;
  newTodoTitle: Observable<string>;
  updateTitle(label: string): void;
  addTodo(): void;
  toggleTodo(todoId: string): void;
  deleteTodo(todoId: string): void;
}

export function createTodoState(service: TodosService): TodoState {
  const save = service.getSave()
  const todos = new BehaviorSubject<Todo[]>([
    { done: false, id: '1', label: 'adlijawoid'}
  ]);
  const newTodoTitle = new BehaviorSubject<string>(save.newTodoLabel);

  combineLatest(todos, newTodoTitle)
    .pipe(debounceTime(500))
    .subscribe(([todos, newTodoTitle]) => {
      service.save({ newTodoLabel: newTodoTitle, todos })
    })

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
    addTodo() {
      todos.next([
        ...todos.value,
        service.createTodo(newTodoTitle.value),
      ]);
      newTodoTitle.next('');
    },
    newTodoTitle: newTodoTitle.pipe(distinctUntilChanged()),
    todos,
  };
}
