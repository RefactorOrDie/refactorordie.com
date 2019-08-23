import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { TodosRepo } from "./TodosRepo";

export type TodosBloc = {
  isLoading: Observable<boolean>;
  todoIds: Observable<string[]>;
  newTodoTitle: Observable<string>;
  updateTitle(label: string): void;
  addTodo(): void;
};

export function createTodosBloc(service: TodosRepo): TodosBloc {
  const todoIds = new BehaviorSubject<string[]>([]);
  const isLoading = new BehaviorSubject<boolean>(true);
  const newTodoLabel = new BehaviorSubject("");
  service.getTodoIds().then(ids => todoIds.next(ids));

  return {
    updateTitle(label: string) {
      newTodoLabel.next(label);
    },
    async addTodo() {
      const { id } = await service.createTodo(newTodoLabel.value);
      todoIds.next([...todoIds.value, id]);
    },
    todoIds: todoIds.asObservable(),
    isLoading: isLoading.pipe(distinctUntilChanged()),
    newTodoTitle: newTodoLabel
  };
}
