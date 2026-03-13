import assert from 'assert';

/**
 * Generates an array containing the first n natural numbers.
 *
 * @param n - Number of natural numbers to generate
 * @returns Array of numbers from 1 to n
 */
function generateNaturalNumbers(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

/**
 * Groups numbers into odd and even arrays.
 *
 * @param numbers - Array of numbers
 * @returns Object containing odd and even number arrays
 */
function groupOddEven(numbers: number[]): { odd: number[]; even: number[] } {
  return numbers.reduce(
    (acc, num) => {
      if (num % 2 === 0) {
        acc.even.push(num);
      } else {
        acc.odd.push(num);
      }
      return acc;
    },
    { odd: [], even: [] } as { odd: number[]; even: number[] }
  );
}

/**
 * Converts odd/even number arrays into sums.
 *
 * @param grouped - Object containing odd and even number arrays
 * @returns Object containing sums of odd and even numbers
 */
function sumOddEven(grouped: { odd: number[]; even: number[] }) {
  return {
    odd: grouped.odd.reduce((sum, n) => sum + n, 0),
    even: grouped.even.reduce((sum, n) => sum + n, 0),
  };
}

assert.deepStrictEqual(generateNaturalNumbers(5), [1, 2, 3, 4, 5]);

const groupedTest = groupOddEven([1, 2, 3, 4]);

assert.deepStrictEqual(groupedTest, {
  odd: [1, 3],
  even: [2, 4],
});

const summedTest = sumOddEven(groupedTest);

assert.deepStrictEqual(summedTest, {
  odd: 4,
  even: 6,
});
