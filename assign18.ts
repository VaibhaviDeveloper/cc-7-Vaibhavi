import assert from 'assert';

/**
 * Applies a transformation function to each element of the array
 * and returns a new array containing the transformed values.
 * Implemented using Array.reduce.
 *
 * @typeParam T - Type of input array elements
 * @typeParam U - Type of output array elements
 * @param array - Input array
 * @param transform - Function that transforms each element
 * @returns New array with transformed values
 */

const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce<U[]>((acc, item) => {
    acc.push(transform(item));
    return acc;
  }, []);
};

/**
 * Filters elements of an array based on a predicate function.
 * Only elements that satisfy the predicate are included.
 * Implemented using Array.reduce.
 *
 * @typeParam T - Type of array elements
 * @param array - Input array
 * @param predicate - Function that determines whether an element should be included
 * @returns New array containing elements that satisfy the predicate
 */

const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce<T[]>((acc, item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

assert.deepStrictEqual(
  map([1, 2, 3], (n) => n * 2),
  [2, 4, 6]
);

assert.deepStrictEqual(
  map(['a', 'b'], (s) => s.toUpperCase()),
  ['A', 'B']
);

assert.deepStrictEqual(
  filter([1, 2, 3, 4], (n) => n % 2 === 0),
  [2, 4]
);

assert.deepStrictEqual(
  filter(['apple', 'banana', 'kiwi'], (s) => s.length > 4),
  ['apple', 'banana']
);
