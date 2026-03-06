import assert from "assert";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
  { text: "You can observe a lot just by watching.", author: "Yogi Berra" },
  { text: "To invent, you need a good imagination and a pile of junk", author: "Thomas Edison" },
  { text: "Difficulties increase the nearer we get to the goal.", author: "Yogi Berra" },
  { text: "Fate is in your hands and no one elses", author: "Byron Pulsifer" },
  { text: "Be the chief but never the lord.", author: "Lao Tzu" },
  { text: "Nothing happens unless first we dream.", author: "Byron Pulsifer" },
  { text: "Well begun is half done.", author: "Aristotle" },
  { text: "Life is a learning experience, only if you learn.", author: "Yogi Berra" },
  { text: "Self-complacency is fatal to progress.", author: "Margaret Sangster" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "What you give is what you get.", author: "Byron Pulsifer" },
  { text: "We can only learn to love by loving.", author: "Lao Tzu" },
  { text: "Life is change. Growth is optional. Choose wisely.", author: "Karen Clark" },
  { text: "You'll see it when you believe it.", author: "Buddha" }
];

/**
 * 
 * Groups quotes by their author.
 * @param quotes - Array of quote objects
 * @returns Object where keys are authors and values are arrays of quote texts 
 */

function groupQuotesByAuthor(quotes: Quote[]): Record<string, string[]> {
  return quotes.reduce((acc, quote) => {
    if (!acc[quote.author]) {
      acc[quote.author] = [];
    }

    acc[quote.author].push(quote.text);

    return acc;
  }, {} as Record<string, string[]>);
}

const grouped = groupQuotesByAuthor(quotes);

assert.deepStrictEqual(grouped["Buddha"], [
  "Peace comes from within. Do not seek it without.",
  "You'll see it when you believe it."
]);

/**
 * 
 * Returns quotes that contain a specific word.
 * @param word - Word to search for in quotes
 * @returns Array of quote strings containing the word 
 */

function getQuotesContainingWord(word: string): string[] {
  const lowerWord = word.toLowerCase();

  return quotes
    .filter(q => q.text.toLowerCase().includes(lowerWord))
    .map(q => q.text);
}

const lifeQuotes = getQuotesContainingWord("life");

assert.deepStrictEqual(lifeQuotes, [
  "Life is a learning experience, only if you learn.",
  "Life is change. Growth is optional. Choose wisely."
]);

/**
 * Extracts all quote texts from the quote objects.
 * @param quotes - Array of quote objects
 * @returns Array of quote strings 
 */

function getQuoteTexts(quotes: Quote[]): string[] {
  return quotes.map(q => q.text);
}

const texts = getQuoteTexts(quotes);
assert.strictEqual(texts.length, quotes.length);
assert.strictEqual(texts[0], "Genius is one percent inspiration and ninety-nine percent perspiration.");

/**
 * Returns a list of unique authors from the quotes.
 * @param quotes - Array of quote objects
 * @returns Array of unique author names
 */

function getUniqueAuthors(quotes: Quote[]): string[] {
  return quotes.reduce<string[]>((acc, quote) => {
    if (!acc.includes(quote.author)) {
      acc.push(quote.author);
    }
    return acc;
  }, []);
}

const authors = getUniqueAuthors(quotes);
assert(authors.includes("Buddha"));
assert(authors.includes("Thomas Edison"));
assert.strictEqual(authors.filter(a => a === "Buddha").length, 1);