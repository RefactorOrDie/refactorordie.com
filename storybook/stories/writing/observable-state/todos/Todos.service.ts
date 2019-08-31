export type SaveState = {
  todos: Todo[];
  newTodoLabel: string;
};

export type Todo = {
  label: string;
  id: string;
  done: boolean;
};

const randId = () =>
  Math.random()
    .toString(36)
    .slice(2);

export interface TodosService {
  createTodo(label: string): Todo;
  save(todos: SaveState): void;
  getSave(): SaveState;
}

const STORAGE_KEY = "todos";
export function createTodosService(storage: Storage): TodosService {
  return {
    createTodo(label) {
      return { done: false, id: randId(), label };
    },
    save(state) {
      return storage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    getSave() {
      return (
        JSON.parse(storage.getItem(STORAGE_KEY) || "false") || {
          newTodoLabel: "",
          todos: []
        }
      );
    }
  };
}
