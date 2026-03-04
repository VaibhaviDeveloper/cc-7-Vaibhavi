import assert from "node:assert";

const people = [
  { name: 'John', age: 13 },
  { name: 'Mark', age: 56 },
  { name: 'Rachel', age: 45 },
  { name: 'Nate', age: 67 },
  { name: 'Jeniffer', age: 65 }
];

/**
 * Extracts ages from an array of people objects.
 * @param {{name: string, age: number}[]} arr - Array of people objects.
 * @returns {number[]} Array containing only the ages.
 */

function getAges(arr: { name: string; age: number }[]): number[] {
  return arr.map(person => person.age);
}
const ages = getAges(people);
const expectedAges = [13, 56, 45, 67, 65];
assert.deepStrictEqual(ages, expectedAges);