import assert from "assert";

/**
 * Extracts all emails from an array of strings.
 * Emails are returned in lowercase. Strings without emails are ignored.
 * @param {string[]} arr - Array of strings possibly containing emails.
 * @returns {string[]} Array of emails in lowercase.
 */

function extractEmails(arr: string[]): string[] {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

  return arr
    .map(str => {
      const match = str.match(emailRegex);
      return match ? match[0].toLowerCase() : null;
    })
    .filter(email => email !== null) as string[];
}

const addresses = [
  "34, brighten street, email: BS@sft.com",
  "Behind hotel paragon, rode street, micHel@sun.it",
  "ulef court, cown street, email:cown@street",
  "CodeCraft"
];

const emails = extractEmails(addresses);
const expectedEmails = ["bs@sft.com", "michel@sun.it"];
assert.deepStrictEqual(emails, expectedEmails);
assert.deepStrictEqual(extractEmails([]), []);
assert.deepStrictEqual(
  extractEmails(["No email here", "Just text"]),
  []
);
assert.deepStrictEqual(
  extractEmails(["EMAIL: TEST@DOMAIN.COM", "hello@World.com"]),
  ["test@domain.com", "hello@world.com"]
);
assert.deepStrictEqual(
  extractEmails(["contact: a@x.com, b@x.com"]),
  ["a@x.com"] 
);

