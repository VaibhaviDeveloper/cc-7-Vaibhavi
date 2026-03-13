import assert from 'assert';

/**
 * Extracts all emails from an array of strings.
 * Emails are returned in lowercase. Strings without emails are ignored.
 * @param {string[]} arr - Array of strings possibly containing emails.
 * @returns {string[]} Array of emails in lowercase.
 */

const emailRegex = /[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
const addresses = [
  '34, brighten street, email: BS@sft.com',
  'Behind hotel paragon, rode street, micHel@sun.it',
  'ulef court, cown street, email:cown@street',
  'CodeCraft',
];
const extractEmails = addresses.filter((str) => emailRegex.test(str));
const emails = extractEmails.map((str) => str.match(emailRegex)![0].toLowerCase());

assert.deepStrictEqual(emails, ['bs@sft.com', 'michel@sun.it']);
