import { Behavior, BehaviorList, ObservableList } from "behavior-state";
import { combineLatest, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";

export type Message = {
  id: string;
  display: string;
};

export type Model<T = unknown> = {
  $value: Observable<T>;
  $errors: ObservableList<Message>;
  reset(useAsInitialValue?: T | undefined): void;
  assert(
    validatedValue: T,
    id: string,
    display: string,
    isValid: boolean
  ): void;
} & (T extends { [childName: string]: any }
  ? {
      items: {
        [P in keyof T]: Model<T[P]>;
      };
    }
  : T extends number | string
  ? {
      input(updatedValue: T): void;
    }
  : {});

export type ModelCtor<T = unknown> = (
  zeroState: T,
  initial?: T,
  isTouched?: boolean
) => Model<T>;

export function textInput(
  zeroState: string,
  initial?: string,
  isTouched?: boolean
): Model<string> {
  const $value = new Behavior(initial || zeroState);
  const $touched = new Behavior(!!isTouched);
  const $errors = new BehaviorList<Message>([]);
  return {
    $value: $value.asObservable(),
    $errors: $errors.asObservableList(),
    input(updatedValue: string) {
      $value.next(updatedValue);
      $touched.next(true);
    },
    reset(useAsInitialValue?: string) {
      $value.next(useAsInitialValue || zeroState);
      $touched.next(false);
    },
    assert(
      validatedValue: string,
      id: string,
      display: string,
      isValid: boolean
    ) {
      const currentValue = $value.value;
      if (validatedValue !== currentValue) {
        console.warn(`Tried to add error to out of date value`, {
          validatedValue,
          currentValue,
          id,
          display
        });
        return;
      }

      $errors.nextRemoveItemsWhere(item => item.id === id);
      if (!isValid) {
        $errors.nextAppendItem({ id, display });
      }
    }
  };
}

type GroupedModelValue<R extends Record<string, ModelCtor>> = {
  [P in keyof R]: R[P] extends ModelCtor<infer T> ? T : never;
};

type GroupedModels<R extends Record<string, ModelCtor>> = {
  [P in keyof R]: R[P] extends ModelCtor<infer T> ? Model<T> : never;
};

export function grouped<G extends Record<string, ModelCtor<any>>>(
  modelGroup: G
): ModelCtor<GroupedModelValue<G>> {
  type T = GroupedModelValue<G>;
  return function(
    zeroState: T,
    initial?: T,
    isTouched?: boolean
  ): Model<GroupedModelValue<G>> {
    const $groupErrors = new BehaviorList<Message>([]);
    let $childErrors = new Behavior<Message[]>([]).asObservable();

    let childKeys: (string | number)[] = [];
    let childModels: Model[] = [];
    let childModelsByKey: GroupedModels<G> = {} as GroupedModels<G>;
    for (const key in modelGroup) {
      const ctor = modelGroup[key];
      const zero = zeroState[key];
      const model = ctor(zero, initial ? initial[key] : void 0, isTouched);
      childModels.push(model);
      childKeys.push(key);
      // @ts-ignore
      childModelsByKey[key] = model;
    }

    const childErrors = combineLatest(
      ...childModels.map(cm => cm.$errors.asObservable())
    ).pipe(flatMap((arr: Message[][]) => arr));

    const childValues = combineLatest(...childModels.map(cm => cm.$value)).pipe(
      map((arr: unknown[]) =>
        arr.reduce((curr: any, val, idx) => {
          curr[childKeys[idx]] = val;
          return curr;
        }, {})
      )
    ) as Observable<T>;

    let latestChildValue: T;
    childValues.subscribe(latest => (latestChildValue = latest));

    childErrors.subscribe(errors =>
      // debugging
      console.log("grouped child errors", errors)
    );

    // @ts-ignore i don't know...
    return {
      $value: childValues,
      $errors: $groupErrors.asObservableList(),
      items: childModelsByKey,
      reset(useAsInitialValue?: T) {
        if (useAsInitialValue) {
          for (const key in useAsInitialValue) {
            childModelsByKey[key].reset(useAsInitialValue[key]);
          }
        } else {
          for (const model of childModels) {
            model.reset();
          }
        }
      },
      assert(validatedValue: T, id: string, display: string, truth: boolean) {
        const val = JSON.stringify(validatedValue);
        if (val !== JSON.stringify(latestChildValue)) {
          console.warn(`Tried to add error to out of date value`, {
            validatedValue,
            latestChildValue,
            id,
            display
          });
          return;
        }

        $groupErrors.nextRemoveItemsWhere(item => item.id === id);
        if (!truth) {
          $groupErrors.nextAppendItem({ id, display });
        }
      }
    };
  };
}
