import fs from "fs/promises";
import path from "path";

/**
 * Determines the type of the entry at the given path.
 * @param {string} filePath - The file system path to check.
 * @returns {Promise<'FILE' | 'DIRECTORY' | 'OTHER'>}
 */

function getFileType(filePath: string): Promise<'FILE' | 'DIRECTORY' | 'OTHER'> {
  return fs.stat(filePath)
    .then((stats) => {
      if (stats.isFile()) return "FILE";
      if (stats.isDirectory()) return "DIRECTORY";
      return "OTHER";
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Retrieves the contents of a file or the names of items within a directory.
 * @param {string} filePath - The path to the file or directory.
 * @returns {Promise<string | string[]>}
 */

function getContents(filePath: string): Promise<string | string[]> {
  return fs.stat(filePath)
    .then<string | string[]>((stats) => {
      if (stats.isFile()) {
        return fs.readFile(filePath, "utf8"); 
      } else if (stats.isDirectory()) {
        return fs.readdir(filePath);          
      } else {
        throw new Error("file system error");
      }
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Calculates the total size of a file or recursively calculates the size of all files in a folder.
 * @param {string} filePath - The path to the file or folder.
 * @returns {Promise<number>}
 */

function getSize(filePath: string): Promise<number> {
  return fs.stat(filePath)
    .then((stats) => {
      if (stats.isFile()) {
        return stats.size;
      } else if (stats.isDirectory()) {
        return fs.readdir(filePath)
          .then((files) => {
            const promises = files.map(file => getSize(path.join(filePath, file)));
            return Promise.all(promises);
          })
          .then((sizes) => {
            return sizes.reduce((acc, curr) => acc + curr, 0);
          });
      } else {
        return 0;
      }
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

// Testing Logic

const testPath = (p: string): Promise<void> => {
  console.log(`\n--- Testing: ${p} ---`);
  return getFileType(p)
    .then((type) => {
      console.log("Type:", type);
      return getContents(p);
    })
    .then((contents) => {
      console.log("Contents:", contents);
      return getSize(p);
    })
    .then((size) => {
      console.log("Total Size:", size);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
};

testPath("./test.txt")
  .then(() => testPath("./testFolder"))
  .then(() => testPath("./noSuchFile"));