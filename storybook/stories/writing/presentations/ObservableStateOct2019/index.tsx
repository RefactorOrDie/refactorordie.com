import { BehaviorArray } from "behavior-state";

const logs = new BehaviorArray<any[]>([]);

export const $logs = logs.asObservable();

export function clearLogs() {
  // remove all items
  logs.nextRemoveItemsWhere(_ => true);
}

export function log(...args: any[]) {
  logs.nextPushItem(args);
}

export const continueWait = function () {}

export function wait(timeoutMs: number): Promise<void> {
  log(`wait...`)
  return new Promise(res => exports.continueWait = res);
}

export function waitMs(timeoutMs: number): Promise<void> {
  log(`wait ${timeoutMs * 0.001}s`)
  return new Promise(res => setTimeout(res, timeoutMs));
}
