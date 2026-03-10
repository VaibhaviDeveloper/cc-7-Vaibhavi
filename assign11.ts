import assert from "assert";

/**
 * Returns true if at least one element in the array satisfies the predicate.
 * Uses an imperative loop to iterate through the array.
 * @template T
 * @param {T[]} items - The array of items to evaluate.
 * @param {(item: T) => boolean} predicate - Function that tests each element.
 * @returns {boolean} True if any element passes the predicate, otherwise false.
 */

function some<T>(items: T[], predicate: (item: T) => boolean): boolean {
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if at least one element in the array satisfies the predicate.
 * Uses the reduce method to accumulate the result.
 * @template T
 * @param {T[]} items - The array of items to evaluate.
 * @param {(item: T) => boolean} predicate - Function that tests each element.
 * @returns {boolean} True if any element passes the predicate, otherwise false. 
 */

function someReduce<T>(items: T[], predicate: (item: T) => boolean): boolean {
  return items.reduce((result, item) => {
    return result || predicate(item);
  }, false);
}

const nums = [1, 3, 5, 8];
const nums2 = [1, 3, 5];
const empty: number[] = [];
assert.strictEqual(some(nums, n => n % 2 === 0), true);
assert.strictEqual(some(nums, n => n > 10), false);
assert.strictEqual(some(nums2, n => n % 2 === 0), false);
assert.strictEqual(some(empty, n => n > 0), false);
assert.strictEqual(someReduce(nums, n => n % 2 === 0), true);
assert.strictEqual(someReduce(nums, n => n > 10), false);
assert.strictEqual(someReduce(nums2, n => n % 2 === 0), false);
assert.strictEqual(someReduce(empty, n => n > 0), false);