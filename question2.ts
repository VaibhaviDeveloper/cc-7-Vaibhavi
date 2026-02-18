import assert from "assert";

function blueGreenHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    
    const heart = (i % 2 === 1) ? "💚" : "💙";
    result += (heart + " ").repeat(i).trim() + "\n";
  }

  return result.trim();
}


const expectedPattern5 =
`💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚`;

assert.strictEqual(blueGreenHeartPattern(5), expectedPattern5);

console.log("Assertion   tests passed!");
