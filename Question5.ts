import assert from "assert";

/**
 * Prints the first n odd or even numbers.
 * @param {number} n - The number of elements needed.
 * @param {string} evenOrOdd -Indicates whether we need even or odd numbers .
 * @returns {string} The function returns a string that contains first n odd or even numbers.
 */

function printNumbers(n: number, evenOrOdd: string) {
    if (n <= 0) return "";

    let nums: number[] = [];
    let start = evenOrOdd === "even" ? 2 : 1;

    for (let i = 0; i < n; i++) {
        nums.push(start);
        start += 2;
    }

    return nums.join(", ");
}

assert.strictEqual(printNumbers(4, "odd"), "1, 3, 5, 7");
assert.strictEqual(printNumbers(5, "even"), "2, 4, 6, 8, 10");
assert.strictEqual(printNumbers(1, "odd"), "1");
assert.strictEqual(printNumbers(0, "even"), "");


