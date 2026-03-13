import fs from 'fs';
import path from 'path';

/**
 * Determines the type of the entry at the given path.
 * @param {string} path - The file system path to check.
 * @returns {Promise<'FILE' | 'DIRECTORY' | 'OTHER'>} A promise that resolves to the entry type.
 * @throws {Error} Throws "file system error" if the path is invalid or inaccessible.
 */
function getFileType(path: string): Promise<'FILE' | 'DIRECTORY' | 'OTHER'> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(new Error('file system error'));
        return;
      }

      if (stats.isFile()) resolve('FILE');
      else if (stats.isDirectory()) resolve('DIRECTORY');
      else resolve('OTHER');
    });
  });
}

/**
 * Retrieves the contents of a file or the names of items within a directory.
 * * @param {string} path - The path to the file or directory.
 * @returns {Promise<string | string[]>} A promise resolving to file text (string) or directory listing (string[]).
 * @throws {Error} Throws "file system error" if reading fails.
 */

function getContents(path: string): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(new Error('file system error'));
        return;
      }

      if (stats.isFile()) {
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) reject(new Error('file system error'));
          else resolve(data);
        });
      } else if (stats.isDirectory()) {
        fs.readdir(path, (err, files) => {
          if (err) reject(new Error('file system error'));
          else resolve(files);
        });
      }
    });
  });
}

/**
 * Calculates the total size of a file or recursively calculates the size of all files in a folder.
 * * @param {string} path - The path to the file or folder.
 * @returns {Promise<number>} A promise resolving to the total size in bytes.
 * @throws {Error} Throws "file system error" if the path cannot be read.
 */

function getSize(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(new Error('file system error'));

      if (stats.isFile()) {
        resolve(stats.size);
      } else if (stats.isDirectory()) {
        fs.readdir(filePath, (err, files) => {
          if (err) return reject(new Error('file system error'));
          if (files.length === 0) return resolve(0);
          const promises = files.map((file) => getSize(path.join(filePath, file)));
          Promise.all(promises)
            .then((sizes) => {
              const total = sizes.reduce((acc, curr) => acc + curr, 0);
              resolve(total);
            })
            .catch(() => reject(new Error('file system error')));
        });
      } else {
        resolve(0);
      }
    });
  });
}

// Testing Logic
const testPath = (p: string): Promise<void> => {
  console.log(`\n--- Testing: ${p} ---`);
  return getFileType(p)
    .then((type) => {
      console.log('Type:', type);
      return getContents(p);
    })
    .then((contents) => {
      console.log('Contents:', contents);
      return getSize(p);
    })
    .then((size) => {
      console.log('Total Size:', size);
    })
    .catch((err) => {
      console.log('Error:', err.message);
    });
};

// Sequential execution as requested
testPath('./test.txt')
  .then(() => testPath('./testFolder'))
  .then(() => testPath('./noSuchFile'))
  .then(() => testPath('./emptyFile.txt'));
