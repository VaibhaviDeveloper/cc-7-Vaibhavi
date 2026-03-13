/**
 * Returns a promise that resolves after a specified number of milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to wait before resolving.
 * @returns {Promise<undefined>} A promise that resolves to undefined after the delay.
 */
export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
