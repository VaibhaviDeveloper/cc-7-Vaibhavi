import assert from "assert";

function blueHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    result += "💙 ".repeat(i).trim() + "\n";
  }

  return result.trim();
}

const expected = 
`💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙`;
assert.strictEqual(blueHeartPattern(7), expected);

console.log("Assertion pass");