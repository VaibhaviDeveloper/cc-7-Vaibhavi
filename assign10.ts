import assert from "assert";

/**
 * Returns the second largest distinct number in the array
 * using a forEach iteration.
 * @param {number[]} arr - Array of numbers.
 * @returns {number | null} Second largest number or null if not available.
 */

function findSecondLargest(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let largest = -Infinity;
  let secondLargest = -Infinity;

  arr.forEach(num => {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num < largest) {
      secondLargest = num;
    }
  });

  return secondLargest === -Infinity ? null : secondLargest;
}

/**
 * Returns the second largest distinct number in the array
 * using the reduce method.
 * @param {number[]} arr - Array of numbers.
 * @returns {number | null} Second largest number or null if not available.
 */

function findSecondLargestReduce(arr: number[]): number | null {
  if (arr.length < 2) return null;

  const [, secondLargest] = arr.reduce(
    ([largest, secondLargest], num) => {
      if (num > largest) {
        return [num, largest];
      } else if (num > secondLargest && num < largest) {
        return [largest, num];
      }
      return [largest, secondLargest];
    },
    [-Infinity, -Infinity]
  );

  return secondLargest === -Infinity ? null : secondLargest;
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [5, 5, 4, 3];
const arr3 = [10, 10, 10];
const arr4 = [7];
const arr5 = [-1, -5, -3, -2];
const arr6 = [100, 50];
const arr7 = [3, 1, 3, 2];
const arr8: number[] = [];

assert.strictEqual(findSecondLargest(arr1), 4);
assert.strictEqual(findSecondLargest(arr2), 4);
assert.strictEqual(findSecondLargest(arr3), null);
assert.strictEqual(findSecondLargest(arr4), null);
assert.strictEqual(findSecondLargest(arr5), -2);
assert.strictEqual(findSecondLargest(arr6), 50);
assert.strictEqual(findSecondLargest(arr7), 2);
assert.strictEqual(findSecondLargest(arr8), null);

assert.strictEqual(findSecondLargestReduce(arr1), 4);
assert.strictEqual(findSecondLargestReduce(arr2), 4);
assert.strictEqual(findSecondLargestReduce(arr3), null);
assert.strictEqual(findSecondLargestReduce(arr4), null);
assert.strictEqual(findSecondLargestReduce(arr5), -2);
assert.strictEqual(findSecondLargestReduce(arr6), 50);
assert.strictEqual(findSecondLargestReduce(arr7), 2);
assert.strictEqual(findSecondLargestReduce(arr8), null);