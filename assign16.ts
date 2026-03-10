import assert from "assert";

/**
 * Generates an array containing lowercase alphabets from a to z.
 *
 * @returns Array of alphabet characters
 */
function generateAlphabets(): string[] {
  return Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
}

/**
 * Groups alphabets into vowels and consonants.
 *
 * @param alphabets - Array of alphabet characters
 * @returns Object containing vowels and consonants arrays
 */
function groupVowelsAndConsonants(alphabets: string[]): {
  vowels: string[];
  consonants: string[];
} {
  const vowelsSet = new Set(["a", "e", "i", "o", "u"]);

  return alphabets.reduce(
    (acc, char) => {
      if (vowelsSet.has(char)) {
        acc.vowels.push(char);
      } else {
        acc.consonants.push(char);
      }
      return acc;
    },
    { vowels: [], consonants: [] } as {
      vowels: string[];
      consonants: string[];
    }
  );
}

const alphabetsTest = generateAlphabets();

assert.strictEqual(alphabetsTest.length, 26);

const groupedTest = groupVowelsAndConsonants(alphabetsTest);

assert.deepStrictEqual(groupedTest.vowels, ["a", "e", "i", "o", "u"]);

assert(groupedTest.consonants.includes("b"));
assert(groupedTest.consonants.includes("z"));