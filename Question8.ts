import assert from "assert";

/**
 * Returns substring containing all characters in a string
 * until a character repeats.
 * @param {string} str - Input string to scan
 * @returns {string[]} List of unique characters until first repeat
 */

function getStringSpecial(str: string): string[] {
  const strResult: string[] = [];

  for (const char of str) {
    if (strResult.includes(char)) {
      break;
    }
   strResult.push(char);
  }
 return strResult;
}


assert.deepStrictEqual(getStringSpecial("hello"), ["h", "e", "l"]);
assert.deepStrictEqual(getStringSpecial(""), []);
assert.deepStrictEqual(getStringSpecial("a"), ["a"]);
assert.deepStrictEqual(getStringSpecial("aabbaa"), ["a"]);



