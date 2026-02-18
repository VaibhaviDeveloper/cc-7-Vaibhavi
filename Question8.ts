import assert from "assert";
function getStringSpecial(str: string): string[] {
  const strResult: string[] = [];

  for (const char of str) {
    if (!strResult.includes(char)) {
      strResult.push(char);
    }
  }

  return strResult;
}

assert.deepStrictEqual(getStringSpecial("hello"), ["h", "e", "l", "o"]);
assert.deepStrictEqual(getStringSpecial(""), []);
assert.deepStrictEqual(getStringSpecial("a"), ["a"]);
assert.deepStrictEqual(getStringSpecial("aabbaa"), ["a", "b"]);


