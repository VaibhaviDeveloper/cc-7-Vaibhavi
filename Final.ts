import assert from "assert";

/**
 * Generates an array containing the squares of the first `n` positive integers.Each element at index `i` (0-based) will be `(i + 1)²`.If `n` is 0 or negative, the function returns an empty array.
 * @param {number} n - The number of square numbers to generate.
 * @returns {number[]} An array of squared numbers from 1² up to n².
 */

function generateFirstSquares(n: number): number[] {
  const result: number[] = [];
  for (let i = 1; i <= n; i++) {
    result.push(i * i);
  }
  return result;
}
assert.deepStrictEqual(generateFirstSquares(4), [1, 4, 9, 16]);
assert.deepStrictEqual(generateFirstSquares(1), [1]);
assert.deepStrictEqual(generateFirstSquares(0), []);
assert.deepStrictEqual(generateFirstSquares(6), [1, 4, 9, 16, 25, 36]);

/**
 * Converts a day name string to its corresponding day index.
 * @param {string} dayName - The name of the day (e.g., "Mon", "fri"). 
 * @returns {number} The index of the day (0–6) or -1 if invalid.
 */

function getDayOfWeek(dayName: string): number {
  const day = dayName.toLowerCase();
  const map: { [key: string]: number } = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };
  return map[day] ?? -1;
}
assert.strictEqual(getDayOfWeek("sun"), 0);
assert.strictEqual(getDayOfWeek("Mon"), 1);
assert.strictEqual(getDayOfWeek("fri"), 5);
assert.strictEqual(getDayOfWeek("xyz"), -1);