import assert from "assert";
//Question 9
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

//Question 10

function lengthOfString(str: string): number {
  let count = 0;

  for (const _ of str) {
    count++;
  }

  return count;
}


assert.strictEqual(lengthOfString("one world"), 9);
assert.strictEqual(lengthOfString(""), 0);
assert.strictEqual(lengthOfString("a"), 1);
assert.strictEqual(lengthOfString("hello"), 5);

