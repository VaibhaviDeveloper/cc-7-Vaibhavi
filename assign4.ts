import assert from "node:assert";

/**
 * Filters an array of strings, removing any string
 * that contains either 'u' or 'g'.
 *
 * @param {string[]} arr - Array of strings to filter.
 * @returns {string[]} New array with strings that do not contain 'u' or 'g'
 */

function filterStrings(arr: string[]): string[] {
  return arr.filter(item => !item.includes('u') && !item.includes('g'));
}

const items = ['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch'];
const filteredItems = filterStrings(items);
const expectedItems = ["browl", "faaast", "stand", "eat"];
assert.deepStrictEqual(filteredItems, expectedItems);

/**
 * Adds 10 to each number in the array, then filters
 * out numbers that are divisible by 4.
 * @param {number[]} arr - Array of numbers to transform.
 * @returns {number[]} New array with numbers divisible by 4 after adding 10.
 */

function transformNumbers(arr: number[]): number[] {
  return arr.map(num => num + 10).filter(num => num % 4 === 0);
}
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];
const transformed = transformNumbers(numbers);
const expected3 = [44, 12, 552];
assert.deepStrictEqual(transformed, expected3);