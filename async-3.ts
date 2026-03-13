import fs from 'fs/promises';
import path from 'path';

/**
 * Determines the type of the entry at the given path.
 * @param {string} filePath - The file system path to check.
 * @returns {Promise<'FILE' | 'DIRECTORY' | 'OTHER'>}
 */

export async function getFileType(filePath: string): Promise<'FILE' | 'DIRECTORY' | 'OTHER'> {
  try {
    const stats = await fs.stat(filePath);
    if (stats.isFile()) return 'FILE';
    if (stats.isDirectory()) return 'DIRECTORY';
    return 'OTHER';
  } catch {
    // Removed 'err' to fix: 'err' is defined but never used
    throw new Error('file system error');
  }
}

/**
 * Retrieves the contents of a file or the names of items within a directory.
 * @param {string} filePath - The path to the file or directory.
 * @returns {Promise<string | string[]>}
 */

export async function getContents(filePath: string): Promise<string | string[]> {
  try {
    const stats = await fs.stat(filePath);
    if (stats.isFile()) {
      return await fs.readFile(filePath, 'utf8');
    } else if (stats.isDirectory()) {
      return await fs.readdir(filePath);
    } else {
      throw new Error('file system error');
    }
  } catch {
    // Removed 'err' to fix: 'err' is defined but never used
    throw new Error('file system error');
  }
}

/**
 * Calculates the total size of a file or recursively calculates the size of all files in a folder.
 * @param {string} filePath - The path to the file or folder.
 * @returns {Promise<number>}
 */

export async function getSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      return stats.size;
    } else if (stats.isDirectory()) {
      const files = await fs.readdir(filePath);
      const promises = files.map((file) => getSize(path.join(filePath, file)));
      const sizes = await Promise.all(promises);
      return sizes.reduce((acc, curr) => acc + curr, 0);
    }
    return 0;
  } catch {
    // Removed 'err' to fix: 'err' is defined but never used
    throw new Error('file system error');
  }
}

/**
 * Testing logic using async/await consumption
 */

export async function testPath(p: string): Promise<void> {
  console.log(`\n--- Testing: ${p} ---`);
  try {
    const type = await getFileType(p);
    console.log('Type:', type);

    const contents = await getContents(p);
    console.log('Contents:', contents);

    const size = await getSize(p);
    console.log('Total Size:', size);
  } catch (err: unknown) {
    // Changed 'any' to 'unknown' and added a type guard to fix: Unexpected any.
    if (err instanceof Error) {
      console.log('Error:', err.message);
    } else {
      console.log('Error:', String(err));
    }
  }
}

/**
 * Main execution function to run tests sequentially
 */

export async function runTests() {
  await testPath('./test.txt');
  await testPath('./testFolder');
  await testPath('./noSuchFile');
  await testPath('./emptyFile.txt');
}

runTests();
