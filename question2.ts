import assert from "assert";

/**
 * Generates a triangular heart pattern where each row alternates color by row number. Odd-numbered rows contain green hearts,and even-numbered rows contain blue hearts . Also each row contains a number of hearts equal to its row index.
 * @param {number} lines -The number of rows to generate.
 * @returns {string} A newline-separated string representing the heart triangle.
 */

function blueGreenHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    
    const heart = (i % 2 === 1) ? "💚" : "💙";
    result += (heart + " ").repeat(i).trim() + "\n";
  }

  return result.trim();
}

const expectedPattern5 =
`💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚`;

assert.strictEqual(blueGreenHeartPattern(5), expectedPattern5);
assert.strictEqual(blueGreenHeartPattern(1), "💚");
assert.strictEqual(blueGreenHeartPattern(0), "");
assert.strictEqual(blueGreenHeartPattern(-3), "");
const expectedPattern =
`💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚
💙 💙 💙 💙 💙 💙`;

assert.strictEqual(blueGreenHeartPattern(6), expectedPattern);

/**
 * Generates a triangular heart pattern where each row alternates
 * colors within the row, starting with green.
 * @param  {number} lines - The number of rows to generate.
 * @returns {string} A newline-separated string representing the alternating heart triangle.
 */

function blueGreenAlternateHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    let row: string[] = [];

    for (let j = 0; j < i; j++) {
      
      row.push(j % 2 === 0 ? "💚" : "💙");
    }

    result += row.join(" ") + "\n";
  }

  return result.trim();
}
const expectedPattern6 =
`💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙`;
assert.strictEqual(blueGreenAlternateHeartPattern(6), expectedPattern6);
assert.strictEqual(blueGreenAlternateHeartPattern(1), "💚");
assert.strictEqual(blueGreenAlternateHeartPattern(0), "");

/**
 * Generates a bounded triangular heart pattern.The triangle contains a number of rows equal to `lines`.
 * The first and last rows consist entirely of green hearts.For all intermediate rows:The first and last hearts are green.
 * All inner hearts are blue.
 * @param {number} lines - The total number of rows in the triangle.
 * @returns {string} A newline-separated string representing the bounded heart triangle.
 */

function boundedHeartPattern(lines: number): string {
  if (lines <= 0) return "";
  let result = "";
  for (let i = 1; i <= lines; i++) {
    let row: string[] = [];

    for (let j = 1; j <= i; j++) {
      
      if (i === 1 || i === lines) {
        row.push("💚");
      }
      
      else if (j === 1 || j === i) {
        row.push("💚");
      }
      
      else {
        row.push("💙");
      }
    }

    result += row.join(" ") + "\n";
  }

  return result.trim();
}

const expectedPattern7 =
`💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚`;

assert.strictEqual(boundedHeartPattern(7), expectedPattern7);
assert.strictEqual(boundedHeartPattern(1), "💚");
assert.strictEqual(boundedHeartPattern(0), "");