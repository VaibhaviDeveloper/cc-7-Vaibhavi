import assert from "node:assert";

/**
 * Returns the nth Fibonacci number.
 * Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13, ...
 * @param {number} n - The index in the Fibonacci sequence (0-based).
 * @returns {number} The Fibonacci number at index n.
 */

function fibonacci(n:number):number{
    if(n<=1){
        return n;
    }
    let a=0,b=1;
    for(let i=2;i<=n;i++){
          const temp=a+b;
          a=b;
          b=temp;
    }
    return b;
}
// Map array of indices to Fibonacci numbers
const indices=[2, 1, 5,  7];
const result=indices.map(index=>fibonacci(index));
assert.deepStrictEqual(result, [1, 1, 5, 13]);
assert.strictEqual(fibonacci(0), 0);
assert.strictEqual(fibonacci(1), 1);
const multipleIndices = [0, 1, 2, 3, 4, 5, 6];
const expectedMultiple = [0, 1, 1, 2, 3, 5, 8];
assert.deepStrictEqual(multipleIndices.map(fibonacci), expectedMultiple);