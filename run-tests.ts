import { execSync } from "child_process";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current directory in ES module style
const projectRoot = dirname(fileURLToPath(import.meta.url));

// Get all .ts files in the root, ignoring run-tests.ts AND any *.test.ts files
const tsFiles = readdirSync(projectRoot)
  .filter(f => 
    f.endsWith(".ts") &&
    !["run-tests.ts", "Stack.ts", "LinkedList.ts"].includes(f) &&  // ignore these
    !f.endsWith(".test.ts") // ignore all .test.ts files
  );
let failed = false;

for (const file of tsFiles) {
  try {
    console.log(`\nRunning ${file}...`);
    execSync(`tsx ${join(projectRoot, file)}`, { stdio: "inherit" });
    
  } catch  { // <--- Added underscore here
    failed = true;
  }
}

if (failed) {
  console.error("\nSome asserts failed!");
  process.exit(1); // Marks workflow as failed
} else {
  console.log("\nAll asserts passed!");
}