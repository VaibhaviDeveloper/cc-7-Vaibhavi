import assert from "assert";

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


