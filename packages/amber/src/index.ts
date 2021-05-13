export type Wait<T = void> = Promise<T> & {
  resolve(value: T): void;
  reject(reason: unknown): void;
};

export function createWait<T = void>(): Wait<T> {
  let resolve: ((value: T) => void) | undefined;
  let reject: ((reason: unknown) => void) | undefined;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  // resolve and reject will not be undefined, because the promise callback
  // is executed immediately and the variables will be assigned.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return Object.assign(promise, { resolve: resolve!, reject: reject! });
}
