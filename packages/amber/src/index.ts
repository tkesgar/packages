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

  return Object.assign(promise, {
    resolve: resolve!,
    reject: reject!,
  });
}
