import assert from "assert";

/**
 *This function generates a pattern of blue heart emojis where each line
 * contains an increasing number of hearts from 1 up to `lines`.
 * @param {number} lines - The number of lines to generate in the pattern.
 * @returns {string} A multi-line string representing the heart pattern.
 */

function blueHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    result += "💙 ".repeat(i).trim() + "\n";
  }

  return result.trim();
}
const expected7 =
`💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙`;
assert.strictEqual(blueHeartPattern(7), expected7);
const expected1 = `💙`;
assert.strictEqual(blueHeartPattern(1), expected1);
const expected3 =
`💙
💙 💙
💙 💙 💙`;
assert.strictEqual(blueHeartPattern(3), expected3);
assert.strictEqual(blueHeartPattern(0), "");
const expected4 =
`💙
💙 💙
💙 💙 💙
💙 💙 💙 💙`;
assert.strictEqual(blueHeartPattern(4), expected4);

