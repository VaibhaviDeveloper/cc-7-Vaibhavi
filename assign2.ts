import assert from 'node:assert';
/**
 * Replaces the first occurrence of "CraftCode" with "CodeCraft"
 * in each string of the given array.
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
function transformStrings(arr: string[]): string[] {
  return arr.map((str: string) => str.replace('CraftCode', 'CodeCraft'));
}

const strings = [
  'CraftCode is a nice company',
  'We love CraftCode',
  'We are working in CraftCode',
  'Where is CraftCode?',
];

const expected = [
  'CodeCraft is a nice company',
  'We love CodeCraft',
  'We are working in CodeCraft',
  'Where is CodeCraft?',
];

assert.deepStrictEqual(transformStrings(strings), expected);

assert.deepStrictEqual(transformStrings(['Hello World']), ['Hello World']);
assert.deepStrictEqual(transformStrings([]), []);
