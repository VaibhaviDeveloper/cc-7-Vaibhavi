import assert from "assert";
import GraphemeSplitter from "grapheme-splitter";

/**
 * Adds two numeric arrays element by element.If the arrays have different lengths, the shorter array is treated as if it were padded with zeros.
 *@param {number[]} a - The first array of numbers.
 * @param {number[]} b - The second array of numbers.
 * @returns {number[]} A new array containing the element-wise sums.
 */

function addArrays(a: number[], b: number[]): number[] {
  const result: number[] = [];
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    const numA = a[i] ?? 0;
    const numB = b[i] ?? 0;
    result.push(numA + numB);
  }

  return result;
}

assert.deepStrictEqual(addArrays([2, 3, 5], [5, 6, 4]), [7, 9, 9]);
assert.deepStrictEqual(addArrays([2, 2], [4, 5, 6]), [6, 7, 6]);
assert.deepStrictEqual(addArrays([4, 5, 5], []), [4, 5, 5]);
assert.deepStrictEqual(addArrays([], []), []);
assert.deepStrictEqual(addArrays([0, 1], [0, 2]), [0, 3]);

/**
 * Calculates the length of a string based on user-perceived characters(grapheme clusters), correctly handling emojis and complex Unicode characters.
 * @param {string} str - The input string to measure.
 * @returns {number} The total number of characters in the string.
 */

function lengthOfString(str: string): number {
  const splitter = new GraphemeSplitter();
  return splitter.countGraphemes(str);
}

assert.strictEqual(lengthOfString("one world"), 9);
assert.strictEqual(lengthOfString(""), 0);
assert.strictEqual(lengthOfString("a"), 1);
assert.strictEqual(lengthOfString("hello"), 5);
assert.strictEqual(lengthOfString("👋"), 1);
assert.strictEqual(lengthOfString("👩‍👩‍👧‍👦"), 1);
assert.strictEqual(lengthOfString("🇮🇳"), 1);
assert.strictEqual(lengthOfString("a👋b"), 3);
assert.strictEqual(lengthOfString("😊😊😊"), 3);