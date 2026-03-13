/**
 * Returns a promise that resolves after the given milliseconds.
 * @param {number} milliseconds - Time to wait before resolving.
 * @returns {Promise<undefined>}
 */

export function delay(milliseconds: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), milliseconds);
  });
}
