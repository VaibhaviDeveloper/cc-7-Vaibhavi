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

function blueGreenAlternateHeartPattern(lines: number): string {
  let result = "";

  for (let i = 1; i <= lines; i++) {
    let row: string[] = [];

    for (let j = 0; j < i; j++) {
      
      row.push(j % 2 === 0 ? "💚" : "💙");
    }

    result += row.join(" ") + "\n";
  }

  return result.trim();
}


const expectedPattern6 =
`💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙`;

assert.strictEqual(blueGreenAlternateHeartPattern(6), expectedPattern6);


assert.strictEqual(blueGreenAlternateHeartPattern(1), "💚");
assert.strictEqual(blueGreenAlternateHeartPattern(0), "");

console.log("Assertion for alternate Heart pattern tests passed!");


function boundedHeartPattern(lines: number): string {
  if (lines <= 0) return "";

  let result = "";

  for (let i = 1; i <= lines; i++) {
    let row: string[] = [];

    for (let j = 1; j <= i; j++) {
      
      if (i === 1 || i === lines) {
        row.push("💚");
      }
      
      else if (j === 1 || j === i) {
        row.push("💚");
      }
      
      else {
        row.push("💙");
      }
    }

    result += row.join(" ") + "\n";
  }

  return result.trim();
}



const expectedPattern7 =
`💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚`;

assert.strictEqual(boundedHeartPattern(7), expectedPattern7);

// Edge cases
assert.strictEqual(boundedHeartPattern(1), "💚");
assert.strictEqual(boundedHeartPattern(0), "");

console.log("All assertion tests for bounded pattern passed!");


