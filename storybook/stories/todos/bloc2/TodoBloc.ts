import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { TodosService } from "./TodosService";
import { TodoItemBloc, createTodoItemBloc } from "./TodoItemBloc";

export interface TodoBloc {
  isLoading: Observable<boolean>;
  todoIds: Observable<string[]>;
  newTodoTitle: Observable<string>;
  updateTitle(label: string): void;
  addTodo(): void;
  createItemBloc(id: string): TodoItemBloc;
}

export function createTodoBloc(service: TodosService): TodoBloc {
  const todoIds = new BehaviorSubject<string[]>([]);
  const isLoading = new BehaviorSubject<boolean>(true);
  const newTodoLabel = new BehaviorSubject("");
  service.getTodoIds().then(ids => todoIds.next(ids));

  return {
    updateTitle(label: string) {
      newTodoLabel.next(label);
    },
    createItemBloc(id: string) {
      return createTodoItemBloc(service, id);
    },
    async addTodo() {
      const { id } = await service.createTodo(newTodoLabel.value);
      todoIds.next([
        ...todoIds.value,
        id
      ])
    },
    todoIds: todoIds.asObservable(),
    isLoading: isLoading.pipe(distinctUntilChanged()),
    newTodoTitle: newTodoLabel
  };
}
