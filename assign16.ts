import assert from "assert";

/**
 * Generate array of alphabets from a-z.
 * @returns array of alphabets
 */
const generateAlphabets = (): string[] => {
  const ALPHABET_START = "a".charCodeAt(0);
  const ALPHABET_COUNT = 26;

  return Array.from({ length: ALPHABET_COUNT }, (_, i) =>
    String.fromCharCode(ALPHABET_START + i),
  );
};

/**
 * Group alphabets into vowels and consonants.
 * @param letters array of alphabets
 * @returns object with vowels and consonants arrays
 */
const groupLetters = (letters: string[]) => {
  const VOWELS = ["a", "e", "i", "o", "u"];

  return letters.reduce(
    (acc, letter) => {
      if (VOWELS.includes(letter)) acc.vowels.push(letter);
      else acc.consonants.push(letter);

      return acc;
    },
    { vowels: [] as string[], consonants: [] as string[] },
  );
};

const alphabets = generateAlphabets();

assert.strictEqual(alphabets.length, 26);

const grouped = groupLetters(alphabets);

assert.deepStrictEqual(grouped.vowels, ["a", "e", "i", "o", "u"]);
assert(grouped.consonants.includes("b"));
assert(grouped.consonants.includes("z"));