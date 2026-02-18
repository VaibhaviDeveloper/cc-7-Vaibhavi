import assert from "assert";
//Printing Odd or even numbers-Question number 5
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

console.log("Printed numbers properply");
