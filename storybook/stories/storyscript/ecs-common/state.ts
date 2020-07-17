import { Behavior, BehaviorList } from "behavior-state";

type ComponentStorage = {
  id: number;
  label: string;
};

type UniqueStorage = {
  id: number;
  label: string;
};

type System = {
  id: number;
  label: string;
  viewComponentIds: number[];
  viewMutComponentIds: number[];
  viewUniqueIds: number[];
  viewMutUniqueIds: number[];
};

export function systemData(
  id: number,
  label: string,
  data: {
    viewComponentIds?: number[];
    viewMutComponentIds?: number[];
    viewUniqueIds?: number[];
    viewMutUniqueIds?: number[];
  }
): System {
  return {
    id,
    label,
    viewComponentIds: data.viewComponentIds || [],
    viewMutComponentIds: data.viewMutComponentIds || [],
    viewUniqueIds: data.viewUniqueIds || [],
    viewMutUniqueIds: data.viewMutUniqueIds || []
  };
}

export type BoxView = {
  id: number;
  // // hue values from 0-255
  focused?: { hue: number };
  accessDirect?: { hue: number; write: boolean };
  accessSecondary?: { hue: number; write: boolean };
  marked: boolean;
  label: string;
};

type ECSData = {
  allComponents: ComponentStorage[];
  allUniques: UniqueStorage[];
  allSystems: System[];
};

export type ECSState = ReturnType<typeof createECSState>;
export function createECSState(config: ECSData) {
  const $currentlyFocused = new Behavior<null | {
    type: "component" | "unique" | "system";
    id: number;
  }>(null);

  const lookup = createECSLookup(config);

  const $componentStorages = createBoxViewState(
    config.allComponents.map<BoxView>(componentItem => ({
      backgroundCSS: "transparent",
      marked: false, // everything unfocused at the beginning
      id: componentItem.id,
      label: componentItem.label
    }))
  );

  const $uniqueStorages = createBoxViewState(
    config.allUniques.map<BoxView>(componentItem => ({
      backgroundCSS: "transparent",
      marked: false, // everything unfocused at the beginning
      id: componentItem.id,
      label: componentItem.label
    }))
  );

  const $systems = createBoxViewState(
    config.allSystems.map<BoxView>(componentItem => ({
      backgroundCSS: "transparent",
      marked: false, // everything unfocused at the beginning
      id: componentItem.id,
      label: componentItem.label
    }))
  );

  $currentlyFocused.subscribe(focused => {
    $componentStorages.clearFocus();
    $systems.clearFocus();
    $uniqueStorages.clearFocus();
    if (focused == null) {
      return;
    } else if (focused.type === "system") {
      // focus on system directly
      $systems.focus(focused.id);
      // then lookup dependent components
      const componentsRW = lookup.componentsUsedBySystem(focused.id);
      for (const componentID of componentsRW.readOnly) {
        $componentStorages.markUsedBy(componentID, false);
      }
      for (const componentID of componentsRW.readWrite) {
        $componentStorages.markUsedBy(componentID, true);
      }

      const allComponents2 = [
        ...componentsRW.readOnly,
        ...componentsRW.readWrite
      ];
      for (const componentID of allComponents2) {
        // secondary systems
        const system2RW = lookup.systemsUsingComponent(componentID);
        for (const id2Read of system2RW.readOnly) {
          $systems.markAssociated(id2Read, false);
        }
        for (const id2Write of system2RW.readWrite) {
          $systems.markAssociated(id2Write, true);
        }
      }
      // then lookup dependent uniques
      const uniquesRW = lookup.uniquesUsedBySystem(focused.id);
      for (const uniqueID of uniquesRW.readOnly) {
        $uniqueStorages.markUsedBy(uniqueID, false);
      }
      for (const uniqueID of uniquesRW.readWrite) {
        $uniqueStorages.markUsedBy(uniqueID, true);
      }

      const allUniques2 = [...uniquesRW.readOnly, ...uniquesRW.readWrite];
      for (const uniqueID of allUniques2) {
        // secondary systems
        const system2RW = lookup.systemsUsingComponent(uniqueID);
        for (const id2Read of system2RW.readOnly) {
          $systems.markAssociated(id2Read, false);
        }
        for (const id2Write of system2RW.readWrite) {
          $systems.markAssociated(id2Write, true);
        }
      }
    } else if (focused.type === "component") {
      const systemsUsingCompRW = lookup.systemsUsingComponent(focused.id);
      for (const systemID of systemsUsingCompRW.readOnly) {
        // only do two hops for writers
        $systems.markUsedBy(systemID, false);
      }
      for (const systemID of systemsUsingCompRW.readWrite) {
        $systems.markUsedBy(systemID, true);
      }
      for (const systemID of [
        ...systemsUsingCompRW.readWrite,
        ...systemsUsingCompRW.readOnly
      ]) {
        const component2RW = lookup.componentsUsedBySystem(systemID);
        for (const id2 of component2RW.readOnly) {
          $componentStorages.markAssociated(id2, false);
        }
        for (const id2 of component2RW.readWrite) {
          $componentStorages.markAssociated(id2, true);
        }

        const unique2RW = lookup.uniquesUsedBySystem(systemID);
        for (const id2 of unique2RW.readOnly) {
          $uniqueStorages.markAssociated(id2, false);
        }
        for (const id2 of unique2RW.readWrite) {
          $uniqueStorages.markAssociated(id2, true);
        }
      }
      $componentStorages.focus(focused.id);
    } else if (focused.type === "unique") {
      // set primary focus to unique
      $uniqueStorages.focus(focused.id);

      // mark all direct users
      const sysRWToUnique = lookup.systemsUsingUnique(focused.id);
      for (const systemID of sysRWToUnique.readOnly) {
        $systems.markUsedBy(systemID, false);
      }
      for (const systemID of sysRWToUnique.readWrite) {
        $systems.markUsedBy(systemID, true);
      }
      // mark all secondary access users
      const allSystemsUsingThis = [
        ...sysRWToUnique.readOnly,
        ...sysRWToUnique.readWrite
      ];
      for (const systemUsingUnique of allSystemsUsingThis) {
        // lookup one hop away
        // for uniques
        const uniques2RW = lookup.uniquesUsedBySystem(systemUsingUnique);
        for (const uniqueID of uniques2RW.readOnly) {
          $uniqueStorages.markAssociated(uniqueID, false);
        }
        for (const uniqueID of uniques2RW.readWrite) {
          $uniqueStorages.markAssociated(uniqueID, true);
        }
        // for components
        const components2RW = lookup.componentsUsedBySystem(systemUsingUnique);
        for (const componentID of components2RW.readOnly) {
          $componentStorages.markAssociated(componentID, false);
        }
        for (const componentID of components2RW.readWrite) {
          $componentStorages.markAssociated(componentID, true);
        }
      }
    }
  });

  return {
    clearFocus() {
      $currentlyFocused.next(null);
    },
    focusOnUniqueStorage(id: number) {
      $currentlyFocused.next({ type: "unique", id });
    },
    focusOnComponentStorage(id: number) {
      $currentlyFocused.next({ type: "component", id });
    },
    focusOnSystem(id: number) {
      $currentlyFocused.next({ type: "system", id });
    },
    $componentStorages: $componentStorages.$views,
    $uniqueStorages: $uniqueStorages.$views,
    $systems: $systems.$views
  };
}

function createBoxViewState(boxViews: BoxView[]) {
  const $views = new BehaviorList<BoxView>(boxViews);

  return {
    focus(id: number) {
      $views.nextUpdateItemsWhere(
        boxView => boxView.id === id,
        boxView => ({
          ...boxView,
          marked: true,
          focused: {
            hue: 190
          }
        })
      );
    },
    markUsedBy(id: number, write: boolean) {
      $views.nextUpdateItemsWhere(
        boxView => boxView.id === id,
        boxView => ({
          ...boxView,
          marked: true,
          accessDirect: {
            hue: 190,
            write
          }
        })
      );
    },
    markAssociated(id: number, write: boolean) {
      $views.nextUpdateItemsWhere(
        boxView => boxView.id === id,
        boxView => ({
          ...boxView,
          marked: true,
          accessSecondary: {
            hue: 263,
            write
          }
        })
      );
    },
    clearFocus() {
      $views.nextUpdateItemsWhere(
        boxView => boxView.marked, // only things that were already focused
        boxView => ({
          ...boxView,
          marked: false,
          focused: undefined,
          accessDirect: undefined,
          accessSecondary: undefined
        })
      );
    },
    $views: $views.asObservableList()
  };
}
type ReadWriteIDs = { readOnly: number[]; readWrite: number[] };
const empty = () => ({ readOnly: [], readWrite: [] });

function createECSLookup(config: ECSData) {
  const lookupSystemIDByUnique = new Map<number, ReadWriteIDs>();
  const lookupSystemIDByComponent = new Map<number, ReadWriteIDs>();
  const lookupSystemByID = new Map<number, System>();
  for (const system of config.allSystems) {
    lookupSystemByID.set(system.id, system);
    // uniques
    // uniques read only
    for (const uniqueID of system.viewUniqueIds) {
      const value = lookupSystemIDByUnique.get(uniqueID) || empty();
      value.readOnly.push(system.id);
      lookupSystemIDByUnique.set(uniqueID, value);
    }
    // uniques read write
    for (const uniqueMutID of system.viewMutUniqueIds) {
      const value = lookupSystemIDByUnique.get(uniqueMutID) || empty();
      value.readWrite.push(system.id);
      lookupSystemIDByUnique.set(uniqueMutID, value);
    }
    // components
    // components read only
    for (const componentID of system.viewComponentIds) {
      const value = lookupSystemIDByComponent.get(componentID) || empty();
      value.readOnly.push(system.id);
      lookupSystemIDByComponent.set(componentID, value);
    }
    // components read write
    for (const componentMutID of system.viewMutComponentIds) {
      const value = lookupSystemIDByComponent.get(componentMutID) || empty();
      value.readWrite.push(system.id);
      lookupSystemIDByComponent.set(componentMutID, value);
    }
  }

  // console.dir({ lookupSystemIDByUnique, lookupSystemIDByComponent });

  return {
    systemsUsingUnique(id: number): ReadWriteIDs {
      return lookupSystemIDByUnique.get(id) || empty();
    },
    systemsUsingComponent(id: number): ReadWriteIDs {
      return lookupSystemIDByComponent.get(id) || empty();
    },
    componentsUsedBySystem(id: number): ReadWriteIDs {
      const sys = lookupSystemByID.get(id);
      if (sys == null) return empty();
      return {
        readOnly: sys.viewComponentIds,
        readWrite: sys.viewMutComponentIds
      };
    },
    uniquesUsedBySystem(id: number): ReadWriteIDs {
      const sys = lookupSystemByID.get(id);
      if (sys == null) return empty();
      return { readOnly: sys.viewUniqueIds, readWrite: sys.viewMutUniqueIds };
    }
  };
}
