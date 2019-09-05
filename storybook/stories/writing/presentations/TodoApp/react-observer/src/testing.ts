import { Observable } from "rxjs";

export function collectValues<T>(obs: Observable<T>) {
  const queue: T[] = [];
  const listeners: ((value: T) => void)[] = [];

  obs.subscribe({
    next: value => {
      if (listeners.length > 0) {
        listeners.shift()!(value);
      } else {
        queue.push(value);
      }
    }
  });

  return {
    async next(): Promise<T> {
      if (queue.length > 0) {
        return Promise.resolve(queue.shift()!);
      } else {
        return new Promise(resolve => {
          listeners.push(resolve);
        });
      }
    },
    latest(): T {
      jest.runOnlyPendingTimers();

      if (queue.length > 0) {
        return queue[queue.length - 1]!;
      } else {
        throw new Error("no latest values");
      }
    }
  };
}
