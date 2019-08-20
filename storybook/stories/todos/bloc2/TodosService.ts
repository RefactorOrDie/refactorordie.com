import { Observable, Subject } from "rxjs";

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
  createTodo(label: string): Promise<Todo>;
  saveTodo(id: string, todo: Omit<Todo, "id">): Promise<void>;
  updateTodo(id: string, todo: Partial<Omit<Todo, "id">>): Promise<void>;
  deleteTodo(id: string): Promise<Todo | null>;
  getTodo(id: string): Promise<Todo | null>;
  getTodoIds(): Promise<string[]>;
  getAllTodos(): Promise<Todo[]>;
  events: {
    added: Observable<Todo>;
    removed: Observable<string>;
    updated: Observable<Todo>;
  };
}

const STORAGE_KEY = "todos-list";
/** This is a stupidly implemented service */
export function createTodosService(storage: Storage): TodosService {
  // events
  const added = new Subject<Todo>();
  const removed = new Subject<string>();
  const updated = new Subject<Todo>();

  const getIds = () =>
    JSON.parse(storage.getItem(STORAGE_KEY) || "[]") as string[];
  const saveIds = (ids: string[]) =>
    storage.setItem(STORAGE_KEY, JSON.stringify(ids));

  const newTodo = (todo: Omit<Todo, "id">) => {
    const newTodoId = randId();
    saveIds([...getIds(), newTodoId]);
    const newTodo: Todo = { id: newTodoId, ...todo };
    storage.setItem(`${STORAGE_KEY}-${newTodoId}`, JSON.stringify(newTodo));
    added.next(newTodo);
    return newTodo;
  };

  const saveTodo = (id: string, todo: Todo | "delete") => {
    if (todo === "delete") {
      storage.removeItem(`${STORAGE_KEY}-${id}`);
      saveIds(getIds().filter(existingId => existingId !== id));
      removed.next(id);
    } else {
      // update
      storage.setItem(`${STORAGE_KEY}-${id}`, JSON.stringify(todo));
      updated.next(todo);
    }
  };

  const getTodo = (id: string) =>
    JSON.parse(
      storage.getItem(`${STORAGE_KEY}-${id}`) || "null"
    ) as Todo | null;

  return {
    createTodo(label) {
      return delayed(() => {
        return newTodo({ done: false, label });
      });
    },
    saveTodo(id, todo) {
      return delayed(() => {
        saveTodo(id, { ...todo, id });
      });
    },
    updateTodo(id, partial) {
      return delayed(() => {
        const existing = getTodo(id);
        if (existing != null) {
          saveTodo(id, { ...existing, ...partial, id });
        } else {
          throw new Error(`Could not update todo: ${id}`);
        }
      });
    },
    deleteTodo(id) {
      return delayed(() => {
        const todo = getTodo(id);
        if (todo != null) {
          saveTodo(id, "delete");
        }
        saveIds(getIds().filter(todoId => todoId !== id));
        return todo;
      });
    },
    getAllTodos() {
      return delayed(() => {
        return getIds()
          .map(getTodo)
          .filter((todo): todo is Todo => todo != null);
      });
    },
    getTodo(id) {
      return delayed(() => {
        return getTodo(id);
      });
    },
    getTodoIds() {
      return delayed(() => {
        return getIds();
      });
    },
    events: {
      added: added.asObservable(),
      removed: removed.asObservable(),
      updated: updated.asObservable()
    }
  };
}

const delayed = <T>(fn: () => T, delayMs = 600): Promise<T> => {
  return new Promise(res => {
    setTimeout(() => res(fn()), delayMs);
  });
};
