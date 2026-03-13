import assert from 'assert';

/**
 * Filters an array of strings to include only those
 * that start with 'mang' or end with 'fy'.
 *
 * @param {string[]} arr - Array of strings to filter.
 * @returns {string[]} Filtered array containing only strings that start with 'mang' or end with 'fy'.
 */

function filterMangOrFy(arr: string[]): string[] {
  return arr.filter((item) => item.startsWith('mang') || item.endsWith('fy'));
}

const items = ['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy'];
const filteredItems = filterMangOrFy(items);

const expected = ['mangalore', 'verify', 'rectify', 'mangala'];
assert.deepStrictEqual(filteredItems, expected);
assert.deepStrictEqual(filterMangOrFy([]), []);
assert.deepStrictEqual(filterMangOrFy(['apple', 'banana', 'carrot']), []);
