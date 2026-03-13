import { describe, it, expect } from 'vitest';
import { getFileType, getContents, getSize } from './async-3';

const testFile = './test.txt';
const testFolder = './testFolder';
const emptyFile = './emptyFile.txt';
const noFile = './noSuchFile';

describe('File system utility functions', () => {
  it('should return FILE for a regular file', async () => {
    const type = await getFileType(testFile);
    expect(type).toBe('FILE');
  });

  it('should return DIRECTORY for a folder', async () => {
    const type = await getFileType(testFolder);
    expect(type).toBe('DIRECTORY');
  });

  it('should return FILE for an empty file', async () => {
    const type = await getFileType(emptyFile);
    expect(type).toBe('FILE');
  });

  it('should throw error for non-existent file/folder', async () => {
    await expect(getFileType(noFile)).rejects.toThrow('file system error');
  });

  it('should read file contents correctly', async () => {
    const contents = await getContents(testFile);
    expect(typeof contents).toBe('string');
    expect((contents as string).length).toBeGreaterThan(0);
  });

  it('should list folder contents correctly', async () => {
    const contents = await getContents(testFolder);
    expect(Array.isArray(contents)).toBe(true);
    expect((contents as string[]).length).toBeGreaterThan(0);
  });

  it('should return correct size for a file', async () => {
    const size = await getSize(testFile);
    expect(size).toBeGreaterThan(0);
  });

  it('should return total size for a folder', async () => {
    const size = await getSize(testFolder);
    expect(size).toBeGreaterThan(0);
  });

  it('should throw error for size of non-existent file', async () => {
    await expect(getSize(noFile)).rejects.toThrow('file system error');
  });
});
